const archiver = require("archiver");
const fs = require("fs");

const ignoredFiles = ["acejump.iml", "bundle.zip"];


export function archiveSource() {
  const output = fs.createWriteStream(__dirname + "/source.zip");
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  output.on('end', function() {
    console.log('Data has been drained');
  });

  archive.on('warning', function(err: any) {
    if (err.code === 'ENOENT') {
      console.log('warning')
    } else {
      throw err;
    }
  });

  archive.on('error', function(err: any) {
    throw err;
  });

  archive.pipe(output);

  const dirents = fs.readdirSync(__dirname, { withFileTypes: true });
  const filesNames = dirents
    .filter((dirent: any) => dirent.isFile())
    .map((dirent: any) => dirent.name)
    .filter((filename: string) => !ignoredFiles.includes(filename));

  filesNames.forEach((fileName: string) => {
    const file = `${__dirname}/${fileName}`;
    archive.append(fs.createReadStream(file), { name: fileName });
  });

  archive.directory(`${__dirname}/public`, 'public');
  archive.directory(`${__dirname}/src`, 'src');

  return archive.finalize();
}