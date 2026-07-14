const fs = require('fs');
const url = 'https://directus-cms-production-a4b9.up.railway.app';
const token = 'RIDGKDYr_wc_xsVX_XAGDVd0efx624fE';
const headers = { 'Authorization': `Bearer ${token}` };

async function fetchSchema() {
  try {
    const collRes = await fetch(`${url}/collections`, {headers});
    const coll = await collRes.json();
    
    const fldsRes = await fetch(`${url}/fields`, {headers});
    const flds = await fldsRes.json();
    
    const relsRes = await fetch(`${url}/relations`, {headers});
    const rels = await relsRes.json();
    
    fs.writeFileSync('schema_dump.json', JSON.stringify({
      collections: coll.data ? coll.data.filter(c => !c.collection.startsWith('directus_')) : [],
      fields: flds.data ? flds.data.filter(f => !f.collection.startsWith('directus_')) : [],
      relations: rels.data ? rels.data.filter(r => !r.collection.startsWith('directus_')) : []
    }, null, 2));
    console.log('Schema saved to schema_dump.json');
  } catch (e) {
    console.error(e);
  }
}
fetchSchema();
