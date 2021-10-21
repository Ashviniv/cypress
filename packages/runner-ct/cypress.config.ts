module.exports = {
  testFiles: '**/*spec.{ts,tsx}',
  video: true,
  env: {
    reactDevtools: false,
  },
  reporter: '../../node_modules/cypress-multi-reporters/index.js',
  reporterOptions: {
    configFile: '../../mocha-reporter-config.json',
  },
}
