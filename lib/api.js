import client from "./sanity";

export async function getAboutContent() {
  const results = await client.fetch(`*[_type == "about"]`);

  return results;
}

export async function getRegistrationForm() {
  const results = await client.fetch(`*[_type == "registration"]`);

  return results;
}

export async function getConferenceContent() {
  const results = await client.fetch(`*[_type == "conference"]`);

  return results;
}

export async function getContactDetails() {
  const results = await client.fetch(`*[_type == "contact"]`);

  return results;
}
