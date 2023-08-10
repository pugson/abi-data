import { chains, ChainSpec } from "@/lib/chains";
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
      language={"jsx"}
      showLineNumbers={false}
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
      <main className="max-w-5xl p-4 overflow-hidden md:p-6 lg:mx-auto">
        <img src="/gfx.png" alt="ABI Data" className="-mt-4 -ml-2 sm:ml-0 sm:mt-0 saturate" />
        <div className="px-4 py-8">
          <h1 className="max-w-4xl text-2xl leading-9 sm:text-3xl sm:leading-10">
            Remotely fetch smart contract ABI as JSON to use with{" "}
            <a href="https://wagmi.sh" target="_blank" className="b-pink">
              wagmi
            </a>{" "}
            and ethers.js in your app.
          </h1>
          <form className="flex flex-col gap-2 mt-16 lookup-form align-center lg:flex-row" onSubmit={handleSearch}>
            <input
              type="text"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Get ABI for Mainnet contract address"
              className="z-10 p-4 bg-black search-input text-1xl"
              onChange={(e) => {
                setAddress(e.currentTarget.value);
              }}
            />
            <span className="flex splatter">
              <button className="px-16 py-4 text-2xl btn lg:py-0" type="submit">
                GO
              </button>
              {loading && (
                <p className="mt-2 ml-4 text-white lg:hidden">
                  Querying Etherscan
                  <span className="loading-icon"></span>
                </p>
              )}
            </span>
          </form>
          {loading && (
            <p className="hidden mt-2 text-white lg:block">
              Querying Etherscan
              <span className="loading-icon"></span>
            </p>
          )}
        </div>
        <div className="px-4 py-8 mt-4">
          <h2 className="text-1xl sm:text-2xl">How do I use this API?</h2>
          <p className="mt-1 text-gray-600 text-1xl sm:text-2xl">
            Append the contract address after <span className="text-gray-400">abidata.net</span> and optionally pass a
            network param, that’s it. You don’t need any API keys.
          </p>
          <h2 className="mt-16 text-1xl sm:text-2xl">Which networks are supported?</h2>
          <SupportedNetworksTable />
          <p className="mt-8 text-lg text-gray-400">React usage Example:</p>
          <div className="mt-4 font-mono text-sm codeblock-example">
            <ExampleCodeBlock />
          </div>
          <h2 className="mt-16 text-1xl sm:text-2xl">Is this free to use?</h2>
          <p className="mt-1 text-gray-600 text-1xl sm:text-2xl">Yes, it’s free for everyone.</p>
          <p className="max-w-2xl mt-4 text-gray-400">
            If you wanna support this project send some eth to <span className="eth-addy">ens.pug.eth</span>
          </p>
          <h2 className="mt-16 text-1xl sm:text-2xl">Can this be used in production?</h2>
          <p className="mt-1 text-gray-600 text-1xl sm:text-2xl">
            Yes. Records are cached for 30 days, so after the initial request for a contract, the API will respond very
            quickly from the CDN.
          </p>
          <h2 className="mt-16 text-1xl sm:text-2xl">Is the source code available?</h2>
          <p className="mt-1 text-gray-600 text-1xl sm:text-2xl">
            Yes,{" "}
            <a href="https://github.com/pugson/abi-data" target="_blank" className="b-pink">
              check it out on GitHub.
            </a>{" "}
            The main branch is automatically deployed to Vercel.
          </p>
        </div>
      </main>
      <footer className="max-w-5xl px-10 py-16 mt-32 sm:px-12 xl:mx-auto">
        <p className="text-white">
          © {new Date().getFullYear()} Made by{" "}
          <a href="https://wojtek.im" className="b-pink">
            pugson
          </a>{" "}
          & friends.
        </p>
        <div className="w-16 h-1 my-4 bg-gray-800"></div>
        <p className="mt-2 text-sm text-gray-600">
          Massive thanks to{" "}
          <a href="https://github.com/mathieu-bour" target="_blank" className="b-pink">
            Mathieu Bour
          </a>{" "}
          for adding multiple chains & testnet support.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Thanks to{" "}
          <a href="https://twitter.com/gregskril" target="_blank" className="b-pink">
            @gregskril
          </a>{" "}
          for adding initial Goerli support.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Thanks to{" "}
          <a href="https://twitter.com/lochieaxon" target="_blank" className="b-pink">
            @lochieaxon
          </a>{" "}
          for being alive.
        </p>
        <p className="max-w-2xl mt-8 text-sm leading-6 text-gray-600">
          Powered by APIs from Etherscan, Polygonscan, Arbiscan, BaseScan, BscScan, FTMScan, and Snowtrace.
        </p>

        <p className="max-w-lg mt-8 text-sm text-gray-600">
          Looking for a free API for fetching ENS records and avatars for wallets?
        </p>
        <p className="mt-1 text-sm">
          Go to{" "}
          <a href="https://ensdata.net" className="b-pink" target="_blank">
            ensdata.net
          </a>
        </p>
      </footer>
    </>
  );
}

const SupportedNetworksTable = () => {
  return (
    <div className="w-full mt-4 overflow-x-scroll">
      <table className="border border-gray-800 table-auto">
        <thead>
          <tr className="tracking-wider text-gray-600 border border-gray-900">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Network ID</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          <tr className="border border-gray-800 even:bg-purple-900/25 hover:bg-white/10">
            <td className="p-4 border-t border-r border-t-gray-800 border-r-gray-800">Ethereum Mainnet</td>
            <td className="p-4 text-gray-700 border-t border-t-gray-800">none (default)</td>
          </tr>
          <tr className="border border-gray-800 even:bg-purple-900/25 hover:bg-white/10">
            <td className="p-4 border-t border-r border-t-gray-800 border-r-gray-800">Ethereum Goerli Testnet</td>
            <td className="p-4 text-gray-400 border-t border-t-gray-800">goerli</td>
          </tr>
          <tr className="border border-gray-800 even:bg-purple-900/25 hover:bg-white/10">
            <td className="p-4 border-t border-r border-t-gray-800 border-r-gray-800">Ethereum Sepolia Testnet</td>
            <td className="p-4 text-gray-400 border-t border-t-gray-800">sepolia</td>
          </tr>
          {Object.values(chains).map((chain: ChainSpec) => {
            if (chain.id === "mainnet" || chain.id === "goerli" || chain.id === "sepolia") return null;

            return (
              <tr key={chain.id} className="border border-gray-800 even:bg-purple-900/25 hover:bg-white/10">
                <td className="p-4 border-r border-r-gray-800">{chain.label}</td>
                <td className="p-4 text-gray-400">{chain.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-8 text-lg text-gray-400">Example:</p>
      <div className="flex flex-col gap-2 mt-2 font-mono text-sm codeblock-example">
        <CopyBlock
          text={`https://abidata.net/<contract_address>?network=<network_id>`}
          language={"jsx"}
          showLineNumbers={false}
          theme={dracula}
          codeBlock
        />
        <a href="https://abidata.net/0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413" target={"_blank"}>
          <code className="block mt-1 font-mono text-ultra-green">
            abidata.net/0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413
          </code>
        </a>
        <a href="https://abidata.net/0x9a879320A9F7ad2BBb02063d67baF5551D6BD8B0?network=goerli" target={"_blank"}>
          <code className="block mt-1 font-mono text-ultra-green">
            abidata.net/0x9a879320A9F7ad2BBb02063d67baF5551D6BD8B0?network=goerli
          </code>
        </a>
        <a href="https://abidata.net/0x779877a7b0d9e8603169ddbd7836e478b4624789?network=sepolia" target={"_blank"}>
          <code className="block mt-1 font-mono text-ultra-green">
            abidata.net/0x779877a7b0d9e8603169ddbd7836e478b4624789?network=sepolia
          </code>
        </a>
      </div>
    </div>
  );
};
