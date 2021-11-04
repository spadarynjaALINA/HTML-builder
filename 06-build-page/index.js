const fs = require('fs');
const path = require('path');
const components = path.join(__dirname, 'components');
const projectDist = path.join(__dirname, 'project-dist');
const assets = path.join(__dirname, 'assets');
function initHtml() {
  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (error) => {
    if (error) return console.error(error.message);
  });
}
function initCss() {
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (error) => {
    if (error) return console.error(error.message);
  });
}
function initAssets() {
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (error) => {
    if (error) return console.error(error.message);
    copy();
  });
}

fs.access(projectDist, (err) => {
  if (err) {
    fs.mkdir(projectDist, { recursive: true }, (err) => {
      if (err) throw err;
    });
    initHtml();
    initCss();
    initAssets();
  }
  fs.access(path.join(__dirname, 'project-dist', 'assets'), fs.constants.F_OK, (err) => {
    if (err) {
      initAssets();
      initHtml();
      initCss();
    } else {
      initHtml();
      initCss();
    }
  });
});
/*-------------------merge HTML components-----------------------*/
function mergeComponents() {
  fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, templateData) => {
    if (err) throw err;
    fs.readdir(components, { withFileTypes: true }, function (err, items) {
      if (err) throw err;
      items.forEach(function (item) {
        if (path.parse(item.name).ext == '.html') {
          fs.stat(path.join(__dirname, 'components', item.name), (err, stats) => {
            if (err) throw err;
            if (stats.isFile()) {
              fs.readFile(path.join(__dirname, 'components', item.name), 'utf-8', (error, data) => {
                if (error) return console.error(error.message);
                let reg = `{{${path.parse(item.name).name}}}`;

                templateData = templateData.replace(reg, data);
                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), templateData, (err) => {
                  if (err) throw err;
                });
              });
            }
          });
        }
      });
    });
  });
}
mergeComponents();
/*--------------------------merge styles------------------------------------*/
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, function (err, items) {
  if (err) throw err;
  items.forEach(function (item) {
    if (path.parse(item.name).ext == '.css') {
      fs.stat(path.join(__dirname, 'styles', item.name), (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          fs.readFile(path.join(__dirname, 'styles', item.name), (error, data) => {
            if (error) return console.error(error.message);
            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (error) => {
              if (error) return console.error(error.message);
            });
          });
        }
      });
    }
  });
});
/*-----------copy assets--------------*/
function copy() {
  fs.readdir(assets, function (err, folders) {
    if (err) throw err;
    folders.forEach(function (items) {
      fs.access(path.join(__dirname, 'project-dist', 'assets', items), (err) => {
        if (err) {
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', items), { recursive: true }, (err) => {
            if (err) throw err;
            console.log(items);
          });
        }
        fs.readdir(path.join(__dirname, 'assets', items), function (err, item) {
          if (err) throw err;
          item.forEach(function (i) {
            fs.copyFile(
              path.join(__dirname, 'assets', items, i),
              path.join(__dirname, 'project-dist', 'assets', items, i),
              (err) => {
                if (err) throw err;
              }
            );
          });
        });
      });
    });
  });
}
copy();
