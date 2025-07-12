import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    genre: [],
    isOnboarded: false,
    error: null,
    users: [],
    profiles: [],
  },
  reducers: {
    signUp: (state, action) => {
      const { email, password, name, phoneNumber } = action.payload;

      state.error = null;

      if (!email || !password) {
        state.error = 'Email and password are required';
        return;
      }

      const existingUser = state.users.some(user => user.email === email);
      if (existingUser) {
        state.error = 'User already exists';
        return;
      }

      state.users.push({ email, password, name, phoneNumber, profiles: [] });

      state.name = name;
      state.email = email;
      state.password = password;
      state.phoneNumber = phoneNumber;
      //   state.isOnboarded = true;
      state.isLoggedIn = true;
      state.profiles = [name];
    },

    signIn: (state, action) => {
      const { email, password } = action.payload;

      state.error = null;

      if (!email || !password) {
        state.error = 'Email and password are required';
        return;
      }

      const user = state.users.find(user => user.email === email);

      if (!user) {
        state.error = 'User not found';
        return;
      }

      if (user.password !== password) {
        state.error = 'Incorrect password';
        return;
      }

      state.name = user.name;
      state.email = user.email;
      state.password = user.password;
      state.phoneNumber = user.phoneNumber;
      state.genre = user.genre;
      state.isLoggedIn = true;
      state.isOnboarded = true;
      state.profiles = user.profiles;
    },

    updateUserDetails: (state, action) => {
      const { newEmail, name, password } = action.payload;

      state.error = null;

      const user = state.users.find(u => u.email === state.email);
      if (!user) {
        state.error = 'User not found';
        return;
      }

      // Step 2: If changing email, ensure new email is not already taken
      if (newEmail !== user.email) {
        const emailTaken = state.users.some(u => u.email === newEmail);
        if (emailTaken) {
          state.error = 'Email already in use';
          return;
        }
        user.email = newEmail;
        state.email = newEmail;
      }

      // Step 3: Update other fields
      if (name !== undefined) {
        user.name = name;
        state.name = name;
      }

      if (password !== undefined) {
        user.password = password;
        state.password = password;
      }

      state.isOnboarded = true;
    },
    addProfile: (state, action) => {
      const { profileName } = action.payload;

      const currUser = state.users.find(u => u.email === state.email);

      if (!currUser) return;

      currUser.profiles.push(profileName);
      state.profiles = currUser.profiles;
    },

    removeProfile: (state, action) => {
      const { profileName } = action.payload;

      const currUser = state.users.find(u => u.email === state.email);

      if (!currUser || !currUser.profiles) return;

      currUser.profiles = currUser.profiles.filter(
        profile => profile !== profileName,
      );

      state.profiles = currUser.profiles;
    },

    logOut: state => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.phoneNumber = '';
      state.genre = [];
      state.isOnboarded = false;
      state.error = null;
      state.isLoggedIn = false;
      state.profiles = [];
    },

    addGenre: (state, action) => {
      const { genre } = action.payload;

      const currUser = state.users.find(u => u.email === state.email);

      currUser.genre.push(genre), state.genre.push(genre);
    },

    clearError: state => {
      state.error = null;
    },
    setOnboarding: (state, action) => {
      state.isOnboarded = true;
    },
  },
});

export const {
  signUp,
  signIn,
  updateUserDetails,
  logOut,
  setError,
  clearError,
  addProfile,
  removeProfile,
} = authSlice.actions;

export default authSlice.reducer;
