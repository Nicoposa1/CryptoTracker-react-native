import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import Colors from "../../res/colors";

const CoinsItem = ({ item, onPress }) => {
  getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require("../../assets/arrow_up.png");
    } else {
      return require("../../assets/arrow_down.png");
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>${item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>${item.price_usd}</Text>
      </View>

      <View style={styles.row}>
        <Text
          style={
            item.percent_change_1h > 0
              ? styles.textPercentGreen
              : styles.textPercentRed
          }
        >
          {item.percent_change_1h}
        </Text>
        <Image style={styles.imageIcon} source={getImageArrow()} />
      </View>
    </Pressable>
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
    paddingLeft: Platform.OS == "ios" ? 0 : 16,
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
  textPercentGreen: {
    color: Colors.green,
    fontSize: 12,
    marginRight: 12,
  },
  textPercentRed: {
    color: Colors.red,
    fontSize: 12,
    marginRight: 12,
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
