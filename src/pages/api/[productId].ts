// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../products";

type Data =
  | {
      message: string;
    }
  | {
      product: Product;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const auth = req.headers.authorization;

  if (auth && auth === "test") {
    const data = await axios
      .get(`https://dummyjson.com/products/${req.query.productId}`)
      .then((res) => res.data);
    res.status(200).json({ product: data });
  }
  res.status(401).json({ message: "Unauthorized" });
}
