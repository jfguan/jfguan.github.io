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
const moduleFadeDuration = 1.5;

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

const createHabit = (
  identityText,
  loveText,
  hateText,
  actionText,
  duration
) => ({
  id: crypto.randomUUID(),
  identityText,
  loveText,
  hateText,
  actionText,
  duration,
});

const InfoOption = ({ text }) => (
  <motion.div
    className="info-option"
    whileHover={{ opacity: hoverFadeOpacity }}
    transition={{ duration: hoverFadeDuration }}
  >
    {text}
  </motion.div>
);

const HabitTextInput = ({
  placeholder = '',
  maxLength = '81',
  value,
  onChange,
}) => (
  <textarea
    className="habit-input"
    placeholder={placeholder}
    maxLength={maxLength}
    value={value}
    onChange={onChange}
    rows="3"
  />
);

const HabitsModule = ({ habits, setHabits }) => {
  const [habitModuleState, setHabitsState] = React.useState('intro');

  return (
    <div className="habits-module">
      <div className="section-title">habits</div>
      <AnimatePresence mode="wait">
        {habitModuleState === 'intro' && (
          <HabitsIntro key="intro" setHabitsState={setHabitsState} />
        )}
        {habitModuleState === 'creation' && (
          <HabitsCreation
            key="creation"
            setHabitsState={setHabitsState}
            habits={habits}
            setHabits={setHabits}
          />
        )}
        {habitModuleState === 'view' && (
          <HabitsView
            key="view"
            setHabitsState={setHabitsState}
            habits={habits}
            setHabits={setHabits}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Resolutions = () => {
  const infoItems = ['read this', 'guide', 'account'];
  const [habits, setHabits] = React.useState([]);

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
      {habits.length > 0 && (
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
      )}
      <AnimatePresence mode="wait">
        <motion.div
          className="app-body"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0, duration: 1.0 }}
        >
          <HabitsModule habits={habits} setHabits={setHabits} />
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

const HabitsCreation = ({ setHabitsState, habits, setHabits }) => {
  const [identityText, setIdentityText] = React.useState('');
  const [loveText, setLoveText] = React.useState('');
  const [hateText, setHateText] = React.useState('');
  const [actionText, setActionText] = React.useState('');
  const [duration, setDuration] = React.useState('90');

  const handleCreate = () => {
    const newHabit = createHabit(
      identityText,
      loveText,
      hateText,
      actionText,
      parseInt(duration) || 90
    );
    setHabits([...habits, newHabit]);
    setHabitsState('view');
  };

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
              <li>do I have enough time and energy?</li>
              <li>is this sustainable with my commitments?</li>
              <li>am I willing to trade off other commitments?</li>
              <li>will I keep this for many years?</li>
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
            <HabitTextInput
              placeholder="energetic and alive"
              value={identityText}
              onChange={(e) => setIdentityText(e.target.value)}
            />
            <p className="habit-prompt">I love</p>
            <HabitTextInput
              placeholder="how clear the world feels when I sleep well"
              value={loveText}
              onChange={(e) => setLoveText(e.target.value)}
            />
            <p className="habit-prompt">I hate</p>
            <HabitTextInput
              placeholder="feeling tired and mind fog"
              value={hateText}
              onChange={(e) => setHateText(e.target.value)}
            />
            <p className="habit-prompt">I will</p>
            <HabitTextInput
              placeholder="sleep every day at 10pm"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
            />
            <p className="habit-prompt">
              for
              <input
                inputMode="numberic"
                pattern="[0-9]*"
                className="habit-days-input"
                maxLength="3"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
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
              onClick={handleCreate}
            >
              create
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HabitsView = ({ setHabitsState, habits, setHabits }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const dayRef = React.useRef(null);
  const monthRef = React.useRef(null);
  const yearRef = React.useRef(null);

  const formatDatePart = (value, digits = 2) =>
    String(value).padStart(digits, '0');

  const updateDateInputs = (date) => {
    if (dayRef.current && monthRef.current && yearRef.current) {
      dayRef.current.value = formatDatePart(date.getDate());
      monthRef.current.value = formatDatePart(date.getMonth() + 1);
      yearRef.current.value = date.getFullYear();
    }
  };

  React.useEffect(() => {
    updateDateInputs(selectedDate);
  }, [selectedDate]);

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate.getTime() - 86400000);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate.getTime() + 86400000);
    setSelectedDate(newDate);
  };

  const handleDateInputBlur = () => {
    const day = parseInt(dayRef.current?.value) || selectedDate.getDate();
    const month =
      parseInt(monthRef.current?.value) || selectedDate.getMonth() + 1;
    const year = parseInt(yearRef.current?.value) || selectedDate.getFullYear();
    const newDate = new Date(year, month - 1, day);
    setSelectedDate(newDate);
  };

  const day = formatDatePart(selectedDate.getDate());
  const month = formatDatePart(selectedDate.getMonth() + 1);
  const year = selectedDate.getFullYear();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectedHabit = habits[selectedIndex];

  // Local state for editing
  const [editIdentityText, setEditIdentityText] = React.useState(
    selectedHabit.identityText
  );
  const [editLoveText, setEditLoveText] = React.useState(
    selectedHabit.loveText
  );
  const [editHateText, setEditHateText] = React.useState(
    selectedHabit.hateText
  );
  const [editActionText, setEditActionText] = React.useState(
    selectedHabit.actionText
  );
  const [editDuration, setEditDuration] = React.useState(
    selectedHabit.duration
  );

  // Update edit state when selected index changes
  React.useEffect(() => {
    const habit = habits[selectedIndex];
    setEditIdentityText(habit.identityText);
    setEditLoveText(habit.loveText);
    setEditHateText(habit.hateText);
    setEditActionText(habit.actionText);
    setEditDuration(habit.duration);
  }, [selectedIndex, habits]);

  const handleSave = () => {
    const updatedHabits = habits.map((habit, index) =>
      index === selectedIndex
        ? {
            ...habit,
            identityText: editIdentityText,
            loveText: editLoveText,
            hateText: editHateText,
            actionText: editActionText,
            duration: parseInt(editDuration),
          }
        : habit
    );
    setHabits(updatedHabits);
  };

  const handleDelete = () => {
    const updatedHabits = habits.filter((_, index) => index !== selectedIndex);
    setHabits(updatedHabits);

    if (updatedHabits.length === 0) {
      setHabitsState('intro');
      return;
    }

    const newIndex = Math.max(0, selectedIndex - 1);
    setSelectedIndex(newIndex);
  };

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
                onClick={handlePreviousDay}
              ></motion.img>
              <div className="date-selector-inputs">
                <input
                  ref={monthRef}
                  inputMode="numberic"
                  pattern="[0-9]*"
                  className="date-selector-input day-month-len"
                  defaultValue={month}
                  maxLength="2"
                  onBlur={handleDateInputBlur}
                />
                -
                <input
                  ref={dayRef}
                  inputMode="numberic"
                  pattern="[0-9]*"
                  className="date-selector-input day-month-len"
                  defaultValue={day}
                  maxLength="2"
                  onBlur={handleDateInputBlur}
                />
                -
                <input
                  ref={yearRef}
                  inputMode="numberic"
                  pattern="[0-9]*"
                  className="date-selector-input year-len"
                  defaultValue={year}
                  maxLength="4"
                  onBlur={handleDateInputBlur}
                />
              </div>
              <motion.img
                src={rightArrow}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                class="date-selector-arrow"
                onClick={handleNextDay}
              ></motion.img>
            </div>
            {habits.map((habit, index) => (
              <div
                key={habit.id}
                className={`habit-container ${selectedIndex === index ? 'container-focused' : ''}`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="habit-snippet-box">
                  <div className="habit-snippet-prompt">I will</div>
                  <div className="habit-snippet-statement">
                    {habit.actionText}
                  </div>
                </div>
                <div className="habit-health-box">
                  <div className="habit-snippet-prompt">health</div>
                  <div className="habit-health-percentage">33%</div>
                </div>
                <motion.img
                  src={isChecked ? greencheckIcon : squareIcon}
                  onClick={() => setIsChecked(!isChecked)}
                  whileHover={{ opacity: hoverFadeOpacity }}
                  transition={{ duration: hoverFadeDuration }}
                  class={isChecked ? 'habit-check' : 'habit-square'}
                />
              </div>
            ))}
          </div>
          <button
            className="habits-view-new-habit-button"
            onClick={() => setHabitsState('creation')}
          >
            new habit
          </button>
        </div>
        <div className="habit-box">
          <div className="quote-box">
            "I have the happiness to know, that it is a rising and not a setting
            sun."
            <br />- Benjamin Franklin
          </div>
          <div className="habit-content-box">
            <p className="habit-prompt">I am</p>
            <HabitTextInput
              value={editIdentityText}
              onChange={(e) => setEditIdentityText(e.target.value)}
            />
            <p className="habit-prompt">I love</p>
            <HabitTextInput
              value={editLoveText}
              onChange={(e) => setEditLoveText(e.target.value)}
            />
            <p className="habit-prompt">I hate</p>
            <HabitTextInput
              value={editHateText}
              onChange={(e) => setEditHateText(e.target.value)}
            />
            <p className="habit-prompt">I will</p>
            <HabitTextInput
              value={editActionText}
              onChange={(e) => setEditActionText(e.target.value)}
            />
            <p className="habit-prompt">
              for
              <input
                inputMode="numberic"
                pattern="[0-9]*"
                className="habit-days-input"
                value={editDuration}
                onChange={(e) => setEditDuration(e.target.value)}
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
              onClick={handleDelete}
            >
              delete
            </motion.button>
            <motion.button
              className="habits-button"
              whileHover={{ opacity: hoverFadeOpacity }}
              transition={{ duration: hoverFadeDuration }}
              onClick={handleSave}
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
