import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { fetchCustomers } from "../api";

interface Customer {
  id: number;
  name: string;
  care_of: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
      setLoading(false);
    };
    getCustomers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <FlatList
      data={customers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.customer_name}>{item.name}</Text>
          <Text style={styles.customer_care_of}>{item.care_of}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  customer_name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  customer_care_of: {
    fontSize: 16,
    color: "black",
  },
});

export default CustomerList;