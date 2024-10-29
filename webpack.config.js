module.exports = {
    devServer: {
      proxy: {
        '/geoserver': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
    // other webpack configurations
  };
  