(async () => {
  const localhost = 'http://localhost:3000';
  const production = 'https://issueist.wolfpak.now.sh/';

  var fs = require('fs');
  var dir = './extension-build';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  var replace = require("replace-in-file");
  var cpy = require('cpy');

  await cpy('./extension/*.*', './extension-build/')
    .then((res) => console.log('Copied over files to extension build.'))
    .catch((err) => console.error(err));

  await replace({files: './extension-build/*.html', from: localhost, to: production})
    .then((res) => console.log('Pointed html files to production server.'))
    .catch((err) => console.error(err));

  const { zip } = require('zip-a-folder');

  zip('./extension-build', './extension-build.zip').then((err) => {
    if (err) {
      console.log('Error zipping extension.', err);
    } else {
      console.log('Successfully zipped extension');
    }
    const rmfr = require('rmfr');
    rmfr('./extension-build');
  });
})();