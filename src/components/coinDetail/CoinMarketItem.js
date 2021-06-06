import { StyleSheet, Text, View } from "react-native";

import Colors from "../../res/colors";
import React from "react";

const CoinDetailScreen = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price_usd}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: Colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    alignItems: "center",
  },
  nameText: {
    fontWeight: "bold",
    color: Colors.white,
  },
  priceText: {
    color: Colors.white,
  },
});

export default CoinDetailScreen;
