import './RateMyBoba.css';
import { useState, useEffect } from 'react'
import boba_guys from './boba_pictures/boba_guys.png'
import coco from './boba_pictures/coco.jpg'
import debutea from './boba_pictures/debutea.webp'
import gong_cha from './boba_pictures/gong_cha.png'
import kung_fu_tea from './boba_pictures/kung_fu_tea.webp'
import lazy_sundaes from './boba_pictures/lazy_sundays.png'
import moge_tea from './boba_pictures/moge_tea.png'
import onezo from './boba_pictures/onezo.webp'
import prince_tea_house from './boba_pictures/prince_tea_house.webp'
import tiger_sugar from './boba_pictures/tiger_sugar.png'
import wanpo from './boba_pictures/wanpo.svg'
import yi_fang from './boba_pictures/yi_fang.jpeg'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS5-lTJeYqFETZQG3Qou6ibnyixaEbrA8",
  authDomain: "ratemyboba-66460.firebaseapp.com",
  projectId: "ratemyboba-66460",
  storageBucket: "ratemyboba-66460.appspot.com",
  messagingSenderId: "285924454270",
  appId: "1:285924454270:web:1ef689687066b04ba3cd2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function RateMyBoba() {
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
        yi_fang
    ]

    const [firstContestantID, setFirstContestantID] = useState(1);
    const [secondContestantID, setSecondContestantID] = useState(2);
    const [elo_scores, setEloScores] = useState(new Array(bobaShops.length).fill(1500));
    let rankingDivs = [];

    const resetElos = async () =>{
        try {
            var id = 0
            for (const bobaShop of bobaShops) {
                await setDoc(doc(db, "boba_brands", String(id)), {
                    name: bobaShop,
                    elo: 1500,
                });
                id += 1

                console.log("Document written with ID: ", id);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const retrieveElos = async () =>{
        const new_elos = [...elo_scores]

        console.log("Retrieving Elos");
        const querySnapshot = await getDocs(collection(db, "boba_brands"));
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            new_elos[doc.id] = data.elo
            console.log(`${doc.id} => ${doc.data().elo}`);
        });

        console.log(new_elos)
        setEloScores(new_elos)
        console.log("Done Retrieving Elos");
    }

    async function retrieveElo(id) {

        console.log("Retrieving Elo");
        const docRef = doc(db, "boba_brands", String(id));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            update_elo_at_index(id, data.elo)
        } else {
            console.log("No boba shop for this ID");
        }
    }

    const update_elo_at_index = (index, new_elo) => {
        setEloScores(prevItems => {
            return prevItems.map((item, i) => i === index ? new_elo : item);
        });
    }

    async function updateElo(id, elo) {
        console.log(`Updating id${id}, elo ${elo}`);

        await setDoc(doc(db, "boba_brands", String(id)), {
            elo: elo
        });
    }


    function calculateRankingDivs() {
        console.log("Calculating ranking divs")
        console.log(elo_scores)

        const rankings = elo_scores.map((_, index) => index);
        rankings.sort((a, b) => elo_scores[b] - elo_scores[a]);
        let newRankingDivs = [];

        // console.log(rankings)
        for (let i = 0; i < bobaShops.length; i++) {
            const id = rankings[i]
            const src = bobaShops[id]
            const elo = elo_scores[id]
            // console.log(`source ${src}`)
            // console.log(`elo ${elo}`)

            newRankingDivs.push(
                <BobaListItem 
                    key={id}
                    src={src}
                    elo={elo}
                />
            );
        }

        rankingDivs = newRankingDivs
        console.log(newRankingDivs)
    }

    useEffect(async () => {
        console.log('Component did mount!');

        await retrieveElos()
        scrambleContestantIDs()

        return () => {
          console.log('Component will unmount!');
        };
    }, []); // Empty dependency array means this effect runs once after the initial render
    
    useEffect(async () => {

        return () => {};
    }, [elo_scores]); // Empty dependency array means this effect runs once after the initial render

    calculateRankingDivs()

    

    const voteForLeftContestant = () => {
        voteForContestant(0)
    }

    const voteForRightContestant = () => {
        voteForContestant(1)
    }

    const voteForContestant = (value) => {
        const firstElo = elo_scores[firstContestantID]
        const secondElo = elo_scores[secondContestantID]

        let new_elos = []
        if (value == 0) {
            console.log("Voted for left contestant")
            new_elos = calculateElo(firstElo, secondElo, 0)
        } else if (value == 1){
            console.log("Voted for right contestant")
            new_elos = calculateElo(firstElo, secondElo, 1)
        } else {
            console.log("WTF")
        }

        const new_elo_scores = [...elo_scores]
        new_elo_scores[firstContestantID] = Math.round(new_elos[0])
        new_elo_scores[secondContestantID] = Math.round(new_elos[1])

        console.log(new_elos)
        setEloScores(new_elo_scores)

        updateElo(firstContestantID, new_elo_scores[firstContestantID])
        updateElo(secondContestantID, new_elo_scores[secondContestantID])


        scrambleContestantIDs()
    }

    const calculateElo = (elo1, elo2, winner) => {
        const k = 32
        const expectedElo1 = 1 / (1 + Math.pow(10, (elo2 - elo1) / 400))
        const expectedElo2 = 1 / (1 + Math.pow(10, (elo1 - elo2) / 400))
        if (winner == 0) {
            return [elo1 + k * (1 - expectedElo1), elo2 + k * (0 - expectedElo2)]
        } else {
            return [elo1 + k * (0 - expectedElo1), elo2 + k * (1 - expectedElo2)]
        }
    }

    const scrambleContestantIDs = () => {
        console.log("Scrambling contestants")
        var firstID = Math.floor(Math.random() * bobaShops.length)
        var secondID = Math.floor(Math.random() * bobaShops.length)
        if (firstID == secondID) {
            secondID = (secondID + 1) % bobaShops.length
        }
        // console.log(firstID)
        // console.log(secondID)
        
        retrieveElo(firstID)
        retrieveElo(secondID)

        setFirstContestantID(firstID)
        setSecondContestantID(secondID)

        console.log("Contestants scrambled")
    }

    return (
        <div className="BobaBox">
            <div className="BobaBox-title">
                Rate My Boba!
            </div>
            <div className="BobaBox-body">
                Click on the better boba shop in a versus showdown! Each vote will determine the
                elo of each boba shop, and the leaderboard will be updated accordingly.
            </div>
            <div className="BobaBox-showdown">
                <div className="BobaBox-contestant" onClick={voteForLeftContestant}>
                    <img src={bobaShops[firstContestantID]} alt="Boba Shop 1" className='contestant-image'/>
                    <div className="BobaBox-elo-rating">
                        Elo Rating: {elo_scores[firstContestantID]}
                    </div>
                </div>
                <div className="BobaBox-versus-box">
                    VS
                </div>
                <div className="BobaBox-contestant" onClick={voteForRightContestant}>
                    <img src={bobaShops[secondContestantID]} alt="Boba Shop 2" className='contestant-image'/>
                    <div className="BobaBox-elo-rating">
                        Elo Rating: {elo_scores[secondContestantID]}
                    </div>
                </div>
            </div>
            <div className="BobaBox-skip-section">
                <div className="BobaBox-skip" onClick={scrambleContestantIDs}>
                    Skip
                </div>
            </div>
            <div className="BobaBox-reset-scores" onClick={resetElos}>
                Reset Elos
            </div>
            <div className="BobaBox-rankings">
                <div className="BobaBox-ranking-title">
                    Rankings
                </div>
                <div className="BobaBox-refresh-box">
                    <img src={require("./refresh.png")} alt="Refresh icon" onClick={retrieveElos}/>
                </div>
            </div>
            <div className="BobaBox-ranking-list">
                <div>
                    {rankingDivs}
                </div>
            </div>
        </div>
    );
}

const BobaListItem = ({src, elo}) => {
    return (
        <div className="BobaBox-list-item">
            <div className="BobaBox-picture-box">
                <img src={src} alt="Boba Shop" className='item-image'/>
            </div>
            <div className="BobaBox-item-elo">
                Elo Rating: {elo}
            </div>
        </div>
    )
}

export default RateMyBoba;
