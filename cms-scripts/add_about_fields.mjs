const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

const fields = [
  { field: 'about_title', type: 'string', meta: { interface: 'input' } },
  { field: 'about_headline', type: 'string', meta: { interface: 'input' } },
  { field: 'about_description', type: 'text', meta: { interface: 'textarea' } },
  { field: 'about_stat_1_number', type: 'string', meta: { interface: 'input' } },
  { field: 'about_stat_1_label', type: 'string', meta: { interface: 'input' } },
  { field: 'about_stat_2_number', type: 'string', meta: { interface: 'input' } },
  { field: 'about_stat_2_label', type: 'string', meta: { interface: 'input' } },
  { field: 'about_image', type: 'uuid', meta: { interface: 'file-image', display: 'image' } }
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

  console.log("Adding relation for about_image...");
  let relRes = await fetch(`${url}/relations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      collection: 'home_page',
      field: 'about_image',
      related_collection: 'directus_files',
      schema: { on_delete: 'SET NULL' },
      meta: { one_collection: 'home_page', one_field: 'about_image' }
    })
  });
  console.log(relRes.status, await relRes.text());

  // Wait a sec for schema cache
  await new Promise(r => setTimeout(r, 1000));

  console.log("Updating defaults...");
  let updateRes = await fetch(`${url}/items/home_page`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      about_title: "About Adbeyond",
      about_headline: "Pioneering Social Impact Through Strategy & Design",
      about_description: "We are a mission-driven communications agency dedicated to amplifying the voices of non-profits, social enterprises, and changemakers globally. By blending deep strategic insight with world-class design, we help organizations transform complexity into compelling narratives that drive real-world action.",
      about_stat_1_number: "10+",
      about_stat_1_label: "Years of Impact",
      about_stat_2_number: "500+",
      about_stat_2_label: "Projects Delivered"
    })
  });
  console.log(updateRes.status, await updateRes.text());
}
run();
