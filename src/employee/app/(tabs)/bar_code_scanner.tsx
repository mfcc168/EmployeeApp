import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, Switch, SafeAreaView, Platform } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import axios from 'axios';

export default function BarcodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeliveryMode, setIsDeliveryMode] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const updateInvoiceDate = async (invoiceNumber: string) => {
    try {
      const apiUrl = isDeliveryMode
        ? 'https://mfcc.pythonanywhere.com/api/update-delivery-date/'
        : 'https://mfcc.pythonanywhere.com/api/update-payment-date/';

      const requestData = {
        number: invoiceNumber,
        [isDeliveryMode ? 'delivery_date' : 'payment_date']: new Date().toISOString().split('T')[0],
      };

      const response = await axios.patch(apiUrl, requestData);

      if (response.status === 200) {
        setScannedData(`Invoice ${invoiceNumber} updated successfully (${isDeliveryMode ? 'Delivered' : 'Paid'})`);
      } else {
        setScannedData(`Failed to update invoice ${invoiceNumber}`);
      }
    } catch (error) {
      console.error('Error updating invoice date:', error);
      setScannedData(`Error updating invoice ${invoiceNumber}`);
    }
  };

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    if (scanned) return;

    setScanned(true);
    updateInvoiceDate(data);
    setIsModalVisible(true);

    // Reset scanner after a delay to prevent black screen issue
    setTimeout(() => setScanned(false), 3000);
  };

  if (hasPermission === null) return <Text>Requesting for camera permission</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Delivery</Text>
        <Switch value={!isDeliveryMode} onValueChange={() => setIsDeliveryMode((prev) => !prev)} />
        <Text style={styles.switchLabel}>Payment</Text>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['code128', 'pdf417'] }}
        />
      </View>

      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{scannedData}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  switchLabel: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
