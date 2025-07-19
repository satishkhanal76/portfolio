module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: './server.js',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'chess',
      script: './projects/ChessMultiplayer/index.js',
      env: {
        NODE_ENV: 'production',
        SERVER_PORT: 4001
      }
    }
  ]
};