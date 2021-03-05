import Layout from "../../layouts/Layout";

export default function Confirmation() {
  return (
    <Layout
      meta={{
        title: "About",
      }}
    >
      <div className="About__content">
        <h1 className="heading-primary">Message Receieved</h1>
        <p>
          Thankyou for getting in contact with us. We will send you an email
          shortly to confirm we have recieved your message. (You may need to check your junk folder)
        </p>
      </div>
    </Layout>
  );
}
