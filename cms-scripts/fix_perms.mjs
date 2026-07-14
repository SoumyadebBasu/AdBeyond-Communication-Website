const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function fixPermissions() {
  try {
    const res = await fetch(`${url}/permissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'partners',
        action: 'read',
        permissions: {},
        validation: {},
        presets: null,
        fields: ['*'],
        role: null // null role indicates Public
      })
    });
    console.log("Permissions update status:", res.status);
    console.log(await res.text());
  } catch (e) {
    console.error(e);
  }
}
fixPermissions();
