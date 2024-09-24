import { populateData } from './populateService';

async function run() {
    await populateData();
    console.log('Data populated successfully');
}

run().catch(err => {
    console.error('Failed to populate data:', err);
});