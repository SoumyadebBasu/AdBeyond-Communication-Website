const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function getField() {
  const fRes = await fetch(`${url}/fields/home_page/trusted_partners`, { headers });
  console.log("Status:", fRes.status);
  console.log(await fRes.text());
}
getField();
