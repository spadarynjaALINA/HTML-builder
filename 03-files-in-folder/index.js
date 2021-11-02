const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, function (err, items) {
  if (err) throw err;
  items.forEach(function (item) {
    let name = path.parse(item.name).name;
    let ext = path.parse(item.name).ext.split('').slice(1).join('');
    let size;
    fs.stat(path.join(__dirname, 'secret-folder', item.name), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        size = stats.size;
        console.log(`${name}-${ext}-${size}bytes`);
      }
    });
  });
});
