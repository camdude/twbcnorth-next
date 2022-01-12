import RichTextBlock from "../components/RichTextBlock";
import Layout from "../layouts/Layout";
import { getAboutContent, getSiteSettings } from "../lib/api";

export default function About({ pageContent, siteSettings }) {
  return (
    <Layout
      meta={{
        title: "About",
      }}
      theme={siteSettings[0].themeColours}
    >
      <div className="About__content">
        <h1 className="heading-primary">About</h1>
        <RichTextBlock blocks={pageContent[0].content} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const pageContent = await getAboutContent();
  const siteSettings = await getSiteSettings();
  return {
    props: { pageContent, siteSettings },
    revalidate: 1,
  };
}
