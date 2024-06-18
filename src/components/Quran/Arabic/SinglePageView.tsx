import { ReactNode, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { page_content } from "../../../constants/quran/pages";
import { hasBasmala, useQuranContext } from "../QuranProvider";
import { PageLine } from "./PageLine";
import { SurahHeader } from "./SurahHeader";
import { WordView } from "./WordView";
import { VerseEnd } from "./VerseEnd";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";

type SinglePageViewProps = {
  page: number;
};

export const SinglePageView: React.FC<SinglePageViewProps> = ({ page }) => {
  const content = page_content[page];
  const { getArabic, hasLineEnding } = useQuranContext();

  const getLines = () => {
    const lines = [];
    let wordList: ReactNode[] = [];

    content.forEach(([surah, ayah]) => {
      if (ayah === 0) {
        lines.push(<SurahHeader key={lines.length} surah={surah} />);
        return;
      }
      if (ayah === 1 && hasBasmala(surah)) {
        lines.push(<PageLine key={lines.length} isBasmala={true} />);
      }

      const words = getArabic(surah, ayah);

      words.forEach((w, i) => {
        wordList.push(
          <WordView
            key={`${surah}.${ayah}.${i}`}
            word={w}
            surah={surah}
            ayah={ayah}
            wordIndex={i}
          />,
        );

        if (hasLineEnding(surah, ayah, i)) {
          lines.push(
            <PageLine
              key={lines.length}
              wordList={wordList}
              hasEnding={true}
              isBasmala={false}
            />,
          );
          wordList = [];
        }
      });

      wordList.push(
        <VerseEnd key={wordList.length} ayah={ayah} surah={surah} />,
      );

      if (hasLineEnding(surah, ayah, -1)) {
        lines.push(
          <PageLine key={lines.length} wordList={wordList} isBasmala={false} />,
        );
        wordList = [];
      }
    });

    if (wordList.length > 0) {
      lines.push(
        <PageLine key={lines.length} wordList={wordList} isBasmala={false} />,
      );
    }

    return lines;
  };

  const theme = useTheme();
  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          borderColor: theme.colors.primary,
          borderWidth: 1,
          padding: 4,
        }}
      >
        {getLines()}
      </View>
    </ScrollView>
  );
};
