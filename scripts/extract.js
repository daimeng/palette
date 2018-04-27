var fs = require('fs');
var scssToJson = require('scss-to-json');
var path = require('path');

const PARTIAL = /^_(.+)\.scss$/;
const BASE_DIR = './styles';
const OUT_DIR = './dist';

if (!fs.existsSync(OUT_DIR)){
  fs.mkdirSync(OUT_DIR);
}

fs.readdir(BASE_DIR, (err, files) => {
  files
  .map(file => file.match(PARTIAL))
  .forEach(([file, name]) => {
    var json = scssToJson(path.join(BASE_DIR, file));

    var out = path.join(OUT_DIR, `${ name }.json`)
    fs.writeFile(
      out,
      JSON.stringify(json, null, 2),
      (err) => {
        if (err) throw err;
        console.log(`Writing file ${ out }`);
      }
    );
  });
});
