import { PUZZLES } from './PuzzleList'

export const getPuzzleOfDay = () => {
    // Feb 20, 2022 Game Epoch
    const epochMs = 1645333200000
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)

    return {
        puzzle: PUZZLES[index],
        puzzleIndex: index
    }
}

export const { puzzle, puzzleIndex } = getPuzzleOfDay()