module.exports = function (api) {
    api.cache(true);
  
    return {
      presets: [
        [
          "babel-preset-expo",
          {
            jsxImportSource: "nativewind",
          },
        ],
      ],
      plugins: [
        [
          "module-resolver",
          {
            root: ["./"],
            alias: {
              "@": "./",
              '@app': './app',
              '@api': './api',
              '@config': './config',
              '@components': './components',
              '@constants': './constants',
              '@hooks': './hooks',
              '@context': './context',
              "tailwind.config": "./tailwind.config.js",
            },
          },
        ]
      ],
    };
  };