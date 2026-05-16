import { createDirectus, rest, readItems } from '@directus/sdk';

const DIRECTUS_URL = 'https://cms.sbasucloud.pp.ua/';
const directus = createDirectus(DIRECTUS_URL).with(rest());

async function checkFields() {
  try {
    const data = await directus.request(readItems('portfolio_items', { limit: 1 }));
    console.log(JSON.stringify(data?.[0], null, 2));
  } catch(e) {
    console.error(e);
  }
}
checkFields();
