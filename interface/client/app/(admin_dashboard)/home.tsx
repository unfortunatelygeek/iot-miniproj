import React from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { NotificationSection } from '@/components/NotificationSection';
import { TallySection } from '@/components/TallySection';

const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4 space-y-6">
          {/* Header */}
          <View className="mb-2">
            <Text className="text-2xl font-bold text-gray-800">Dashboard</Text>
            <Text className="text-gray-500">Welcome back, Admin</Text>
          </View>

          <NotificationSection />

          <TallySection />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;