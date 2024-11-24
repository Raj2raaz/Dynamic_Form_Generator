module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react", // For JSX
    "@babel/preset-typescript", // For TypeScript
  ],
};
