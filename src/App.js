import './App.css';
import { useState, useEffect } from 'react'
import {AiOutlineInfoCircle, AiOutlineQuestionCircle} from 'react-icons/ai'
import InputBox from './InputBox';
import { evaluate } from 'mathjs';
import { Keyboard } from './components/Keyboard';
import { AboutModal } from './components/AboutModal';
import { HelpModal } from './components/HelpModal';
import { WinModal } from './components/WinModal';
import { Alert } from './components/Alert';
import { puzzle, puzzleIndex} from './lib/DailyPuzzle'

function App() {
  const [startTime, setStartTime] = useState(0)
  const [completionTimeMs, setCompletionTimeMs] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentOutput, setCurrentOutput] = useState('0')
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(true)
  const [isInvalidEquation, setIsInvalidEquation] = useState(false)
  const [isInvalidCombo, setIsInvalidCombo] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)

  const closeHelpModal = () =>{
    setIsHelpModalOpen(false)
    setStartTime(Date.now())
  }

  const onChar = (value) => {
    if (currentGuess.length < 14) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
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
        console.log("Game won!")
        setCompletionTimeMs(Date.now() - startTime)
        setIsWinModalOpen(true)
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
        message="Results copied to clipboard!"
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
      <InputBox 
        currentGuess={currentGuess}
      />
      <div className="EquationOutput">
        {currentOutput}
      </div>
      <Keyboard 
        puzzle={puzzle}
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
        completionTimeMs={completionTimeMs}
      />
    </div>
  );
}

export default App;
