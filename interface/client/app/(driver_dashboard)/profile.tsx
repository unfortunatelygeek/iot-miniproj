import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Driver Profile Interface
interface DriverProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  assignedVehicle: {
    model: string;
    registrationNumber: string;
  };
  performanceMetrics: {
    binsCollected: number;
    completionRate: number;
    averageResponseTime: string;
  };
  avatarUrl?: string;
}

const DriverProfileScreen = () => {
  // Mock driver data - will be replaced with actual database fetch
  const [driverData] = useState<DriverProfile>({
    id: 'DRIVER_002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@binmanagement.com',
    phoneNumber: '+1 (555) 987-6543',
    licenseNumber: 'DL-7890-XYZ',
    assignedVehicle: {
      model: 'Waste Management Truck',
      registrationNumber: 'WM-2023-001'
    },
    performanceMetrics: {
      binsCollected: 157,
      completionRate: 94.5,
      averageResponseTime: '2.3 hrs'
    },
    avatarUrl: 'https://example.com/driver-avatar.jpg' // Replace with actual avatar
  });

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={
              driverData.avatarUrl 
                ? { uri: driverData.avatarUrl } 
                : require('../../assets/images/profile.png')
            } 
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.editIconContainer}>
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{driverData.name}</Text>
        <Text style={styles.roleText}>Waste Collection Driver</Text>
      </View>

      {/* Contact Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={24} color="#666" />
          <Text style={styles.infoText}>{driverData.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={24} color="#666" />
          <Text style={styles.infoText}>{driverData.phoneNumber}</Text>
        </View>
      </View>

      {/* Professional Details Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Professional Details</Text>
        <View style={styles.infoRow}>
          <Ionicons name="id-card" size={24} color="#666" />
          <Text style={styles.infoText}>Driver ID: {driverData.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="document" size={24} color="#666" />
          <Text style={styles.infoText}>License: {driverData.licenseNumber}</Text>
        </View>
      </View>

      {/* Vehicle Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Vehicle Assignment</Text>
        <View style={styles.infoRow}>
          <Ionicons name="truck" size={24} color="#666" />
          <Text style={styles.infoText}>
            {driverData.assignedVehicle.model}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="car" size={24} color="#666" />
          <Text style={styles.infoText}>
            Reg. No: {driverData.assignedVehicle.registrationNumber}
          </Text>
        </View>
      </View>

      {/* Performance Metrics Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <View style={styles.metricsContainer}>
          <View style={styles.metricBox}>
            <Text style={styles.metricNumber}>
              {driverData.performanceMetrics.binsCollected}
            </Text>
            <Text style={styles.metricLabel}>Bins Collected</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricNumber}>
              {driverData.performanceMetrics.completionRate}%
            </Text>
            <Text style={styles.metricLabel}>Completion Rate</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricNumber}>
              {driverData.performanceMetrics.averageResponseTime}
            </Text>
            <Text style={styles.metricLabel}>Avg. Response Time</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings" size={24} color="white" />
          <Text style={styles.actionButtonText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="log-out" size={24} color="white" />
          <Text style={styles.actionButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  profileHeader: {
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 5,
  },
  nameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  roleText: {
    color: '#bdc3c7',
    fontSize: 16,
  },
  infoSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '30%',
  },
  metricNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  actionButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default DriverProfileScreen;