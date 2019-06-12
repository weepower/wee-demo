import { $setVar } from 'wee-store';
import { $setRef } from 'core/dom';
import '../styles/global.scss';

// Import all component scss files
require.context('../components', true, /\.scss$/);

$setVar();
$setRef();
