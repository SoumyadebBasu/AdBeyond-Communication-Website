const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function verify() {
  const req = await fetch(`${url}/collections`, { headers });
  const res = await req.json();
  const partnerCol = res.data.find(c => c.collection === 'partners');
  console.log("Partners collection exists?", !!partnerCol);

  const fReq = await fetch(`${url}/fields/home_page`, { headers });
  const fRes = await fReq.json();
  const alias = fRes.data.find(f => f.field === 'trusted_partners');
  console.log("HomePage trusted_partners alias exists?", !!alias, alias ? `(Hidden: ${alias.meta?.hidden})` : '');
}
verify();
