import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";

import { normalizeString } from "../../utils/stringCompare";
import { Bookmarks } from "../Bookmarks/Bookmarks";
import { useLayoutContext } from "../Layout/LayoutProvider";
import { SurahIndex } from "../SurahIndex/SurahIndex";

const SurahPageContext = React.createContext({ words: [] as string[] });
export const SurahPage = () => {
  //  const [searchText, setSearchText] = React.useState("");

  const { setSearchID, searchText } = useLayoutContext()

  useEffect(() => {
    setSearchID("SurahPage")
  }, [])

  const words = (searchText ?? '')
    .split(" ")
    .map((w) => normalizeString(w.trim()))
    .filter((w) => w.length > 0);

  return (
    <View
      style={{
        padding: 8,
        flex: 1,
        gap: 8,
      }}
    >
      {/*}
      <TextInput
        label="Search"
        value={searchText}
        left={<Icon name="magnify" size={24} color={"black"} />}
        mode="outlined"
        onChangeText={(text) => setSearchText(text)}
        placeholder="type some names"
      /> */}
      <SurahPageContext.Provider value={{ words }}>
        <ScrollView>
          <Bookmarks />
          <SurahIndex />
        </ScrollView>
      </SurahPageContext.Provider>
    </View>
  );
};
export const useSurahSearch = () => React.useContext(SurahPageContext);
