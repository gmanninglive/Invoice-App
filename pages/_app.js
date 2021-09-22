import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { SidebarWrapper } from '../hooks/SidebarProvider'
import Layout from "../layouts/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SidebarWrapper>
        <Layout>
         <Component {...pageProps} />
        </Layout>
      </SidebarWrapper>
    </UserProvider>
  );
}

export default MyApp;
