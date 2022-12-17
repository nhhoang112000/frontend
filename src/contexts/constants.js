export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'https://backend-production-ec78.up.railway.app/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'recourses'

export const COURSES_LOADED_SUCCESS = 'COURSES_LOADED_SUCCESS'
export const COURSES_LOADED_FAIL = 'COURSES_LOADED_FAIL'
export const ADD_COURSE = 'ADD_COURSE'
export const DELETE_COURSE = 'DELETE_COURSE'
export const UPDATE_COURSE = 'UPDATE_COURSE'
export const FIND_COURSE = 'FIND_COURSE'

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const FIND_POST = 'FIND_POST'