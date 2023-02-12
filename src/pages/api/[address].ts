import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

// @ts-ignore
globalThis.fetch = fetch;

const CONTRACT_ADDRESS_REGEX = /^(0x)?[0-9a-fA-F]{40}$/;

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function trackEvent() {
  await fetch(`https://queue.simpleanalyticscdn.com/events`, {
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

export default async function handler(req: any, res: any) {
  await runMiddleware(req, res, cors);
  res.setHeader("Cache-Control", "s-maxage=31536000000");
  const { address } = req.query;
  const addy = address.toLowerCase();

  if (!CONTRACT_ADDRESS_REGEX.test(addy)) {
    res.status(400).json({
      ok: false,
      error: `Unable to resolve ${addy} because it’s not a valid Ethereum contract address.`,
    });

    return;
  }

  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${addy}&apikey=${process.env.ETHERSCAN_API_KEY}`
    );
    const result = await response.json();
    const abi = JSON.parse(result.result);

    await trackEvent();

    res.status(200).json({
      ok: true,
      abi,
    });
  } catch (e) {
    res.status(400).json({
      ok: false,
      error: `Unable to resolve ${addy}. Please try again or contact @pugson on Telegram if this keeps happening.`,
    });
  }
}
