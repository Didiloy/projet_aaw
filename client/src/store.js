import { configureStore } from "@reduxjs/toolkit";

const USERNAME_CHANGED = "username_changed";

export function changeUsername(newUsername) {
  return { username: newUsername, type: USERNAME_CHANGED };
}

const LOCAL_STORAGE_KEY = "projet_aaw_username";
const initialState = {
  username: localStorage.getItem(LOCAL_STORAGE_KEY) || "",
};

const usernameReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      localStorage.setItem(LOCAL_STORAGE_KEY, action.username);
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: usernameReducer,
});

// console.log("initial state", store.getState());

// const unsubscribe = store.subscribe(() =>
//   console.log("state changed: ", store.getState())
// );

// unsubscribe();
