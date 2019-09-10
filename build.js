#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yamlFront = require('yaml-front-matter');
const gh = require('parse-github-url');
const axios = require('axios');
const im = require('imagemagick');

const root = path.resolve(__dirname);
const scssFolder = path.join(root, './scss');
const jsFolder = path.join(root, './js');
const imagesFolder = path.join(root, './images');
const contentFolder = path.join(root, './content');
const dataFolder = path.join(root, './data');

const themes = {
  hugo: {
    ssg: 'hugo',
    themeFolder: './winston-hugo',
    scssFolder: './winston-hugo/assets/scss',
    jsFolder: './winston-hugo/assets/js',
    imagesFolder: './winston-hugo/static/images',
    contentFolder: './winston-hugo/exampleSite/content',
    dataFolder: './winston-hugo/exampleSite/data',
  },
  jekyll: {
    ssg: 'jekyll',
    themeFolder: './winston-jekyll',
    scssFolder: './winston-jekyll/_sass',
    jsFolder: './winston-jekyll/js',
    imagesFolder: './winston-jekyll/images',
    contentFolder: './winston-jekyll/_posts',
    dataFolder: './winston-jekyll/_data',
  },
  hexo: {
    ssg: 'hexo',
    themeFolder: './winston-hexo',
    scssFolder: './winston-hexo/themes/winston/source/sass',
    jsFolder: './winston-hexo/themes/winston/source/js',
    imagesFolder: './winston-hexo/themes/winston/source/images',
    contentFolder: './winston-hexo/source',
  },
};

for (let ssg in themes) {
  const theme = themes[ssg];

  fs.copy(scssFolder, theme.scssFolder, err => {
    if (err) return console.error(err);
    console.log(`copied ${scssFolder} folder => ${theme.scssFolder}`);
  });
  fs.copy(jsFolder, theme.jsFolder, err => {
    if (err) return console.error(err);
    console.log(`copied ${jsFolder} folder => ${theme.jsFolder}`);
  });
  fs.copy(imagesFolder, theme.imagesFolder, err => {
    if (err) return console.error(err);
    console.log(`copied ${imagesFolder} folder => ${theme.imagesFolder}`);
  });

  switch (theme.ssg) {
    case 'hugo':
      copyHugo(theme);
      break;
    case 'jekyll':
      copyJekyll(theme);
      break;
    case 'hexo':
      copyHexo(theme);
      break;
  }
}

function copyHugo(theme) {
  // Copy Content Folder
  fs.remove(theme.contentFolder, err => {
    if (err) return console.error(err);
    console.log(`removed ${theme.contentFolder} folder`);
    fs.copy(contentFolder, theme.contentFolder, err => {
      if (err) return console.error(err);
      console.log(`copied ${contentFolder} folder => ${theme.contentFolder}`);
    });
  });

  // Copy Data Folder
  fs.remove(theme.dataFolder, err => {
    if (err) return console.error(err);
    console.log(`removed ${theme.dataFolder} folder`);
    fs.copy(dataFolder, theme.dataFolder, err => {
      if (err) return console.error(err);
      console.log(`copied ${dataFolder} folder => ${theme.dataFolder}`);
    });
  });
}

function copyJekyll(theme) {
  // Copy Data Folder
  fs.remove(theme.dataFolder, err => {
    if (err) return console.error(err);
    console.log(`removed ${theme.dataFolder} folder`);
    fs.copy(dataFolder, theme.dataFolder, err => {
      if (err) return console.error(err);
      console.log(`copied ${dataFolder} folder => ${theme.dataFolder}`);
    });
  });

  fs.copy(
    path.join(contentFolder, '/_index.md'),
    path.join(theme.themeFolder, '/index.md'),
    err => {
      if (err) return console.error(err);
      console.log(
        `copied ${path.join(contentFolder, '/_index.md')} folder => ${path.join(
          theme.themeFolder,
          '/index.md'
        )}`
      );
    }
  );

  fs.copy(
    path.join(contentFolder, '/pages/about.md'),
    path.join(theme.themeFolder, '/about.md'),
    err => {
      if (err) return console.error(err);
      console.log(
        `copied ${path.join(
          contentFolder,
          '/pages/about.md'
        )} folder => ${path.join(theme.themeFolder, '/about.md')}`
      );
    }
  );

  fs.remove(path.join(theme.themeFolder, '/_posts'), err => {
    if (err) return console.error(err);
    console.log(`removed ${path.join(theme.themeFolder, '/_posts')} folder`);

    fs.copy(
      path.join(contentFolder, '/posts'),
      path.join(theme.themeFolder, '/_posts'),
      err => {
        if (err) return console.error(err);
        console.log(
          `copied ${path.join(contentFolder, '/posts')} folder => ${path.join(
            theme.themeFolder,
            '/_posts'
          )}`
        );
      }
    );
  });
}

function copyHexo(theme) {
  console.log(theme);
  fs.copy(
    path.join(contentFolder, '/_index.md'),
    path.join(theme.contentFolder, '/index.md'),
    err => {
      if (err) return console.error(err);
      console.log(
        `copied ${path.join(contentFolder, '/_index.md')} folder => ${path.join(
          theme.contentFolder,
          '/index.md'
        )}`
      );
    }
  );

  fs.copy(
    path.join(contentFolder, '/pages/about.md'),
    path.join(theme.contentFolder, '/about.md'),
    err => {
      if (err) return console.error(err);
      console.log(
        `copied ${path.join(
          contentFolder,
          '/pages/about.md'
        )} folder => ${path.join(theme.contentFolder, '/about.md')}`
      );
    }
  );

  fs.remove(path.join(theme.contentFolder, '/_posts'), err => {
    if (err) return console.error(err);
    console.log(`removed ${path.join(theme.contentFolder, '/_posts')} folder`);

    fs.copy(
      path.join(contentFolder, '/posts'),
      path.join(theme.contentFolder, '/_posts'),
      err => {
        if (err) return console.error(err);
        console.log(
          `copied ${path.join(contentFolder, '/posts')} folder => ${path.join(
            theme.contentFolder,
            '/_posts'
          )}`
        );
      }
    );
  });
}
