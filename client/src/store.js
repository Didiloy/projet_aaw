import { configureStore } from "@reduxjs/toolkit";

const USERNAME_CHANGED = "username_changed";
const IS_ADMIN_CHANGED = "is_admin_changed";

export function changeUsername(newUsername) {
  return { username: newUsername, type: USERNAME_CHANGED };
}

export function changeIsAdmin(newIsAdmin) {
  return { isAdmin: newIsAdmin, type: IS_ADMIN_CHANGED };
}

const initialState = {
  username: "",
  isAdmin: false,
};

const usernameReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};

const isAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_ADMIN_CHANGED:
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    username: usernameReducer,
    isAdmin: isAdminReducer,
  },
});

// console.log("initial state", store.getState());

// const unsubscribe = store.subscribe(() =>
//   console.log("state changed: ", store.getState())
// );

// unsubscribe();
