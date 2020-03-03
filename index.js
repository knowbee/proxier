#! /usr/bin/env node
const { exec } = require("child_process");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const cmd = require("node-cmd");
const ora = require("ora");
const spinner = ora();
clear();
console.log(
  chalk.green(figlet.textSync("proxier", { horizontalLayout: "full" }))
);

re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?:[0-9]+$/;
const lastpattern = process.argv.slice(-1)[0];

if (lastpattern === "remove" || lastpattern === "--remove") {
  if (name === "npm" || name === "--npm") {
    cmd.run("npm config delete https-proxy");
  }
  if (name === "git" || name === "--git") {
    cmd.run("git config --global --unset https.proxy");
  }
  if (name === "yarn" || name === "--yarn") {
    cmd.run("yarn config delete https-proxy");
  }
  // spinner.succeed("proxy settings removed");
  process.exit(1);
}

if (!re.test(lastpattern)) {
  spinner.fail(`proxy format is not valid`);
  process.exit(1);
}

// // console.log(process.argv.slice(2, -1));

process.argv.slice(2, -1).forEach(name => {
  if (name === "npm" || name === "--npm") {
    proxier(`npm config set https-proxy ${lastpattern}`);
    console.log("npm proxy set");
  }
  if (name === "git" || name === "--git") {
    proxier(`git config --global http.proxy ${lastpattern}`);
    console.log("git proxy set");
  }
  if (name === "yarn" || name === "--yarn") {
    proxier(`yarn config set https-proxy ${lastpattern}`);
    console.log("yarn proxy set");
  }
});

function proxier(setting) {
  try {
    cmd.run(setting);
  } catch (error) {
    console.log(error);
  }
}
