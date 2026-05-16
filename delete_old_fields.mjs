const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}` };

const fieldsToDelete = [
  'testimonial_quote',
  'testimonial_highlight',
  'testimonial_author',
  'testimonial_role',
  'testimonial_image'
];

async function deleteFields() {
  for (const field of fieldsToDelete) {
    console.log(`Deleting ${field}...`);
    try {
      const res = await fetch(`${url}/fields/home_page/${field}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok || res.status === 204) {
        console.log(`Deleted ${field} successfully.`);
      } else {
        console.log(`Failed to delete ${field}: ${res.status} ${await res.text()}`);
      }
    } catch (e) {
      console.error(`Error deleting ${field}:`, e);
    }
  }
}

deleteFields();
