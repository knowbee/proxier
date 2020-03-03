#! /usr/bin/env node
const { exec } = require("child_process");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const ora = require("ora");
const spinner = ora();
clear();
console.log(
  chalk.magenta(figlet.textSync("proxier", { horizontalLayout: "full" }))
);

re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?:[0-9]+$/;
const proxy = process.argv.slice(-1)[0];
const pattern = process.argv[2];
if (pattern === "remove" || pattern === "--remove") {
  process.argv.slice(3).forEach(name => {
    if (name === "npm" || name === "--npm") {
      exec("npm config delete https-proxy");
      exec("npm config delete proxy");
    }
    if (name === "yarn" || name === "--yarn") {
      exec("yarn config delete proxy");
    }
    if (name === "git" || name === "--git") {
      exec("git config --unset-all http.proxy");
    }
  });
  console.log();
  spinner.succeed("proxy removed");
} else if (pattern === "set" || (pattern === "--set" && re.test(proxy))) {
  try {
    process.argv.slice(2, -1).forEach(name => {
      if (name === "npm" || name === "--npm") {
        proxier(`npm config set https-proxy ${proxy}`);
      }
      if (name === "git" || name === "--git") {
        proxier(`git config --add http.proxy ${proxy}`);
      }
      if (name === "yarn" || name === "--yarn") {
        proxier(`yarn config set https-proxy ${proxy}`);
      }
    });
    console.log();
    spinner.succeed("proxy added");
  } catch (error) {
    console.log(error);
  }
} else if (!re.test(proxy)) {
  spinner.fail(`proxy format supported is: http|https://host:port`);
  process.exit(1);
} else {
  spinner.fail(`run: proxier --help`);
}

function proxier(config) {
  try {
    exec(config);
  } catch (error) {
    console.log(error);
  }
}
