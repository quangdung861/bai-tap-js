const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@arrow-border-radius": "2px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
