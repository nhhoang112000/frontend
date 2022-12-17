import { createContext, useReducer, useState } from "react";
import { courseReducer } from "../reducers/courseReducer";
import {
  apiUrl,
  COURSES_LOADED_FAIL,
  COURSES_LOADED_SUCCESS,
  ADD_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
  FIND_COURSE,
} from "./constants";
import axios from "axios";

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  // State
  const [courseState, dispatch] = useReducer(courseReducer, {
    course: null,
    courses: [],
    coursesLoading: true,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);
  const [showRateCourse, setShowRateCourse] =useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all courses
  const getCourses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses`);
      if (response.data.success) {
        dispatch({
          type: COURSES_LOADED_SUCCESS,
          payload: response.data.courses,
        });
      }
    } catch (error) {
      dispatch({ type: COURSES_LOADED_FAIL });
    }
  };

  // Add course
  const addCourse = async (newCourse) => {
    try {
      var formData = new FormData();
      formData.append("image", newCourse.image);
      formData.append("title", newCourse.title);
      formData.append("description", newCourse.description);
      formData.append("url", newCourse.url);
      formData.append("cost", newCourse.cost);
      formData.append("type", newCourse.type);
      formData.append("framework", newCourse.framework);
      formData.append("rate", newCourse.rate);
      // formData.append("learner", newCourse.learner ?? []);
      // console.log(formData)
      // console.log(newCourse)
      const response = await axios.post(`${apiUrl}/courses`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        dispatch({ type: ADD_COURSE, payload: response.data.course });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete course
  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`${apiUrl}/courses/${courseId}`);
      if (response.data.success)
        dispatch({ type: DELETE_COURSE, payload: courseId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find course when user is updating course
  const findCourse = (courseId) => {
    const course = courseState.courses.find(
      (course) => course._id === courseId
    );
    dispatch({ type: FIND_COURSE, payload: course });
  };

  // Update course
  const updateCourse = async (updatedCourse) => {
    try {
      var formData = new FormData();
      formData.append("image", updatedCourse.image);
      formData.append("title", updatedCourse.title);
      formData.append("description", updatedCourse.description);
      formData.append("url", updatedCourse.url);
      formData.append("cost", updatedCourse.cost);
      formData.append("type", updatedCourse.type);
      formData.append("framework", updatedCourse.framework);
      formData.append("rate", updatedCourse.rate);

      const response = await axios.put(
        `${apiUrl}/courses/${updatedCourse._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_COURSE, payload: response.data.course });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  //Update rating
  const updateCourseRating = async (updatedCourse) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/courses/update-rate/${updatedCourse._id}`,
        updatedCourse
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_COURSE, payload: response.data.course });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Course context data
  const courseContextData = {
    courseState,
    getCourses,
    imagePreview,
    setImagePreview,
    showAddCourse,
    setShowAddCourse,
    showUpdateCourseModal,
    setShowUpdateCourseModal,
    addCourse,
    showToast,
    setShowToast,
    deleteCourse,
    findCourse,
    updateCourse,
    showRateCourse, 
    setShowRateCourse,
    updateCourseRating,
  };

  return (
    <CourseContext.Provider value={courseContextData}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContextProvider;
