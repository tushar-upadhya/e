import React from "react";
import { products } from "@wix/stores";

interface ProductDetailsProps {
  product: products.Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => (
  <div className="space-y-3 p-3">
    <h3 className="text-lg font-bold">{product.name}</h3>
    <div
      className="line-clamp-5"
      dangerouslySetInnerHTML={{ __html: product.description || "" }}
    />
  </div>
);

export default ProductDetails;
