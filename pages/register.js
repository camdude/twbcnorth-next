import { useForm } from "../hooks/useForm";
import Input from "../components/formElements/Input";
import Button from "../components/Button";
import { getRegistrationForm, getSiteSettings } from "../lib/api";
import Recaptcha from "react-recaptcha";
import Head from "next/head";
import Layout from "../layouts/Layout";
import Router from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RichTextBlock from "../components/RichTextBlock";

export default function Register({ registrationForm, siteSettings }) {
  let initialState = {};
  registrationForm[0].form.forEach((i) => {
    if (i.element === "select") {
      initialState = {
        ...initialState,
        [i.name]: {
          value: i.selection[0],
          isValid: true,
        },
      };
    } else {
      initialState = {
        ...initialState,
        [i.name]: {
          value: "",
          isValid: false,
        },
      };
    }
  });
  const [formState, inputHandler] = useForm(initialState);
  const [formErrorMsg, setFormErrorMsg] = useState("");
  const [formSending, setFormSending] = useState("prepare");

  const recaptchaLoaded = () => {
    inputHandler("recaptcha", "Loaded", false);
  };

  const recaptchaVerify = () => {
    inputHandler("recaptcha", null, true);
  };

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    if (formState.isFormValid === true) {
      const inputs = Object.entries(formState.inputs);
      inputs.pop();

      const data = {
        token: process.env.API_REGISTER_SECRET,
        recipient: inputs.map((i) => {
          return { name: i[0], value: i[1].value };
        }),
      };
      setFormSending("sending");

      fetch("/api/email/register", {
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
            Router.push("/register/confirmation");
          }
        })
        .catch((error) => {
          setFormSending("failed");
          console.error("Error:", error);
          setFormErrorMsg(
            "Sorry we were unable to process your submission. If this continues, please let us know by sending us an email."
          );
        });
    }
  };

  return (
    <Layout
      meta={{
        title: "Register",
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
      <div className="Register">
        <h1 className="heading-primary">Conference Registration</h1>
        <RichTextBlock blocks={registrationForm[0].desc} />
        <br />
        {registrationForm[0].active ? (
          <div className="Register__content">
            <div className="Register__card">
              <h3 className="heading-tertiary">Register</h3>
              <form className="Register__form" onSubmit={onRegisterSubmit}>
                {registrationForm[0].form.map((i) => {
                  if (i.element == "input") {
                    return (
                      <Input
                        key={i.name}
                        id={i.name}
                        element="text"
                        placeholder={i.name}
                        label={i.name}
                        initialValue={formState.inputs[i.name].value}
                        value={formState.inputs[i.name].value}
                        onInput={inputHandler}
                        rules={i.validation}
                        errorMsg={i.errMsg}
                      />
                    );
                  } else if (i.element === "textarea") {
                    return (
                      <Input
                        key={i.name}
                        id={i.name}
                        element="textarea"
                        placeholder={i.name}
                        label={i.name}
                        initialValue={formState.inputs[i.name].value}
                        value={formState.inputs[i.name].value}
                        initialValid={true}
                        onInput={inputHandler}
                        rules={i.validation}
                        errorMsg={i.errMsg}
                      />
                    );
                  } else if (i.element === "select") {
                    return (
                      <Input
                        key={i.name}
                        id={i.name}
                        element="select"
                        label={i.name}
                        options={i.selection}
                        initialValue={formState.inputs[i.name].value}
                        value={formState.inputs[i.name].value}
                        initialValid={true}
                        onInput={inputHandler}
                        rules={i.validation}
                        errorMsg={i.errMsg}
                      />
                    );
                  }
                })}
                <Recaptcha
                  sitekey={process.env.RECAPTCHA_SITE_KEY}
                  render="explicit"
                  onloadCallback={recaptchaLoaded}
                  verifyCallback={recaptchaVerify}
                />
                {formSending !== "failed" || (
                  <p className="Register__errorMsg">{formErrorMsg}</p>
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
          </div>
        ) : (
          <h3 className="heading-tertiary">Registrations Closed</h3>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const registrationForm = await getRegistrationForm();
  const siteSettings = await getSiteSettings();
  return {
    props: { registrationForm, siteSettings },
    revalidate: 1,
  };
}
