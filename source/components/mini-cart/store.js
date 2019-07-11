import $store from 'wee-store';

// Create and export an instance of the store module.  As you can see,
// we're setting the browserStorage parameter to 'session'.  This will keep
// the data in the module synced with session storage.
export const cartStore = $store.create('cart', {
    browserStorage: 'session',
});
