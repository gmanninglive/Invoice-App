import Head from "next/head";
import "../styles/globals.scss";
import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../layouts/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>Vie | The Invoicing App for Freelancers</title>
        <meta
          name="description"
          content="A free to use cloud based invoicing app for freelancers and small businesses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
