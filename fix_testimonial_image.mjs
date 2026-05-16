const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function fixImageField() {
  console.log("Setting up foreign key relation for image field...");
  const relRes = await fetch(`${url}/relations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      collection: 'testimonials',
      field: 'image',
      related_collection: 'directus_files',
      schema: {
        on_delete: 'SET NULL'
      },
      meta: {
        one_collection: 'testimonials',
        one_field: 'image'
      }
    })
  });
  console.log("Relation status:", relRes.status, await relRes.text());

  console.log("Updating field meta to support direct uploader natively...");
  const fieldRes = await fetch(`${url}/fields/testimonials/image`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      meta: {
        interface: 'file-image',
        display: 'image'
      }
    })
  });
  console.log("Field update status:", fieldRes.status, await fieldRes.text());
}

fixImageField();
