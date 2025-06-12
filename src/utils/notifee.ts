import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export async function onDisplayNotification(text: string) {
  try {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: text,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
        sound: 'default',
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function onMessageReceived(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  try {
    console.log(message);
    // onDisplayNotification(message?.data?.body as string);
    notifee.displayNotification(JSON.parse(message.data?.notifee as string));
  } catch (error) {
    console.log(error);
  }
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
