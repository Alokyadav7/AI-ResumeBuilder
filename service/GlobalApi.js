import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

const createNewResume = (data) => axiosClient.post('/user-resumes', data);

const GetUserResume = (UserEmail) => axiosClient.get(`/user-resumes?filters[UserEmail][$eq]=${UserEmail}`);

const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);

export default {
  createNewResume,
  GetUserResume,
  UpdateResumeDetail
};
