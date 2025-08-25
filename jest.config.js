export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // Tell Jest to transform some ESM packages inside node_modules
  transformIgnorePatterns: ["/node_modules/(?!adminjs|@adminjs/.*)/"],
};
