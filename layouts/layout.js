import Head from "next/head";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

export default function Layout({ meta, children }) {


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
}
