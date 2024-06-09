import fs from "fs";

const createFile = () => {
  console.log("Creating file");
  try {
    if (!fs.existsSync("files")) {
      fs.mkdirSync("files");
    }
    fs.writeFileSync(`./files/${Date().toString()}`, `${Date.now()}`);
  } catch (e) {
    console.log(`Error writing file: ${e.message}`);
  }
};

// readdir - for rading the files in a folder
const readFolder = (folderName) => {
  try {
    const files = fs.readdirSync(folderName);
    return files;
  } catch (e) {
    console.log(`Error writing file: ${e.message}`);
  }
};

export { createFile, readFolder };
