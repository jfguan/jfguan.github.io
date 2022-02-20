import { IoMdClose } from 'react-icons/io'
import { Modal, Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShareAlt, AiOutlineLink } from 'react-icons/ai'
import { shareStatus, shareWebsite } from '../lib/Share'
import '../css/AboutModal.css'
import '../css/HelpModal.css'
import '../css/WinModal.css'

export const WinModal = ({ isOpen, handleClose, handleShare, completionTimeMs }) => {
  return (
      <Modal show={isOpen} onHide={handleClose} className="modal">
        <Modal.Body>
            <div className='modalHeader'>
                <div className='modalTitle'>
                    You solved today's puzzle in:
                </div>
                <IoMdClose 
                    className='modalCloseButton'
                    onClick={handleClose}
                />
            </div>
            <div className='timerText'>
                {(completionTimeMs / 1000).toLocaleString(undefined, { maximumFractionDigits: 2})} seconds!
            </div>
            <div className='buttonBox'>
                <Button variant="success" className='linkButton' onClick={() => {
                        shareStatus(completionTimeMs)
                        handleShare()
                    }}
                >
                    Share!
                    <AiOutlineShareAlt/>
                </Button>{' '}
                <Button variant="primary" className='linkButton' onClick={() => {
                        shareWebsite()
                        handleShare()
                    }}
                >
                    Website Link
                    <AiOutlineLink/>
                </Button>{' '}
            </div>
        </Modal.Body>
      </Modal>
  )
}
