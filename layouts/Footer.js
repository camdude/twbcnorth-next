import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__columns">
        <div className="Footer__section">
          <h4 className="Footer__heading">Contact</h4>
          <ul className="Footer__list">
            <li className="Footer__listItem">
              <a
                className="Footer__link link"
                href="mailto:twbcnorth@outlook.com"
                target="blank"
              >
                <FontAwesomeIcon icon="envelope" /> Email
              </a>
            </li>
            <li className="Footer__listItem">
              <a
                className="Footer__link link"
                href="tel:0422926053"
                target="blank"
              >
                <FontAwesomeIcon icon={["fas", "phone"]} /> Phone
              </a>
            </li>
            <li className="Footer__listItem">
              <a
                className="Footer__link link"
                href="https://www.facebook.com/twbcn/"
                target="blank"
              >
                <FontAwesomeIcon icon={["fab", "facebook-square"]} /> Facebook
              </a>
            </li>
          </ul>
        </div>
        <div className="Footer__section">
          <h4 className="Footer__heading">Navigation</h4>
          <ul className="Footer__list">
            <li className="Footer__listItem">
              <a className="Footer__link link" href="/">
                Home
              </a>
            </li>
            <li className="Footer__listItem">
              <a className="Footer__link link" href="/about">
                About
              </a>
            </li>
            <li className="Footer__listItem">
              <a className="Footer__link link" href="/register">
                Register
              </a>
            </li>
            <li className="Footer__listItem">
              <a className="Footer__link link" href="/conferences">
                Conferences
              </a>
            </li>
            <li className="Footer__listItem">
              <a className="Footer__link link" href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="Footer__copyright">
        Copyright © 2019-{moment().format("YYYY")} TWBC North, All rights
        reserved.
      </div>
    </div>
  );
};

export default Footer;
