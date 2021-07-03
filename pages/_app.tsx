import "@/utils/styles.css";

import { AppProps } from "next/app";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-expect-error
  const bigHeader: boolean = Component?.bigHeader || false;

  return (
    <div className="font-display">
      <Header bigHeader={bigHeader} />
      <main className="max-w-screen-xl mx-auto px-2">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
