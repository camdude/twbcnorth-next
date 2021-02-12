import BlockContent from "@sanity/block-content-to-react";
import { urlFor } from "../lib/api";

const RichTextBlock = ({ blocks, className }) => {
  const overrides = {
    h1: (props) => (
      <h1 className={`${className || "RichTextBlock"}__h1`} {...props} />
    ),
    h2: (props) => (
      <h2 className={`${className || "RichTextBlock"}__h2`} {...props} />
    ),
    h3: (props) => (
      <h3 className={`${className || "RichTextBlock"}__h3`} {...props} />
    ),
    h4: (props) => (
      <h3 className={`${className || "RichTextBlock"}__h4`} {...props} />
    ),
    h5: (props) => (
      <h3 className={`${className || "RichTextBlock"}__h5`} {...props} />
    ),
    h6: (props) => (
      <h3 className={`${className || "RichTextBlock"}__h6`} {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className={`${className || "RichTextBlock"}__quote`}
        {...props}
      />
    ),
    normal: (props) =>
      props.children[0] === "" ? (
        <div className={`${className || "RichTextBlock"}__break`} />
      ) : (
        <p
          className={`${className || "RichTextBlock"}__paragraph`}
          {...props}
        />
      ),
  };

  const serializers = {
    list: (props) => {
      if (props.type === "bullet") {
        return (
          <ul className={`${className || "RichTextBlock"}__ul`}>
            {props.children}
          </ul>
        );
      }
      return (
        <ol className={`${className || "RichTextBlock"}__ol`}>
          {props.children}
        </ol>
      );
    },
    listItem: (props) => (
      <li className={`${className || "RichTextBlock"}__li`}>
        {props.children}
      </li>
    ),
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
      image: ({ node: { asset, alt, position = "center", crop, hotspot } }) => {
        return (
          <div
            className={`${className || "RichTextBlock"}__imgContainer ${
              className || "RichTextBlock"
            }__imgContainer--${position}`}
          >
            <img src={urlFor(asset.url).width(300).fit("max")} alt={alt} />
          </div>
        );
      },
    },
  };

  return <BlockContent serializers={serializers} blocks={blocks} />;
};

export default RichTextBlock;
