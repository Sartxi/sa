import Script from "next/script";
import * as gtag from "./gtag"

const Analytics = () => {
  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${gtag.TRACKING_ID}', {
                          page_path: window.location.pathname,
                          });
                        `,
        }}
      />
    </>
  );
};

export default Analytics;
