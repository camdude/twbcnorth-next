import Card from "../components/Card";
import Layout from "../layouts/Layout";
import { getSiteSettings } from "../lib/api";

export default function Home({siteSettings}) {
  const notificationData = siteSettings[0].notification;

  return (
    <Layout
      meta={{
        title: "Home",
      }}
      bannerMsg={{
        active: notificationData.active,
        header: notificationData.header,
        message: notificationData.message,
        type: notificationData.type,
      }}
      theme={siteSettings[0].themeColours}
    >
      <div className="Hero">
        <div className="Hero__heading">Tasmanian Women's Bible Conference</div>
        <div className="Hero__content">
          A day conference for women whose desire is to have their minds, hearts
          and lives shaped by the Bible.
        </div>
      </div>
      <div className="CTA">
        <div className="CTA__container">
          <Card
            heading="This Years Conference"
            btnText="Read More"
            link="/conference"
          >
            Find out all the infomation for this years conference and then
            register for the conference.
          </Card>
          <Card heading="Past Conference Talks" btnText="Listen" link="/talks">
            Missed a conference or want to listen to the talks again. You can do
            that all here.
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const siteSettings = await getSiteSettings();
  return {
    props: { siteSettings },
    revalidate: 1,
  };
}
