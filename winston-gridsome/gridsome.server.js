// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const menuData = require('../data/menu.json');

module.exports = function(api) {
  console.log('test');
  api.loadSource(actions => {
    const mainMenu = actions.addCollection('MainMenu');

    for (const item of menuData.main) {
      console.log(item);
      mainMenu.addNode({
        name: item.name,
        url: item.url,
      });
    }
  });
};
