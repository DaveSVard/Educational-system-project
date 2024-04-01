import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import axios from 'axios';
import adminReducer from '../features/admin/adminSlice';
import studentReducer from '../features/student/studentSlice';
import teacherReducer from '../features/teacher/teacherSlice';
import courseReducer from '../features/course/courseSlice';
import moduleReducer from '../features/module/moduleSlice';
import groupReducer from '../features/group/groupSlice';
import homeworkReducer from '../features/homework/homeworkSlice';
import gradeReducer from '../features/grade/gradeSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    student: studentReducer,
    teacher: teacherReducer,
    course: courseReducer,
    module: moduleReducer,
    group: groupReducer,
    homework: homeworkReducer,
    grade: gradeReducer
  },
});


export const myAxios = axios.create({
  baseURL: "http://localhost:3001"
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
