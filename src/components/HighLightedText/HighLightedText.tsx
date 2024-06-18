import { SplitStringResult, splitStringByNormalizedWords } from "../../utils/stringCompare";
import Text, { Props } from "react-native-paper/src/components/Typography/Text";
import { StyleProp, TextStyle } from "react-native";

type HighLightedTextProps = {
  text: string;
  words?: string[];
  highlightStyle?: StyleProp<TextStyle>;
  splitResult?: SplitStringResult;
} & Omit<Props<string>, "children">;

export const HighLightedText: React.FC<HighLightedTextProps> = ({
  text,
  words,
  highlightStyle = {
    backgroundColor: "rgba(1 ,0 ,0 ,0.3)",
    borderRadius: 4,
    fontWeight: "bold",
  },
  splitResult,
  ...props
}) => {
  if (splitResult || (words && words.length > 0)) {
    const result = splitResult ?? splitStringByNormalizedWords(text, words!);
    if (result.length === 0) return null;

    return (
      <Text {...props}>
        {result.map((r) => {
          const highlight = Array.isArray(r);
          const text = highlight ? r[0] : r;
          return (
            <Text
              key={text}
              {...props}
              style={
                highlight
                  ? [
                    props.style,
                    highlightStyle,
                  ]
                  : props.style
              }
            >
              {text}
            </Text>
          );
        })}
      </Text>
    );
  }

  return <Text {...props}>{text}</Text>;
};
