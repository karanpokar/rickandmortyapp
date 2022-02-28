import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

const CharacterCard = ({ item }) => {
  const [visible, setVisible] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [episode, setEpisode] = useState("");
  const [name, setName] = useState("");
  // eslint-disable-next-line
  //jest.useFakeTimers();
  //const [episode,setEpisode]=useState('')

  const fetchEpisodes = async () => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episode}`)
      .then((res) => {
        item.episode.length < 2
          ? setEpisodeList([res.data])
          : setEpisodeList(res.data);
      })
      .catch(() => Alert.alert("Error"));
  };

  useEffect(() => {
    var episod = "";
    var episodes = item.episode;
    setName(item.name);
    for (var j = 0; j < episodes.length; j++) {
      episod =
        String(episod) +
        String(j != 0 ? "," : "") +
        String(episodes[j].split("/")[5]);
    }

    setEpisode(episod);
  }, [item]);
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        setVisible(true);
        fetchEpisodes();
      }}
      style={styles.cardContainer}
    >
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        transparent
      >
        <View style={{ flex: 1, height: Dimensions.get("screen").height }}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{ height: 80, backgroundColor: "rgba(0,0,0,0.4)" }}
          ></TouchableOpacity>
          <View style={styles.episodeContainer}>
            <FlatList
              data={episodeList}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <>
                  <Text style={styles.episodeListHeader}>
                    {name} appeared in {item.episode.length}{" "}
                    {item.episode.length > 1 ? "episodes" : "episode"}
                  </Text>
                  <View
                    key={0}
                    style={{ flexDirection: "row", flex: 1, marginVertical: 8 }}
                  >
                    <Text style={{ ...styles.episodeName, fontWeight: "bold" }}>
                      {"Episode"}
                    </Text>
                    <Text style={{ ...styles.episodeName, fontWeight: "bold" }}>
                      Episode Name
                    </Text>
                  </View>
                  <View
                    style={{ ...styles.divider, backgroundColor: "white" }}
                  ></View>
                </>
              )}
              renderItem={({ item }) => (
                <>
                  <View key={item.id} style={styles.episodeListItem}>
                    <Text style={styles.episodeName}>{item.episode}</Text>
                    <Text style={styles.episodeName}>{item.name}</Text>
                  </View>
                  <View style={styles.divider}></View>
                </>
              )}
            />
          </View>
        </View>
      </Modal>
      <Image
        source={{
          uri: item.image,
        }}
        style={{
          resizeMode: "contain",
          height: "100%",
          width: "100%",
          flex: 0.75,
          borderRadius: 10,

          overflow: "hidden",
        }}
      />
      <View style={{ margin: 10, justifyContent: "space-evenly", flex: 1 }}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={{ ...styles.cardsubText, fontWeight: "500" }}>
          {item.species}({item.status})
        </Text>
        <Text style={{ ...styles.cardsubText, fontWeight: "500" }}>
          Location : {item.location.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    backgroundColor: "#3c3e44",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  episodeContainer: {
    flex: 1,
    backgroundColor: "#3c3e44",
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  episodeListHeader: {
    color: "white",
    fontSize: 18,
    flex: 1,
    fontWeight: "bold",
    marginVertical: 15,
  },
  episodeListItem: { flexDirection: "row", flex: 1, marginVertical: 8 },
  episodeName: { color: "white", fontSize: 16, flex: 1 },
  divider: {
    backgroundColor: "grey",
    height: 1,
    width: "100%",
  },
  cardText: { fontWeight: "700", color: "white", fontSize: 16 },
  cardSubText: { fontWeight: "500", color: "white", fontSize: 14 },
});
