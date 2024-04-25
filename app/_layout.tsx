import { Link, Slot } from "expo-router";
import ProductProvider from "../features/products/contexts/ProductProvider";
import CartProvider, { useCart } from "../features/cart/contexts/CartProvider";
import tw from "twrnc";
import { ShoppingCart } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export function Layout() {
  const cart = useCart();

  return (
    <>
      <View style={tw`flex mt-16 flex-row items-center justify-between p-2`}>
        <Link href="/" style={tw`text-xl`}>
          Products
        </Link>

        <View style={tw`relative`}>
          <Link
            href="/cart"
            style={tw`relative p-2 border border-zinc-200 rounded-xl`}
          >
            <ShoppingCart color="black" />
          </Link>

          {cart.products.length > 0 && (
            <Text
              style={tw`absolute left-0 top-0 bg-red-500 text-white rounded-full w-5 h-5 text-center`}
            >
              {cart.products
                .map(product => product.quantity)
                .reduce((a, b) => a + b, 0)}
            </Text>
          )}
        </View>
      </View>
      <View style={tw`bg-zinc-100`}>
        <Slot />
      </View>
    </>
  );
}

export default function Providers() {
  return (
    <ProductProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
    </ProductProvider>
  );
}
