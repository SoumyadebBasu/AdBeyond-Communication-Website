const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

const fields = [
  { field: 'hero_stat_number', type: 'string', meta: { interface: 'input' } },
  { field: 'hero_stat_label', type: 'string', meta: { interface: 'input' } }
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
      hero_stat_number: "120+",
      hero_stat_label: "Global Non-Profits Empowered"
    })
  });
  console.log(updateRes.status, await updateRes.text());
}
run();
