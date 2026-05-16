const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

// We omitted "special: ['uuid']" on creation, so Directus didn't know to auto-generate the UUIDs!
async function fixId() {
  try {
    const res = await fetch(`${url}/fields/partners/id`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        meta: {
          special: ['uuid'],
          hidden: true,
          readonly: true
        }
      })
    });
    console.log("Patch ID status:", res.status);
    console.log(await res.text());
  } catch (e) {
    console.error(e);
  }
}
fixId();
