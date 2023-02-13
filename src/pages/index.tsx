import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);
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
