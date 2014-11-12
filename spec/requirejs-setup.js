/** Custom RequireJS setup file to test user-specified setup files */

/* We want to minimize behavior changes between this test setup file and the
 * default setup file to avoid breaking tests which rely on any (current or
 * future) default behavior.  So we:
 * - Run the normal setup file
 * - Avoid introducing additional global variables
 * - Avoid maintaining two copies of the setup file
 */

eval(require('fs').readFileSync(baseUrl + 'requirejs-wrapper-template.js', 'utf8'));
eval(require('fs').readFileSync(baseUrl + 'requirejs-mocker.js', 'utf8'));

// This is our indicator that this custom setup script has run
var setupHasRun = true;