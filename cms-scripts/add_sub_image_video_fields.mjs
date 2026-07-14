const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

const fields = [
  { field: 'video_file', type: 'uuid', meta: { interface: 'file' }, schema: { is_nullable: true } },
  { field: 'youtube_id', type: 'string', meta: { interface: 'input' }, schema: { is_nullable: true } }
];

async function run() {
  for (const f of fields) {
    console.log(`Creating field ${f.field}...`);
    try {
      let res = await fetch(`${url}/fields/portfolio_sub_images`, {
        method: 'POST',
        headers,
        body: JSON.stringify(f)
      });
      console.log(res.status, await res.text());
    } catch (e) {
      console.error(e);
    }

    if (f.field === 'video_file') {
      console.log(`Adding relation for ${f.field}...`);
      try {
        let res = await fetch(`${url}/relations`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            collection: 'portfolio_sub_images',
            field: 'video_file',
            related_collection: 'directus_files'
          })
        });
        console.log(res.status, await res.text());
      } catch (e) {
        console.error(e);
      }
    }
  }
}
run();
