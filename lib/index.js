const path = require('path');
const fs = require('fs');
const { wrapExport } = require("./utils/wrapExport")

const anigo = {}

function search (dir) {
  fs.readdirSync(dir).forEach(function (file) {
    const stat = fs.statSync(path.join(dir, file))
    if (stat.isFile()) {
      anigo[file.replace('.js', '')] = require(dir + '/' + file)
    } else if (stat.isDirectory()) {
      search(path.join(dir, file))
    }
  })
}

search(__dirname)

for (const name in anigo) {
  const exporter = anigo[name]
  if (Object.prototype.hasOwnProperty.call(exporter, 'func')) {
    module.exports[name] = wrapExport(exporter.func, exporter.required || [], exporter.optional || [])
  } else {
    module.exports[name] = anigo[name]
  }
}