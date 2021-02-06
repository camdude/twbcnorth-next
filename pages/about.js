import BlockContent from "@sanity/block-content-to-react";
import RichTextBlock from "../components/RichTextBlock";
import Layout from "../layouts/Layout";
import { getAboutContent } from "../lib/api";

const overrides = {
  h1: (props) => <h1 className="aboutOveride__h1" {...props} />,
  h2: (props) => <h2 className="aboutOveride__h2" {...props} />,
  h3: (props) => <h3 className="aboutOveride__h3" {...props} />,
  h4: (props) => <h3 className="aboutOveride__h4" {...props} />,
  h5: (props) => <h3 className="aboutOveride__h5" {...props} />,
  h6: (props) => <h3 className="aboutOveride__h6" {...props} />,
  blockquote: (props) => <blockquote className="aboutOveride__quote" {...props} />,
  normal: (props) =>
    props.children[0] === "" ? (
      <div className="aboutOveride__break" />
    ) : (
      <p className="aboutOveride__paragraph" {...props} />
    ),
};

const serializers = {
  types: {
    block: (props) => {
      // Check if we have an override for the “style”
      return overrides[props.node.style]
        ? // if so, call the function and pass in the children, ignoring
          // the other unnecessary props
          overrides[props.node.style]({ children: props.children })
        : // otherwise, fallback to the provided default with all props
          BlockContent.defaultSerializers.types.block(props);
    },
  },
};

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
