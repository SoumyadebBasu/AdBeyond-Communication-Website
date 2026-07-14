const url = 'https://cms.sbasucloud.pp.ua';

async function testPublicQuery() {
  try {
    const res = await fetch(`${url}/items/home_page?fields=*.*`);
    console.log("Public response status:", res.status);
    const data = await res.json();
    console.log("Public trusted_partners:", data.data.trusted_partners);
    console.log("Public trusted_by:", data.data.trusted_by);
  } catch (e) {
    console.error(e);
  }
}

async function testAdminQuery() {
  try {
    const res = await fetch(`${url}/items/home_page?fields=*.*`, {
      headers: { 'Authorization': 'Bearer h-acgJ13kQfJwiv8GnDHE-mojcRc4it1' }
    });
    console.log("Admin response status:", res.status);
    const data = await res.json();
    console.log("Admin trusted_partners:", data.data.trusted_partners);
  } catch (e) {
    console.error(e);
  }
}

testPublicQuery().then(testAdminQuery);
