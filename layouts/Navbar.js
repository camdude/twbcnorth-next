import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TwbcLogo from "../public/logo.svg";

const Navbar = ({ colour="#213f5a" }) => {
  const [navOpen, setnavOpen] = useState(false);

  return (
    <div className="Navbar">
      <div className="Navbar__header">
        <div className="Navbar__menu">
          <FontAwesomeIcon
            className="Navbar__icon"
            size="lg"
            icon="bars"
            onClick={() => {
              setnavOpen(!navOpen);
            }}
          />
        </div>
        <div className="Navbar__title">
          <Link href="/">
            <a>
              <TwbcLogo fill={colour} />
            </a>
          </Link>
        </div>
      </div>
      <ul className={`Navbar__list ${navOpen ? "Navbar__list--open" : ""}`}>
        <li className="Navbar__item">
          <Link href="/about">
            <a className="Navbar__link">About</a>
          </Link>
        </li>
        <li className="Navbar__item">
          <Link href="/register">
            <a className="Navbar__link">Register</a>
          </Link>
        </li>
        <li className="Navbar__item">
          <Link href="/conference">
            <a className="Navbar__link">Conference</a>
          </Link>
        </li>
        <li className="Navbar__item">
          <Link href="/talks">
            <a className="Navbar__link">Past Talks</a>
          </Link>
        </li>
        <li className="Navbar__item">
          <Link href="/contact">
            <a className="Navbar__link">Contact</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
