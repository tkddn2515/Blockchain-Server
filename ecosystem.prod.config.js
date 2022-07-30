module.exports = {
  apps: [
    {
      name: 'blockchain-server',
      script: 'dist/main.js',
      watch: true,
      env: {
        NODE_ENV: "prod",
      }
    }
  ],
};
