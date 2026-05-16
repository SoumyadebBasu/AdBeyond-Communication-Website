const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function run() {
  // 1. Get current home_page testimonial data
  const hpRes = await fetch(`${url}/items/home_page`, { headers });
  const hpJson = await hpRes.json();
  const hp = hpJson.data;
  console.log("Existing testimonial:", {
    quote: hp.testimonial_quote,
    highlight: hp.testimonial_highlight,
    author: hp.testimonial_author,
    role: hp.testimonial_role,
    image: hp.testimonial_image
  });
}
run();
