import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "../hooks/useForm";
import Input from "../components/formElements/Input";
import Layout from "../layouts/Layout";
import {
  RULE_VALIDATOR_EMAIL,
  RULE_VALIDATOR_REQUIRED,
} from "../components/formElements/validate";
import Button from "../components/Button";
import { getContactDetails } from "../lib/api";

export default function Contact({contactDetails}) {
  const [formState, inputHandler] = useForm({
    name: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    message: {
      value: "",
      isValid: false,
    },
  });

  const onMessageSubmit = event => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <Layout
      meta={{
        title: "Contact",
      }}
    >
      <div className="Contact">
        <h1 className="heading-primary">Contact</h1>
        <p className="paragraph">
          {contactDetails[0].desc}
        </p>
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
              <Button type="submit" disabled={!formState.isFormValid}>Send</Button>
            </form>
          </div>
          <div className="Contact__card">
            <h2 className="heading-secondary">Contact Info</h2>
            <ul className="Contact__details">
              <li>
                <FontAwesomeIcon icon="envelope" />{" "}
                <a href={`mailto:${contactDetails[0].email}`}>{contactDetails[0].email}</a>
              </li>
              <li>
                <FontAwesomeIcon icon="phone" />{" "}
                <a href={`tel:${contactDetails[0].phone}`}>{contactDetails[0].phone}</a>
              </li>
              <li>
                <FontAwesomeIcon icon={["fab", "facebook-square"]} />{" "}
                <a href={`https://www.facebook.com/${contactDetails[0].facebook}/`}>{contactDetails[0].facebook}</a>
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
  return {
    props: { contactDetails }
  };
}