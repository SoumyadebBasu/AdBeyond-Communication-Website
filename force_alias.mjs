const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function verify() {
  console.log("Forcing alias creation even if relation exists...");
  const fRes = await fetch(`${url}/fields/home_page`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      field: 'trusted_partners',
      type: 'alias',
      meta: {
        interface: 'list-o2m',
        special: ['o2m'],
        options: { template: '{{name}}' },
        hidden: false
      }
    })
  });
  console.log("Alias creation:", fRes.status, await fRes.text());
}
verify();
