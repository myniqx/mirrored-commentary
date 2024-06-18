import React from "react";
import { View, StyleSheet } from "react-native";

import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SurahPage } from "../../src/components/Quran/SurahPage";
import { surah_details } from "../../src/constants/quran/surah";
import { page_content } from "../../src/constants/quran/pages";

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={SurahPage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function SettingsScreen() {
  /*
  const findPage = (index) => {
    const foundIndex = Array.from({ length: 605 }, (_, i) => i).find((i) => {
      const page = page_content[i];
      return page.some(([surah, _]) => surah === index);
    });

    if (foundIndex !== undefined) {
      return foundIndex;
    } else {
      console.error("Page not found", index);
      return "Page not found " + index;
    }
  };

  const details = surah_details;
  const newDetails = details.map((line) => {
    const [index, ...rest] = line;
    const page = findPage(index);
    return [index, page, ...rest];
  });
  */

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
      <TextInput
        style={{ flex: 1, margin: 10, width: "100%" }}
        mode="outlined"
        multiline
        label="Search"
      // value={JSON.stringify(newDetails, null, 2)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
