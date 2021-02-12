import BlockContent from "@sanity/block-content-to-react";
import RichTextBlock from "../components/RichTextBlock";
import Layout from "../layouts/Layout";
import { getAboutContent } from "../lib/api";

export default function About({ pageContent }) {
  return (
    <Layout
      meta={{
        title: "About",
      }}
    >
      {console.log(pageContent)}
      <div className="About__content">
        <h1 className="heading-primary">About</h1>
        <RichTextBlock blocks={pageContent[0].content} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const pageContent = await getAboutContent();
  return {
    props: { pageContent },
  };
}
