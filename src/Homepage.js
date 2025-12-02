import './Homepage.css';
import { Link } from 'react-router-dom';

// import { useState, useEffect } from 'react'

function Homepage() {
  return (
    <div className="Homepage">
      <div className="Homepage-title">jfguan - personal projects</div>
      <div className="Homepage-body">
        Jeff Guan is a software engineer currently in NYC. This website is a
        simple storage of a few personal projects
      </div>
      <div className="Homepage-subtitle">
        <Link to="/ratemyboba" className="Homepage-link">
          Rate My Boba
        </Link>
      </div>
      <div className="Homepage-body">
        A boba rating website, users can vote on their favorite boba shops, in a
        elo based match structure
      </div>
      <div className="Homepage-subtitle">
        <Link to="/24game" className="Homepage-link">
          24 Game
        </Link>
      </div>
      <div className="Homepage-body">
        A classic math puzzle game. Given 4 numbers, use any combination of
        addition, subtraction, multiplication, and division to get to 24.
        Structured in a similar style to Wordle, the game is timed and you have
        3 minutes to solve as many puzzles as you can.
      </div>

      <div className="Homepage-subtitle">
        <Link to="/resolutions" className="Homepage-link">
          Resolutions
        </Link>
      </div>
      <div className="Homepage-body">
        A minimalist and opinionated habit tracker, designed from scratch as an
        first time learning experience in design.
      </div>
    </div>
  );
}

export default Homepage;
