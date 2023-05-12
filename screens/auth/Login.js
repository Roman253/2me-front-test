import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import { AuthContext} from '../../store/AuthContext';
import LoadingOverlayAuth from '../../components/UI/LoadingOverlayAuth';

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);


  async function loginHandler({email, password}) {
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        error.message
      );
    } 
    setLoading(false);
  }
    
  if (loading){
    return <LoadingOverlayAuth message="Loggin you in..." />;
  } 

  return <AuthContent isLogin onAuthenticate={loginHandler} />;

}

export default LoginScreen;
