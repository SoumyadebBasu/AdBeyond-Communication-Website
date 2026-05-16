const baseUrl = 'https://cms.sbasucloud.pp.ua/';

async function checkFields() {
  try {
    const res = await fetch(baseUrl + 'items/portfolio_items?limit=1');
    const json = await res.json();
    console.log(JSON.stringify(json.data?.[0], null, 2));
  } catch(e) {
    console.error(e);
  }
}
checkFields();
