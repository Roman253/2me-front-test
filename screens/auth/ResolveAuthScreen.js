import React, {useEffect, useContext} from 'react';
import { useInterpolateConfig } from 'react-native-reanimated';
import { Context as AuthContext} from '../../store/AuthContext';

const ResolveAuthScreen = () => {
    const { trylocalSignin} = useContext(AuthContext);
    
    useEffect (() => {
        trylocalSignin();
    }, []);

    return null;
};

export default ResolveAuthScreen;