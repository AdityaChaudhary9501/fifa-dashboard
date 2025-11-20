import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const getTopGoals = async () => {
    const response = await axios.get(`${API_URL}/stats/goals`);
    return response.data;
};

export const getTopAssists = async () => {
    const response = await axios.get(`${API_URL}/stats/assists`);
    return response.data;
};

export const getTopGARatio = async () => {
    const response = await axios.get(`${API_URL}/stats/ga_ratio`);
    return response.data;
};

export const getTopSaves = async () => {
    const response = await axios.get(`${API_URL}/stats/saves`);
    return response.data;
};

export const getTopClutch = async () => {
    const response = await axios.get(`${API_URL}/stats/clutch`);
    return response.data;
};
