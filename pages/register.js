import { useForm } from "../hooks/useForm";
import Input from "../components/formElements/Input";
import Button from "../components/Button";
import { getRegistrationForm } from "../lib/api";
import Recaptcha from "react-recaptcha";
import Head from "next/head";
import Layout from "../layouts/Layout";

export default function Register({ registrationForm }) {
  const [formState, inputHandler] = useForm();
  // TODO: Fix initial state for select tags

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
      fetch("/api/email/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Layout
      meta={{
        title: "Register",
      }}
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
        <p className="paragraph">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab magni
          praesentium ut nihil. Eius corrupti facilis nisi dignissimos esse sed,
          vel, fuga quas ipsum accusantium maiores incidunt! Excepturi, quas
          necessitatibus.
        </p>
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
                <Button type="submit" disabled={!formState.isFormValid}>
                  Send
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
  return {
    props: { registrationForm },
    revalidate: 1,
  };
}
