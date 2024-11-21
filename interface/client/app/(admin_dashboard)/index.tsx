import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  RefreshControl 
} from 'react-native';
import NotificationSection from '../../components/NotificationSection';
import { TallySection } from '../../components/TallySection';

const HomePage = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView
        className="px-4 py-2"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#A67B5B', '#8DA399']} // warmBrowns default and softGreens default
            progressBackgroundColor="#FFFDD0" // cream
          />
        }
      >
        <View className="mb-6">
          <Text 
            className="text-2xl font-psemibold text-warmBrowns-dark mb-2"
          >
            Good Morning, Admin
          </Text>
          <Text 
            className="text-base font-pregular text-gray-600"
          >
            Here's an overview of your waste management system
          </Text>
        </View>

        <View className="mb-6">
          <NotificationSection />
        </View>

        <View>
          <TallySection />
        </View>

        <View className="mt-6 mb-4">
          <TouchableOpacity 
            className="bg-warmBrowns-default p-4 rounded-xl flex-row justify-center items-center"
            onPress={() => {
              // Navigation to detailed view or action
            }}
          >
            <Text className="text-white font-psemibold text-lg">
              View Full Report
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;