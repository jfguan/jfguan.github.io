const USE_CLOUD = false;
const HABITS_STORAGE_KEY = 'resolutions_app_habits';
const COMPLETIONS_STORAGE_KEY = 'resolutions_app_completions';
const REWARD_DATA_KEY = 'resolutions_app_reward';
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
    const savedHabits = localStorage.getItem(HABITS_STORAGE_KEY);
    return savedHabits ? JSON.parse(savedHabits) : [];
  },

  saveHabits: async (habits) => {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
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
    const savedCompletions = localStorage.getItem(COMPLETIONS_STORAGE_KEY);
    return savedCompletions ? JSON.parse(savedCompletions) : [];
  },

  saveCompletions: async (completions) => {
    localStorage.setItem(COMPLETIONS_STORAGE_KEY, JSON.stringify(completions));
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

  calculateHabitHealth: (
    habitId,
    duration,
    completions,
    currentDate = new Date()
  ) => {
    const habitCompletions = completions[habitId] || {};

    let completedWeight = 0;
    let totalWeight = 0;

    const startDate = new Date(currentDate.getTime() - (duration - 1) * MS_DAY);
    for (let i = 0; i < duration; i++) {
      const dayDate = new Date(startDate.getTime() + i * MS_DAY);
      const dateStr = dayDate.toLocaleDateString('en-CA');
      const weight = i + 1;

      totalWeight += weight;
      if (habitCompletions[dateStr]) {
        completedWeight += weight;
      }
    }

    return Math.round((completedWeight / totalWeight) * 100);
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
};

// TODO Cloud implementaiton
const cloudService = {
  subscribeToHabits: (callback) => {
    return () => {};
  },
};

export const service = USE_CLOUD ? cloudService : localService;
