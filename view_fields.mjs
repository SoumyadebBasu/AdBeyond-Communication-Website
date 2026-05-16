const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function viewFields() {
  try {
    const fReq = await fetch(`${url}/fields/home_page`, { headers });
    const fRes = await fReq.json();
    console.log("home_page fields:");
    console.log(fRes.data.map(f => `${f.field} (Type: ${f.type}, Hidden: ${f.meta?.hidden})`).join('\n'));
    
    // Hide old trusted_by
    const patchTrustedBy = await fetch(`${url}/fields/home_page/trusted_by`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        meta: { hidden: true }
      })
    });
    console.log("Hid trusted_by: ", patchTrustedBy.status);

    // Make new trusted_partners visible and use m2o interface
    const patchTrustedPartners = await fetch(`${url}/fields/home_page/trusted_partners`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        meta: { 
          hidden: false,
          interface: "list-o2m",
          options: {
            "template": "{{name}}"
          }
        }
      })
    });
    console.log("Revealed trusted_partners: ", patchTrustedPartners.status);
    console.log(await patchTrustedPartners.text());
  } catch (e) {
    console.error(e);
  }
}
viewFields();
