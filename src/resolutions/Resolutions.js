import './Resolutions.css';
import { motion } from "framer-motion"
import { fadeIn } from './animations'; 

const Resolutions = () => {
    return (
        <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="resolutionsBox"
            transition={{duration: 1.5}}
        >
            <div className="topNav">
                <div className="brand">
                    <p className="logo">
                        resolutions
                    </p>
                    <p className="logoText">
                        - an opinionated and minimalist habit tracker
                    </p>
                </div>
                <div className="navOptions">
                </div>
            </div>
            <div className="appBody">
            </div>
        </motion.div>
    )
}

export default Resolutions;
