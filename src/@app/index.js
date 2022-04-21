import App from "./app.js";
const port = 4000;

(() => {
  App.listen(port);
  console.log(`Server running in port: ${port}`);
})();
