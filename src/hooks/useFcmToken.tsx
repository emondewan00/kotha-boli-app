import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useAppDispatch} from './redux';
import {userApi} from '../api/userApi';

const useFcmToken = (userId: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const syncToken = async () => {
      const token = await messaging().getToken();
      dispatch(userApi.endpoints.updateFcmToken.initiate(token));
    };

    syncToken();

    const unsubscribe = messaging().onTokenRefresh(token => {
      dispatch(userApi.endpoints.updateFcmToken.initiate(token));
    });

    return unsubscribe;
  }, [userId, dispatch]);
};

export default useFcmToken;
