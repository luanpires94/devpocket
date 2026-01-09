declare module "react-native-syntax-highlighter" {
  import * as React from "react";
  import { ViewStyle, TextStyle } from "react-native";

  type Props = {
    language?: string;
    style?: any;
    customStyle?: ViewStyle;
    children: string;
  };

  const SyntaxHighlighter: React.FC<Props>;
  export default SyntaxHighlighter;
}

declare module "react-syntax-highlighter/styles/hljs" {
  export const atomOneDark: any;
  export const atomOneLight: any;
}
