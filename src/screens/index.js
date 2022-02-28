import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import CharacterCard from "../components/CharacterCard";

// eslint-disable-next-line
//jest.useFakeTimers();

//Please uncomment the above line to remove the ESLint Error

const AppIndex = () => {
  const [character, setCharacter] = useState([]);
  const [page, setPage] = useState(1);

  {
    /*
getCharacterData is used to fetch Episode List from the API. 
Function takes page number as input for infinite scroll and pagination
*/
  }
  const getCharacterData = async (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => {
        setPage(page + 1);
        setCharacter((character) => character.concat(response.data.results));
      })
      .catch(() => {
        Alert.alert("Error while fetching Characters");
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
