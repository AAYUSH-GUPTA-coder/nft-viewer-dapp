import { useWalletNFTs } from "@quicknode/icy-nft-hooks";
import { useState } from "react";

function WalletNFTs() {
  const [ensName, setEnsName] = useState("vitalik.eth");
  const [address, setAddress] = useState("");
  const [cursor, setCursor] = useState("");
  const { nfts, isSearchValid, pageInfo } = useWalletNFTs({
    address,
    ensName,
    first: 12,
    after: cursor,
  });

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-6xl mb-4"'>
        NFT Viewer
      </h1>
      <div className="flex-left flex-col mt-4">
        <label
          className="text-zinc-700 text-2xl font-extrabold"
          htmlFor="wallet-address"
        >
          &nbsp; Wallet address: &nbsp;
        </label>
        <div className="search">
          <input
            type="text"
            value={ensName}
            onChange={(e) => setEnsName(e.target.value)}
            style={{
              outlineColor:
                !isSearchValid && ensName.length > 0 ? "red" : undefined,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 mt-8 gap-4">
        {nfts.map((nft) => {
          const contract = nft.contract;
          const imageUrl = nft.images.find((i) => !!i.url)?.url;

          return (
            <div
              className="flex flex-col rounded border p-4"
              key={`${nft.tokenId}${nft.contract.address}`}
            >
              {imageUrl && (
                <div className="w-[200px] h-[200px] rounded shadow">
                  <img src={imageUrl} alt="nft awesome" />
                </div>
              )}
              <div>
                <h1>{contract.name}</h1>
                <h2>
                  {contract.symbol}#{nft.tokenId}
                </h2>
              </div>
            </div>
          );
        })}
      </div>


      {pageInfo?.hasNextPage && (
        <div
          style={{
            alignItems: "flex-end",
            width: "100%",
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <button
            onClick={() => {
              setCursor(pageInfo.endCursor ?? undefined);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletNFTs;
