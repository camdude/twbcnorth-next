import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "../hooks/useForm";
import Input from "../components/formElements/Input";
import {
  RULE_VALIDATOR_EMAIL,
  RULE_VALIDATOR_REQUIRED,
} from "../components/formElements/validate";
import Button from "../components/Button";
import { getContactDetails, getSiteSettings } from "../lib/api";
import Recaptcha from "react-recaptcha";
import Head from "next/head";
import RichTextBlock from "../components/RichTextBlock";
import Layout from "../layouts/Layout";
import Router from "next/router";
import { useState } from "react";

export default function Contact({ contactDetails, siteSettings }) {
  const [formSending, setFormSending] = useState("prepare");

  const [formState, inputHandler] = useForm({
    name: {
      value: "",
      isValid: false,
    },
    email: {
      value: "@",
      isValid: false,
    },
    message: {
      value: "",
      isValid: false,
    },
    recaptcha: {
      value: null,
      isValid: false,
    },
  });

  const recaptchaLoaded = () => {
    inputHandler("recaptcha", "Loaded", false);
  };

  const recaptchaVerify = () => {
    inputHandler("recaptcha", null, true);
  };

  const onMessageSubmit = (event) => {
    // TODO: Give feedback on submission result
    event.preventDefault();

    if (formState.isFormValid === true) {
      const data = {
        token: process.env.API_EMAIL_SECRET,
        recipient: {
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          message: formState.inputs.message.value,
        },
        adminEmail: siteSettings[0].adminEmail,
      };

      setFormSending("sending");

      fetch("/api/email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            setFormSending("sent");
            console.log("Success:", data);
            Router.push("/contact/confirmation");
          }
        })
        .catch((error) => {
          setFormSending("failed");
          console.error(error);
        });
    }
  };

  return (
    <Layout
      meta={{
        title: "Contact",
      }}
      theme={siteSettings[0].themeColours}
    >
      <Head>
        <script
          src="https://www.google.com/recaptcha/api.js?&render=explicit"
          async
          defer
        ></script>
      </Head>
      <div className="Contact">
        <h1 className="heading-primary">Contact</h1>
        <RichTextBlock blocks={contactDetails[0].desc} />
        <div className="Contact__content">
          <div className="Contact__card">
            <h2 className="heading-secondary">Send us a message</h2>
            <form className="Contact__form" onSubmit={onMessageSubmit}>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                label="Name"
                onInput={inputHandler}
                rules={[RULE_VALIDATOR_REQUIRED]}
                errorMsg="Please enter your name."
              />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                label="Email"
                onInput={inputHandler}
                rules={[RULE_VALIDATOR_REQUIRED, RULE_VALIDATOR_EMAIL]}
                errorMsg="Please enter a valid email."
              />
              <Input
                id="message"
                element="textarea"
                placeholder="Message"
                label="Message"
                onInput={inputHandler}
                rules={[RULE_VALIDATOR_REQUIRED]}
                errorMsg="Please enter your message."
              />
              <Recaptcha
                sitekey={process.env.RECAPTCHA_SITE_KEY}
                render="explicit"
                onloadCallback={recaptchaLoaded}
                verifyCallback={recaptchaVerify}
              />
              {formSending !== "failed" || (
                <p className="Contact__errorMsg">
                  Sorry we could not process your form submission. Please try
                  again or if the issue continues send us an email instead.
                </p>
              )}
              <Button type="submit" disabled={!formState.isFormValid}>
                {formSending === "sending" ? (
                  <FontAwesomeIcon icon="spinner" size="lg" pulse />
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </div>
          <div className="Contact__card">
            <h2 className="heading-secondary">Contact Info</h2>
            <ul className="Contact__details">
              <li>
                <FontAwesomeIcon icon="envelope" />{" "}
                <a href={`mailto:${contactDetails[0].email}`}>
                  {contactDetails[0].email}
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon="phone" />{" "}
                <a href={`tel:${contactDetails[0].phone}`}>
                  {contactDetails[0].phone}
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={["fab", "facebook-square"]} />{" "}
                <a
                  href={`https://www.facebook.com/${contactDetails[0].facebook}/`}
                >
                  {contactDetails[0].facebook}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const contactDetails = await getContactDetails();
  const siteSettings = await getSiteSettings();
  return {
    props: { contactDetails, siteSettings },
    revalidate: 1,
  };
}
