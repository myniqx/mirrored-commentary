import { Text } from "react-native-paper";
import { useQuranContext } from "../QuranProvider";
import { View } from "react-native";
import { endings } from "../../../constants/quran/ending";
import { usePageLine } from "./PageLine";

type VerseEndProps = {
  surah: number;
  ayah: number;
};

const convertNum = (c: string) => {
  switch (c) {
    case "1":
      return "١";
    case "2":
      return "٢";
    case "3":
      return "٣";
    case "4":
      return "٤";
    case "5":
      return "٥";
    case "6":
      return "٦";
    case "7":
      return "٧";
    case "8":
      return "٨";
    case "9":
      return "٩";
    case "0":
      return "٠";
    default:
      return c;
  }
};

export const VerseEnd: React.FC<VerseEndProps> = ({ surah, ayah }) => {
  const arabicNum = ayah
    .toString()
    .split("")
    .map(convertNum)
    .reverse()
    .join("");

  const { fontSize } = usePageLine();

  return (
    <View>
      <Text
        style={{
          fontFamily: "arabic",
          fontSize: fontSize / 2,
          userSelect: "none",
          cursor: "pointer",
        }}
        numberOfLines={1}
      >
        ﴾ {arabicNum} ﴿
      </Text>
      <Text numberOfLines={1} style={{ textAlign: "center", color: "red" }}>
        {ayah}
      </Text>
    </View>
  );
};
