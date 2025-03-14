import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { View, Text, Button, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { auth } from '@/config/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function HomeScreen() {
  const { user, loading, name } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert('Failed to log out.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <View>
          <Text style={styles.title}>Welcome, {name}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
