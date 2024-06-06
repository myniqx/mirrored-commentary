import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { getSurahDetails } from "../QuranProvider";

type SurahHeaderProps = {
  surah: number;
};

export const SurahHeader: React.FC<SurahHeaderProps> = (props) => {
  const theme = useTheme();
  const surah = getSurahDetails(props.surah)
  const bracketSize = 64;
  return (
    <View
      style={{
        width: "100%",
        aspectRatio: 604 / 112,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text style={{ fontFamily: "arabic", fontSize: bracketSize }}>﷌</Text>
      <Text style={{ fontSize: 24 }}>{surah.name}</Text>
      <Text style={{ fontSize: 24 }}>{surah.totalAyahs} verses</Text>
      <Text
        style={{
          fontFamily: "arabic",
          fontSize: bracketSize,
          transform: [{ scaleX: -1 }],
        }}
      >
        ﷌
      </Text>
    </View>
  );
};
