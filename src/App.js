import './App.css';
import { useState, useEffect } from 'react'
import {AiOutlineInfoCircle, AiOutlineQuestionCircle} from 'react-icons/ai'
import { evaluate } from 'mathjs';
import { Alert } from './components/Alert';
import { GameBox } from './components/GameBox';
import InputBox from './InputBox';
import { Keyboard } from './components/Keyboard';
import { AboutModal } from './components/AboutModal';
import { HelpModal } from './components/HelpModal';
import { WinModal } from './components/WinModal';
import { getNextPuzzle } from './lib/DailyPuzzle'

function App() {
  const timeLimit = 180
  const [seconds, setSeconds] = useState(timeLimit);
  const [puzzle, setPuzzle] = useState(getNextPuzzle);
  const [completedPuzzles, setCompletedPuzzles] = useState([])
  const [startTime, setStartTime] = useState(0)
  const [completionTimes, setCompletionTimes] = useState([])
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentGuessArr, setCurrentGuessArr] = useState([])
  const [currentOutput, setCurrentOutput] = useState('0')
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(true)
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false)
  const [isInvalidEquation, setIsInvalidEquation] = useState(false)
  const [isInvalidCombo, setIsInvalidCombo] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(timeLimit);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0){
          setSeconds(seconds => seconds - 1);
        }
        else{
          // game is over
          setIsWinModalOpen(true)
          setIsActive(false)
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const closeHelpModal = () =>{
    setIsHelpModalOpen(false)
    setStartTime(Date.now())
    setSeconds(timeLimit)
    setIsActive(true)
  }

  const onChar = (value) => {
    if (currentGuess.length < 15) {
      setCurrentGuess(`${currentGuess}${value}`)
      setCurrentGuessArr(currentGuessArr => [...currentGuessArr, value]);
    }
  }

  const onDelete = () => {
    const cutGuessArr = currentGuessArr.slice(0, -1)
    setCurrentGuessArr(cutGuessArr)
    setCurrentGuess(cutGuessArr.join(''))
  }

  const onEnter = () => {
    if (!eachNumberUsedOnce(currentGuess, puzzle)) {
      setIsInvalidCombo(true)
      return setTimeout(() => {
        setIsInvalidCombo(false)
      }, 2000)
    }

    try {
      const equationOutput = evaluate(currentGuess)

      setCurrentOutput(equationOutput)

      if (equationOutput === 24){
        console.log("Equation solved!")
        setScore(score => score + 1)
        setIsPuzzleSolved(true)
        setTimeout(() => {
          setIsPuzzleSolved(false)
        }, 1000)
        setCompletedPuzzles(completedPuzzles => [...completedPuzzles, puzzle]);

        const newCompletionTime = Date.now() - startTime
        console.log(newCompletionTime)
        setCompletionTimes(completionTimes => [...completionTimes, newCompletionTime]);

        // Reset
        setStartTime(Date.now())
        setCurrentGuess('')
        setCurrentGuessArr([])
        setCurrentOutput(0)

        setPuzzle(getNextPuzzle())
        return 
      }
    } catch (error) {
      console.log(error)
      setIsInvalidEquation(true)
      return setTimeout(() => {
        setIsInvalidEquation(false)
      }, 2000)
    }

  }

  const eachNumberUsedOnce = (currentGuess, puzzle) => {
    const guessNumbers = sortStr(currentGuess.replace(/\D/g,''));
    const puzzleNumbers = sortStr(puzzle.join(''));

    return guessNumbers === puzzleNumbers
  }

  function sortStr(str) {
    return [...str].sort((a, b) => a.localeCompare(b)).join("");
  }


  return (
    <div className="App">
      <Alert message="Invalid equation" isOpen={isInvalidEquation} />
      <Alert message="Use each number once" isOpen={isInvalidCombo} />
      <Alert
        message="Puzzle solved!"
        isOpen={isPuzzleSolved}
        variant="success"
      />
      <Alert
        message="Copied to clipboard!"
        isOpen={shareComplete}
        variant="success"
      />
      <div className='Header'>
        <div className='Title'>
          24
        </div>
        <div className='IconBox'>
          <AiOutlineInfoCircle 
            onClick={() => setIsAboutModalOpen(true)}
          />
          <AiOutlineQuestionCircle 
            onClick={() => setIsHelpModalOpen(true)}
          />
        </div>
      </div>
      <GameBox 
        seconds={seconds}
        score={score}
      />
      <div className='mathBox'>
        <InputBox 
          currentGuess={currentGuess}
        />
        <div className="EquationOutput">
          {currentOutput}
        </div>
      </div>
      <Keyboard 
        puzzle={puzzle}
        currentGuess={currentGuess}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
      <HelpModal
        isOpen={isHelpModalOpen}
        handleClose={closeHelpModal}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
        puzzle={puzzle}
        score={score}
        completedPuzzles={completedPuzzles}
        completionTimes={completionTimes}
      />
    </div>
  );
}

export default App;
