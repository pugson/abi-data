import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>𝐀𝐁𝐈 𝐃𝐚𝐭𝐚 — return your smart contract’s ABI as JSON from Etherscan</title>
        <meta name="title" content="𝐀𝐁𝐈 𝐃𝐚𝐭𝐚 — return your smart contract’s ABI as JSON from Etherscan" />
        <meta
          name="description"
          content="Fetch ABI contract data from Etherscan to use with wagmi and ethers.js in your app."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abidata.net/" />
        <meta property="og:title" content="𝐀𝐁𝐈 𝐃𝐚𝐭𝐚 — return your smart contract’s ABI as JSON from Etherscan" />
        <meta
          property="og:description"
          content="Fetch ABI contract data from Etherscan to use with wagmi and ethers.js in your app."
        />
        <meta property="og:image" content="https://abidata.net/og-image.png" />
        <meta property="twitter:creator" content="@pugson" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://abidata.net/" />
        <meta property="twitter:title" content="𝐀𝐁𝐈 𝐃𝐚𝐭𝐚 — return your smart contract’s ABI as JSON from Etherscan" />
        <meta
          property="twitter:description"
          content="Fetch ABI contract data from Etherscan to use with wagmi and ethers.js in your app."
        />
        <meta property="twitter:image" content="https://abidata.net/og-image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
      <Script src="https://sup.abidata.net/latest.js" data-collect-dnt="true" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://sup.abidata.net/noscript.gif?collect-dnt=true"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <Analytics />
    </>
  );
}
