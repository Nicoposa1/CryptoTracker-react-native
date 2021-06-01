import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import Colors from "../../res/colors";

const CoinsItem = ({ item }) => {
  getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require("../../assets/arrow_up.png");
    } else {
      return require("../../assets/arrow_down.png");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>${item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>${item.price_usd}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imageIcon} source={getImageArrow()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS == "ios" ? 16 : 0,
  },
  row: {
    flexDirection: "row",
  },
  symbolText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 16,
  },
  priceText: {
    color: "#fff",
    fontSize: 14,
  },
  percentText: {
    color: "#fff",
    fontSize: 12,
    marginRight: 12,
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
