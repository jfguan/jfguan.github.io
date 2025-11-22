import './Resolutions.css';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, expandCollapse } from './animations';
import checkIcon from './check.svg';
import greencheckIcon from './green_check.svg';
import squareIcon from './square.svg';
import calendarIcon from './calendar.svg';
import bagIcon from './bag.svg';
import micIcon from './mic.svg';
import terminalIcon from './terminal.svg';
import flowers from './flowers.svg';
import leftArrow from './left_arrow.svg';
import rightArrow from './right_arrow.svg';
import downArrow from './down_arrow.svg';

const hoverFadeOpacity = 0.4;
const hoverFadeDuration = 0.2;
const moduleFadeDuration = 2.0;

// Calendar constants
const MAX_DAYS_IN_MONTH = 31;
const CALENDAR_ANIMATION_DURATION = 0.3;
const ARROW_COLLAPSED_ROTATION = -90;
const ARROW_EXPANDED_ROTATION = 0;
const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

const InfoOption = ({ text }) => (
  <motion.div
    className="info-option"
    whileHover={{ opacity: hoverFadeOpacity }}
    transition={{ duration: hoverFadeDuration }}
  >
    {text}
  </motion.div>
);

const HabitTextInput = ({ placeholder = 'placeholder', maxLength = '81' }) => (
  <textarea
    className="habit-input"
    placeholder={placeholder}
    maxLength={maxLength}
    rows="3"
  />
);

const HabitsModule = () => {
  const [habitsState, setHabitsState] = React.useState('intro');

  return (
    <div className="habits-module">
      <div className="section-title">habits</div>
      <AnimatePresence mode="wait">
        {habitsState === 'intro' && (
          <HabitsIntro key="intro" setHabitsState={setHabitsState} />
        )}
        {habitsState === 'creation' && (
          <HabitsCreation key="creation" setHabitsState={setHabitsState} />
        )}
        {habitsState === 'view' && (
          <HabitsView key="view" setHabitsState={setHabitsState} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Resolutions = () => {
  const infoItems = ['read this', 'guide', 'account'];
  const habits = [];

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
          src={calendarIcon}
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
        <motion.img
          src={terminalIcon}
          whileHover={{ opacity: hoverFadeOpacity }}
          transition={{ duration: hoverFadeDuration }}
          className="side-bar-icon"
        ></motion.img>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="app-body"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0, duration: 1.0 }}
        >
          <HabitsModule />
          {habits.length > 0 && <CalendarView />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const HabitsIntro = ({ setHabitsState }) => {
  return (
    <motion.div
      className="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: moduleFadeDuration }}
    >
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
          <div className="habit-content-box">
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
              who are you
              <br />
              why do you want this?
            </p>
          </div>
          <div className="button-nav">
            {/* empty div, to maintain two button pattern */}
            <div />
            <motion.button
              className="habits-button"
              whileHover={{ opacity: hoverFadeOpacity }}
              transition={{ duration: hoverFadeDuration }}
              onClick={() => setHabitsState('creation')}
            >
              continue
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HabitsCreation = ({ setHabitsState }) => {
  return (
    <motion.div
      className="creation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: moduleFadeDuration }}
    >
      <div className="section">
        <div className="habits-image-container-creation">
          <img src={flowers} className="habits-image-creation"></img>
          <div className="suggestions-box">
            <div className="suggestions-title">guidelines</div>
            <div className="suggestions-subtitle">life is limited</div>
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
              <li>
                can be made any easier without feeling like a waste of time?
              </li>
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
            "I have the happiness to know, that it is a rising and not a setting
            sun."
            <br />- Benjamin Franklin
          </div>
          <div className="habit-content-box">
            <p className="habit-prompt">I am</p>
            <HabitTextInput placeholder="energetic and alive" />
            <p className="habit-prompt">I hate</p>
            <HabitTextInput placeholder="feeling tired and mind fog" />
            <p className="habit-prompt">I love</p>
            <HabitTextInput placeholder="how clear the world feels when I sleep well" />
            <p className="habit-prompt">I will</p>
            <HabitTextInput placeholder="sleep every day at 10pm" />
            <p className="habit-prompt">
              for
              <input
                inputMode="numberic"
                pattern="[0-9]*"
                className="habit-days-input"
                placeholder="90"
                maxLength="4"
              />
              days
            </p>
          </div>
          <div className="button-nav">
            <motion.button
              className="habits-button"
              whileHover={{ opacity: hoverFadeOpacity }}
              transition={{ duration: hoverFadeDuration }}
              onClick={() => setHabitsState('intro')}
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
    </motion.div>
  );
};

const HabitsView = ({ setHabitsState }) => {
  const [isChecked1, setIsChecked1] = React.useState(true);
  const [isChecked2, setIsChecked2] = React.useState(false);

  return (
    <motion.div
      className="view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: moduleFadeDuration }}
    >
      <div className="section">
        <div className="habits-view">
          <div className="habits-view-container">
            <div className="date-selector">
              <motion.img
                src={leftArrow}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                class="date-selector-arrow"
              ></motion.img>
              <div className="date-selector-inputs">
                <input
                  inputMode="numberic"
                  pattern="[0-9]*"
                  className="date-selector-input day-month-len"
                  value="11"
                  maxLength="2"
                />
                -
                <input
                  inputMode="numberic"
                  pattern="[0-9]*"
                  className="date-selector-input day-month-len"
                  value="21"
                  maxLength="2"
                />
                -
                <input
                  inputMode="numberic"
                  pattern="[0-9]*"
                  className="date-selector-input year-len"
                  value="2025"
                  maxLength="4"
                />
              </div>
              <motion.img
                src={rightArrow}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                class="date-selector-arrow"
              ></motion.img>
            </div>
            <div className="habit-container container-focused">
              <div className="habit-snippet-box">
                <div className="habit-snippet-prompt">I will</div>
                <div className="habit-snippet-statement">journal every day</div>
              </div>
              <div className="habit-health-box">
                <div className="habit-snippet-prompt">health</div>
                <div className="habit-health-percentage">33%</div>
              </div>
              <motion.img
                src={isChecked1 ? greencheckIcon : squareIcon}
                onClick={() => setIsChecked1(!isChecked1)}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                class={isChecked1 ? 'habit-check' : 'habit-square'}
              />
            </div>
            <div className="habit-container">
              <div className="habit-snippet-box">
                <div className="habit-snippet-prompt">I will</div>
                <div className="habit-snippet-statement">journal every day</div>
              </div>
              <div className="habit-health-box">
                <div className="habit-snippet-prompt">health</div>
                <div className="habit-health-percentage">0%</div>
              </div>
              <motion.img
                src={isChecked2 ? greencheckIcon : squareIcon}
                onClick={() => setIsChecked2(!isChecked2)}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                class={isChecked2 ? 'habit-check' : 'habit-square'}
              />
            </div>
          </div>
          <button className="habits-view-new-habit-button">new habit</button>
        </div>
        <div className="habit-box">
          <div className="quote-box">
            "I have the happiness to know, that it is a rising and not a setting
            sun."
            <br />- Benjamin Franklin
          </div>
          <div className="habit-content-box">
            <p className="habit-prompt">I am</p>
            <HabitTextInput placeholder="energetic and alive" />
            <p className="habit-prompt">I hate</p>
            <HabitTextInput placeholder="feeling tired and mind fog" />
            <p className="habit-prompt">I love</p>
            <HabitTextInput placeholder="how clear the world feels when I sleep well" />
            <p className="habit-prompt">I will</p>
            <HabitTextInput placeholder="sleep every day at 10pm" />
            <p className="habit-prompt">
              for
              <input
                inputMode="numberic"
                pattern="[0-9]*"
                className="habit-days-input"
                placeholder="90"
                maxLength="4"
              />
              days
            </p>
          </div>
          <div className="button-nav">
            <motion.button
              className="habits-button"
              whileHover={{ opacity: hoverFadeOpacity }}
              transition={{ duration: hoverFadeDuration }}
            >
              delete
            </motion.button>
            <motion.button
              className="habits-button"
              whileHover={{ opacity: hoverFadeOpacity }}
              transition={{ duration: hoverFadeDuration }}
            >
              save
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CalendarView = () => {
  const year = new Date().getFullYear();
  const [filledDays, setFilledDays] = React.useState({});
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(true);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const createDayKey = (month, day) => `${month}-${day}`;

  const toggleDay = (month, day) => {
    const key = createDayKey(month, day);
    setFilledDays((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const headerDays = Array.from({ length: MAX_DAYS_IN_MONTH }, (_, i) => i + 1);
  const monthsWithDays = MONTHS.map((month, monthIndex) => ({
    name: month,
    index: monthIndex,
    days: Array.from(
      { length: getDaysInMonth(monthIndex, year) },
      (_, i) => i + 1
    ),
  }));

  return (
    <div className="calendar">
      <div className="section-title">calendar</div>
      <div className="section">
        <div className="calendar-title-box">
          <motion.img
            src={downArrow}
            onClick={toggleCalendar}
            whileHover={{ opacity: hoverFadeOpacity }}
            animate={{
              rotate: isCalendarOpen
                ? ARROW_EXPANDED_ROTATION
                : ARROW_COLLAPSED_ROTATION,
            }}
            transition={{ duration: CALENDAR_ANIMATION_DURATION }}
            className="calendar-title-arrow"
          />
          <div className="calendar-title-text">
            I will sleep every day at 10pm
          </div>
        </div>
        <AnimatePresence>
          {isCalendarOpen && (
            <motion.div
              className="calendar-grid"
              initial={expandCollapse.hidden}
              animate={expandCollapse.visible}
              exit={expandCollapse.hidden}
              transition={{
                opacity: { duration: CALENDAR_ANIMATION_DURATION },
                height: {
                  duration: CALENDAR_ANIMATION_DURATION,
                },
              }}
            >
              <div className="calendar-header">
                <div className="calendar-header-year">{year}</div>
                {headerDays.map((day) => (
                  <div key={day} className="calendar-header-day">
                    {String(day).padStart(2, '0')}
                  </div>
                ))}
              </div>
              {monthsWithDays.map(({ name, index, days }) => (
                <div key={name} className="calendar-month">
                  <div className="calendar-month-title">{name}</div>
                  {days.map((day) => {
                    const key = createDayKey(index, day);
                    return (
                      <div
                        key={day}
                        className={`calendar-day ${filledDays[key] ? 'filled' : ''}`}
                        onClick={() => toggleDay(index, day)}
                      />
                    );
                  })}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Resolutions;
