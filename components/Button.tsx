import { Text, Pressable, PressableProps } from "react-native";
import tw from "twrnc";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
}

export default function Button({ ...props }: ButtonProps) {
  return (
    <Pressable
      style={tw`bg-black text-white rounded-full px-4 py-2`}
      {...props}
    >
      <Text style={tw`text-white text-center`}>{props.children}</Text>
    </Pressable>
  );
}
