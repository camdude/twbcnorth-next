import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotificationBanner from "../components/NotificationBanner";
import { useEffect } from "react";
import ThemeProvider from "./ThemeProvider";

const Layout = ({ meta, bannerMsg, theme, children }) => {
  let notification;
  if (bannerMsg && bannerMsg.active) {
    notification = (
      <NotificationBanner
        header={bannerMsg.header}
        message={bannerMsg.message}
        type={bannerMsg.type}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{`TWBC North | ${meta.title}`}</title>
      </Head>
      {notification}
      <Navbar colour={theme.secondary.hex}/>
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
