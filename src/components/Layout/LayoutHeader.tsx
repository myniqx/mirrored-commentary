import { Appbar, Icon } from "react-native-paper";
import { useLayoutContext } from "./LayoutProvider";
import { View } from "react-native";

export const LayoutHeader = () => {
  const { setVisibleHeader, headerContent, toggleDarkTheme, toggleSearch } =
    useLayoutContext();
  return (
    <Appbar.Header>
      <Icon source={require("../../../assets/icon.png")} size={48} />
      <Appbar.BackAction />
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {headerContent}
      </View>
      <Appbar.Action icon="magnify" onPress={toggleSearch} />
      <Appbar.Action icon="theme-light-dark" onPress={toggleDarkTheme} />
      <Appbar.Action
        icon="eye-off-outline"
        onPress={() => setVisibleHeader(false)}
      />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
};
