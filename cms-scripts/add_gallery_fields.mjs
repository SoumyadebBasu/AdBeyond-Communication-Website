const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

const fields = [
  { field: 'gallery_title', type: 'string', meta: { interface: 'input' } },
  { field: 'gallery_subtitle', type: 'text', meta: { interface: 'textarea' } }
];

async function run() {
  for (const f of fields) {
    console.log(`Creating field ${f.field}...`);
    try {
      let res = await fetch(`${url}/fields/home_page`, {
        method: 'POST',
        headers,
        body: JSON.stringify(f)
      });
      console.log(res.status, await res.text());
    } catch (e) {
      console.error(e);
    }
  }

  // Wait for schema cache
  await new Promise(r => setTimeout(r, 1000));

  console.log("Updating defaults...");
  let updateRes = await fetch(`${url}/items/home_page`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      gallery_title: "Project Gallery",
      gallery_subtitle: "A curated archive of strategic storytelling, digital engagement, and tactile brand experiences."
    })
  });
  console.log(updateRes.status, await updateRes.text());
}
run();
