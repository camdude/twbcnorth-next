import Layout from "../../layouts/Layout";

export default function Confirmation() {
  return (
    <Layout
      meta={{
        title: "About",
      }}
    >
      <div className="About__content">
        <h1 className="heading-primary">Thankyou For Registering</h1>
        <p>
          Please check your inbox as confirmation of your registration (You may need to check your junk folder). We will
          send you another email once we have received your payment to make it
          complete.
        </p>
      </div>
    </Layout>
  );
}
