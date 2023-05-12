import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import {StyleSheet, View, Text, TextInput, KeyboardAvoidingView,  Alert} from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/style';
import UserForm from '../components/ManageFriend/UserForm';
import { AuthContext } from '../store/AuthContext';
import { updateProfile } from '../services/profile';


KeyboardAvoidingView
function ManageUser({ route, navigation}) {
    const {user} = useContext(AuthContext);

    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        console.log('user', user);
        if(user){
            setCurrentUser(user);
        }
    }, [user]);

    async function deleteUserHandler(){
        // await deleteUser(currentUser.id);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(userData) {
        console.log('userData', userData);
        const userIsValid = userData.userName.trim().length>0;
        const emailIsValid = userData.email.trim().length>0;
        
        if (!userIsValid || !emailIsValid ) {
            Alert.alert('Invalid input','Please check your input values');
            return; 
        }
        await updateProfile(userData);
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View
                style={styles.container}
            >
                <UserForm 
                    onCancel={cancelHandler}
                    onSubmit={confirmHandler}
                    defaultValues={currentUser || {}}
                /> 
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36} 
                        onPress={deleteUserHandler}
                    />
                </View>                
            </View>
    </KeyboardAvoidingView> 
    );
}

export default ManageUser;

const styles =StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
//        borderTopWidth: 2,
//        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
    userName:{
        color: GlobalStyles.colors.primary200,
        fontSize:24,
        padding:10
    },
    userContainer:{
        alignItems: 'center',
//        borderBottomColor: GlobalStyles.colors.primary200,
//        borderBottomWidth: 2,
        marginBottom: 50,
    }

})