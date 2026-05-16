const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function check() {
  const fReq = await fetch(`${url}/fields/home_page`, { headers });
  const fRes = await fReq.json();
  const fields = fRes.data;
  console.log("home_page fields:");
  fields.forEach(f => {
    console.log(`- ${f.field} (Type: ${f.type}, Hidden: ${f.meta?.hidden}, Sort: ${f.meta?.sort})`);
  });
}
check();
