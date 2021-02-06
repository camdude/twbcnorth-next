import RichTextBlock from "../components/RichTextBlock";
import Layout from "../layouts/Layout";
import { getConferenceContent } from "../lib/api";

export default function About({ pageContent }) {
  return (
    <Layout
      meta={{
        title: "About",
      }}
    >
      <div className="About__content">
        <RichTextBlock blocks={pageContent[0].content} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const pageContent = await getConferenceContent();
  return {
    props: { pageContent },
  };
}
