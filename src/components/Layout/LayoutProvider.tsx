import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useState,
} from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { LayoutHeader } from "./LayoutHeader";
import * as Application from "expo-application";

interface LayoutProviderProps {
  visibleHeader: boolean;
  headerContent: ReactNode;
  setVisibleHeader: (value: boolean) => void;
  setHeaderContent: (value: ReactNode | null) => void;
  toggleDarkTheme: () => void;
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
          <LayoutHeader />
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
