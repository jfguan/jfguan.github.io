import './Resolutions.css';
import { motion } from "framer-motion"
import { fadeIn } from './animations';

const hoverFadeOpacity = .4;
const hoverFadeDuration = .3;

const InfoOption = ({ text }) => (
    <motion.div
        className="infoOption"
        whileHover={{ opacity: hoverFadeOpacity }}
        transition={{ duration: hoverFadeDuration }}
    >
        {text}
    </motion.div>
);

const Resolutions = () => {
    const infoItems = ['read this', 'guide', 'account'];

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
                    <motion.div
                        className="logo"
                        whileHover={{ opacity: hoverFadeOpacity }}
                        transition={{ duration: hoverFadeDuration }}
                    >
                        resolutions
                    </motion.div>
                    <div className="logoText">
                        &nbsp;- minimalist habit tracker
                    </div>
                </div>
                <div className="infoOptions">
                    {infoItems.map((item) => (
                        <InfoOption key={item} text={item} />
                    ))}
                </div>
            </div>
            <div className="appBody">
            </div>
        </motion.div>
    )
}

export default Resolutions;
