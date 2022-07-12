module.exports = {
  devServer: {
    disableHostCheck: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
  },
};
