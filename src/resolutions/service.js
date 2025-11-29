const USE_CLOUD = false;
const HABITS_DATA_KEY = 'resolutions_app_habits';
const COMPLETIONS_DATA_KEY = 'resolutions_app_completions';
const REWARD_DATA_KEY = 'resolutions_app_reward';
const AFFIRMATIONS_DATA_KEY = 'resolutions_app_affirmations';
const AFFIRMATIONS_VOLUME_KEY = 'resolutions_app_affirmations_volume';
const BACKGROUND_RAIN_VOLUME_KEY = 'resolutions_app_background_rain_volume';
const MS_DAY = 86400000;

const localService = {
  // HABITS DATA MODEL
  // id: crypto.randomUUID(),
  // identityText,
  // loveText,
  // hateText,
  // actionText,
  // duration: parseInt(duration) || 90,
  // last_modified_ts: Date.now(),

  getHabits: async () => {
    const savedHabits = localStorage.getItem(HABITS_DATA_KEY);
    return savedHabits ? JSON.parse(savedHabits) : [];
  },

  saveHabits: async (habits) => {
    localStorage.setItem(HABITS_DATA_KEY, JSON.stringify(habits));
  },

  addHabit: async (newHabit, habits, setHabits) => {
    const updatedHabits = [newHabit, ...habits];

    localService.saveHabits(updatedHabits);
    setHabits(updatedHabits);
  },

  updateHabit: async (updatedHabit, habits, setHabits) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === updatedHabit.id ? updatedHabit : habit
    );

    localService.saveHabits(updatedHabits);
    setHabits(updatedHabits);
  },

  deleteHabit: async (habitId, habits, setHabits) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);

    localService.saveHabits(updatedHabits);
    setHabits(updatedHabits);

    return updatedHabits;
  },

  // COMPLETIONS SERVICE
  // DATA MODEL
  // {
  //  "user_id",
  //  "habit_id",
  //  "completion_date"
  // }

  getCompletions: async () => {
    const savedCompletions = localStorage.getItem(COMPLETIONS_DATA_KEY);
    return savedCompletions ? JSON.parse(savedCompletions) : [];
  },

  saveCompletions: async (completions) => {
    localStorage.setItem(COMPLETIONS_DATA_KEY, JSON.stringify(completions));
  },

  createHabitCompletions: async (habitId, completions, setCompletions) => {
    const updatedCompletions = { ...completions };
    updatedCompletions[habitId] = {};

    localService.saveCompletions(updatedCompletions);
    setCompletions(updatedCompletions);
  },

  deleteHabitCompletions: async (habitId, completions, setCompletions) => {
    const updatedCompletions = { ...completions };
    delete updatedCompletions[habitId];

    localService.saveCompletions(updatedCompletions);
    setCompletions(updatedCompletions);
  },

  toggleHabitCompletion: (habitId, date, completions, setCompletions) => {
    // YYYY-MM-DD format
    const dateStr = date.toLocaleDateString('en-CA');

    const updatedCompletions = { ...completions };
    if (updatedCompletions[habitId][dateStr]) {
      delete updatedCompletions[habitId][dateStr];
    } else {
      updatedCompletions[habitId][dateStr] = true;
    }

    // save changes
    localService.saveCompletions(updatedCompletions);
    setCompletions(updatedCompletions);

    return updatedCompletions;
  },

  calculateHabitHealth: (habit, completions) => {
    const habitCompletions = completions[habit.id] || {};

    let completedWeight = 0;
    let totalWeight = 0;

    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getTime() - (habit.duration - 1) * MS_DAY
    );
    for (let i = 0; i < habit.duration; i++) {
      const dayDate = new Date(startDate.getTime() + i * MS_DAY);
      const dateStr = dayDate.toLocaleDateString('en-CA');
      const weight = i + 1;

      totalWeight += weight;
      if (habitCompletions[dateStr]) {
        completedWeight += weight;
      }
    }

    return (completedWeight / totalWeight) * 100;
  },

  // REWARD DATA
  getRewardData: async () => {
    const savedData = localStorage.getItem(REWARD_DATA_KEY);
    return savedData
      ? JSON.parse(savedData)
      : { balance: 0, item: '', cost: '' };
  },

  saveRewardData: async (rewardData) => {
    localStorage.setItem(REWARD_DATA_KEY, JSON.stringify(rewardData));
  },

  // AFFIRMATIONS DATA
  getAffirmationsData: async () => {
    return localStorage.getItem(AFFIRMATIONS_DATA_KEY);
  },

  saveAffirmationsData: async (base64Url) => {
    localStorage.setItem(AFFIRMATIONS_DATA_KEY, base64Url);
  },

  getAffirmationsVolume: () => {
    const saved = localStorage.getItem(AFFIRMATIONS_VOLUME_KEY);
    return saved ? parseInt(saved) : 50;
  },

  saveAffirmationsVolume: (volume) => {
    localStorage.setItem(AFFIRMATIONS_VOLUME_KEY, volume.toString());
  },

  getBackgroundRainVolume: () => {
    const saved = localStorage.getItem(BACKGROUND_RAIN_VOLUME_KEY);
    return saved ? parseInt(saved) : 50;
  },

  saveBackgroundRainVolume: (volume) => {
    localStorage.setItem(BACKGROUND_RAIN_VOLUME_KEY, volume.toString());
  },
};

// TODO Cloud implementaiton
const cloudService = {
  subscribeToHabits: (callback) => {
    return () => {};
  },
};

export const service = USE_CLOUD ? cloudService : localService;
