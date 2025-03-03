import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { ClipboardList, PackageSearch, FileUser, Scan } from 'lucide-react-native';
const config = require('../../gluestack-ui.config.json');

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
            tabBarIcon: ({ color }) => <Scan size={28} color={color} />,
          }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}
