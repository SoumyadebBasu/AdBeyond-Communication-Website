const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function patchSpecial() {
  const fRes = await fetch(`${url}/fields/home_page/trusted_partners`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      meta: {
        special: ['o2m']
      }
    })
  });
  console.log("Status:", fRes.status);
  console.log(await fRes.text());
}
patchSpecial();
