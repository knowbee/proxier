#! /usr/bin/env node
const { exec } = require("child_process");

const proxy = process.argv[2];
choices = ["npm", "git", "yarn"];

choices.forEach(name => {
  if (name === "npm") {
    proxier(name, `npm config set http-proxy ${proxy}`);
    proxier(name, `npm config set https-proxy ${proxy}`);
  }
  if (name === "git") {
    proxier(name, `git config --global http.proxy ${proxy}`);
  }
  if (name === "yarn") {
    proxier(name, `yarn config set proxy ${proxy}`);
    proxier(name, `yarn config set https-proxy ${proxy}`);
  }
});

function proxier(name, setting) {
  exec(setting, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
  console.log(`stdout: ${name} proxy is set`);
}
