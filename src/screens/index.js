import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import CharacterCard from "../components/CharacterCard";

// eslint-disable-next-line
//jest.useFakeTimers();

const AppIndex = () => {
  const [character, setCharacter] = useState([]);
  const [page, setPage] = useState(1);
  const getCharacterData = async (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => {
        setPage(page + 1);
        setCharacter((character) => character.concat(response.data.results));
      })
      .catch(() => {
        Alert.alert("Error");
      });
  };

  useEffect(() => {
    getCharacterData(page);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={character}
        renderItem={({ item, index }) => (
          <CharacterCard item={item} key={index} />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={page < 43 ? () => getCharacterData(page) : null}
      />
    </View>
  );
};

export default AppIndex;
