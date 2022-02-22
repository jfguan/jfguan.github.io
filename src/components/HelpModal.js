
import { IoMdClose } from 'react-icons/io'
import { Modal } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/AboutModal.css'
import '../css/HelpModal.css'

export const HelpModal = ({ isOpen, handleClose }) => {
  return (
      <Modal show={isOpen} onHide={handleClose} className="modal">
        <Modal.Body>
            <div className='modalHeader'>
                <div className='modalTitle'>
                    How to play
                </div>
                <IoMdClose 
                    className='modalCloseButton'
                    onClick={handleClose}
                />
            </div>
            <div className='helpModalText'>
                Make 24 with only four numbers!
            </div>
            <ul className='pointList'>
                <li className='bulletPoint'>
                    Solve as many puzzles as you can within the time limit!
                </li>
                <li>
                    Each puzzle has 4 numbers that must <b>be used once each</b>. 
                </li> 
                <li>
                    Operators can be used multiple times.
                </li> 
                <li>
                    Order of operations applies.
                </li> 
                <li>
                    Everyone has the same order of puzzles, which resets at midnight.
                </li>
            </ul>
            <div className='gameExample'>
                <div className='numberKey'> 1 </div>
                <div className='numberKey'> 4 </div>
                <div className='numberKey'> 1 </div>
                <div className='numberKey'> 5 </div>
            </div>
            <div className='exampleText'>
                In this example, a solution could be:
                <br/>
                (1 + 4) * 5 - 1 = 24
                <br/>
                or
                <br/>
                (1 + 5) * 4 * 1 = 24
            </div>
        </Modal.Body>
      </Modal>
  )
}
