import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import "../styles/index.scss";

library.add(faBars, faEnvelope, faPhone, faFacebookSquare);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
