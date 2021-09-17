import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { SidebarWrapper } from '../hooks/SidebarProvider'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SidebarWrapper>
         <Component {...pageProps} />
      </SidebarWrapper>
    </UserProvider>
  );
}

export default MyApp;
