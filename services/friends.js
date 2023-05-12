import API from '../api/api';

export const getFriends = async () => {
    const response = await API.get('/friends');
    return response.data;
}

export const getUsers = async () => {
    const response = await API.get('/users');
    return response.data;
}

export const addFriend = async (friendId) => {
    const response = await API.post('/friends', { friendId });
    return response.data;
}

export const deleteFriend = async (id) => {
    await API.delete(`/friends/${id}`);
}