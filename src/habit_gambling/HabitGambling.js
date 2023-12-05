import './HabitGambling.css';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc} from "firebase/firestore"; 

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebaseui from 'firebaseui'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzCe2TiOCupH84FxClAAVdEJp9BuWedFI",
    authDomain: "habitgambling.firebaseapp.com",
    projectId: "habitgambling",
    storageBucket: "habitgambling.appspot.com",
    messagingSenderId: "60788841107",
    appId: "1:60788841107:web:8affc98f8c54619fd40b66"
};

// Initialize Firebase
const HabitGambling = () => {
    const app = firebase.initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [totalAmount, setTotalAmount] = useState(0.00);
    const [multiplier, setMultiplier] = useState(1);
    const [customRoll, setCustomRoll] = useState("");
    const [customTotal, setCustomTotal] = useState("");

    const addToTotal = async (amount) => {
        const randomMultiplier = Math.floor(Math.random() * 5) + 1
        const randomizedAmount = amount * randomMultiplier

        const maxTotal = await retrieveTotal()
        await setTotalAmount(maxTotal + randomizedAmount)
        setMultiplier(randomMultiplier)

        updateTotal(maxTotal + randomizedAmount)
    }

    const handleCustomRollChange = (event) => {
        setCustomRoll(event.target.value);
    };

    const AddToTotalCustomRoll = () => {
        const customRollFloat = parseFloat(customRoll)

        if (isNaN(customRollFloat)){
            console.log("Invalid custom roll")
            return
        }
        addToTotal(customRollFloat) 
    };

    const handleCustomTotalChange = (event) => {
        setCustomTotal(event.target.value);
    };

    const overwriteTotalWIthCustomTotal = async () => {
        const customTotalFloat = parseFloat(customTotal)

        if (isNaN(customTotalFloat)){
            console.log("Invalid custom total")
            return
        }
        await setTotalAmount(customTotalFloat)
        await updateTotal(customTotalFloat)
        console.log("Updated total")
    }

    const retrieveTotal = async () =>{
        const docRef = doc(db, "prizes", "total_tracker");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            const cloudAmount = data.amount 
            return setMaxTotalAmount(cloudAmount)
        } else {
            console.log("Missing doc");
            return totalAmount
        }
    }

    const setMaxTotalAmount = async (cloudAmount) => {
        // Set the total amount to the max of the cloud amount and the local amount
        if (cloudAmount > totalAmount) {
            // Update the local amount to the cloud amount
            console.log("Updating local amount to cloud amount")
            console.log(cloudAmount)
            await setTotalAmount(cloudAmount)
        } else {
            // Update the cloud amount to the local amount
            await updateTotal(totalAmount)
        }

        return Math.max(cloudAmount, totalAmount)
    }

    const updateTotal = async (total) => {
        await setDoc(doc(db, "prizes", "total_tracker"), {
            amount: total,
        });
    }


    useEffect(async () => {
        console.log('Component did mount!');

        await retrieveTotal()

        return () => {
          console.log('Component will unmount!');
        };
    }, []);

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => {
                retrieveTotal()
                return false
            }
        },
    };


    return (
        <div className="HabitBox">
            <div className="Homepage-return-button">
                <Link to="/" className="Homepage-link">
                    Home
                </Link>
            </div>
            <div className="HabitBox-title">
                Habit Gambling
            </div>
            {!isSignedIn && (
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            )}
            <div className="HabitBox-total">
                ${totalAmount.toFixed(2)}
                <div className="HabitBox-refresh">
                    <img src={require("./refresh.png")} alt="Refresh icon" onClick={retrieveTotal}/>
                </div>
            </div>
            <div className="HabitBox-multiplier">
                Multiplier - {multiplier}x
            </div>
            <div className="HabitBox-quick-button">
                <div className="HabitBox-quick-button-border" onClick={() => addToTotal(.05)}>
                    $0.05
                </div>
            </div>
            <div className="HabitBox-quick-button">
                <div className="HabitBox-quick-button-border" onClick={() => addToTotal(.10)}>
                    $0.10
                </div>
            </div>
            <div className="HabitBox-quick-button">
                <div className="HabitBox-quick-button-border" onClick={() => addToTotal(.25)}>
                    $0.25
                </div>
            </div>
            <div className="HabitBox-quick-button">
                <div className="HabitBox-quick-button-border" onClick={() => addToTotal(.50)}>
                    $0.50
                </div>
            </div>
            <div className="HabitBox-quick-button">
                <div className="HabitBox-quick-button-border" onClick={() => addToTotal(1.00)}>
                    $1.00
                </div>
            </div>
            <div className="HabitBox-custom-button">
                <input 
                    type="text" 
                    placeholder="$1.40" 
                    value={customRoll}
                    onChange={handleCustomRollChange}
                    className='HabitBox-custom-input'
                />
                <div 
                    className="HabitBox-custom-trigger"
                    onClick={AddToTotalCustomRoll}
                >
                    Roll custom
                </div>
            </div>
            <div className="HabitBox-custom-button">
                <input 
                    type="text" 
                    placeholder="$1014.32" 
                    value={customTotal}
                    onChange={handleCustomTotalChange}
                    className='HabitBox-custom-input'
                />
                <div 
                    className="HabitBox-custom-trigger"
                    onClick={overwriteTotalWIthCustomTotal}
                >
                    Set Total
                </div>
            </div>
        </div>
    );
}

export default HabitGambling;
