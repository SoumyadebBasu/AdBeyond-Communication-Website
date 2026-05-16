const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function retry() {
  console.log("Checking relations...");
  const relCheck = await fetch(`${url}/relations`, { headers });
  const allRelJson = await relCheck.json();
  const rels = allRelJson.data.filter(r => r.collection === 'partners' && r.field === 'home_page_id');
  if (rels.length === 0) {
    console.log("Creating link field natively on partners...");
    let fRes = await fetch(`${url}/fields/partners`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        field: 'home_page_id',
        type: 'integer',
        meta: { hidden: true }
      })
    });
    console.log("Field partners.home_page_id:", fRes.status, await fRes.text());

    console.log("Creating field trusted_partners natively on home_page...");
    fRes = await fetch(`${url}/fields/home_page`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        field: 'trusted_partners',
        type: 'alias',
        meta: {
          interface: 'list-o2m',
          special: ['o2m'],
          options: { template: '{{name}}' },
          hidden: false
        }
      })
    });
    console.log("Field home_page.trusted_partners:", fRes.status, await fRes.text());

    console.log("Creating relation...");
    fRes = await fetch(`${url}/relations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'partners',
        field: 'home_page_id',
        related_collection: 'home_page',
        schema: { on_delete: 'SET NULL' },
        meta: {
          many_collection: 'partners',
          many_field: 'home_page_id',
          one_collection: 'home_page',
          one_field: 'trusted_partners'
        }
      })
    });
    console.log("Relation:", fRes.status, await fRes.text());
  } else {
    console.log("Relation already exists!");
  }
}
retry();
