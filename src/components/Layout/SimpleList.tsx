import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";


type SimpleListProps = PropsWithChildren<{
  title: string
}>


export const SimpleList: React.FC<SimpleListProps> = ({ title, children }) => {
  return (
    <View style={{
      borderRadius: 4,
      borderWidth: 1,
      padding: 15,
      gap: 8
    }}>
      <Text
        variant="titleLarge"
        style={{
          fontWeight: 'bold',
          borderBottomWidth: 1,
          paddingBottom: 4,
          marginBottom: 8
        }}
      >{title}</Text>
      {children}
    </View>
  )
}
