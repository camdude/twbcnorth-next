import { useForm } from "../hooks/useForm";
import Input from "../components/formElements/Input";
import Layout from "../layouts/Layout";
import Button from "../components/Button";
import { getRegistrationForm } from "../lib/api";

export default function Register({ registrationForm }) {
  const [formState, inputHandler] = useForm();

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <Layout
      meta={{
        title: "Register",
      }}
    >
        {console.log(registrationForm)}
      <div className="Register">
        <h1 className="heading-primary">Conference Registration</h1>
        <p className="paragraph">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab magni
          praesentium ut nihil. Eius corrupti facilis nisi dignissimos esse sed,
          vel, fuga quas ipsum accusantium maiores incidunt! Excepturi, quas
          necessitatibus.
        </p>
        <div className="Register__content">
          <div className="Register__card">
            <h3 className="heading-tertiary">Register</h3>
            <form className="Register__form" onSubmit={onRegisterSubmit}>
              {registrationForm[0].form.map((i) => {
                if (i.element == "input") {
                  return (
                    <Input
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
              <Button type="submit" disabled={!formState.isFormValid}>
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const registrationForm = await getRegistrationForm();
  return {
    props: { registrationForm },
  };
}
