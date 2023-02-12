import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      <main className="p-4 md:p-6 max-w-5xl lg:mx-auto overflow-x-hidden">
        <img src="/gfx.svg" alt="ABI Data" className="-ml-2 sm:ml-0 -mt-4 sm:mt-0" />
        <div className="px-4 py-8">
          <h1 className="text-2xl sm:text-3xl leading-9 sm:leading-10 max-w-4xl">
            Fetch ABI for contracts from Etherscan to use with{" "}
            <a href="https://wagmi.sh" target="_blank">
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
                  Querying the chain
                  <span className="loading-icon"></span>
                </p>
              )}
            </span>
          </form>
          {loading && (
            <p className="hidden lg:block text-white mt-2">
              Querying the chain
              <span className="loading-icon"></span>
            </p>
          )}
        </div>
      </main>
      <footer className="mt-32 py-16 px-10 sm:px-12 max-w-5xl xl:mx-auto">
        <p className="text-white">
          © {new Date().getFullYear()}{" "}
          <a href="https://wojtek.im" className="b-pink">
            pugson
          </a>
        </p>
        <div className="w-16 h-1 bg-gray-800 my-4"></div>
        <p className="text-gray-600 text-sm">
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
