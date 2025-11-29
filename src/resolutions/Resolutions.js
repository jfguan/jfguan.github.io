import './Resolutions.css';
import './Resolutions.mobile.css';
import React from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import {
  fadeIn,
  fadeInEnterDelay,
  expandCollapse,
  hoverFadeDuration,
  hoverFadeOpacity,
  moduleFadeDuration,
} from './animations';
import { service } from './service';
import flowers from './flowers.svg';
import checkIcon from './check.svg';
import greenCheckIcon from './green_check.svg';
import squareIcon from './square.svg';
import calendarIcon from './calendar.svg';
import bagIcon from './bag.svg';
import micIcon from './mic.svg';
import micRedIcon from './mic_red.svg';
import terminalIcon from './terminal.svg';
import leftArrow from './left_arrow.svg';
import rightArrow from './right_arrow.svg';
import downArrow from './down_arrow.svg';
import catGettingTreat from './cat_getting_treat.png';
import affirmationsHero from './affirmations_hero.svg';
import affirmationsWave0 from './affirmations_wave_0.svg';
import affirmationsWave1 from './affirmations_wave_1.svg';
import affirmationsWave2 from './affirmations_wave_2.svg';
import playIcon from './play.svg';
import pauseIcon from './pause.svg';
import backgroundRainAudio from './background_rain.m4a';
import landscape from './landscape.jpg';

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

const CountUpNumber = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(2) + '%');
  const color = useTransform(
    count,
    (v) => `color-mix(in srgb, #4B7E14 ${v}%, #4D4D42 ${100 - v}%)`
  );

  React.useEffect(() => {
    const controls = animate(count, value, { duration: 0.3 });
    return () => controls.stop();
  }, [value, count]);

  return <motion.span style={{ color }}>{rounded}</motion.span>;
};

const CountUpGreen = ({ value, format = Math.round }) => {
  const count = useMotionValue(0);
  const displayed = useTransform(count, format);

  React.useEffect(() => {
    const controls = animate(count, value, { duration: 0.3 });
    return () => controls.stop();
  }, [value, count]);

  return (
    <motion.span style={{ color: 'var(--green)' }}>{displayed}</motion.span>
  );
};

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
  const infoItems = ['read this', 'account'];
  const [habits, setHabits] = React.useState(null);
  const [completions, setCompletions] = React.useState(null);

  React.useEffect(() => {
    Promise.all([service.getHabits(), service.getCompletions()]).then(
      ([h, c]) => {
        setHabits(h);
        setCompletions(c);
      }
    );
  }, []);

  // return loading if not ready
  if (!habits || !completions) return <div>Loading...</div>;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetTop = elementTop - window.innerHeight * 0.2;

      animate(window.scrollY, offsetTop, {
        duration: 0.3,
        ease: 'easeInOut',
        onUpdate: (value) => {
          window.scrollTo(0, value);
        },
      });
    }
  };

  const scrollableSections = [
    { id: 'habits', icon: checkIcon },
    { id: 'calendar', icon: calendarIcon },
    { id: 'rewards', icon: bagIcon },
    { id: 'affirmations', icon: micIcon },
    { id: 'debug', icon: terminalIcon },
  ];

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
      <AnimatePresence>
        {habits.length > 0 && (
          <motion.div
            className="side-bar"
            variants={fadeInEnterDelay(moduleFadeDuration)}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {scrollableSections.map((section) => (
              <motion.img
                key={section.id}
                src={section.icon}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                className="side-bar-icon"
                onClick={() => scrollToSection(section.id)}
                title={section.id}
              ></motion.img>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          className="app-body"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0, duration: 1.0 }}
        >
          <HabitsModule
            habits={habits}
            setHabits={setHabits}
            completions={completions}
            setCompletions={setCompletions}
          />
          <AnimatePresence>
            {habits.length > 0 && (
              <motion.div
                variants={fadeInEnterDelay(moduleFadeDuration)}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <CalendarModule
                  habits={habits}
                  completions={completions}
                  setCompletions={setCompletions}
                />
                <RewardModule />
                <AffirmationsModule />
                <DebugModule />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const HabitsModule = ({ habits, setHabits, completions, setCompletions }) => {
  const initialModule = habits.length === 0 ? 'intro' : 'view';
  const [habitModuleState, setHabitModuleState] = React.useState(initialModule);

  return (
    <div className="habits-module" id="habits">
      <div className="section-title">habits</div>
      <div className="section-explanation">
        to avoid habit collapse, the health score is recency weighted to avoid
        the feeling of "starting over", an issue with streaks. for solid
        foundations, creating a new habit require a previous health score over
        95%.
      </div>
      <AnimatePresence mode="wait">
        {habitModuleState === 'intro' && (
          <HabitsIntro key="intro" setHabitModuleState={setHabitModuleState} />
        )}
        {habitModuleState === 'creation' && (
          <HabitsCreation
            key="creation"
            setHabitModuleState={setHabitModuleState}
            habits={habits}
            setHabits={setHabits}
            completions={completions}
            setCompletions={setCompletions}
          />
        )}
        {habitModuleState === 'view' && (
          <HabitsView
            key="view"
            setHabitModuleState={setHabitModuleState}
            habits={habits}
            setHabits={setHabits}
            completions={completions}
            setCompletions={setCompletions}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const HabitsIntro = ({ setHabitModuleState }) => {
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
              onClick={() => setHabitModuleState('creation')}
            >
              continue
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HabitsCreation = ({
  setHabitModuleState,
  habits,
  setHabits,
  completions,
  setCompletions,
}) => {
  const [identityText, setIdentityText] = React.useState('');
  const [loveText, setLoveText] = React.useState('');
  const [hateText, setHateText] = React.useState('');
  const [actionText, setActionText] = React.useState('');
  const [duration, setDuration] = React.useState('90');

  const handleCreate = () => {
    const newHabit = {
      id: crypto.randomUUID(),
      identityText,
      loveText,
      hateText,
      actionText,
      duration: parseInt(duration) || 90,
      last_modified_ts: Date.now(),
    };

    service.addHabit(newHabit, habits, setHabits);
    service.createHabitCompletions(newHabit.id, completions, setCompletions);
    setHabitModuleState('view');
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
              <li>will I keep this habit for many years?</li>
            </ul>
            <div className="suggestions-subtitle">
              minimally difficult (for now)
            </div>
            <ul className="suggestions-list">
              <li>[optional] under 3 minutes</li>
              <li>
                can this be made any easier without feeling like a waste of
                time?
              </li>
            </ul>
            <div className="suggestions-subtitle">
              commitment duration is correct
            </div>
            <ul className="suggestions-list">
              <li>
                new habits take 18 - 254 days to internalize depending on
                difficulty
              </li>
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
              onClick={() =>
                setHabitModuleState(habits.length > 0 ? 'view' : 'intro')
              }
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

const HabitsView = ({
  setHabitModuleState,
  habits,
  setHabits,
  completions,
  setCompletions,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedHabit, setSelectedHabit] = React.useState(
    habits[selectedIndex]
  );

  const formatDatePart = (value, digits = 2) =>
    String(value).padStart(digits, '0');

  const day = formatDatePart(selectedDate.getDate());
  const month = formatDatePart(selectedDate.getMonth() + 1);
  const year = selectedDate.getFullYear();

  const dayRef = React.useRef(null);
  const monthRef = React.useRef(null);
  const yearRef = React.useRef(null);

  const MS_DAY = 86400000;
  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate.getTime() - MS_DAY);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate.getTime() + MS_DAY);
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

  // Update edit state when selected index changes
  React.useEffect(() => {
    if (habits.length === 0) {
      setHabitModuleState('intro');
      const blankHabit = {
        identityText: '',
        loveText: '',
        hateText: '',
        actionText: '',
        duration: 0,
      };
      setSelectedHabit(blankHabit);
    } else {
      const selectedHabit = habits[selectedIndex];
      setSelectedHabit(selectedHabit);
    }
  }, [selectedIndex, habits]);

  const handleSave = () => {
    service.updateHabit(selectedHabit, habits, setHabits);
  };

  const handleDelete = () => {
    const habitId = habits[selectedIndex].id;
    service.deleteHabit(habitId, habits, setHabits);

    const newIndex = Math.max(0, selectedIndex - 1);
    setSelectedIndex(newIndex);
  };

  const getHabitCompletionIcon = (habitId) => {
    const habitCompletions = (completions[habitId] ||= {});

    const dateStr = selectedDate.toLocaleDateString('en-CA');

    const completed = habitCompletions[dateStr] || false;

    return completed ? greenCheckIcon : squareIcon;
  };

  const primaryHabitHealth =
    habits.length > 0
      ? service.calculateHabitHealth(habits[0], completions)
      : 0;

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
                  ref={yearRef}
                  inputMode="numberic"
                  pattern="[0-9]*"
                  className="date-selector-input year-len"
                  defaultValue={year}
                  maxLength="4"
                  onBlur={handleDateInputBlur}
                />
                -
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
                  <div className="habit-health-percentage">
                    <CountUpNumber
                      value={service.calculateHabitHealth(habit, completions)}
                    />
                  </div>
                </div>
                <motion.img
                  src={getHabitCompletionIcon(habit.id)}
                  whileHover={{ opacity: hoverFadeOpacity }}
                  transition={{ duration: hoverFadeDuration }}
                  className="habit-completion-icon"
                  onClick={() =>
                    service.toggleHabitCompletion(
                      habit.id,
                      selectedDate,
                      completions,
                      setCompletions
                    )
                  }
                />
              </div>
            ))}
          </div>
          {primaryHabitHealth > 95 ? (
            <motion.button
              className="habits-view-new-habit-button"
              onClick={() => setHabitModuleState('creation')}
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: hoverFadeDuration }}
            >
              new habit
            </motion.button>
          ) : (
            <motion.button
              className="habits-view-new-habit-button button-disabled"
              disabled
            >
              new habit
            </motion.button>
          )}
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
              value={selectedHabit.identityText}
              onChange={(e) =>
                setSelectedHabit({
                  ...selectedHabit,
                  identityText: e.target.value,
                })
              }
            />
            <p className="habit-prompt">I love</p>
            <HabitTextInput
              value={selectedHabit.loveText}
              onChange={(e) =>
                setSelectedHabit({
                  ...selectedHabit,
                  loveText: e.target.value,
                })
              }
            />
            <p className="habit-prompt">I hate</p>
            <HabitTextInput
              value={selectedHabit.hateText}
              onChange={(e) =>
                setSelectedHabit({
                  ...selectedHabit,
                  hateText: e.target.value,
                })
              }
            />
            <p className="habit-prompt">I will</p>
            <HabitTextInput
              value={selectedHabit.actionText}
              onChange={(e) =>
                setSelectedHabit({
                  ...selectedHabit,
                  actionText: e.target.value,
                })
              }
            />
            <p className="habit-prompt">
              for
              <input
                inputMode="numberic"
                pattern="[0-9]*"
                className="habit-days-input"
                value={selectedHabit.duration}
                onChange={(e) =>
                  setSelectedHabit({
                    ...selectedHabit,
                    duration: e.target.value,
                  })
                }
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

const HabitTextInput = ({
  placeholder = '',
  maxLength = '60',
  value,
  onChange,
}) => (
  <textarea
    className="habit-input"
    placeholder={placeholder}
    maxLength={maxLength}
    value={value}
    onChange={onChange}
    rows="2"
  />
);

const CalendarModule = ({ habits, completions, setCompletions }) => {
  const year = new Date().getFullYear();
  const [openCalendars, setOpenCalendars] = React.useState(
    Object.fromEntries(habits.map((h) => [h.id, true]))
  );

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const toggleCalendar = (habitId) => {
    setOpenCalendars((prev) => ({
      ...prev,
      [habitId]: !prev[habitId],
    }));
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
    <div className="calendar" id="calendar">
      <div className="section">
        <div className="section-title">calendar</div>
        <div className="section-explanation">
          visualization of your progress - see how far you've come! the habit
          squares are checkable as well.
        </div>
        <div className="habit-calendar-box">
          {habits.map((habit) => (
            <div key={habit.id} className="habit-calendar">
              <div className="calendar-title-box">
                <motion.img
                  src={downArrow}
                  onClick={() => toggleCalendar(habit.id)}
                  whileHover={{ opacity: hoverFadeOpacity }}
                  animate={{
                    rotate: openCalendars[habit.id]
                      ? ARROW_EXPANDED_ROTATION
                      : ARROW_COLLAPSED_ROTATION,
                  }}
                  transition={{ duration: CALENDAR_ANIMATION_DURATION }}
                  className="calendar-title-arrow"
                />
                <div className="calendar-title-text">
                  I will {habit.actionText}
                </div>
              </div>
              <AnimatePresence>
                {openCalendars[habit.id] && (
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
                          const dateStr = new Date(
                            year,
                            index,
                            day
                          ).toLocaleDateString('en-CA');
                          const isCompleted = completions[habit.id]?.[dateStr];
                          return (
                            <div
                              key={day}
                              className={`calendar-day ${isCompleted ? 'filled' : ''}`}
                              onClick={() => {
                                const date = new Date(year, index, day);
                                const updatedCompletions =
                                  service.toggleHabitCompletion(
                                    habit.id,
                                    date,
                                    completions,
                                    setCompletions
                                  );
                                setCompletions(updatedCompletions);
                                service.saveCompletions(updatedCompletions);
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RewardModule = () => {
  const [balance, setBalance] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);
  const [item, setItem] = React.useState('');
  const [cost, setCost] = React.useState('0');

  const balanceInputRef = React.useRef(null);
  const balanceMotion = useMotionValue(balance);
  const balanceDisplay = useTransform(balanceMotion, (v) => v.toFixed(2));

  const formatBalance = (value, digits = 2) =>
    parseFloat(value).toFixed(digits);

  const buttonValues = [0.05, 0.25, 0.5, 1.0];
  const multiplierPool = [1, 2, 3, 3, 4, 4, 5, 5, 6, 7];

  const itemInputPlaceholder = 'a tank air halter top';

  React.useEffect(() => {
    service.getRewardData().then((data) => {
      setBalance(data.balance);
      setItem(data.item);
      setCost(data.cost);
    });
  }, []);

  React.useEffect(() => {
    service.saveRewardData({ balance, item, cost });
  }, [balance, item, cost]);

  React.useEffect(() => {
    const unsubscribe = balanceDisplay.onChange((v) => {
      if (balanceInputRef.current) {
        balanceInputRef.current.value = v;
      }
    });

    animate(balanceMotion, balance, { duration: 0.3 });
    return unsubscribe;
  }, [balance, balanceDisplay, balanceMotion]);

  const handleButtonClick = (amount) => {
    const randomIndex = Math.floor(Math.random() * multiplierPool.length);
    const randomMultiplier = multiplierPool[randomIndex];
    setMultiplier(randomMultiplier);
    setBalance((prev) => prev + amount * randomMultiplier);
  };

  return (
    <div className="rewards" id="rewards">
      <div className="section">
        <div className="section-title">treat yourself!</div>
        <div className="section-explanation">
          for every success, give yourself a small reward. a random multipler
          x1-x7 is applied for a lil' bit of dopamine 🎉. save up and buy
          something guilt free, maybe something luxury that you can't justify
          otherwise.
        </div>
        <div className="habits-image-container">
          <img src={catGettingTreat} className="habits-image"></img>
        </div>
        <div className="reward-box">
          <div className="balance-box">
            <div className="balance-caption">balance</div>
            <div className="balance-amount-box">
              $
              <input
                ref={balanceInputRef}
                type="text"
                inputMode="decimal"
                className="balance-amount"
                defaultValue={formatBalance(balance)}
                size={formatBalance(balance).length}
                onBlur={(e) => setBalance(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="balance-box">
            <div className="balance-caption">multiplier</div>
            <div className="balance-amount-box">
              x
              <CountUpGreen value={multiplier} />
            </div>
          </div>
          <div className="item-box">
            <div className="item-box-row">
              <div className="item-caption">I will buy</div>
              <input
                className="item-input"
                type="text"
                value={item}
                size={item.length || itemInputPlaceholder.length}
                placeholder={itemInputPlaceholder}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>
            <div className="item-box-row">
              <div className="item-caption">cost($)</div>
              <div className="item-input-box">
                <input
                  className="item-input"
                  type="text"
                  value={cost}
                  size={cost.length || 2}
                  placeholder="85"
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
            </div>
          </div>
          {buttonValues.map((value) => (
            <motion.button
              key={value}
              className="reward-button"
              onClick={() => handleButtonClick(value)}
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: hoverFadeDuration }}
            >
              ${value.toFixed(2)}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AffirmationsModule = () => {
  const AFFIRMATION_MAX_DURATION = 15000;
  const waves = [affirmationsWave0, affirmationsWave2, affirmationsWave1];
  const [affirmationsVolume, setAffirmationsVolume] = React.useState(
    service.getAffirmationsVolume()
  );
  const [backgroundRainVolume, setBackgroundRainVolume] = React.useState(
    service.getBackgroundRainVolume()
  );

  const [isRecording, setIsRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const mediaRecorderRef = React.useRef(null);
  const audioElementRef = React.useRef(new Audio());
  const backgroundRainRef = React.useRef(new Audio(backgroundRainAudio));

  const startRecording = async () => {
    setAudioUrl(null);
    handlePauseClick();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const chunks = [];

    // Create a new media recorder
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      const base64Url = await blobToBase64(audioBlob);
      service.saveAffirmationsData(base64Url);
      setAudioUrl(base64Url);
      stream.getTracks().forEach((track) => track.stop());
    };

    // Start the recording
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);

    setTimeout(() => {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }, AFFIRMATION_MAX_DURATION);
  };

  const blobToBase64 = async (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handlePlayClick = () => {
    if (!audioUrl) return;

    audioElementRef.current.src = audioUrl;
    audioElementRef.current.play();
    backgroundRainRef.current.play();

    setIsPlaying(true);
  };

  const handlePauseClick = () => {
    audioElementRef.current.pause();
    backgroundRainRef.current.pause();

    setIsPlaying(false);
  };

  React.useEffect(() => {
    audioElementRef.current.loop = true;
    backgroundRainRef.current.loop = true;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(
      audioElementRef.current
    );
    const delay = audioContext.createDelay(0.1);

    source.connect(delay);
    delay.connect(audioContext.destination);
    source.connect(audioContext.destination);

    service.getAffirmationsData().then(setAudioUrl);
  }, []);

  React.useEffect(() => {
    audioElementRef.current.volume = affirmationsVolume / 100;
    service.saveAffirmationsVolume(affirmationsVolume);
  }, [affirmationsVolume]);

  React.useEffect(() => {
    backgroundRainRef.current.volume = backgroundRainVolume / 100;
    service.saveBackgroundRainVolume(backgroundRainVolume);
  }, [backgroundRainVolume]);

  return (
    <div className="affirmations" id="affirmations">
      <div className="section">
        <div className="section-title">affirmations</div>
        <div className="section-explanation">
          record your own, and listen over and over until it becomes you.
          include the `I am/love/hate` statements and set the volume to be
          barely audible. audio is stored locally, limited to 15 seconds to
          really focus on one habit at a time.
        </div>
        <div className="habits-image-container">
          <img src={affirmationsHero} className="habits-image"></img>
        </div>
        <div className="affirmation-controller-box">
          <div className="wave-box">
            <AnimatePresence>
              {audioUrl && (
                <>
                  {waves.map((wave, i) => (
                    <motion.img
                      key={i}
                      src={wave}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isPlaying ? [0.3, 1, 0.3] : 1 }}
                      exit={{ opacity: 0 }}
                      transition={
                        isPlaying ? { duration: 2.0 + i, repeat: Infinity } : {}
                      }
                    />
                  ))}
                </>
              )}
              {!audioUrl && (
                <>
                  {waves.map((wave, i) => (
                    <motion.img
                      className="wave-vector-no-recording"
                      key={i}
                      src={wave}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="affirmation-icon-box">
            <div>
              <motion.img
                src={isRecording ? micRedIcon : micIcon}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                onClick={handleMicClick}
              />
              <div className="affirmation-icon-label">new</div>
            </div>
            <div>
              <motion.img
                src={playIcon}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                onClick={handlePlayClick}
              />
              <div className="affirmation-icon-label">play</div>
            </div>
            <div>
              <motion.img
                src={pauseIcon}
                whileHover={{ opacity: hoverFadeOpacity }}
                transition={{ duration: hoverFadeDuration }}
                onClick={handlePauseClick}
              />
              <div className="affirmation-icon-label">pause</div>
            </div>
          </div>
          <div className="affirmation-volume-box">
            <div className="affirmation-volume-label">affirmations volume</div>
            <input
              type="range"
              min="0"
              max="100"
              value={affirmationsVolume}
              onChange={(e) => setAffirmationsVolume(e.target.value)}
            />
            <div className="affirmation-volume-label">
              background rain volume
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={backgroundRainVolume}
              onChange={(e) => setBackgroundRainVolume(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DebugModule = () => {
  return (
    <div className="debug" id="debug">
      <div className="section">
        <div className="section-title">debug exercises</div>
        <div className="section-explanation">
          some stuff I found on the internet that might be helpful - credits to
          original authors where due.
        </div>
        <img src={landscape} className="debug-hero-image" />
        <div className="exercise-list-box">
          <h7>1. stopping consumption - maggot visualization</h7>
          <p className="exercise-paragraph">
            take a piece of food, drink, or phone, etc.
          </p>
          <p className="exercise-paragraph">
            slowly, mindfully, break off pieces and throw them in the trash one
            at a time, carefully imagining that you are tasting or experiencing
            the food and that it was full of maggots.
          </p>
          <p className="exercise-paragraph">
            associate the action with the disgust, and naturally stop.
          </p>
          <h7>3. five whys - classic drilldown</h7>
          <p className="exercise-paragraph">
            find out the root cause of an issue by asking `why` five times or
            more.
          </p>
          <p className="exercise-paragraph">
            <b>example</b>:
          </p>
          <p className="exercise-paragraph">I went to sleep late. why?</p>
          <p className="exercise-paragraph">I played games on my phone. why?</p>
          <p className="exercise-paragraph">
            I really like playing games. why?
          </p>
          <p className="exercise-paragraph">
            games provide a sense of achievement. why do I crave achievement?
          </p>
          <p className="exercise-paragraph">
            my parents strongly emphasized achievement during childhood.
          </p>
          <p className="exercise-paragraph">
            conclusion: games are fun and simulate achievement. I am an
            independent adult separate from my parents now.
          </p>
          <h7>2. change how you view yourself - authority questioning</h7>
          <p className="exercise-paragraph">
            ALL beliefs about yourself were GIVEN to you, by someone or
            something repeatedly telling you. beliefs are just an opinion, and
            therefore can be changed.
          </p>
          <p className="exercise-paragraph">
            first, locate the source of your belief. common sources are parents,
            childhood, and society. second, re-examine the source's authority,
            and seek evidence to upweight or downweight it.
          </p>
          <p className="exercise-paragraph">
            for example, I had some insecurity about lacking talent. thinking a
            bit more, I realized my dad felt that way from harsh competition in
            his university, and was the source. was this insecurity still
            relevant? I don't live there, and I have various achievements.
            downweighted.
          </p>
          <p className="exercise-paragraph">
            I sometimes feel insecure about my ethnicity due to how it's
            portrayed on the news or in common societal jokes. but wait a
            second, the news has agendas of the government irrespective of me
            and the people in society who makes those jokes are extremely
            stupid. why believe stupid people? downweighted
          </p>
        </div>
      </div>
    </div>
  );
};
export default Resolutions;
