import { chains, ChainId } from "@/lib/chains";
import { UnsupportedNetworkError } from "@/lib/errors";
import Cors from "cors";
import fetch from "isomorphic-unfetch";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAbiItem, trim } from "viem";
import { publicClient } from "@/lib/viem";

// @ts-ignore
globalThis.fetch = fetch;

const CONTRACT_ADDRESS_REGEX = /^(0x)?[0-9a-fA-F]{40}$/;

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function readContractImplementationItem(
  addy: `0x${string}`,
  network = "mainnet"
) {
  // todo: use network to get network specific public client
  const response = await publicClient.readContract({
    address: addy,
    abi: [],
    functionName: "implementation",
  });

  return response;
}

// https://eips.ethereum.org/EIPS/eip-1967#logic-contract-address
const EIP_1967_IMPLEMENTATION_CONTRACT_ADDRESS_STORAGE_SLOT =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";

async function getImplementationAtStorageSlot(
  addy: `0x${string}`,
  network = "mainnet"
) {
  // todo: use network to get network specific public client
  const data = await publicClient.getStorageAt({
    address: addy,
    slot: EIP_1967_IMPLEMENTATION_CONTRACT_ADDRESS_STORAGE_SLOT,
  });

  const address = trim(data as `0x${string}`);
  if (address === "0x00") return null;
  return address;
}

async function trackEvent() {
  await fetch("https://queue.simpleanalyticscdn.com/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "event",
      hostname: "abidata.net",
      event: "ABI lookup",
      path: "/api",
      ua: "Vercel Edge Functions",
      unique: true,
    }),
  });
}

/**
 * @param addy A valid lowercased Ethereum address
 * @param network The network to use.
 * @returns The JSON abi of the contract at `addy`.
 */
async function getAbi(addy: string, network = "mainnet") {
  if (!Object.keys(chains).includes(network)) {
    throw new UnsupportedNetworkError(network);
  }

  const chain = chains[network as ChainId];

  // Network is defined in the mappings but the API key was not provided
  if (!chain.key) {
    throw new UnsupportedNetworkError(network);
  }

  const url = `https://${chain.hostname}/api?module=contract&action=getabi&address=${addy}&apikey=${chain.key}`;
  const response = await fetch(url);

  // Etherscan API returned an non-200 HTTP code
  if (!response.ok) {
    throw new Error(`Cannot fetch ABI on ${network}`);
  }

  // Etherscan API returned NOTOK code, possibly an invalid API key
  const result = await response.json();
  if (result.message === "NOTOK") {
    throw new Error(`Cannot fetch ABI on ${network}`);
  }

  return JSON.parse(result.result);
}

export default async function handler(req: any, res: any) {
  await runMiddleware(req, res, cors);
  res.setHeader("Cache-Control", "s-maxage=31536000000");
  const { address, network } = req.query;
  const addy = address.toLowerCase();

  if (!CONTRACT_ADDRESS_REGEX.test(addy)) {
    res.status(400).json({
      ok: false,
      error: `Unable to resolve ${addy} because it’s not a valid Ethereum contract address.`,
    });

    return;
  }

  try {
    const abi = await getAbi(addy, network);
    await trackEvent();

    const hasImplementationAbiItem =
      getAbiItem({ abi, name: "implementation" }) != null;

    let implementationAddress;
    if (hasImplementationAbiItem)
      implementationAddress = await readContractImplementationItem(
        address,
        network
      );

    if (!implementationAddress) {
      implementationAddress = await getImplementationAtStorageSlot(
        address,
        network
      );
    }

    if (implementationAddress == null) {
      return res.status(200).json({
        ok: true,
        abi,
      });
    }

    const implementationAbi = await getAbi(implementationAddress, network);

    return res.status(200).json({
      ok: true,
      abi: {
        ...abi,
        implementationAddress,
        implementationAbi,
      },
    });
  } catch (e) {
    let message = `Unable to resolve ${addy}. Please try again with a different contract or network, or contact @pugson on Telegram if this keeps happening.`;

    if (e instanceof UnsupportedNetworkError) {
      message = e.message;
    }

    res.status(400).json({
      ok: false,
      error: message,
    });
  }
}
