import Button from "../components/Button";
import RichTextBlock from "../components/RichTextBlock";
import Layout from "../layouts/Layout";
import { getConferenceContent, getSiteSettings, urlFor } from "../lib/api";

export default function About({ pageContent, siteSettings }) {
  return (
    <Layout
      meta={{
        title: "About",
      }}
      theme={siteSettings[0].themeColours}
    >
      <img className="About__banner" src={urlFor(pageContent[0].banner)} />
      <div className="About__content">
        <RichTextBlock blocks={pageContent[0].content} />
        <br />
        <Button href="/register">Register Now</Button>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const pageContent = await getConferenceContent();
  const siteSettings = await getSiteSettings();
  return {
    props: { pageContent, siteSettings },
    revalidate: 1,
  };
}
