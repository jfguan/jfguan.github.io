import '../css/Keyboard.css';
import { useState, useEffect } from 'react'
import { evaluate } from 'mathjs'
import classnames from 'classnames'
import { Key } from './Key'

export const Keyboard = ({puzzle, onChar, onDelete, onEnter}) => {
    const operators = new Set(['+', '-', '*', '/', '(', ')'])

    const onValueInput = (value) => {
        console.log(value)
        if (value === 'Enter') {
            onEnter()
        } else if (value === 'Delete') {
            onDelete()
        } else {
            onChar(value)
        }
    }

    useEffect(() => {
        const listener = (e) => {
            if (e.code === 'Enter') {
                onEnter()
            } else if (e.code === 'Backspace') {
                onDelete()
            } else {
                const key = e.key
                const isOperator = operators.has(key)
                const isNumber = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)
                const inPuzzle = puzzle.includes(parseInt(key))
                const isValidInput = (isOperator || (isNumber && inPuzzle))
                // console.log(key)
                if (key.length === 1 && isValidInput) {
                    onChar(key)
                }
            }
        }
        window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [onChar, onDelete, onEnter])

  return (
    <div className="keyboard">
        <div className='numberKeyboard'>
            <Key value={puzzle[0]} onValueInput={onValueInput} classes={classnames('numberKey')}/>
            <Key value={puzzle[1]} onValueInput={onValueInput} classes={classnames('numberKey')}/>
            <Key value={puzzle[2]} onValueInput={onValueInput} classes={classnames('numberKey')}/>
            <Key value={puzzle[3]} onValueInput={onValueInput} classes={classnames('numberKey')}/>
        </div>        
        <div className='operatorKeyboard'>
            <Key value='+' onValueInput={onValueInput} classes={classnames('operatorKey num1')}/>
            <Key value='-' onValueInput={onValueInput} classes={classnames('operatorKey num2')}/>
            <Key value='*' onValueInput={onValueInput} classes={classnames('operatorKey num3')}/>
            <Key value='/' onValueInput={onValueInput} classes={classnames('operatorKey num4')}/>
            <Key value='(' onValueInput={onValueInput} classes={classnames('operatorKey num5')}/>
            <Key value=')' onValueInput={onValueInput} classes={classnames('operatorKey num5')}/>
        </div>        
        <div className='modifierKeys'>
            <Key value='Enter' onValueInput={onValueInput} classes={classnames('modifierKey')}/>
            <Key value='Delete' onValueInput={onValueInput} classes={classnames('modifierKey')}/>
        </div>        
    </div>
  );
}