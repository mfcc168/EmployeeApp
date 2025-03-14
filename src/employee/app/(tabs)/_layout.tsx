import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { Platform, ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { ClipboardList, PackageSearch, FileUser, Scan } from 'lucide-react-native';
const config = require('@/gluestack-ui.config.json');

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loading, role } = useAuth();


  // Show loading indicator while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect href="/login" />;
  }


  return (
    <GluestackUIProvider config={config}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Products',
            tabBarIcon: ({ color }) => <PackageSearch size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="invoices"
          options={{
            title: 'Invoices',
            tabBarIcon: ({ color }) => <ClipboardList size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="customers"
          options={{
            title: 'Customers',
            tabBarIcon: ({ color }) => <FileUser size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="bar_code_scanner"
          options={{
            title: 'Barcode',
            href: role === 'Clerk' ? null : undefined,
            tabBarIcon: ({ color }) => <Scan size={28} color={color} />,
          }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}
