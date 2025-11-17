import './Resolutions.css';
import { motion } from 'framer-motion';
import { fadeIn } from './animations';
import checkIcon from './check.svg';
import terminalIcon from './terminal.svg';
import bagIcon from './bag.svg';
import micIcon from './mic.svg';
import flowers from './flowers.svg';

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
      transition={{ duration: 2.0 }}
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
        ></motion.img>
        <motion.img
          src={terminalIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          class="sideBarIcon"
        ></motion.img>
        <motion.img
          src={bagIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          class="sideBarIcon"
        ></motion.img>
        <motion.img
          src={micIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          class="sideBarIcon"
        ></motion.img>
      </div>
      <motion.div
        className="appBody"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.0, duration: 2.0 }}
      >
        <Intro />
      </motion.div>
    </motion.div>
  );
};

const Intro = () => {
  return (
    <div className="intro">
      <div className="sectionTitle">habits</div>
      <div className="section">
        <div className="habitsImageContainer">
          <img src={flowers} className="habitsImage"></img>
        </div>
        <div className="habitBox">
          <div className="quoteBox">
            in the eye of cacophony, time slows.
            <br />
            distill the moment to a single step.
          </div>
          <div className="questionBox">
            <p className="questionSection">are you running too fast?</p>
            <p className="questionSection">
              what is the <b>single</b> most important
              <br />
              habit in your life?
            </p>
            <p className="questionSection">
              think deeply. <br />
              everything else fades to noise
            </p>
            <p className="questionSection">
              this is not a result
              <br />
              this is a process
              <br />
              this is <b>you</b>.
            </p>
            <p className="questionSection">
              who are you -<br />
              why do you want this?
            </p>
          </div>
          <motion.button
            className="continueButton"
            whileHover={{ opacity: hoverFadeOpacity }}
            transition={{ duration: hoverFadeDuration }}
          >
            continue
          </motion.button>
        </div>
      </div>
    </div>
  );
};
export default Resolutions;
