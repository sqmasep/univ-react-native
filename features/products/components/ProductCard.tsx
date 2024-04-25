import { Image, Text, View } from "react-native";
import tw from "twrnc";
import Button from "../../../components/Button";
import { Product } from "../contexts/ProductProvider";

type ProductCardProps = (
  | {
      variant: "shop";
      onAddToCart: () => void;
    }
  | {
      variant: "cart";
      onRemove: () => void;
      onMinus: () => void;
      onPlus: () => void;
      quantity: number;
    }
) &
  Product & {
    onAddToCart?: () => void;
    onRemove?: () => void;
    onMinus?: () => void;
    onPlus?: () => void;
    quantity?: number;
  };

export default function ProductCard({
  image,
  title,
  price,
  quantity,
  onAddToCart,
  variant = "shop",
  onRemove,
  onMinus,
  onPlus,
  ...props
}: ProductCardProps) {
  return (
    <View style={tw`rounded-xl border border-zinc-400 p-3 bg-white w-[49.5%]`}>
      <Image
        source={{ uri: image }}
        style={tw`w-full h-24`}
        resizeMode="contain"
      />

      <Text style={tw`text-center my-4 text-lg`}>{title}</Text>
      <Text style={tw`font-bold text-3xl text-center mb-4 mt-auto`}>
        {price}€
      </Text>
      {variant === "shop" && <Button onPress={onAddToCart}>Add to cart</Button>}

      {variant === "cart" && (
        <View>
          <Button onPress={onRemove}>Remove</Button>

          <View style={tw`flex flex-row justify-center mt-4 gap-2`}>
            <Button onPress={onMinus}>-</Button>
            <Button onPress={onPlus}>+</Button>
          </View>
          <Text style={tw`mt-2 text-center font-bold`}>
            Quantité {quantity}
          </Text>
        </View>
      )}
    </View>
  );
}
