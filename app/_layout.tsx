import { Slot } from "expo-router";
import React, { useState } from "react";
import { View, useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import AppLoading from "expo-app-loading";
import "../app.css";

import * as Font from "expo-font";
import { LayoutProvider } from "../src/components/Layout/LayoutProvider";
import useLocalStorage from "../src/utils/useLocalStorage";

const fetchFonts = () => {
  return Font.loadAsync({
    arabic: require("../assets/fonts/ShaikhHamdullahMushaf.ttf"),
    defFont: require("../assets/fonts/EncodeSansExpanded-Regular.ttf"),
  });
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [darkTheme, setDarkTheme] = useLocalStorage(
    "darkTheme",
    colorScheme === "dark",
  );

  const paperTheme = darkTheme ? MD3DarkTheme : MD3LightTheme;

  const theme = {
    ...paperTheme,
    fonts: {
      ...paperTheme.fonts,
      defaultFont: "defFont",
    },
  };

  const [dataLoaded, setDataLoaded] = useState(false);

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <PaperProvider theme={theme}>
      <LayoutProvider toggleDarkTheme={toggleDarkTheme}>
        <Slot />
      </LayoutProvider>
    </PaperProvider>
  );
}
