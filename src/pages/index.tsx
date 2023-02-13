import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

interface Props {
  count: number;
}

export default function Home({ count }: Props) {
  const [counter, setCounter] = useState(count);
  return (
    <>
      <Head>
        <title>Booking - Home</title>
      </Head>
      <div>Hello NextJS</div>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <span>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const count = Math.ceil(Math.random() * 1000);
  return {
    props: {
      count,
    },
  };
};
