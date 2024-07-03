import { configureStore } from '@reduxjs/toolkit';
import formReducer from './features/form/form.slice';


const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
