import './RateMyBoba.css';
import { Link } from 'react-router-dom';

// import { useState, useEffect } from 'react'

function RateMyBoba() {
//   const timeLimit = 180
//   const [seconds, setSeconds] = useState(timeLimit);

  return (
    <div className="BobaBox">
        <div className="Homepage-return-button">
            <Link to="/" className="BobaBox-link">
                Home
            </Link>
        </div>
        <div className="BobaBox-title">
            Rate My Boba!
        </div>
        <div className="BobaBox-body">
            Click on the better boba shop in a versus showdown! Each vote will determine the
            elo of each boba shop, and the leaderboard will be updated accordingly.
        </div>
        <div className="BobaBox-showdown">
            <div className="BobaBox-contestant">
                <img src={require("./xin_fu_tang.png")} alt="Boba Shop 1"/>
                <div className="BobaBox-elo-rating">
                    Elo Rating: 1200
                </div>
            </div>
            <div className="BobaBox-versus-box">
                VS
            </div>
            <div className="BobaBox-contestant">
                <img src={require("./xin_fu_tang.png")} alt="Boba Shop 2"/>
                <div className="BobaBox-elo-rating">
                    Elo Rating: 1200
                </div>
            </div>
        </div>
        <div className="BobaBox-skip-section">
            <div className="BobaBox-skip">
                Skip
            </div>
        </div>
        <div className="BobaBox-rankings">
            <div className="BobaBox-ranking-title">
                Rankings
            </div>
            <div className="BobaBox-refresh-box">
                <img src={require("./refresh.png")} alt="Refresh icon"/>
            </div>
        </div>
    </div>
  );
}

export default RateMyBoba;
