import { Link, useLocalSearchParams } from "expo-router";
import { PageView } from "../../src/components/Quran/Arabic/PageView";
import { useEffect } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useLayoutContext } from "../../src/components/Layout/LayoutProvider";
import { QuranProvider } from "../../src/components/Quran/QuranProvider";
import { SinglePageView } from "../../src/components/Quran/Arabic/SinglePageView";

export default function SinglePage() {
  const { page } = useLocalSearchParams();
  const pageNumber = Number(page) ?? 0;
  const { setHeaderContent } = useLayoutContext();

  useEffect(() => {
    setHeaderContent(
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Link
          href={{
            pathname: `/quran/${pageNumber - 1}`,
          }}
        >
          <IconButton icon="arrow-left-drop-circle-outline" />
        </Link>
        <Text>{pageNumber}</Text>
        <Link
          href={{
            pathname: `/quran/${pageNumber + 1}`,
          }}
        >
          <IconButton icon="arrow-right-drop-circle-outline" />
        </Link>
      </View>,
    );
  }, [pageNumber]);

  return (
    <QuranProvider>
      <SinglePageView page={pageNumber} />
    </QuranProvider>
  );
}
