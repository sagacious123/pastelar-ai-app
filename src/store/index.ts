import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import { authApi } from "./auth/api";
import { profileApi } from "./profile";
import { campaignsApi } from "./campaigns";
import { notificationsApi } from "./notifications";
import { commentApi } from "./comments";
import { campaignUpdateApi } from "./campaignUpdates";
import { notificationSettingsApi } from "./notificationSettings";
import { activityApi } from "./activityLogs";
import { verificationCenterApi } from "./verificationCenter";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [campaignsApi.reducerPath]: campaignsApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [campaignUpdateApi.reducerPath]: campaignUpdateApi.reducer,
    [notificationSettingsApi.reducerPath]: notificationSettingsApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [verificationCenterApi.reducerPath]: verificationCenterApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      profileApi.middleware,
      campaignsApi.middleware,
      notificationsApi.middleware,
      commentApi.middleware,
      campaignUpdateApi.middleware,
      notificationSettingsApi.middleware,
      activityApi.middleware,
      verificationCenterApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
