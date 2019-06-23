(async () => {
  const localhost = 'http://localhost:3000';
  const production = 'https://issueist.wolfpak.now.sh/';

  var fs = require('fs');
  var dir = './extension-build';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  var find = require("find-and-replace");
  var cpy = require('cpy');

  await cpy(['./extension/Icon.png', './extension/manifest.json'], './extension-build/')
    .then((res) => console.log('Copied over files to extension build.'))
    .catch((err) => console.log());

  await find
    .src('./extension/index.html')
    .dest('./extension-build/index.html')
    .replace({ localhost: production })
    .complete((txt) => {
      console.log('Pointing iframe in index.html to production server.');
    })
    .error((err) => console.error(err));

  await find
    .src('./extension/background.html')
    .dest('./extension-build/background.html')
    .replace({ localhost: production })
    .complete((txt) => {
      console.log('Pointing iframe in background.html to production server.');
    })
    .error((err) => console.error(err));

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