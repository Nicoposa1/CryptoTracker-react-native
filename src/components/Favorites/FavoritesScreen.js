import React, { Component } from "react";
import { Text, View } from "react-native";

import Colors from "../../res/colors";
import FavoritesEmptyState from "./FavoritesEmptyState";
import { StyleSheet } from "react-native";

class FavoriteScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FavoritesEmptyState />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoriteScreen;
