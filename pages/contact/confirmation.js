import Layout from "../../layouts/Layout";
import { getSiteSettings } from "../../lib/api";

export default function Confirmation({ siteSettings }) {
  return (
    <Layout
      meta={{
        title: "About",
      }}
      theme={siteSettings[0].themeColours}
    >
      <div className="About__content">
        <h1 className="heading-primary">Message Receieved</h1>
        <p>
          Thankyou for getting in contact with us. We will send you an email
          shortly to confirm we have recieved your message. (You may need to
          check your junk folder)
        </p>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const siteSettings = await getSiteSettings();
  return {
    props: { siteSettings },
    revalidate: 1,
  };
}
