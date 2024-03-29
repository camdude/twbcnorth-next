import Audio from "../components/Audio";
import Layout from "../layouts/Layout";
import { getSiteSettings, getTalks, urlForAsset } from "../lib/api";

export default function Talks({ talks, siteSettings }) {
  return (
    <Layout
      meta={{
        title: "Talks",
      }}
      theme={siteSettings[0].themeColours}
    >
      <div className="Talks__content">
        <h1 className="heading-primary">Talks</h1>
        {talks.map((conf) => {
          return (
            <div key={conf.year}>
              <h2 className="heading-secondary">{conf.year}</h2>
              {conf.talkList.map((talk) => {
                if (talk.audio._upload) {
                  return (
                    <Audio
                      key={talk.title}
                      title="Uploading ..."
                      source={{
                        src: "",
                        type: "audio/mpeg",
                      }}
                    />
                  );
                } else {
                  return (
                    <Audio
                      key={talk.audio.asset._ref}
                      title={talk.title}
                      source={{
                        src: urlForAsset(talk.audio.asset._ref),
                        type: "audio/mpeg",
                      }}
                    />
                  );
                }
              })}
              <br />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const talks = await getTalks();
  const siteSettings = await getSiteSettings();
  return {
    props: { talks, siteSettings },
    revalidate: 1,
  };
}
