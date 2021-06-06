import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { Component } from "react";

import CoinsItem from "./CoinsItem";
import Colors from "../../res/colors";
import Http from "../../libs/http";

class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const res = await Http.instance.get(
      "https://api.coinlore.net/api/tickers/"
    );
    this.setState({ coins: res.data, loading: false });
  };

  handlePress = (coin) => {
    this.props.navigation.navigate("CoinDetail", { coin });
  };
  render() {
    const { coins, loading } = this.state;

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" style={styles.loader} />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({ item }) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
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
    shadowOpacity: 0,
  },
  titleText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 3,
  },
  btn: {
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
