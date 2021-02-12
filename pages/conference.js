import Button from "../components/Button";
import RichTextBlock from "../components/RichTextBlock";
import Layout from "../layouts/Layout";
import { getConferenceContent, urlFor } from "../lib/api";

export default function About({ pageContent }) {
  return (
    <Layout
      meta={{
        title: "About",
      }}
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
  return {
    props: { pageContent },
  };
}
