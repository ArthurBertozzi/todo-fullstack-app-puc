module.exports = {
  presets: [
    "@babel/preset-react", // Para habilitar a transformação do JSX
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
