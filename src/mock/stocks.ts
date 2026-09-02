import { allAssets } from "./assets";
export const stockAssets = allAssets.filter((asset) => asset.kind === "stock");
