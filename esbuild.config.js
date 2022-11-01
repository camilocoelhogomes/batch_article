/* eslint-disable no-process-exit */
/* eslint-disable node/no-unpublished-require */
const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./build_temp/index.js'],
    outfile: 'build/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: 'linked',
    metafile: true,
    target: 'es2021',
    legalComments: 'none',
    keepNames: true,
  })
  .catch(() => process.exit(1));
