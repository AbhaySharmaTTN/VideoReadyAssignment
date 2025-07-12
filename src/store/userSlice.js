import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    genre: '',
    isOnboarded: false,
    error: null,
    users: [],
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

      state.users.push({ email, password, name, phoneNumber });

      state.name = name;
      state.email = email;
      state.password = password;
      state.phoneNumber = phoneNumber;
      state.genre = genre;
      state.isOnboarded = true;
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
      state.isOnboarded = true;
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

    logOut: state => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.phoneNumber = '';
      state.genre = '';
      state.isOnboarded = false;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
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
} = authSlice.actions;

export default authSlice.reducer;
