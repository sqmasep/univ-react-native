import { FlatList, ScrollView, Text, View } from "react-native";
import { useProduct } from "../features/products/contexts/ProductProvider";
import ProductCard from "../features/products/components/ProductCard";
import tw from "twrnc";
import { useCart } from "../features/cart/contexts/CartProvider";
import { LoaderCircle } from "lucide-react-native";

export default function Index() {
  const { products, isLoading } = useProduct();
  const cart = useCart();

  return (
    <View style={tw`p-2 min-h-full`}>
      {isLoading ? (
        <View style={tw`flex-col h-full justify-center items-center pb-48`}>
          <LoaderCircle color="black" />
          <Text style={tw`text-2xl mt-2`}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          contentContainerStyle={tw`gap-1`}
          columnWrapperStyle={tw`flex flex-row justify-between`}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <ProductCard
              variant="shop"
              {...item}
              onAddToCart={() => {
                cart.addToCart(item.id);
              }}
            />
          )}
        />
      )}
    </View>
  );
}
