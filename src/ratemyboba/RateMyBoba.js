import '../SharedStyles.css';
import './RateMyBoba.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import boba_guys from './boba_pictures/boba_guys.png';
import coco from './boba_pictures/coco.jpg';
import debutea from './boba_pictures/debutea.webp';
import gong_cha from './boba_pictures/gong_cha.png';
import kung_fu_tea from './boba_pictures/kung_fu_tea.webp';
import lazy_sundaes from './boba_pictures/lazy_sundays.png';
import moge_tea from './boba_pictures/moge_tea.png';
import onezo from './boba_pictures/onezo.webp';
import prince_tea_house from './boba_pictures/prince_tea_house.webp';
import tiger_sugar from './boba_pictures/tiger_sugar.png';
import wanpo from './boba_pictures/wanpo.svg';
import yi_fang from './boba_pictures/yi_fang.jpeg';
import xin_fu_tang from './boba_pictures/xin_fu_tang.png';
import refreshIcon from './refresh.png';

// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration

function RateMyBoba() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDS5-lTJeYqFETZQG3Qou6ibnyixaEbrA8',
    authDomain: 'ratemyboba-66460.firebaseapp.com',
    projectId: 'ratemyboba-66460',
    storageBucket: 'ratemyboba-66460.appspot.com',
    messagingSenderId: '285924454270',
    appId: '1:285924454270:web:1ef689687066b04ba3cd2f',
  };

  // Initialize Firebase
  // Check if firebase app is already initialized to avoid errors in strict mode
  const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
  const db = getFirestore(app);

  const bobaShops = [
    boba_guys,
    coco,
    debutea,
    gong_cha,
    kung_fu_tea,
    lazy_sundaes,
    moge_tea,
    onezo,
    prince_tea_house,
    tiger_sugar,
    wanpo,
    yi_fang,
    xin_fu_tang,
  ];

  const [firstContestantID, setFirstContestantID] = useState(1);
  const [secondContestantID, setSecondContestantID] = useState(2);
  const [elo_scores, setEloScores] = useState(
    new Array(bobaShops.length).fill(1500)
  );
  const [rankings, setRankings] = useState([]);

  const retrieveElos = async () => {
    console.log('Retrieving Elos');

    const new_elos = [...elo_scores];
    const querySnapshot = await getDocs(collection(db, 'boba_brands'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      new_elos[doc.id] = data.elo;
    });

    console.log(new_elos);
    setEloScores(new_elos);

    console.log('Done Retrieving Elos');
  };

  const retrieveElo = async (id) => {
    console.log('Retrieving Elo');
    const docRef = doc(db, 'boba_brands', String(id));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      update_elo_at_index(id, data.elo);
    } else {
      console.log('No boba shop for this ID');
    }
  };

  const update_elo_at_index = (index, new_elo) => {
    setEloScores((prevItems) => {
      return prevItems.map((item, i) => (i === index ? new_elo : item));
    });
  };

  const updateElo = async (id, elo) => {
    console.log(`Updating id${id}, elo ${elo}`);

    await setDoc(doc(db, 'boba_brands', String(id)), {
      elo: elo,
    });
  };

  const calculateRankings = () => {
    const newRankings = elo_scores.map((elo, index) => ({
      id: index,
      elo: elo,
      src: bobaShops[index],
    }));
    newRankings.sort((a, b) => b.elo - a.elo);
    setRankings(newRankings);
  };

  useEffect(() => {
    calculateRankings();
  }, [elo_scores]);

  useEffect(() => {
    const init = async () => {
      console.log('Component did mount!');
      await retrieveElos();
      scrambleContestantIDs();
    };
    init();

    return () => {
      console.log('Component will unmount!');
    };
  }, []);

  const voteForLeftContestant = () => {
    console.log('Voted for left contestant');
    voteForContestant(0);
  };

  const voteForRightContestant = () => {
    console.log('Voted for right contestant');
    voteForContestant(1);
  };

  const voteForContestant = (winner) => {
    const firstElo = elo_scores[firstContestantID];
    const secondElo = elo_scores[secondContestantID];

    const elo_results = calculateElo(firstElo, secondElo, winner);
    console.log(elo_results);

    const new_elo_scores = [...elo_scores];
    new_elo_scores[firstContestantID] = Math.round(elo_results[0]);
    new_elo_scores[secondContestantID] = Math.round(elo_results[1]);

    updateElo(firstContestantID, new_elo_scores[firstContestantID]);
    updateElo(secondContestantID, new_elo_scores[secondContestantID]);

    setEloScores(new_elo_scores);

    scrambleContestantIDs();
  };

  const calculateElo = (elo1, elo2, winner) => {
    const k = 32;
    const expectedElo1 = 1 / (1 + Math.pow(10, (elo2 - elo1) / 400));
    const expectedElo2 = 1 / (1 + Math.pow(10, (elo1 - elo2) / 400));
    if (winner === 0) {
      return [elo1 + k * (1 - expectedElo1), elo2 + k * (0 - expectedElo2)];
    } else {
      return [elo1 + k * (0 - expectedElo1), elo2 + k * (1 - expectedElo2)];
    }
  };

  const scrambleContestantIDs = () => {
    console.log('Scrambling contestants');

    var firstID = Math.floor(Math.random() * bobaShops.length);
    var secondID = Math.floor(Math.random() * bobaShops.length);
    while (firstID === secondID) {
      secondID = Math.floor(Math.random() * bobaShops.length);
    }

    retrieveElo(firstID);
    retrieveElo(secondID);

    setFirstContestantID(firstID);
    setSecondContestantID(secondID);

    console.log('Contestants scrambled');
  };

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        retrieveElos();
        return false;
      },
    },
  };

  return (
    <motion.div
      className="rate-my-boba-app shared-app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="top-nav">
        <div className="brand">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div
              className="logo"
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              jfguan
            </motion.div>
          </Link>
          <div className="logo-text">&nbsp;- rate my boba</div>
        </div>
      </div>

      <div className="rmb-container">
        <div className="rmb-header">
          <div className="rmb-title">showdown</div>
          <div className="rmb-subtitle">
            click the better boba shop. elo rating system.
          </div>
        </div>

        {!isSignedIn && (
          <div className="auth-container">
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}

        <div className="showdown-arena">
          <ContestantCard
            src={bobaShops[firstContestantID]}
            elo={elo_scores[firstContestantID]}
            onClick={voteForLeftContestant}
            delay={0}
          />
          <div className="versus-text">vs</div>
          <ContestantCard
            src={bobaShops[secondContestantID]}
            elo={elo_scores[secondContestantID]}
            onClick={voteForRightContestant}
            delay={0.1}
          />
        </div>

        <motion.button
          className="skip-button"
          onClick={scrambleContestantIDs}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          skip
        </motion.button>

        <div className="rankings-section">
          <div className="rankings-header">
            <div className="rmb-title">rankings</div>
            <div className="BobaBox-refresh-box">
              <motion.img
                src={refreshIcon}
                alt="Refresh icon"
                onClick={retrieveElos}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="rankings-list">
            <AnimatePresence>
              {rankings.map((item) => (
                <BobaListItem
                  key={item.id}
                  src={item.src}
                  elo={item.elo}
                  rank={rankings.indexOf(item) + 1}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ContestantCard = ({ src, elo, onClick, delay }) => {
  return (
    <motion.div
      className="contestant-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, borderColor: 'var(--green)' }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="contestant-image-container">
        <img src={src} alt="Boba Shop" className="contestant-img" />
      </div>
      <div className="contestant-elo">{elo}</div>
    </motion.div>
  );
};

const BobaListItem = ({ src, elo, rank }) => {
  return (
    <motion.div
      className="ranking-item"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="rank-number">{rank}</div>
      <div className="ranking-image-box">
        <img src={src} alt="Boba Shop" className="ranking-img" />
      </div>
      <div className="ranking-elo">{elo}</div>
    </motion.div>
  );
};

export default RateMyBoba;
