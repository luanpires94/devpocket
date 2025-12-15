import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps;

export function Input(props: Props) {
  return (
    <TextInput
      {...props}
      style={[
        {
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          fontSize: 16,
        },
        props.style,
      ]}
    />
  );
}
