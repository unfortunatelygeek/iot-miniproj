import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Driver {
  id: string;
  name: string;
  username: string;  
  location: { latitude: number; longitude: number };
  currentLoad: number;
  maxLoad: number;
}

const driversData: Driver[] = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johnd', 
    location: {
      latitude: 19.076,
      longitude: 72.8777,
    },
    currentLoad: 2,
    maxLoad: 5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janes', 
    location: {
      latitude: 19.1136,
      longitude: 72.8697,
    },
    currentLoad: 1,
    maxLoad: 5,
  },
];
const binsData = [
  {
    id: '1',
    location: { latitude: 19.076, longitude: 72.8777 },
    status: 'full',
    area: 'Bandra',
    assignedTo: null,
  },
  {
    id: '2',
    location: { latitude: 19.1136, longitude: 72.8697 },
    status: 'critical',
    area: 'Andheri',
    assignedTo: null,
  },
  {
    id: '3',
    location: { latitude: 19.0595, longitude: 72.8479 },
    status: 'normal',
    area: 'Juhu',
    assignedTo: '1',
  },
];

const AssignPage = ({ navigation }) => {
  const [selectedBin, setSelectedBin] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);

  const handleBinSelect = (bin) => {
    setSelectedBin(bin);
    setSelectedDriver(null);
    setIsAssignModalVisible(true);
  };

  const handleDriverSelect = (driver) => {
    if (driver.currentLoad >= driver.maxLoad) {
      Alert.alert(
        'Capacity Exceeded',
        'This driver has reached maximum bin assignment capacity.'
      );
      return;
    }
    setSelectedDriver(driver);
  };

  const assignBinToDriver = () => {
    if (!selectedBin || !selectedDriver) {
      Alert.alert('Incomplete Selection', 'Select both a bin and a driver.');
      return;
    }
  
    // Simulated API call (replace with actual API call in real app)
    const assignmentPayload = {
      binId: selectedBin.id,
      driverUsername: selectedDriver.username,  // Send username
      location: selectedBin.location,
      status: selectedBin.status
    };
  
    // Simulate sending to backend
    console.log('Bin Assignment:', assignmentPayload);
  
    Alert.alert(
      'Bin Assigned',
      `Bin ${selectedBin.id} in ${selectedBin.area} assigned to ${selectedDriver.name}`,
      [
        {
          text: 'OK',
          onPress: () => {
            const updatedBins = binsData.map((bin) =>
              bin.id === selectedBin.id
                ? { 
                    ...bin, 
                    assignedTo: selectedDriver.id,
                    assignedToUsername: selectedDriver.username  // Store username
                  }
                : bin
            );
  
            setIsAssignModalVisible(false);
            setSelectedBin(null);
            setSelectedDriver(null);
  
            console.log('Updated Bins:', updatedBins);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1">
        {/* Map Section */}
        <MapView
          className="flex-1"
          initialRegion={{
            latitude: 19.076,
            longitude: 72.8777,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {/* Bins Markers */}
          {binsData.map((bin) => (
            <Marker
              key={bin.id}
              coordinate={bin.location}
              pinColor={
                bin.status === 'full'
                  ? 'red'
                  : bin.status === 'critical'
                  ? 'orange'
                  : 'green'
              }
              onPress={() => handleBinSelect(bin)}
            />
          ))}

          {/* Drivers Markers */}
          {driversData.map((driver) => (
            <Marker
              key={driver.id}
              coordinate={driver.location}
              title={driver.name}
              description={`Current Load: ${driver.currentLoad}/${driver.maxLoad}`}
              pinColor="blue"
            />
          ))}
        </MapView>

        {/* Bin List Section */}
        <View className="p-4 bg-white">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Unassigned Bins
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {binsData
              .filter((bin) => !bin.assignedTo)
              .map((bin) => (
                <TouchableOpacity
                  key={bin.id}
                  className={`p-3 mr-2 rounded-lg ${
                    bin.status === 'full'
                      ? 'bg-red-100'
                      : bin.status === 'critical'
                      ? 'bg-orange-100'
                      : 'bg-green-100'
                  }`}
                  onPress={() => handleBinSelect(bin)}
                >
                  <Text className="font-medium">
                    Bin {bin.id} - {bin.area}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Status: {bin.status}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>

      {/* Modal Section */}
      <Modal
        visible={isAssignModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-center bg-orange-950 bg-opacity-30 p-6">
          <View className="bg-earthyTans rounded-lg p-4">
            <Text className="text-lg font-bold mb-4">Select a Driver</Text>
            <ScrollView>
              {driversData.map((driver) => (
                <TouchableOpacity
                  key={driver.id}
                  className="p-3 border-b border-gray-200"
                  onPress={() => handleDriverSelect(driver)}
                >
                  <Text className="font-medium">{driver.name}</Text>
                  <Text className="text-sm text-gray-600">
                    Current Load: {driver.currentLoad}/{driver.maxLoad}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Assign Button */}
            {selectedDriver && (
              <TouchableOpacity
                className="bg-green-500 p-4 rounded-lg mt-4"
                onPress={assignBinToDriver}
              >
                <Text className="text-white text-center font-bold">
                  Assign to {selectedDriver.name}
                </Text>
              </TouchableOpacity>
            )}

            {/* Cancel Button */}
            <TouchableOpacity
              className="bg-gray-300 p-4 rounded-lg mt-2"
              onPress={() => setIsAssignModalVisible(false)}
            >
              <Text className="text-center font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AssignPage;
