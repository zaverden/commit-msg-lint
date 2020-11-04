const fs = require("fs");

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

const [_, __, projectKey, envName] = process.argv;
const messagePrefixRegex = new RegExp(`^\\[${projectKey}-(\\d+)\\]`);
const msgFilePath = process.env[envName];

fs.promises.readFile(msgFilePath, { encoding: "utf8" }).then((message) => {
  const [firstLine] = message.split("\n");
  if (!messagePrefixRegex.test(firstLine) && !firstLine.startsWith("[NONE]")) {
    console.error(
      `Message should be prefixed with issue key in brackets, like [${projectKey}-123]`
    );
    console.error("use prefix [NONE] if commit is not assigned to issue");
    process.exit(1);
  }
});
