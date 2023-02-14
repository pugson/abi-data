import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

function ExampleCodeBlock() {
  return (
    <CopyBlock
      text={`import { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const contractAddress = "0xecb504d39723b0be0e3a9aa33d646642d1051ee1";

const useContractABI = (contractAddress) => {
  const [contractABI, setContractABI] = useState(null);

  useEffect(() => {
    const fetchContractABI = async () => {
      const response = await fetch(\`https://abidata.net/\${contractAddress}\`);
      const json = await response.json();
      setContractABI(json.abi);
    };

    fetchContractABI();
  }, [contractAddress]);

  return contractABI;
};

function App() {
  const contractABI = useContractABI(contractAddress);
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'feed',
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
 
  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Feed
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  )
}
`}
      language={"javascript"}
      showLineNumbers
      startingLineNumber={1}
      theme={dracula}
      codeBlock
    />
  );
}

export default function Home() {
  const router = useRouter();
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    router.push(`/${address.toLowerCase()}`);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <main className="p-4 md:p-6 max-w-5xl lg:mx-auto overflow-hidden">
        <img src="/gfx.png" alt="ABI Data" className="-ml-2 sm:ml-0 -mt-4 sm:mt-0 saturate" />
        <div className="px-4 py-8">
          <h1 className="text-2xl sm:text-3xl leading-9 sm:leading-10 max-w-4xl">
            Fetch smart contract ABI JSON from Etherscan to use with{" "}
            <a href="https://wagmi.sh" target="_blank" className="b-pink">
              wagmi
            </a>{" "}
            and ethers.js in your app.
          </h1>
          <form className="lookup-form mt-16 align-center gap-2 flex flex-col lg:flex-row" onSubmit={handleSearch}>
            <input
              type="text"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Get ABI for contract address"
              className="bg-black search-input text-1xl p-4 z-10"
              onChange={(e) => {
                setAddress(e.currentTarget.value);
              }}
            />
            <span className="splatter flex">
              <button className="btn text-2xl px-16 py-4 lg:py-0" type="submit">
                GO
              </button>
              {loading && (
                <p className="lg:hidden text-white mt-2 ml-4">
                  Querying Etherscan
                  <span className="loading-icon"></span>
                </p>
              )}
            </span>
          </form>
          {loading && (
            <p className="hidden lg:block text-white mt-2">
              Querying Etherscan
              <span className="loading-icon"></span>
            </p>
          )}
        </div>
        <div className="px-4 py-8 mt-4">
          <h2 className="text-1xl sm:text-2xl">How do I use this API?</h2>
          <p className="text-1xl sm:text-2xl text-gray-600 mt-1">
            Append the contract address after <span className="text-gray-400">abidata.net</span>, that’s it. You don’t
            need any API keys.
          </p>
          <p className="text-lg text-gray-400 mt-8">Example:</p>
          <a href="https://abidata.net/0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413" target={"_blank"}>
            <code className="font-mono text-ultra-green mt-1 block">
              abidata.net/0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413
            </code>
          </a>

          <div className="codeblock-example mt-4 font-mono text-sm">
            <ExampleCodeBlock />
          </div>

          <h2 className="text-1xl sm:text-2xl mt-16">Is this free to use?</h2>
          <p className="text-1xl sm:text-2xl text-gray-600 mt-1">Yes, it’s free for everyone.</p>
          <p className="mt-4 text-gray-400 max-w-2xl">
            If you wanna support this project send some eth to <span className="eth-addy">ens.pug.eth</span>
          </p>

          <h2 className="text-1xl sm:text-2xl mt-16">Can this be used in production?</h2>
          <p className="text-1xl sm:text-2xl text-gray-600 mt-1">
            Yes. Records are cached for 365 days, so after the initial request for a contract, the API will respond very
            quickly from the CDN.
          </p>
          <h2 className="text-1xl sm:text-2xl mt-16">Which networks are supported?</h2>
          <p className="text-1xl sm:text-2xl text-gray-600 mt-1">Only Ethereum Mainnet is supported right now.</p>

          <h2 className="text-1xl sm:text-2xl mt-16">Is the source code available?</h2>
          <p className="text-1xl sm:text-2xl text-gray-600 mt-1">
            Yes,{" "}
            <a href="https://github.com/pugson/abi-data" target="_blank" className="b-pink">
              check it out on GitHub.
            </a>{" "}
            The main branch is automatically deployed to Vercel.
          </p>
        </div>
      </main>
      <footer className="mt-32 py-16 px-10 sm:px-12 max-w-5xl xl:mx-auto">
        <p className="text-white">
          © {new Date().getFullYear()} Made by{" "}
          <a href="https://wojtek.im" className="b-pink">
            pugson
          </a>
          .
        </p>
        <div className="w-16 h-1 bg-gray-800 my-4"></div>
        <p className="text-gray-600 text-sm">
          Powered by{" "}
          <a href="https://docs.etherscan.io" target="_blank" className="b-pink">
            Etherscan
          </a>{" "}
          API.
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Thanks to{" "}
          <a href="https://twitter.com/lochieaxon" target="_blank" className="b-pink">
            @lochieaxon
          </a>{" "}
          for being alive.
        </p>
      </footer>
    </>
  );
}
