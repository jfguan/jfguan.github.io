import './Homepage.css';
import { Link } from 'react-router-dom';

// import { useState, useEffect } from 'react'

function Homepage() {
  return (
    <div className="Homepage">
        <div className="Homepage-title">
            jfguan - personal projects
        </div>
        <div className="Homepage-body">
            Jeff Guan is a software engineer currently in NYC. This website is a simple storage of a few personal projects
        </div>
        <div className="Homepage-subtitle">
            <Link to="/RateMyBoba" className="Homepage-link">
                Rate My Boba
            </Link>
        </div>
        <div className="Homepage-body">
            A boba rating website, users can vote on their favorite boba shops,
            in a elo based match structure
        </div>
        <div className="Homepage-subtitle">
            <Link to="/HabitGambling" className="Homepage-link">
                Habit Gambling
            </Link>
        </div>
        <div className="Homepage-body">
            Earn money by completing my habits, with a random multiplier on each reward
        </div>
        <div className="Homepage-subtitle">
            <Link to="/24Game" className="Homepage-link">
                24 Game
            </Link>
        </div>
        <div className="Homepage-body">
            A classic math puzzle game. Given 4 numbers, use any combination of addition, subtraction, multiplication, and division to get to 24.
            Structured in a similar style to Wordle, the game is timed and you have 3 minutes to solve as many puzzles as you can.
        </div>
        <div className="Homepage-body">
            Earn money by completing my habits, with a random multiplier on each reward
        </div>
        <div className="Homepage-subtitle">
            <Link to="/Resolutions" className="Homepage-link">
                Resolutions
            </Link>
        </div>
        <div className="Homepage-body">
            A minimalist and opinionated habit tracker
        </div>
    </div>
  );
}

export default Homepage;
