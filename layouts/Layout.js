import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ meta, children }) => {
  return (
    <div>
      <Head>
        <title>{`Cameron Clifford | ${meta.title}`}</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
