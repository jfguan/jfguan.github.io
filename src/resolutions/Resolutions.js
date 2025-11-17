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
    className="info-option"
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
      className="resolutions-app"
    >
      <div className="top-nav">
        <div className="brand">
          <motion.div
            className="logo"
            whileHover={{ opacity: hoverFadeOpacity }}
            transition={{ duration: hoverFadeDuration }}
          >
            resolutions
          </motion.div>
          <div className="logo-text">&nbsp;- minimalist habit tracker</div>
        </div>
        <div className="info-options">
          {infoItems.map((item) => (
            <InfoOption key={item} text={item} />
          ))}
        </div>
      </div>
      <div className="side-bar">
        <motion.img
          src={checkIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          className="side-bar-icon"
        ></motion.img>
        <motion.img
          src={terminalIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          className="side-bar-icon"
        ></motion.img>
        <motion.img
          src={bagIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          className="side-bar-icon"
        ></motion.img>
        <motion.img
          src={micIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          className="side-bar-icon"
        ></motion.img>
      </div>
      <motion.div
        className="app-body"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.0, duration: 2.0 }}
      >
      <HabitsModule />
      </motion.div>
    </motion.div>
  );
};

const HabitsModule = () => {
  return (
    <div className="habits-module">
        <div className="section-title">habits</div>
        <HabitsIntro />
        <HabitsCreation />
    </div>
  )
}

const HabitsIntro = () => {
  return (
    <div className="intro">
      <div className="section">
        <div className="habits-image-container">
          <img src={flowers} className="habits-image"></img>
        </div>
        <div className="habit-box">
          <div className="quote-box">
            in the eye of cacophony, time slows.
            <br />
            distill the moment to a single step.
          </div>
          <div className="question-box">
            <p className="question-section">are you running too fast?</p>
            <p className="question-section">
              what is the <b>single</b> most important
              <br />
              habit in your life?
            </p>
            <p className="question-section">
              think deeply. <br />
              everything else fades to noise
            </p>
            <p className="question-section">
              this is not a result
              <br />
              this is a process
              <br />
              this is <b>you</b>.
            </p>
            <p className="question-section">
              who are you -<br />
              why do you want this?
            </p>
          </div>
          <div className="button-nav">
            <motion.button
              className="habits-button"
              whileHover={{ opacity: hoverFadeOpacity }}
              transition={{ duration: hoverFadeDuration }}
            >
              continue
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HabitsCreation = () => {
  return (
    <div className="creation">
      <div className="section">
        <div className="habits-image-container-creation">
          <img src={flowers} className="habits-image-creation"></img>
          <div className="suggestions-box">
            <div className="suggestions-title"> 
              guidelines
            </div>
            <div className="suggestions-subtitle"> 
              life is limited
            </div>
            <ul className="suggestions-list">
              <li>enough time and energy?</li>
              <li>sustainable with current commitments?</li>
              <li>willing to trade off other commitments?</li>
              <li>will I do this for many years</li>
            </ul>
            <div className="suggestions-subtitle"> 
              minimally difficult (for now)
            </div>
            <ul className="suggestions-list">
              <li>[optional] under 3 minutes</li>
              <li>can be made any easier without feeling like a waste of time?</li>
            </ul>
            <div className="suggestions-subtitle"> 
              commitment duration is correct
            </div>
            <ul className="suggestions-list">
              <li>new habits take 18 - 254 days to internalize</li>
            </ul>
          </div>
        </div>
        <div className="habit-box">
          <div className="quote-box">
            "I have the happiness to know, that it is a rising and not a setting sun."
            <br />
            - Benjamin Franklin
          </div>
          <div className="question-box">
            <p className="question-section">are you running too fast?</p>
            <p className="question-section">
              what is the <b>single</b> most important
              <br />
              habit in your life?
            </p>
            <p className="question-section">
              think deeply. <br />
              everything else fades to noise
            </p>
            <p className="question-section">
              this is not a result
              <br />
              this is a process
              <br />
              this is <b>you</b>.
            </p>
            <p className="question-section">
              who are you -<br />
              why do you want this?
            </p>
          </div>
          <div className="button-nav">
            <motion.button
              className="habits-button"
              whileHover={{ opacity: hoverFadeOpacity }}
              transition={{ duration: hoverFadeDuration }}
            >
              back
            </motion.button>
            <motion.button
              className="habits-button"
              whileHover={{ opacity: hoverFadeOpacity }}
              transition={{ duration: hoverFadeDuration }}
            >
              create
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Resolutions;
