import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useState,
} from "react";
import { View } from "react-native";
import { TextInput, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { LayoutHeader } from "./LayoutHeader";
import * as Application from "expo-application";

interface LayoutProviderProps {
  visibleHeader: boolean;
  headerContent: ReactNode;
  setVisibleHeader: (value: boolean) => void;
  setHeaderContent: (value: ReactNode | null) => void;
  toggleDarkTheme: () => void;
  toggleSearch: () => void;
  searchText?: string
  setSearchID: (value: string) => void;
}

export const LayoutContext = createContext<LayoutProviderProps>(
  {} as LayoutProviderProps,
);

type ProviderProps = PropsWithChildren<{
  toggleDarkTheme: () => void;
}>;

export const LayoutProvider: React.FC<ProviderProps> = ({
  children,
  toggleDarkTheme,
}) => {
  const [visibleHeader, setVisibleHeader] = useState(true);
  const [headerContent, setHeaderContent_] = useState<ReactNode>(
    <Text>{Application.applicationName}</Text>,
  );
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTexts, setSearchTexts] = useState<{ [key: string]: string }>({});
  const [searchID, setSearchID] = useState("");
  const searchText = searchVisible ?
    searchTexts[searchID] ?? '' :
    undefined;

  const setHeaderContent = (value: ReactNode | null) => {
    setHeaderContent_(value ?? <Text>{Application.applicationName}</Text>);
  };

  const theme = useTheme();

  return (
    <LayoutContext.Provider
      value={{
        headerContent,
        visibleHeader,
        setHeaderContent,
        setVisibleHeader,
        toggleDarkTheme,
        toggleSearch: () => setSearchVisible(!searchVisible),
        searchText,
        setSearchID,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "relative",
          backgroundColor: theme.colors.background,
        }}
      >
        {visibleHeader ? (
          <>
            <LayoutHeader />
            {searchVisible &&
              <TextInput
                label="Search"
                value={searchText ?? ''}
                left={<Icon source="magnify" size={24} color={"black"} />}
                mode="outlined"
                onChangeText={(text) => setSearchTexts({ ...searchTexts, [searchID]: text })}
                placeholder="type some names"
                style={{
                  margin: 6
                }}
              />}
          </>
        ) : (
          <IconButton
            icon="close"
            mode="outlined"
            onPress={() => setVisibleHeader(true)}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 44,
            }}
          />
        )}
        {children}
      </View>
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => React.useContext(LayoutContext);
