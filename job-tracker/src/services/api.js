import axios from 'axios';

const API_URL = '/api/applications';

export const fetchApplications = () => axios.get(API_URL);
export const createApplication = (data) => axios.post(API_URL, data);
export const updateApplication = (id, data) => axios.put(`${API_URL}/${id}`, data);
