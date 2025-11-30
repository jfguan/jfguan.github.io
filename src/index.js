import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './Homepage';
import RateMyBoba from './ratemyboba/RateMyBoba';
import Game from './Game';
import HabitGambling from './habit_gambling/HabitGambling';
import Resolutions from './resolutions/Resolutions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/24game',
    element: <Game />,
  },
  {
    path: '/ratemyboba',
    element: <RateMyBoba />,
  },
  {
    path: '/habitgambling',
    element: <HabitGambling />,
  },
  {
    path: '/resolutions',
    element: <Resolutions />,
    children: [
      {
        path: 'account',
        element: <Resolutions />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    {/* <Homepage /> */}
    {/* <Game /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
