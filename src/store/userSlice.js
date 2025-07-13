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
    profileImage: null,
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

      state.users.push({
        email,
        password,
        name,
        phoneNumber,
        profiles: [],
        genre: [],
      });

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

      if (newEmail !== user.email) {
        const emailTaken = state.users.some(u => u.email === newEmail);
        if (emailTaken) {
          state.error = 'Email already in use';
          return;
        }
        user.email = newEmail;
        state.email = newEmail;
      }

      if (name !== undefined) {
        user.name = name;
        state.name = name;
      }

      if (password !== undefined) {
        user.password = password;
        state.password = password;
      }
    },
    setGenre: (state, action) => {
      const { genre } = action.payload;

      const currUser = state.users.find(u => u.email === state.email);
      currUser.genre = genre;
      state.genre = genre;
      console.log(state.genre);
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
    setProfileImage: (state, action) => {
      const { image } = action.payload;
      state.profileImage = image;
    },

    setOnboarding: state => {
      state.isOnboarded = true;
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
      state.profileImage = null;
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
  setGenre,
  setOnboarding,
  setProfileImage,
} = authSlice.actions;

export default authSlice.reducer;
