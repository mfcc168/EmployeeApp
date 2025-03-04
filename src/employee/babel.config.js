module.exports = function (api) {
    api.cache(true);
  
    return {
      presets: [
        [
          "babel-preset-expo",
          {
            jsxImportSource: "nativewind", // Add Nativewind JSX support here
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
              "tailwind.config": "./tailwind.config.js",
            },
          },
        ],
        [
          "module:react-native-dotenv",
          {
            moduleName: "@env",
            path: ".env",
          },
        ],
      ],
    };
  };