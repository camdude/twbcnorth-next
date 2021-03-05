import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

export function urlFor(source) {
  const builder = imageUrlBuilder(client);

  return builder.image(source);
}

export function urlForAsset(ref) {
  const [_file, id, extension] = ref.split("-");
  return `https://cdn.sanity.io/files/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET_NAME}/${id}.${extension}`;
}

export async function getSiteSettings() {
  const results = await client.fetch(`*[_type == "settings"]`);

  return results;
}

export async function getAboutContent() {
  const results = await client.fetch(
    `*[_type == "about"] {content[]{..., "asset": asset->}}`
  );

  return results;
}

export async function getRegistrationForm() {
  const results = await client.fetch(`*[_type == "registration"]`);

  return results;
}

export async function getConferenceContent() {
  const results = await client.fetch(
    `*[_type == "conference"] {..., content[]{..., "asset": asset->}}`
  );

  return results;
}

export async function getTalks() {
  const results = await client.fetch(`*[_type == "talks"] | order(year desc)`);

  return results;
}

export async function getContactDetails() {
  const results = await client.fetch(`*[_type == "contact"]`);

  return results;
}
