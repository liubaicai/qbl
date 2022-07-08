/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");
const fs = require("fs");

const theme = process.argv[2];

const replaceDefaultTheme = (new_str) => {
  let index = fs.readFileSync("./dist/index.html", "utf8");
  let newindex = index.replace(/class="default"/g, `class="${new_str}"`);
  fs.writeFileSync("./dist/index.html", newindex, "utf8");
};

if (theme && fs.existsSync(`./build/${theme}/forward.js`)) {
  console.log(`start eval ${theme} forward-script...`);
  let scripts = fs.readFileSync(`./build/${theme}/forward.js`, "utf8");
  eval(scripts);
}

console.log("start build...");
execSync(`npm run build:vite`, { stdio: "inherit" });

if (theme) {
  console.log(`replace theme...`);
  switch (theme) {
    default:
      replaceDefaultTheme(theme);
      break;
  }
}

if (theme && fs.existsSync(`./build/${theme}/backward.js`)) {
  console.log(`start eval ${theme} backward-script...`);
  let scripts = fs.readFileSync(`./build/${theme}/backward.js`, "utf8");
  eval(scripts);
}
