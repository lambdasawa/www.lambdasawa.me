import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  public static readonly gaTrackingId: string = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html data-theme="mytheme">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {MyDocument.gaTrackingId && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${MyDocument.gaTrackingId}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${MyDocument.gaTrackingId}');
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
