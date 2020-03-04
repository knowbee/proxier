#! /usr/bin/env node
const { exec } = require("child_process");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const ora = require("ora");
const spinner = ora();
const cli = require("commander");
clear();
const proxier = new cli.Command();
console.log(
  chalk.magenta(figlet.textSync("proxier", { horizontalLayout: "full" }))
);

re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?:[0-9]+$/;
const proxy = process.argv.slice(-1)[0];
const pattern = process.argv[2];
helper();
if (pattern === "remove" || pattern === "--remove") {
  process.argv.slice(3).forEach(name => {
    if (name === "npm" || name === "--npm") {
      exec("npm config delete https-proxy");
    }
    if (name === "yarn" || name === "--yarn") {
      exec("yarn config delete https-proxy");
    }
    if (name === "git" || name === "--git") {
      exec("git config --unset-all http.proxy");
    }
  });
  console.log();
  spinner.succeed("proxy removed");
} else if (pattern === "set" || (pattern === "--set" && re.test(proxy))) {
  process.argv.slice(2, -1).forEach(name => {
    if (name === "npm" || name === "--npm") {
      setproxy(`npm config set https-proxy ${proxy}`);
    }
    if (name === "git" || name === "--git") {
      setproxy(`git config --add http.proxy ${proxy}`);
    }
    if (name === "yarn" || name === "--yarn") {
      setproxy(`yarn config set https-proxy ${proxy}`);
    }
  });
  console.log();
  spinner.succeed("proxy added");
} else if (!re.test(proxy)) {
  spinner.fail(`proxy format supported is: http|https://host:port`);
  process.exit(1);
} else {
  spinner.fail(`run: proxier --help`);
  process.exit(1);
}

function setproxy(config) {
  try {
    exec(config);
  } catch (error) {
    console.log(error);
  }
}

function helper() {
  console.log();
  proxier
    .name("proxier")
    .description(
      `
    set/remove proxy configurations for npm, yarn and git
    proxier --set npm yarn git http://host:port
    `
    )
    .version("1.0.0")
    .option("--set, set", "required option to set proxy configurations")
    .option("--npm, npm", "set npm proxy configurations")
    .option("--yarn, yarn", "set yarn proxy configurations")
    .option("--git, git", "set git proxy configurations")
    .option(
      "--remove, remove",
      "required option to remove proxy configurations"
    )
    .parse(process.argv);
  proxier.on("--help", function() {
    console.log("Examples:");
    console.log("  $ proxier --help");
    console.log("  $ proxier --set npm http://example.com:5555");
    console.log("  $ proxier --remove npm");
  });
}
