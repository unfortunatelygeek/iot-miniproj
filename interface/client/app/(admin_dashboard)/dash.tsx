import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

const DashboardScreen = () => {
  // Mock data (you'll replace these with actual data from your backend/context)
  const binStatusData = {
    labels: ['Empty', 'Half Full', 'Almost Full', 'Full'],
    datasets: [{
      data: [45, 30, 15, 10]
    }]
  };

  const collectionEfficiencyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [65, 70, 72, 68, 75, 80, 73]
    }]
  };

  const binLocationPieData = [
    { name: 'Residential', population: 40, color: '#3366cc' },
    { name: 'Commercial', population: 30, color: '#dc3912' },
    { name: 'Industrial', population: 20, color: '#ff9900' },
    { name: 'Public Spaces', population: 10, color: '#109618' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Bin Management Dashboard</Text>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Bin Status Distribution</Text>
        <BarChart
          data={binStatusData}
          width={350}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          verticalLabelRotation={30}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Collection Efficiency</Text>
        <LineChart
          data={collectionEfficiencyData}
          width={350}
          height={220}
          yAxisLabel="%"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          }}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Bin Locations by Type</Text>
        <PieChart
          data={binLocationPieData}
          width={350}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Quick Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Bins:</Text>
          <Text style={styles.statValue}>250</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Bins Requiring Immediate Collection:</Text>
          <Text style={styles.statValue}>15</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Average Collection Time:</Text>
          <Text style={styles.statValue}>4.2 hours</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;