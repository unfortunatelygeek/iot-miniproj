import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  Linking, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Simulated driver data and notifications
interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'info' | 'warning';
}

interface PendingBin {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: 'pending' | 'critical' | 'normal';
  assignedToUsername?: string;  
}
const DriverHomeScreen = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pendingBins, setPendingBins] = useState<PendingBin[]>([]);
  const [selectedBin, setSelectedBin] = useState<PendingBin | null>(null);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);

    useEffect(() => {
    // Fetch driver's username from secure storage
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('driverUsername');
        setUsername(storedUsername);
      } catch (error) {
        console.error('Error fetching username', error);
      }
    };

    fetchUsername();
  }, []);

  // Simulated bin assignments
  useEffect(() => {
    // Simulate receiving bin assignments
    const simulateAssignments = () => {
      const possibleBins: PendingBin[] = [
        {
          id: '1',
          location: {
            latitude: 19.076,
            longitude: 72.8777,
            address: 'Bandra West, Mumbai'
          },
          status: 'critical'
        },
        {
          id: '2',
          location: {
            latitude: 19.1136,
            longitude: 72.8697,
            address: 'Andheri East, Mumbai'
          },
          status: 'pending'
        }
      ];

      // Simulate a new bin assignment notification
      const newNotification: Notification = {
        id: Date.now().toString(),
        message: `New bin assignment in ${possibleBins[0].location.address}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'info'
      };

      setNotifications(prev => [newNotification, ...prev]);
      setPendingBins(possibleBins);
    };

    // Run on component mount
    simulateAssignments();
  }, []);

  const handleBinSelect = (bin: PendingBin) => {
    setSelectedBin(bin);
    setIsMapModalVisible(true);
  };

  const openGoogleMaps = () => {
    if (!selectedBin) return;

    // Simulate opening Google Maps
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${selectedBin.location.latitude},${selectedBin.location.longitude}`;
    
    Alert.alert(
      'Open Maps',
      `Navigate to ${selectedBin.location.address}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Open Maps',
          onPress: () => {
            Linking.openURL(googleMapsUrl);
            // Mark bin as in-progress
            const updatedBins = pendingBins.map(bin => 
              bin.id === selectedBin.id 
                ? {...bin, status: 'critical'} 
                : bin
            );
            setPendingBins(updatedBins);
            setIsMapModalVisible(false);
          }
        }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Notifications Section */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-4">Driver Notifications</Text>
        {notifications.map(notification => (
          <TouchableOpacity 
            key={notification.id}
            className={`p-3 mb-2 rounded-lg ${
              notification.type === 'alert' ? 'bg-red-50' :
              notification.type === 'warning' ? 'bg-yellow-50' :
              'bg-blue-50'
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons 
                name={
                  notification.type === 'alert' ? 'alert-circle' :
                  notification.type === 'warning' ? 'warning' :
                  'information-circle'
                } 
                size={24} 
                color={
                  notification.type === 'alert' ? 'red' :
                  notification.type === 'warning' ? 'orange' :
                  'blue'
                } 
                className="mr-3"
              />
              <View>
                <Text className="text-gray-800 font-medium">{notification.message}</Text>
                <Text className="text-gray-500 text-sm mt-1">{notification.timestamp}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pending Bins Section */}
      <View>
        <Text className="text-xl font-bold mb-4">Pending Bin Collections</Text>
        {pendingBins.map(bin => (
          <TouchableOpacity 
            key={bin.id}
            className={`p-4 mb-3 rounded-lg flex-row justify-between items-center ${
              bin.status === 'critical' ? 'bg-red-100' :
              bin.status === 'pending' ? 'bg-blue-100' :
              'bg-green-100'
            }`}
            onPress={() => handleBinSelect(bin)}
          >
            <View>
              <Text className="font-bold">Bin {bin.id}</Text>
              <Text className="text-gray-600">{bin.location.address}</Text>
            </View>
            <Ionicons 
              name="location" 
              size={24} 
              color={
                bin.status === 'critical' ? 'red' :
                bin.status === 'pending' ? 'blue' :
                'green'
              } 
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Map Modal */}
      <Modal
        visible={isMapModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-center bg-black bg-opacity-50 p-4">
          <View className="bg-white rounded-lg p-6">
            <Text className="text-lg font-bold mb-4">Bin Location Details</Text>
            {selectedBin && (
              <>
                <Text className="mb-2">
                  <Text className="font-bold">Address: </Text>
                  {selectedBin.location.address}
                </Text>
                <Text className="mb-2">
                  <Text className="font-bold">Coordinates: </Text>
                  {selectedBin.location.latitude}, {selectedBin.location.longitude}
                </Text>
                <Text className="mb-4">
                  <Text className="font-bold">Status: </Text>
                  {selectedBin.status.toUpperCase()}
                </Text>
              </>
            )}
            <View className="flex-row justify-between">
              <TouchableOpacity 
                className="bg-gray-200 p-3 rounded-lg flex-1 mr-2"
                onPress={() => setIsMapModalVisible(false)}
              >
                <Text className="text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-blue-500 p-3 rounded-lg flex-1 ml-2"
                onPress={openGoogleMaps}
              >
                <Text className="text-white text-center">Navigate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DriverHomeScreen;