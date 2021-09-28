import "../styles/globals.scss";
import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../layouts/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    
        <Layout>
         <Component {...pageProps} />
        </Layout>
    </UserProvider>
  );
}

export default MyApp;
