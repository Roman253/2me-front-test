import API from '../api/api';

export const getProfile = async () => {
    const response = await API.get('/profile');
    return response.data;
}

export const updateProfile = async (user) => {
    console.log('user', user);
    const response = await API.post('/profile', user);
    return response.data;
}

export const setNotificationToken = async (token) => {
    const response = await API.post('/notificationToken', { token });
    return response.data;
}