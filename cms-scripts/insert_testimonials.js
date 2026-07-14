const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
const crypto = require('crypto');

async function insertTestimonies() {
  let res = await fetch(`${url}/items/testimonials`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id: crypto.randomUUID(),
      quote: "Adbeyond didn't just design our reports; they helped us find the heart of our story. Their work led to a 40% increase in donor engagement.",
      highlight: '40% increase',
      author: 'Sarah Jenkins',
      role: 'Director, Global Relief Initiative',
      image: 'b6733af5-0d1e-4b88-bd98-59fa6241ffb6',
      home_page_id: 1,
      sort: 1
    })
  });
  console.log("Insertion 1:", res.status, await res.text());

  // Let's add a second one just so the carousel is obvious immediately
  res = await fetch(`${url}/items/testimonials`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id: crypto.randomUUID(),
      quote: "The digital transformation we experienced with Adbeyond allowed us to reach communities we previously thought were impossible to connect with.",
      highlight: 'impossible to connect with',
      author: 'David Chen',
      role: 'Head of Operations, Clean Earth Org',
      image: 'a5b324cf-0ed7-4b60-91c2-d1424ea6bbea', // using existing logo or generic
      home_page_id: 1,
      sort: 2
    })
  });
  console.log("Insertion 2:", res.status, await res.text());
}
insertTestimonies();
