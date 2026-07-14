const baseUrl = 'https://cms.sbasucloud.pp.ua/';

const endpoints = [
  'items/global_settings',
  'items/home_page',
  'items/services',
  'items/portfolio_items'
];

async function runDiagnostics() {
  const report = {};
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(baseUrl + endpoint);
      const json = await res.json();
      
      if (json.errors) {
        report[endpoint] = { status: 'ERROR', details: json.errors[0].message };
      } else {
        const data = json.data;
        if (Array.isArray(data)) {
          report[endpoint] = { status: 'SUCCESS', count: data.length };
        } else {
          report[endpoint] = { status: 'SUCCESS', type: 'singleton', hasData: !!data };
        }
      }
    } catch (err) {
      report[endpoint] = { status: 'FETCH_FAILED', details: err.message };
    }
  }
  
  // Test file permission
  try {
    const res = await fetch(baseUrl + 'files?limit=1');
    if (res.status === 403) {
      report['directus_files'] = { status: 'ERROR', details: 'Forbidden' };
    } else {
      const json = await res.json();
      if (json.errors) {
        report['directus_files'] = { status: 'ERROR', details: json.errors[0].message };
      } else {
        report['directus_files'] = { status: 'SUCCESS' };
      }
    }
  } catch(e) {
      report['directus_files'] = { status: 'FETCH_FAILED' };
  }

  console.log(JSON.stringify(report, null, 2));
}

runDiagnostics();
