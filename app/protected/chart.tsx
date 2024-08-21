 


import dynamic from "next/dynamic";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
const SymbolOverviewNoSSR = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.SymbolOverview),
  {
    ssr: false,
  }
);
export default function Chart({ }) {
    <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>
}