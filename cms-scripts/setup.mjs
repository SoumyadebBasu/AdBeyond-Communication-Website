const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function fix() {
  try {
    console.log("Creating home_page_id field in partners...");
    const fieldRes = await fetch(`${url}/fields/partners`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        field: 'home_page_id',
        type: 'integer',
        meta: { hidden: true },
        schema: { is_nullable: true }
      })
    });
    console.log("Field create status:", fieldRes.status);
    console.log(await fieldRes.text());

    console.log("Creating relation to home_page...");
    const relRes = await fetch(`${url}/relations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'partners',
        field: 'home_page_id',
        related_collection: 'home_page',
        schema: null,
        meta: {
          one_collection_field: 'trusted_partners',
          one_field: 'trusted_partners',
          sort_field: 'sort'
        }
      })
    });
    console.log("Relation create status:", relRes.status);
    console.log(await relRes.text());
  } catch (err) {
    console.error(err);
  }
}
fix();
