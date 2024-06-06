import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import { page_content } from "../../../constants/quran/pages";
import { useQuranContext } from "../QuranProvider";
import { VerseEnd } from "./VerseEnd";
import { WordView } from "./WordView";

type PageViewProps = {
  page: number;
};

export const PageView: FC<PageViewProps> = ({ page }) => {
  const content = page_content[page];
  const { getArabic } = useQuranContext();

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          gap: 10,
          padding: 18,
          maxWidth: 780,
        }}
      >
        {content.flatMap(([surah, ayah]) => {
          const verses = getArabic(surah, ayah);
          const verseViews = verses.map((v, i) => (
            <WordView
              key={`${surah}.${ayah}.${i}`}
              word={v}
              surah={surah}
              ayah={ayah}
              wordIndex={i}
            />
          ));

          return [
            ...verseViews,
            <VerseEnd key={surah} surah={surah} ayah={ayah} />,
          ];
        })}
      </View>
    </ScrollView>
  );
};
