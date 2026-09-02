import { allAssets } from "./assets";
export const currencyAssets = allAssets.filter((asset) => asset.kind === "currency");
