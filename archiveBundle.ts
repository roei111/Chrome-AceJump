const archiver = require("archiver");
const fs = require("fs");

const output = fs.createWriteStream(__dirname + "/bundle.zip");
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


archive.directory(`${__dirname}/dist`, false);

archive.finalize();