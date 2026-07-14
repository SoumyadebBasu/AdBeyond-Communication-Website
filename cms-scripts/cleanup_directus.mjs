const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function cleanup() {
  console.log("Checking relations...");
  const relReq = await fetch(`${url}/relations/partners/home_page_id`, { headers });
  if (relReq.ok) {
    console.log("Deleting relation...");
    await fetch(`${url}/relations/partners/home_page_id`, { method: 'DELETE', headers });
  } else {
    console.log("Relation not found on partners/home_page_id");
  }

  console.log("Checking field home_page_id in partners...");
  const fieldReq = await fetch(`${url}/fields/partners/home_page_id`, { headers });
  if (fieldReq.ok) {
    console.log("Deleting field home_page_id from partners...");
    await fetch(`${url}/fields/partners/home_page_id`, { method: 'DELETE', headers });
  } else {
    console.log("home_page_id field not found in partners");
  }

  console.log("Checking trusted_partners in home_page...");
  const aliasReq = await fetch(`${url}/fields/home_page/trusted_partners`, { headers });
  if (aliasReq.ok) {
    console.log("Deleting trusted_partners from home_page...");
    await fetch(`${url}/fields/home_page/trusted_partners`, { method: 'DELETE', headers });
  } else {
    console.log("trusted_partners field not found in home_page");
  }

  console.log("Check all relations for home_page...");
  const allRel = await fetch(`${url}/relations`, { headers });
  const allRelJson = await allRel.json();
  const hpRels = allRelJson.data.filter(r => r.collection === 'home_page' || r.related_collection === 'home_page' || r.meta?.one_collection === 'home_page');
  console.log("Rels affecting home_page:");
  hpRels.forEach(r => console.log(`${r.collection}.${r.field} -> ${r.related_collection} (one_field: ${r.meta?.one_field})`));

}
cleanup();
