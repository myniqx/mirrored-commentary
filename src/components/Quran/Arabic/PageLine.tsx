import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

type PageLineProps = {
  isBasmala: boolean;
  wordList?: ReactNode[];
};

const LineContext = createContext<{
  fontSize: number;
}>({ fontSize: 36 });

export const PageLine: React.FC<PageLineProps> = ({
  isBasmala,
  wordList,
}) => {
  const [hasMeasured, setHasMeasured] = useState(false)
  const [measures, setMeasures] = useState<{
    totalWidth: number,
    tempWidth: number,
    fontSize: number
  }>({
    totalWidth: 0,
    tempWidth: 0,
    fontSize: 36
  })
  const baseStyle: StyleProp<ViewStyle> = {
    display: "flex",
    flexDirection: "row-reverse",
    gap: measures.fontSize / 2,
    paddingHorizontal: 18,
    justifyContent: "space-between",
    alignItems: "center",
  };


  useEffect(() => {
    if (!measures.totalWidth || !measures.tempWidth) return
    setHasMeasured(false)
    setMeasures(prev => ({ ...prev, fontSize: prev.totalWidth / (prev.tempWidth / prev.fontSize) }))
  }, [measures.totalWidth])

  useEffect(() => {
    if (!measures.totalWidth || !measures.tempWidth || hasMeasured) return
    if (measures.totalWidth < measures.tempWidth) {
      setMeasures(prev => ({ ...prev, fontSize: prev.fontSize - 1 }))
    }
    else if (measures.totalWidth * .9 > measures.tempWidth) {
      setMeasures(prev => ({ ...prev, fontSize: prev.fontSize + 1 }))
    }
    else {
      setHasMeasured(true)
    }
  }, [measures.tempWidth, hasMeasured])

  console.log(measures, measures.totalWidth / measures.fontSize)

  if (isBasmala)
    return (
      <Text
        style={{
          fontFamily: "arabic",
          fontSize: 48,
          textAlign: "center",
        }}
      >
        ﷽
      </Text>
    );

  return <LineContext.Provider value={{ fontSize: measures.fontSize }}>

    <View
      onLayout={(event) => {
        setMeasures(prev => ({ ...prev, totalWidth: event.nativeEvent.layout.width }))
      }}
      style={baseStyle}>
      {!hasMeasured && <View
        style={{
          ...baseStyle,
          justifyContent: "flex-start",
        }}
        onLayout={(event) => {
          setMeasures(prev => ({ ...prev, tempWidth: event.nativeEvent.layout.width }))
        }}
      >
        {wordList}
      </View>}
      {wordList}
    </View>
  </LineContext.Provider>;
};

export const usePageLine = () => useContext(LineContext)
