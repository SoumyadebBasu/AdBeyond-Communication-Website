import fetch from 'node-fetch';

const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function createPartners() {
  try {
    console.log("Creating partners collection...");
    const res = await fetch(`${url}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'partners',
        meta: { icon: 'handshake' },
        schema: { name: 'partners' },
        fields: [
          {
            field: 'id',
            type: 'uuid',
            meta: { hidden: true, readonly: true },
            schema: { is_primary_key: true, has_auto_increment: false }
          },
          {
            field: 'name',
            type: 'string',
            meta: { interface: 'input' },
            schema: { is_nullable: false }
          },
          {
            field: 'logo',
            type: 'uuid',
            meta: { interface: 'file-image' },
            schema: { is_nullable: true }
          },
          {
            field: 'sort',
            type: 'integer',
            meta: { hidden: true },
            schema: { is_nullable: true }
          }
        ]
      })
    });
    
    console.log("Collection create status:", res.status);
    console.log(await res.text());

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
createPartners();
