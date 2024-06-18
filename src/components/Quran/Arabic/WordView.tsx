import React from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Text } from "react-native-paper";
import { turkish } from "../../../constants/quran/turhish";
import { useQuranContext } from "../QuranProvider";
import { usePageLine } from "./PageLine";

export type WordViewProps = {
  surah: number;
  ayah: number;
  wordIndex: number;
  word: string;
};

export const WordView: React.FC<WordViewProps> = ({
  surah,
  ayah,
  wordIndex,
  word,
}) => {
  const [visible, setVisible] = React.useState(false);
  const { getTurkish } = useQuranContext();
  const { fontSize } = usePageLine();

  const turks = getTurkish(surah, ayah)[wordIndex];
  const [width, setWidth] = React.useState(0);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "arabic",
          fontSize: fontSize,
          userSelect: "none",
          cursor: "pointer",
          textAlign: "center",
        }}
        onPress={() => setVisible(!visible)}
        onLayout={(event: LayoutChangeEvent) =>
          setWidth(event.nativeEvent.layout.width ?? width)
        }
      >
        {word}
      </Text>

      {visible && (
        <Text
          style={{
            fontSize: fontSize / 3,
            userSelect: "none",
            cursor: "pointer",
            overflow: "hidden",
            textAlign: "center",
            maxWidth: width,
          }}
          onPress={() => setVisible(false)}
        >
          {turks}
        </Text>
      )}
    </View>
  );
};
