import React from "react";
import { ScrollView, View, Text } from "react-native";

const TallyCard = ({ title, count, change }) => (
  <View className="bg-white p-4 rounded-xl shadow-sm">
    <Text className="text-gray-600 font-medium">{title}</Text>
    <Text className="text-2xl font-bold mt-2">{count}</Text>
    <Text
      className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}
    >
      {change >= 0 ? "+" : ""}
      {change}% from yesterday
    </Text>
  </View>
);

const AreaTally = () => (
  <View className="space-y-4">
    <Text className="text-lg font-semibold">Area-wise Tally</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row space-x-4">
        <TallyCard title="Bandra" count={15} change={5} />
        <TallyCard title="Andheri" count={23} change={-2} />
        <TallyCard title="Juhu" count={12} change={8} />
        <TallyCard title="Colaba" count={18} change={3} />
        <TallyCard title="Dadar" count={20} change={-1} />
      </View>
    </ScrollView>
  </View>
);

const TallySection = () => {
  return (
    <View className="space-y-6">
      <View className="grid grid-cols-2 gap-4">
        <TallyCard title="Total Bins" count={88} change={4} />
        <TallyCard title="Critical Bins" count={12} change={-2} />
        <TallyCard title="Cleared Today" count={45} change={12} />
        <TallyCard title="Pending" count={43} change={-8} />
      </View>
      <AreaTally />
    </View>
  );
};
