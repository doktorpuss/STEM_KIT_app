const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../node_modules/blockly');
const targetDir = path.join(__dirname, '../public/lib/blockly');

// Ensure target directory exists
fs.ensureDirSync(targetDir);

// Copy core files
const filesToCopy = [
  'blockly_compressed.js',
  'blocks_compressed.js',
  'python_compressed.js'
];

filesToCopy.forEach(file => {
  fs.copyFileSync(
    path.join(sourceDir, file),
    path.join(targetDir, file)
  );
  console.log(`Copied file: ${file}`);
});

// Copy msg directory
fs.copySync(
  path.join(sourceDir, 'msg/en.js'),
  path.join(targetDir, 'msg/en.js'),
  { overwrite: true }
);
console.log('Copied msg/en.js');

// Copy media directory with all its contents
fs.copySync(
  path.join(sourceDir, 'media'),
  path.join(targetDir, 'media'),
  { overwrite: true }
);
console.log('Copied media directory');

console.log('Blockly files copied successfully!'); 