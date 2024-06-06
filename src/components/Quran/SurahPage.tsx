import React from "react"
import { ScrollView, View } from "react-native";
import { TextInput, Text } from "react-native-paper"

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Bookmarks } from "../Bookmarks/Bookmarks";
import { SurahIndex } from "../SurahIndex/SurahIndex";
import { normalizeString } from "../../utils/stringCompare";

const SurahPageContext = React.createContext({ words: [] as string[] })
export const SurahPage = () => {
  const [searchText, setSearchText] = React.useState('')

  const words = searchText
    .split(' ')
    .map(w => normalizeString(w.trim()))
    .filter(w => w.length > 0)

  return (
    <View
      style={{
        padding: 8,
        flex: 1,
        gap: 8
      }}>
      <TextInput
        label="Search"
        value={searchText}
        left={<Icon name="magnify" size={24} color={'black'} />}
        mode="outlined"
        onChangeText={text => setSearchText(text)}
        placeholder="type some names"
      />
      <SurahPageContext.Provider value={{ words }}>
        <ScrollView>
          <Bookmarks />
          <SurahIndex />
        </ScrollView>
      </SurahPageContext.Provider>
    </View>
  )
}
export const useSurahSearch = () => React.useContext(SurahPageContext)
