// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<any>()

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "width": "100%",
          "height": "360",
          "symbol": "NASDAQ:NDX",
          "interval": "30",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "hide_legend": true,
          "allow_symbol_change": false,
          "save_image": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
       
      container.current.appendChild(script);
  
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(TradingViewWidget);
