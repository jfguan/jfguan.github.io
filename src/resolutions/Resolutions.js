import './Resolutions.css';
import { motion } from 'framer-motion';
import { fadeIn } from './animations';
import checkIcon from './check.svg';
import terminalIcon from './terminal.svg';
import bagIcon from './bag.svg';
import micIcon from './mic.svg';

const hoverFadeOpacity = 0.4;
const hoverFadeDuration = 0.2;

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
      transition={{ duration: 1.5 }}
      class="resolutionsApp"
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
          <div className="logoText">&nbsp;- minimalist habit tracker</div>
        </div>
        <div className="infoOptions">
          {infoItems.map((item) => (
            <InfoOption key={item} text={item} />
          ))}
        </div>
      </div>
      <div className="sideBar">
        <motion.img
          src={checkIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          class="sideBarIcon"
        >
        </motion.img>
        <motion.img
          src={terminalIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          class="sideBarIcon"
        >
        </motion.img>
        <motion.img
          src={bagIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          class="sideBarIcon"
        >
        </motion.img>
        <motion.img
          src={micIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          class="sideBarIcon"
        >
        </motion.img>
      </div>
      <div className="appBody">
      </div>
    </motion.div>
  );
};

export default Resolutions;
