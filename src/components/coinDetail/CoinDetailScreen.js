import {
  FlatList,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Component } from "react";

import CoinMarketItem from "./CoinMarketItem";
import Colors from "../../res/colors";
import Http from "../../libs/http";
import Storage from "../../libs/storage";

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };
  getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(" ", "-");
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    this.setState({ markets });
  };

  toggleFavortie = () => {
    if (this.state.isFavorite) {
      this.removeFavorite;
    } else {
      this.addFavorite();
    }
  };

  addFavorite = () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = Storage.instance.store(key, coin);
    if (stored) {
      this.setState({ isFavorite: true });
    }
  };

  removeFavorite = () => {
    const coin = JSON.stringify(this.state.coin);
  };

  componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.getMarkets(coin.id);
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
    const { coin, markets, isFavorite } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{ uri: this.getSymbolIcon(coin.name) }}
            ></Image>
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toggleFavortie}
            style={[
              styles.btnFavorites,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}
          >
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? "Remove favorite" : "Add favorite"}
            </Text>
          </Pressable>
        </View>
        <SectionList
          stlyle={styles.section}
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

        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.list}
          horizontal={true}
          data={markets}
          renderItem={({ item }) => <CoinMarketItem item={item} />}
          keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
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
  row: {
    flexDirection: "row",
  },
  subHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
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
  list: {
    maxHeight: 100,
    paddingLeft: 16,
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
  marketTitle: {
    color: Colors.white,
    marginBottom: 16,
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "bold",
  },
  section: {
    maxHeight: 220,
  },
  btnFavorites: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
