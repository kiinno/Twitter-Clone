import Layout from "@/components/Layout";
import LoginModal from "@/components/Modals/LoginModal";
import RegisterModal from "@/components/Modals/RegisterModal";
import "@/styles/globals.css";
import { SystemProvider } from "@/utils/systemContext";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import EditModal from "@/components/Modals/EditModal";

SessionProvider;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SystemProvider>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <LoginModal />
        <EditModal />
        <RegisterModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </SystemProvider>
  );
}
