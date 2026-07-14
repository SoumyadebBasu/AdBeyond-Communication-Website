const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function createTestimonialsSchema() {
  try {
    console.log("1. Creating testimonials collection...");
    let res = await fetch(`${url}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'testimonials',
        meta: { icon: 'format_quote', note: 'Home page testimonials' },
        schema: { name: 'testimonials' },
        fields: [
          { field: 'id', type: 'uuid', schema: { is_primary_key: true, has_auto_increment: false }, meta: { hidden: true, readonly: true } },
          { field: 'sort', type: 'integer', meta: { interface: 'input' } },
          { field: 'quote', type: 'text', meta: { interface: 'textarea' } },
          { field: 'highlight', type: 'string', meta: { interface: 'input' } },
          { field: 'author', type: 'string', meta: { interface: 'input' } },
          { field: 'role', type: 'string', meta: { interface: 'input' } },
          { field: 'image', type: 'uuid', meta: { interface: 'file-image' } },
          { field: 'home_page_id', type: 'integer', meta: { hidden: true } }
        ]
      })
    });
    console.log("Collection creation:", res.status, await res.text());

    console.log("2. Creating alias on home_page...");
    res = await fetch(`${url}/fields/home_page`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        field: 'testimonials',
        type: 'alias',
        meta: {
          interface: 'list-o2m',
          special: ['o2m'],
          options: { template: '{{author}}' },
          hidden: false
        }
      })
    });
    console.log("Alias creation:", res.status, await res.text());

    console.log("3. Creating relation...");
    res = await fetch(`${url}/relations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'testimonials',
        field: 'home_page_id',
        related_collection: 'home_page',
        schema: { on_delete: 'SET NULL' },
        meta: {
          many_collection: 'testimonials',
          many_field: 'home_page_id',
          one_collection: 'home_page',
          one_field: 'testimonials'
        }
      })
    });
    console.log("Relation creation:", res.status, await res.text());

    console.log("4. Inserting existing testimony...");
    res = await fetch(`${url}/items/testimonials`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        quote: "Adbeyond didn't just design our reports; they helped us find the heart of our story. Their work led to a 40% increase in donor engagement.",
        highlight: '40% increase',
        author: 'Sarah Jenkins',
        role: 'Director, Global Relief Initiative',
        image: 'b6733af5-0d1e-4b88-bd98-59fa6241ffb6',
        home_page_id: 1,
        sort: 1
      })
    });
    console.log("Insertion:", res.status, await res.text());

    console.log("5. Updating Public Policy to read testimonials...");
    res = await fetch(`${url}/permissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        collection: 'testimonials',
        action: 'read',
        permissions: {},
        validation: {},
        presets: null,
        fields: ['*'],
        policy: 'abf8a154-5b1c-4a46-ac9c-7300570f4f17' // Public
      })
    });
    console.log("Permissions:", res.status, await res.text());

  } catch (e) {
    console.error("Error Details:", e);
  }
}
createTestimonialsSchema();
