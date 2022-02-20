import { IoMdClose } from 'react-icons/io'
import { Modal } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/AboutModal.css'

export const AboutModal = ({ isOpen, handleClose }) => {
  return (
      <Modal show={isOpen} onHide={handleClose} className="modal">
        <Modal.Body>
            <div className='modalHeader'>
                <div className='modalTitle'>
                    About
                </div>
                <IoMdClose 
                    className='modalCloseButton'
                    onClick={handleClose}
                />
            </div>
            <div className='modalText'>
                This is a reactJS version of a favorite childhood game :)
                Inspired by the game 24 and Wordle, credit to primel for its logic.
                Thanks for playing!
            </div>
        </Modal.Body>
      </Modal>
  )
}
