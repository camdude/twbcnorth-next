import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotificationBanner from "../components/NotificationBanner";

const Layout = ({ meta, bannerMsg, children }) => {
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
    <div>
      <Head>
        <title>{`Cameron Clifford | ${meta.title}`}</title>
      </Head>
      {notification}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
