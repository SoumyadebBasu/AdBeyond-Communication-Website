const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function check() {
  const req = await fetch(`${url}/collections/home_page`, { headers });
  const res = await req.json();
  console.log(JSON.stringify(res, null, 2));

  const fReq = await fetch(`${url}/fields/home_page`, { headers });
  const fRes = await fReq.json();
  console.log("home_page fields:", fRes.data.map(f => f.field + ' (' + f.type + ')').join(', '));
}
check();
