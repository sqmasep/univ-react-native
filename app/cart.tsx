import { FlatList, ScrollView, Text, View } from "react-native";
import { useCart } from "../features/cart/contexts/CartProvider";
import { useProduct } from "../features/products/contexts/ProductProvider";
import ProductCard from "../features/products/components/ProductCard";
import Button from "../components/Button";
import tw from "twrnc";
import { Link } from "expo-router";

export default function Cart() {
  const { products } = useProduct();
  const cart = useCart();

  const filteredProducts = products.filter(product =>
    cart.products.some(cartProduct => cartProduct.id === product.id)
  );

  return (
    <View style={tw`p-2`}>
      <View style={tw`flex-row items-center justify-between pb-4`}>
        <Text style={tw` text-xl`}>Your cart</Text>
        {cart.products.length > 0 && (
          <Button onPress={cart.clearCart}>Delete All</Button>
        )}
      </View>

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          contentContainerStyle={tw`gap-1`}
          columnWrapperStyle={tw`flex flex-row justify-between`}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <ProductCard
              {...item}
              variant="cart"
              quantity={
                cart.products.find(cartProduct => cartProduct.id === item.id)
                  ?.quantity
              }
              onAddToCart={() => cart.addToCart(item.id)}
              onRemove={() => cart.removeFromCart(item.id, true)}
              onMinus={() => cart.removeFromCart(item.id)}
              onPlus={() => cart.addToCart(item.id)}
            />
          )}
        />
      ) : (
        <View style={tw`min-h-full justify-center items-center pb-96`}>
          <Text style={tw`text-2xl`}>Oh no! Cart is empty</Text>
          <View style={tw`mt-4`}>
            <Button>
              <Link href="/">Shop now!</Link>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
