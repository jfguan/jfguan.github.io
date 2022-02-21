import { IoMdClose } from 'react-icons/io'
import { Modal, Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShareAlt, AiOutlineLink } from 'react-icons/ai'
import { shareStatus, shareWebsite } from '../lib/Share'
import '../css/AboutModal.css'
import '../css/HelpModal.css'
import '../css/WinModal.css'

export const WinModal = ({ isOpen, handleClose, handleShare, puzzle, score, completedPuzzles, completionTimes }) => {
  return (
      <Modal show={isOpen} onHide={handleClose} className="modal">
        <Modal.Body>
            <div className='modalHeader'>
                <div className='modalTitle'>
                    Time's up! You solved:
                </div>
                <IoMdClose 
                    className='modalCloseButton'
                    onClick={handleClose}
                />
            </div>
            <div className='scoreText'>
                {score} puzzles
            </div>
            <div className='successBox'>
                <div className='pusheenBox'>
                    <img 
                        src='https://media.giphy.com/media/04b8NVK7cTY61NIiz7/giphy.gif'
                        className='pusheenImg'
                    />
                </div>
                <div className='buttonBox'>
                    <Button variant="success" className='linkButton shareButton' onClick={() => {
                            shareStatus(puzzle, score, completedPuzzles, completionTimes)
                            handleShare()
                        }}
                    >

                        Share!
                        <AiOutlineShareAlt/>
                    </Button>{' '}
                    <Button variant="primary" className='linkButton websiteButton' onClick={() => {
                            shareWebsite()
                            handleShare()
                        }}
                    >
                        Website Link
                        <AiOutlineLink/>
                    </Button>{' '}
                </div>
            </div>
        </Modal.Body>
      </Modal>
  )
}
