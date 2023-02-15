import { useWalletNFTs } from "@quicknode/icy-nft-hooks";
import { useState } from "react";

function WalletNFTs() {
  const [ensName, setEnsName] = useState("");
  const [cursor, setCursor] = useState("");
  const { nfts, isSearchValid, pageInfo } = useWalletNFTs({
    ensName,
    first: 10,
    after: cursor,
  });

  return (
    <div className="WalletNFT bg-black text-white">
      <div className="w-full h-full flex flex-row justify-evenly items-center">
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
      {nfts.map((nft) => {
        const contract = nft.contract;
        const imageUrl = nft.images.find((i) => !!i.url)?.url;

        return (
          <div
            className="bg-gray-800 w-1/5 h-fit rounded-md"
            key={`${nft.tokenId}${nft.contract.address}`}
          >
            {imageUrl && (
              <div className="p-3 w-full h-auto">
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
