module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          hooks: './src/hooks',
          models: './src/models',
          screens: './src/screens',
          services: './src/services',
          state: './src/state',
          theme: './src/theme',
          types: './src/types',
        },
        extensions: ['.json'],
      },
    ],
  ],
};
