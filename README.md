# ABI Data — grab your smart contract’s ABI as JSON from Etherscan

![og-image](https://user-images.githubusercontent.com/6843656/218328296-cd7a07c5-d790-476b-b4fd-80041bf64f79.png)

Fetch smart contract ABI JSON from Etherscan to use with wagmi and ethers.js in your app. Records are cached for 365 days, so after the initial request for a contract, the API will respond very quickly from the CDN. This is just a simple wrapper around Etherscan’s API.

Supports Ethereum Mainnet and Goerli Testnet. Append `?network=goerli` to the URL to fetch ABI for a contract on Goerli.

## React usage example

```js
import { useState, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const contractAddress = "0xecb504d39723b0be0e3a9aa33d646642d1051ee1";

const useContractABI = (contractAddress) => {
  const [contractABI, setContractABI] = useState(null);

  useEffect(() => {
    const fetchContractABI = async () => {
      const response = await fetch(`https://abidata.net/${contractAddress}`);
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
    functionName: "feed",
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
  );
}
```

## Development

This is a Next.js app.
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
