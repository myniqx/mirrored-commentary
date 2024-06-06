import { getSurahDetails } from "../Quran/QuranProvider"
import { Card, Text, TouchableRipple } from "react-native-paper"
import { useSurahSearch } from "../Quran/SurahPage"
import { normalizeString, splitStringByNormalizedWords } from "../../utils/stringCompare"
import { HighLightedText } from "../HighLightedText/HighLightedText"
import { View } from "react-native"


type SurahIndexItemProps = {
  surah: number
}

export const SurahIndexItem: React.FC<SurahIndexItemProps> = ({ surah }) => {
  const surahDetails = getSurahDetails(surah)
  const { words } = useSurahSearch()

  return (
    <TouchableRipple rippleColor={"rgba(0, 0, 127, .32)"}>
      <Card
        mode="elevated"
      >
        <Card.Content>
          <View style={{ gap: 4, flexDirection: 'row' }}>
            <HighLightedText
              variant="titleLarge"
              words={words}
              text={surahDetails.name}
            />
            <Text variant="titleMedium"
              style={{
                borderRadius: 20,
                padding: 6,
              }}>
              {surahDetails.order.toLocaleString(undefined, { minimumIntegerDigits: 3 })}
            </Text>
          </View>
          <Text variant="bodyMedium" style={{ color: '#555', fontSize: 12 }}>
            {surahDetails.isMekki ? 'mekki' : 'medeni'} •{' '} {/* Küçük bir ayırıcı */}
            {surahDetails.totalAyahs} ayet
          </Text>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
}
