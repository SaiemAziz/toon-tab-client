module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      [
        "module:react-native-dotenv", {
          "envName": "APP_ENV",
          "moduleName": "@env",
          "path": ".env",
        }
      ]
    ],
  };
};
// npx expo install react-native-safe-area-context@4.4.1 react-native-screens@~3.18.0