import {View, Text, StyleSheet, Alert} from 'react-native';
import  {useContext, useEffect} from 'react';
import { useState } from 'react';
import Button from '../components/UI/Button';
import { SelectList } from 'react-native-dropdown-select-list';
import { addFriend, getUsers } from '../services/friends';

function AddFriend ({ route, navigation}) {

    const [friend, setFriend] = useState(null);
    const [users, setUsers] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [isFetching,setIsFetching]=useState(true);

    useEffect(() => {
        (async () => {
            setIsFetching(true);
            const data = await getUsers();
            setUsers(data); 
            const formattedUsersList= data.map(i => ({key: i._id, value: i.userName || i.email}));
            setUsersList(formattedUsersList)
            setIsFetching(false);
        })();
    }, []);
    
    if(isFetching){
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        )
    }

    function cancelHandler() {
        navigation.goBack();
    }

   
    function inputChangeHandler (inputIdentifier, enteredValue) {
        setInputValues((curInputValues)=>{
            return {
                ...curInputValues,
                [inputIdentifier]:enteredValue
            };
        });
    }

    async function submitHandler (){

            if (!friend ){
                Alert.alert('Friend is empty','Fill friend field');
                return; 
            }
            
            await addFriend(friend._id);
            navigation.goBack();
        };

    return (
        <View style={styles.form}>
            {/*<Text style={styles.title}>Add Friend</Text>*/}
            <SelectList 
                setSelected={(val) => {
                    console.log('val', val);
                    const foundUser = users.find(i => i._id === val);
                    if(foundUser){
                        setFriend(foundUser)
                    }
                }}
                data={usersList} 
                label="Select Friend to Add"
            />
            <View style={styles.buttons} >
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>Add</Button>
            </View>
        </View>
    );
}

export default AddFriend;

const styles=StyleSheet.create({
    form: {
        // backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    buttons: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    }
});
