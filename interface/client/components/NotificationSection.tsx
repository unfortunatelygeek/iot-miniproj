import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';

const NotificationSection = () => {
  interface Notification {
    id: string;
    message: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
    type: 'alert' | 'warning' | 'info';
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    interface Notification {
      id: string;
      message: string;
      timestamp: {
      seconds: number;
      nanoseconds: number;
      };
      type: 'alert' | 'warning' | 'info';
    }

    const unsubscribe = firebase.firestore()
      .collection('notifications')
      .orderBy('timestamp', 'desc')
      .limit(5)
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      const newNotifications: Notification[] = snapshot.docs.map((doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => ({
      id: doc.id,
      ...doc.data(),
      })) as Notification[];
      setNotifications(newNotifications);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm">
      <Text className="text-lg font-semibold mb-4">Recent Notifications</Text>
      <ScrollView>
        {notifications.map(notification => (
          <TouchableOpacity key={notification.id} className={`p-3 mb-2 rounded-lg ${
            notification.type === 'alert' ? 'bg-red-50' :
            notification.type === 'warning' ? 'bg-yellow-50' :
            'bg-blue-50'
          }`}>
            <View className="flex-row items-center">
              <Text className="text-gray-800 font-medium">{notification.message}</Text>
              <Text className="text-gray-500 text-sm mt-1">{new Date(notification.timestamp.seconds * 1000).toLocaleTimeString()}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationSection;