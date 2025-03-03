import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { fetchInvoices } from "../api";

interface Invoice {
  id: number;
  number: string;
  customer: string;
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getInvoices = async () => {
      const data = await fetchInvoices();
      setInvoices(data);
      setLoading(false);
    };
    getInvoices();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <FlatList
      data={invoices}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.invoice_number}>{item.number}</Text>
          <Text style={styles.customer_id}>{item.customer}</Text>
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
  invoice_number: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  customer_id: {
    fontSize: 16,
    color: "black",
  },
});

export default InvoiceList;