import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const NotificationSection = () => {
  const [notifications, setNotifications] = useState([]);

  // Simulated real-time notifications
  useEffect(() => {
    // In real app, replace with actual WebSocket or real-time database connection
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New waste bin report from ${['Bandra', 'Andheri', 'Juhu', 'Colaba'][Math.floor(Math.random() * 4)]}`,
        timestamp: new Date().toLocaleTimeString(),
        type: ['alert', 'info', 'warning'][Math.floor(Math.random() * 3)]
      };
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm">
      <Text className="text-lg font-semibold mb-4">Recent Notifications</Text>
      <ScrollView className="max-h-40">
        {notifications.map(notification => (
          <TouchableOpacity 
            key={notification.id}
            className={`p-3 mb-2 rounded-lg ${
              notification.type === 'alert' ? 'bg-red-50' :
              notification.type === 'warning' ? 'bg-yellow-50' :
              'bg-blue-50'
            }`}
          >
            <Text className="text-gray-800">{notification.message}</Text>
            <Text className="text-gray-500 text-sm mt-1">{notification.timestamp}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};