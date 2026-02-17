const Stripe = require('stripe');
try {
  new Stripe('', { apiVersion: '2022-11-15' }); // Using older API version just to test core instantiation
  console.log('Success (empty string)');
} catch (e) {
  console.log('Failed (empty string):', e.message);
}

try {
  new Stripe(undefined, { apiVersion: '2022-11-15' });
  console.log('Success (undefined)');
} catch (e) {
  console.log('Failed (undefined):', e.message);
}
