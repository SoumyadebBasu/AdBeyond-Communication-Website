const token = 'h-acgJ13kQfJwiv8GnDHE-mojcRc4it1';
const url = 'https://cms.sbasucloud.pp.ua';
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

async function run() {
  const fRes = await fetch(`${url}/fields/portfolio_items/category`, { headers });
  const fieldData = await fRes.json();
  
  if (fieldData.data && fieldData.data.meta && fieldData.data.meta.options && fieldData.data.meta.options.choices) {
    const choices = fieldData.data.meta.options.choices;
    
    // Check if it already has newsletter
    if (!choices.some(c => c.value === 'newsletter')) {
      choices.push({ text: 'Newsletter', value: 'newsletter' });
      
      const pRes = await fetch(`${url}/fields/portfolio_items/category`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          meta: {
            options: {
              choices
            }
          }
        })
      });
      console.log("Status:", pRes.status);
      console.log(await pRes.text());
    } else {
      console.log("Newsletter already exists");
    }
  } else {
    console.log("Could not find choices");
  }
}
run();
