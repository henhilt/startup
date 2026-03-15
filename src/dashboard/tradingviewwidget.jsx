// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "2",
          "symbol": "NYSE:MANU",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "rgba(128, 128, 128, 1)",
          "gridColor": "rgba(46, 46, 46, 0.06)",
          "lineColor": "#22ce34",
          "topColor": "rgba(34, 206, 52, 0.3)",
          "bottomColor": "rgba(34, 206, 52, 0)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": false,
          "width": "700",
          "height": "450"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NYSE-MANU/" rel="noopener nofollow" target="_blank"><span className="blue-text">MANU stock chart</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

export default memo(TradingViewWidget);
