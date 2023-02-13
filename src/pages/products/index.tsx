import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
};

interface Props {
  products: Product[];
}

export default function Movies({ products }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {products.map((product) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          className="border border-slate-500"
        >
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </Link>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await axios
    .get("https://dummyjson.com/products")
    .then((res) => res.data);
  return {
    props: {
      products: data.products,
    },
  };
};
