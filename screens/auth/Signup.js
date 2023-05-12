import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import LoadingOverlayAuth from '../../components/UI/LoadingOverlayAuth';
import { AuthContext} from '../../store/AuthContext';
import { useNavigation } from "@react-navigation/native";


function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigation = useNavigation();

  async function signupHandler({email, password}) {
    setLoading(true);
    try {
      await signup({userName: email, email, password});
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Signup failed',
        error.message
      );
    }
    setLoading(false);
  }
    
  if (loading){
    return <LoadingOverlayAuth message="creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
