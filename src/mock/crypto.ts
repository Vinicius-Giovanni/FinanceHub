import { allAssets } from "./assets";
export const cryptoAssets = allAssets.filter((asset) => asset.kind === "crypto");
