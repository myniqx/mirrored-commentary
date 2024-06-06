import { View } from "react-native"
import { Text } from "react-native-paper"
import { page_content } from "../../constants/quran/pages"
import { getSurahDetails } from "../Quran/QuranProvider"

export type BookmarkData = {
  id: number
  page: number
  last_seen: string
}

type BookmarkedItemProps = {
  item: BookmarkData
}


export const BookmarkedItem: React.FC<BookmarkedItemProps> = ({ item }) => {
  const pageContent = page_content[item.page];
  const surahDetails = getSurahDetails(pageContent[0][0]);

  return (
    <View>
      <Text>{surahDetails.name}</Text>
      <Text>{item.last_seen}</Text>
    </View>
  )
}
