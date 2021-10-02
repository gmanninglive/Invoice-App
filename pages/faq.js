import Head from 'next/head'
import Faq from "components/faq/Faq";
import Header from "components/header/Header"

export default function FAQpage(){
    return( 
        <>
        <Head>
        <title>Vie | The Invoicing App for Freelancers</title>
        <meta
          name="description"
          content="A free to use cloud based invoicing app for freelancers and small businesses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header title="FAQs" back="true" />
        <Faq />
        
        </>
    )
}