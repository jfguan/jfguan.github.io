import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCzCe2TiOCupH84FxClAAVdEJp9BuWedFI',
  authDomain: 'habitgambling.firebaseapp.com',
  projectId: 'habitgambling',
  storageBucket: 'habitgambling.appspot.com',
  messagingSenderId: '60788841107',
  appId: '1:60788841107:web:8affc98f8c54619fd40b66',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Re-export Firebase auth utilities
export { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged };

const USE_CLOUD = false;
const HABITS_DATA_KEY = 'resolutions_app_habits';
const COMPLETIONS_DATA_KEY = 'resolutions_app_completions';
const REWARD_DATA_KEY = 'resolutions_app_reward';
const AFFIRMATIONS_DATA_KEY = 'resolutions_app_affirmations';
const AFFIRMATIONS_VOLUME_KEY = 'resolutions_app_affirmations_volume';
const BACKGROUND_RAIN_VOLUME_KEY = 'resolutions_app_background_rain_volume';
export const MS_DAY = 86400000;

export const localService = {
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

// Cloud Service using Firestore with real-time subscriptions
export const cloudService = {
  unsubscribers: [],

  init: async (db, userId, callbacks) => {
    cloudService.db = db;
    cloudService.userId = userId;

    // Fetch initial data immediately to prevent stale local data from overwriting cloud
    const habitsDoc = await getDoc(doc(db, 'users', userId, 'habits', 'data'));
    const completionsDoc = await getDoc(
      doc(db, 'users', userId, 'completions', 'data')
    );
    const rewardDoc = await getDoc(doc(db, 'users', userId, 'reward', 'data'));

    callbacks.setHabits(
      habitsDoc.exists() ? habitsDoc.data().habits || [] : []
    );
    callbacks.setCompletions(
      completionsDoc.exists() ? completionsDoc.data().completions || {} : {}
    );
    callbacks.setReward(
      rewardDoc.exists() ? rewardDoc.data() : { balance: 0, item: '', cost: '' }
    );

    // Then set up subscriptions for real-time updates
    const habitsUnsub = onSnapshot(
      doc(db, 'users', userId, 'habits', 'data'),
      (docSnap) => {
        callbacks.setHabits(
          docSnap.exists() ? docSnap.data().habits || [] : []
        );
      }
    );
    cloudService.unsubscribers.push(habitsUnsub);

    const completionsUnsub = onSnapshot(
      doc(db, 'users', userId, 'completions', 'data'),
      (docSnap) => {
        callbacks.setCompletions(
          docSnap.exists() ? docSnap.data().completions || {} : {}
        );
      }
    );
    cloudService.unsubscribers.push(completionsUnsub);

    const rewardUnsub = onSnapshot(
      doc(db, 'users', userId, 'reward', 'data'),
      (docSnap) => {
        callbacks.setReward(
          docSnap.exists() ? docSnap.data() : { balance: 0, item: '', cost: '' }
        );
      }
    );
    cloudService.unsubscribers.push(rewardUnsub);
  },

  cleanup: () => {
    cloudService.unsubscribers.forEach((unsub) => unsub());
    cloudService.unsubscribers = [];
  },

  addHabit: async (newHabit, habits) => {
    const updatedHabits = [newHabit, ...habits];
    await setDoc(
      doc(cloudService.db, 'users', cloudService.userId, 'habits', 'data'),
      { habits: updatedHabits }
    );
  },

  updateHabit: async (updatedHabit, habits) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    await setDoc(
      doc(cloudService.db, 'users', cloudService.userId, 'habits', 'data'),
      { habits: updatedHabits }
    );
  },

  deleteHabit: async (habitId, habits) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    await setDoc(
      doc(cloudService.db, 'users', cloudService.userId, 'habits', 'data'),
      { habits: updatedHabits }
    );
    return updatedHabits;
  },

  toggleHabitCompletion: async (habitId, date, completions, setCompletions) => {
    const dateStr = date.toLocaleDateString('en-CA');
    const updatedCompletions = { ...completions };

    if (!updatedCompletions[habitId]) {
      updatedCompletions[habitId] = {};
    }

    if (updatedCompletions[habitId][dateStr]) {
      delete updatedCompletions[habitId][dateStr];
    } else {
      updatedCompletions[habitId][dateStr] = true;
    }

    await setDoc(
      doc(cloudService.db, 'users', cloudService.userId, 'completions', 'data'),
      { completions: updatedCompletions }
    );
  },

  createHabitCompletions: async (habitId, completions) => {
    const updatedCompletions = { ...completions };
    updatedCompletions[habitId] = {};
    await setDoc(
      doc(cloudService.db, 'users', cloudService.userId, 'completions', 'data'),
      { completions: updatedCompletions }
    );
  },

  deleteHabitCompletions: async (habitId, completions) => {
    const updatedCompletions = { ...completions };
    delete updatedCompletions[habitId];
    await setDoc(
      doc(cloudService.db, 'users', cloudService.userId, 'completions', 'data'),
      { completions: updatedCompletions }
    );
  },

  calculateHabitHealth: (habit, completions) => {
    return localService.calculateHabitHealth(habit, completions);
  },

  getRewardData: async () => {
    const docRef = doc(
      cloudService.db,
      'users',
      cloudService.userId,
      'reward',
      'data'
    );
    const docSnap = await getDoc(docRef);
    return docSnap.exists()
      ? docSnap.data()
      : { balance: 0, item: '', cost: '' };
  },

  saveRewardData: async (rewardData) => {
    await setDoc(
      doc(cloudService.db, 'users', cloudService.userId, 'reward', 'data'),
      rewardData
    );
  },
};

export const service = USE_CLOUD ? cloudService : localService;
