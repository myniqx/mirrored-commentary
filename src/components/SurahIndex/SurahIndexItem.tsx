import { getSurahDetails } from "../Quran/QuranProvider";
import { Card, Text, TouchableRipple } from "react-native-paper";
import { useSurahSearch } from "../Quran/SurahPage";
import {
  SplitStringResult,
  normalizeString,
  splitStringByNormalizedWords,
} from "../../utils/stringCompare";
import { HighLightedText } from "../HighLightedText/HighLightedText";
import { View } from "react-native";
import { useRouter } from "expo-router";

type SurahIndexItemProps = {
  surah: number;
  splitResult?: SplitStringResult;
};

export const SurahIndexItem: React.FC<SurahIndexItemProps> = ({
  surah,
  splitResult
}) => {
  const surahDetails = getSurahDetails(surah);
  const router = useRouter();

  return (
    <TouchableRipple
      rippleColor={"rgba(0, 0, 127, .32)"}
      style={{
        borderRadius: 12,
        padding: 1
      }}
      onPress={() => router.push(`/quran/${surahDetails.page}`)}
    >
      <Card mode="elevated">
        <Card.Content style={{ padding: 12, maxWidth: 300, gap: 16 }}>
          <View style={{ gap: 12, flexDirection: "row", alignItems: "center" }}>
            <Text
              variant="titleMedium"
              style={{
                borderRadius: 20,
                padding: 6,
                backgroundColor: "#eee",
                borderColor: "#ddd",
                borderWidth: 1,
              }}
            >
              {surahDetails.order.toLocaleString(undefined, {
                minimumIntegerDigits: 3,
              })}
            </Text>
            <HighLightedText
              variant="titleLarge"
              splitResult={splitResult}
              text={surahDetails.name}
            />
          </View>
          <View style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            gap: 8
          }}>
            <DetailView value={surahDetails.isMekki ? "mekki" : "medeni"} />
            <DetailView title="Ayet" value={surahDetails.totalAyahs} />
            <DetailView title="Sayfa" value={surahDetails.page} />
            <DetailView title="Cüz" value={surahDetails.juz} />
          </View>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

type DetailViewProps = {
  title?: string
  value: number | string
}

const DetailView: React.FC<DetailViewProps> = ({
  title,
  value
}) => {

  return (
    <View style={{
      backgroundColor: "#eee",
      borderRadius: 12,
      paddingLeft: 8,
      flexDirection: "row",
      alignItems: "baseline",
      borderColor: "#ddd",
      borderWidth: 1,
      gap: 2
    }}>
      {title && <Text variant="bodySmall">
        {title}
      </Text>}
      <Text variant="bodyMedium" style={{
        backgroundColor: "#ddd",
        borderRadius: 12,
        padding: 4,
        paddingHorizontal: 12,
        marginLeft: 4
      }}>
        {value}
      </Text>
    </View>
  )
}
