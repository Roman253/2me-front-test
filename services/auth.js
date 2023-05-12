import API from '../api/api';

export const login = async (email, password) => {
    const response = await API.post('/login', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
}

export const signup = async (email, password) => {
    const response = await API.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
}

export const logout = async () => {
    await AsyncStorage.removeItem('token');
}
