import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Admin profile interface for type safety and future database integration
interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  assignedLocality: string;
  joinDate: string;
  avatarUrl?: string;
}

const AdminProfileScreen = () => {
  const adminData: AdminProfile = {
    id: 'ADMIN_001',
    name: 'John Doe',
    email: 'john.doe@binmanagement.com',
    phoneNumber: '+1 (555) 123-4567',
    role: 'Senior Waste Management Administrator',
    assignedLocality: 'Downtown Metro Area',
    joinDate: '2023-06-15',
    avatarUrl: 'https://example.com/avatar.jpg' // Replace with actual avatar URL or local image
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={
              adminData.avatarUrl 
                ? { uri: adminData.avatarUrl } 
                : require('../../assets/adaptive-icon.png')
            } 
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.editIconContainer}>
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{adminData.name}</Text>
        <Text style={styles.roleText}>{adminData.role}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={24} color="#666" />
          <Text style={styles.infoText}>{adminData.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={24} color="#666" />
          <Text style={styles.infoText}>{adminData.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Professional Details</Text>
        <View style={styles.infoRow}>
          <Ionicons name="id-card" size={24} color="#666" />
          <Text style={styles.infoText}>Admin ID: {adminData.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={24} color="#666" />
          <Text style={styles.infoText}>Assigned Locality: {adminData.assignedLocality}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={24} color="#666" />
          <Text style={styles.infoText}>Join Date: {adminData.joinDate}</Text>
        </View>
      </View>

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

export default AdminProfileScreen;