import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect, useState } from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { setNotificationToken } from '../services/profile';
import { getFriends } from '../services/friends';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


function WelcomeScreen() {
  const [currentUser, setCurrentUser] = useState(null)
  const {user} = useAuthentication()

  useEffect(() => {
    (() => registerForPushNotificationsAsync())();
  }, [user]);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      try {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        try {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        } catch (error) {
          console.log(error);
        }
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (token) {
      await setNotificationToken(token);
    }

    return token;
  }

  const sendNotification = async (token, userName) => {
      const message = {
        to: token,
        sound: 'default',
        title: 'Call Me',
        body: userName,
        data: { someData: 'goes here' },
      };
      
      try {
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
        const res = response.json();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
  };

  const sendNotificationToAllFriends = async () => {
    const friends = await getFriends();
    console.log('friends', friends);
    friends.map(async (friend) => {
      if(friend.notificationToken){
        try {
          console.log('friend.notificationToken', friend.notificationToken);
          await sendNotification(friend.notificationToken, friend.userName)
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.screen}>
        <TouchableOpacity
            onPress={sendNotificationToAllFriends}
            style={styles.roundButton1}>
            <Text>Call</Text>
            <Text>Friend</Text>
        </TouchableOpacity>
       {/* <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton2}>
            <Text>5:00</Text>
        </TouchableOpacity>
      */}
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#eb1064',
  },  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton1: {
    padding: 50,
    marginTop: 20,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#ccc',
  },
  roundButton2: {
    marginTop: 150,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 37,
    backgroundColor: '#be7b1c',
  },
});


