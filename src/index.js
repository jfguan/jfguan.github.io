import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './Homepage';
import RateMyBoba from './ratemyboba/RateMyBoba';
import HabitGambling from './habit_gambling/HabitGambling';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/24Game",
    element: <Game />,
  },
  {
    path: "/RateMyBoba",
    element: <RateMyBoba />,
  },
  {
    path: "/HabitGambling",
    element: <HabitGambling />,
  }
]);

ReactDOM.render(
  <React.StrictMode>
    {/* <Homepage /> */}
    {/* <Game /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
