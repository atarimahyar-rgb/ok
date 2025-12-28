const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, 'games');

const folders = fs.readdirSync(gamesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => ({
    name: d.name,
    folder: d.name,
    image: `${d.name}.jpg`
  }));

fs.writeFileSync('games.json', JSON.stringify(folders, null, 2), 'utf8');

console.log('✅ games.json ساخته شد');
