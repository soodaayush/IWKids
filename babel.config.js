module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null, // optional, but ensure it’s correct
          whitelist: null, // optional, if you have a set list
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
