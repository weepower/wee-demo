const register = require('postcss-variables/lib/register');
let v = require('wee-core/styles/variables');
let { colors, font, heading, icon } = require('wee-core/styles/variables');
let color = require('tinycolor2');

// Add and overwrite variables here
// Example - v.colors.primary = '#58a324';

colors.primary = '#111';
colors.blue = '#5789ff';
colors.lightBlue = color(colors.blue).setAlpha(.8);
colors.offWhite = '#fafafa';
colors.lightGray = '#e7eaeb';

font.family = 'Heebo, Helvetica, Arial, sans-serf';
font.color = colors.primary;
heading.family = font.family;
heading.weight = 500;

icon.checkmark = 'ea10';
icon.cart = 'e93a';

icon.family = 'icomoon';

module.exports = register(v);