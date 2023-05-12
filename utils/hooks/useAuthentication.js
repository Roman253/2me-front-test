import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




export function useAuthentication() {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user');
      setUser(JSON.parse(user));
    })();
  }, []);

  return {
    user
  };
}