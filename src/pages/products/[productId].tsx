import axios from "axios";
import { GetServerSideProps } from "next";
import { Product } from ".";

interface Props {
  product: Product;
  error: string;
}

export default function Movie({ product, error }: Props) {
  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h2>{product.title}</h2>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.description}</p>
          <p>{product.price}</p>
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let data = {
    product: null,
  };
  let error = "";
  try {
    data = await axios
      .get(`http://localhost:3000/api/${query.productId}`, {
        headers: {
          Authorization: "test",
        },
      })
      .then((res) => res.data);
  } catch (err) {
    error = "Unauthorized";
  }

  return {
    props: {
      product: data.product,
      error: error,
    },
  };
};
