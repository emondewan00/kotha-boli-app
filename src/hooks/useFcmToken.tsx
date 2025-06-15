import {useEffect} from 'react';
import {
  getToken,
  getMessaging,
  onTokenRefresh,
} from '@react-native-firebase/messaging';
import {useAppDispatch} from './redux';
import {userApi} from '../api/userApi';

const useFcmToken = (userId: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const messaging = getMessaging();
    const syncToken = async () => {
      const token = await getToken(messaging);
      dispatch(userApi.endpoints.updateFcmToken.initiate(token));
    };

    syncToken();

    const unsubscribe = onTokenRefresh(messaging, token => {
      dispatch(userApi.endpoints.updateFcmToken.initiate(token));
    });

    return unsubscribe;
  }, [userId, dispatch]);
};

export default useFcmToken;
