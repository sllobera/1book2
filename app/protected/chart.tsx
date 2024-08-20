 


import dynamic from "next/dynamic";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widget";
const SymbolOverviewNoSSR = dynamic(
  () => import("react-ts-tradingview-widget").then((w) => w.SymbolOverview),
  {
    ssr: false,
  }
);
export default function Chart({ }) {
    <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>
}