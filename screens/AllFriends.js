import { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import FriendsList from '../components/FriendsOutput/FriendsList';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getFriends } from '../services/friends';
import { useFocusEffect } from '@react-navigation/native';


function AllFriends() {
  const [isFetching,setIsFetching]=useState(true);
  const [friends, setFriends] = useState([])

  useFocusEffect(useCallback(() => {
    (async () => {
      setIsFetching(true);
      const data = await getFriends();
      setFriends(data);
      setIsFetching(false);
    })();
  }, []));

  if(isFetching) {
    return <LoadingOverlay/>
  }

  return (
  <View>    
    <FriendsList friends={friends}/>
  </View>
  );
}

export default AllFriends;
