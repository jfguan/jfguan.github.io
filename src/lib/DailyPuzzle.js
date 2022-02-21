import { PUZZLES } from './PuzzleList'
import { getDate } from './Share'

var seedrandom = require('seedrandom');
const date = getDate()
seedrandom(date, { global: true });
// console.log(Math.random())
// console.log(Math.random())
// console.log(Math.random())
// console.log(Math.random())

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const getNextPuzzle = () => {
    // // Feb 20, 2022 Game Epoch
    // const epochMs = 1645333200000
    // const now = Date.now()
    // const msInDay = 86400000
    // const index = Math.floor((now - epochMs) / msInDay)

    const index = getRandomInt(PUZZLES.length)
    // console.log(index)

    return PUZZLES[index]
}