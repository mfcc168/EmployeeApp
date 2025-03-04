import { Image, StyleSheet, Platform, SafeAreaView } from 'react-native';

import CustomerList from '@/components/CustomerList';

export default function CustomerScreen() {
  return (  
      <SafeAreaView>
        <CustomerList />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
