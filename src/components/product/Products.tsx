import { products } from "@wix/stores";
import Link from "next/link";
import React from "react";

interface ProductProps {
  product: products.Product;
}

const Products = ({ product }: ProductProps) => {
  return (
    <Link href={`/products/${product.slug}`} className="">
      {product.name}
    </Link>
  );
};

export default Products;
