/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    'packages/**/dist/**',
    '!packages/backend/**'
  ],
  extraFiles: [
    {
      from: 'packages/backend/dist',
      to: '.'
    }
  ],
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true
  },
};

module.exports = config;
