// import AsyncStorage from '@react-native-async-storage/async-storage';
// import createDataContext from "./createDataContext";
// import API from '../api/api';

// const authReducer = (state, action, navigation) => {
//     switch (action.type) {
//         case 'add_error':
//             return { ...state, errorMessage: action.payload};
//         case 'Login':
//             return {  errorMessage: '', token: action.payload };
//         case 'clear_error_message':
//             return {...state, errorMessage: ''};
//         case 'signout':
//             return {token: null, errorMessage: ''};
//         default:
//             return state;
//     }
// };

// const tryLocalSignin = (dispatch) => async () => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//         dispatch ({ type: 'Login', payload: token });
//         Navigate('WelcomeScreen');
//     } else {
//         navigate('Authcontent');
//     }
// };

// const clearErrorMessage = dispatch => () => {
//     dispatch ({ type: 'clear_error_message'});
// };

// const signup = (dispatch) => {
//     return async ({userName, email, password}) => {
//         try {
//             const response = await API.post('/signup', {userName, email, password});
//             await AsyncStorage.setItem('token', response.data.token);
//             dispatch({ type: 'Login', payload: response.data.token});
//             navigation.replace('AuthContent');

//         } catch (err) {
//             dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'});
//         }

//     };
// };

// const login = (dispatch) => {
//     return async ({ email, password }) => {
//         try {
//             const response = await API.post('/login', {userName, email, password});
//             await AsyncStorage.setItem('token', response.data.token);
//             dispatch({ type: 'login', payload: response.data.token});
//             navigation.replace('AuthContent');
//         } catch (err) {
//             dispatch ({
//                 type:'add_error',
//                 payload: 'Somtheing went wrong with login'
//             });
//         }
//     };
// };

// const signout = async (dispatch) => {
//     await aAsyncStorage. removeItem('token');
//     dispatch({ type: 'signout'});
//     naviate('Authcontent');

// };



// export const { Provider, Context} = createDataContext(
//     authReducer,
//     { login, signup, signout, clearErrorMessage, tryLocalSignin},
//     {token: null, errorMessage: '' }
// );

import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api/api';
import axios from 'axios';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
  
    const login = async (email, password) => {
        try{    
            const response = await API.post('/signin', {email, password}, {"Content-Type": "application/json"});
            await AsyncStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            console.log('user', response.data.user);
            setUser(response.data.user);
        }catch (err) {
            console.log(err.message);
        }
    };
  
    const logout = async () => {
        await AsyncStorage. removeItem('token');
        setIsAuthenticated(false);
        setUser({});
    };

    const signup = async ({userName, email, password}) => {
        try {
            const response = await API.post('/signup', {userName, email, password});
            await AsyncStorage.setItem('token', response.data.token);
            navigation.replace('AuthContent');
        } catch (err) {
            console.log(err);
        }

    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
        {children}
      </AuthContext.Provider>
    );
};
