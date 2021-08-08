import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import "../styles/globals.css";
import MyDocument from "./_document";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (MyDocument.gaTrackingId) {
      const handleRouteChange = (url, { shallow }) => {
        (window as any).gtag("config", MyDocument.gaTrackingId, {
          page_path: url,
        });
      };
      router.events.on("routeChangeStart", handleRouteChange);
      return () => {
        router.events.off("routeChangeStart", handleRouteChange);
      };
    }
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
