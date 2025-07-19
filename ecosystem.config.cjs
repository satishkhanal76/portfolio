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
      interpreter: 'node',
      interpreter_args: '--enable-source-maps',
      env: {
        NODE_ENV: 'production',
        SERVER_PORT: 4001
      }
    }
  ]
};