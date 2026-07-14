const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function createO2M() {
  console.log("Creating home_page_id in partners...");
  let res = await fetch(`${url}/fields/partners`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      field: 'home_page_id',
      type: 'integer',
      meta: { hidden: true },
      schema: { is_nullable: true }
    })
  });
  console.log(res.status, await res.text());

  console.log("Creating alias trusted_partners in home_page...");
  res = await fetch(`${url}/fields/home_page`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      field: 'trusted_partners',
      type: 'alias',
      meta: { 
        hidden: false,
        interface: 'list-o2m',
        options: { "template": "{{name}}" }
      },
      schema: null
    })
  });
  console.log(res.status, await res.text());

  console.log("Linking relation...");
  res = await fetch(`${url}/relations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      collection: 'partners',
      field: 'home_page_id',
      related_collection: 'home_page',
      schema: { on_delete: 'SET NULL' },
      meta: {
        one_collection: 'home_page',
        one_field: 'trusted_partners',
        many_collection: 'partners',
        many_field: 'home_page_id',
        sort_field: 'sort'
      }
    })
  });
  console.log(res.status, await res.text());
}
createO2M();
