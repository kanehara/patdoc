/**
 * This file is only executed in dev mode
 * In prod, we will pre-compile src/ with Babel and build it to lib/ and execute that instead
 *
 * See package.json for details of the scripts
 */

const assert = require('assert')

assert(process.env.NODE_ENV !== 'production')

// Babel hook
require('babel-core/register')

// Server
require('./src')
