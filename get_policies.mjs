const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function getPolicies() {
  const req = await fetch(`${url}/policies`, { headers });
  console.log(await req.text());
}
getPolicies();
