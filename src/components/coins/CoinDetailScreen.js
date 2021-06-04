import { Image, SectionList, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

import Colors from "../../res/colors";

class CoinDetailScreen extends Component {
  state = {
    coin: {},
  };
  getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(" ", "-");
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.setState({ coin });
  }

  getSections = (coin) => {
    const sections = [
      {
        title: "Market Cap",
        data: [coin.market_cap_usd],
      },
      {
        title: "Volumen 24h",
        data: [coin.volume24],
      },
      {
        title: "Change 24h",
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  render() {
    const { coin } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image
            style={styles.iconImg}
            source={{ uri: this.getSymbolIcon(coin.name) }}
          ></Image>
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <SectionList
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  subHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
    textAlign: "center",
  },
  iconImg: {
    height: 25,
    width: 25,
  },
  sectionHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  sectionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CoinDetailScreen;
