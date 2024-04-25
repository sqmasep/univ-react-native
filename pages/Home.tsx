import { useProduct } from "../features/products/contexts/ProductProvider";
import ProductCard from "../features/products/components/ProductCard";

export default function Home() {
  const { products } = useProduct();

  return (
    <>
      {products.map(product => (
        <ProductCard title={product.title} price={123} id="aaa" image="url" />
      ))}
    </>
  );
}
