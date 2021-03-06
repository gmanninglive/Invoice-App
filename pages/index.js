/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Head from "next/head";
import Slide from "components/motion/Slide";

import invoicesAll from "public/images/invoices-all.png";
import invoicesPreview from "public/images/invoice-preview.png";
import Loader from "components/common/Loader";

import Header from "components/header/Header";
import Alert from "components/common/Alert";

export default function Index() {
  // Login auth0 User
  const { user, isLoading } = useUser();
  const router = useRouter();

  // If User is logged in redirect to dashboard
  useEffect(() => {
    if (user) {
      router.replace(`/dashboard/${user.sub.slice(6)}`);
    }
  }, [user, router]);

  // If user is logged in display Loader component while routing to dashboard
  if (user) {
    return <Loader />;
  }

  // If user not logged in display landing page
  return (
    <>
      <Head>
        <title>Vie | The Invoicing App for Freelancers</title>
        <meta
          name="description"
          content="A free to use cloud based invoicing app for freelancers and small businesses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen px-4 relative">
        <Header login={user ? false : true} title="Vie" />
        <div className="w-full h-full flex flex-col justify-center ">
          {/**
           * Working with bg-clip-text Is causing issues on ios safari.
           *
           * It works fine in chrome dev tools mobile, but in deployment text is not visible
           *
           * Bug is with wrapping <ul> with styling - Fixed by removing <ul> and adding line breaks.
           */}
          <div
            className="-mt-14 md:mt-0 leading-none text-6xl md:text-7xl font-extrabold text-transparent
            bg-gradient-to-bl from-pink-400 to-white 
            bg-clip-text drop-shadow-purple"
          >
            Estimate <br />
            Invoice <br />
            Payment
          </div>
          <div
            className="
            place-self-end
            text-5xl leading-loose 
               text-transparent 
              bg-gradient-to-bl from-red-500 to-white
              bg-clip-text mix-blend-color-burn"
          >
            ...Vive la vie
          </div>
        </div>
        <div className="flex justify-center">
          <Alert />
        </div>
      </div>

      <div className=" overflow-hidden flex flex-col relative ">
        <span className="text-xl flex flex-wrap px-4 text-gray-200">
          <h1 className="text-indigo-100 pb-4">What is Vie?</h1>
          <p>
            Vie is a cloud based invoicing application, created with the
            freelancer in mind. To make billing and customer organisation
            simple.
          </p>
        </span>
        <Slide direction="right" className="pb-4 my-4 ml-10 place-self-end">
          <Image
            src={invoicesAll}
            width={528}
            height={297}
            alt="Invoices page"
            className="rounded-tl-xl rounded-bl-xl"
          />
        </Slide>

        <span className="text-xl flex flex-wrap px-4 text-gray-200">
          <h1 className="text-indigo-100 pb-4">How do we use Vie?</h1>
          You can get started in 4 simple steps. Sign up / Log In. Add your
          business details to the settings page. Create a customer. Then Create
          an Invoice.
        </span>
        <Slide direction="left" className="pb-4 my-4 mr-10 place-self-start">
          <Image
            src={invoicesPreview}
            width={528}
            height={297}
            alt="Invoices preview"
            className="rounded-tr-xl rounded-br-xl"
          />
        </Slide>
      </div>
    </>
  );
}
