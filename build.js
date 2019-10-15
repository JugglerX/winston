#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const root = path.resolve(__dirname);
const scssFolder = path.join(root, './scss');
const jsFolder = path.join(root, './js');
const imagesFolder = path.join(root, './images');
const contentFolder = path.join(root, './content');
const dataFolder = path.join(root, './data');
const cssFolder = path.join(root, './css');

const themes = {
  hugo: {
    ssg: 'hugo',
    themeFolder: 'winston-hugo',
    scssFolder: 'winston-hugo/assets/scss',
    jsFolder: 'winston-hugo/assets/js',
    imagesFolder: 'winston-hugo/static/images',
    cssFolder: 'winston-hugo/static/css',
    contentFolder: 'winston-hugo/exampleSite/content',
    dataFolder: 'winston-hugo/exampleSite/data',
    content: [
      {
        src: '_index.md',
        dst: 'exampleSite/content/_index.md',
      },
      {
        src: 'pages/about.md',
        dst: 'exampleSite/content/pages/about.md',
      },
      {
        src: 'posts/_index.md',
        dst: 'exampleSite/content/blog/_index.md',
      },
      {
        src: 'posts/post1.md',
        dst: 'exampleSite/content/blog/post1.md',
      },
      {
        src: 'posts/post2.md',
        dst: 'exampleSite/content/blog/post2.md',
      },
      {
        src: 'posts/post3.md',
        dst: 'exampleSite/content/blog/post3.md',
      },
    ],
  },
  jekyll: {
    ssg: 'jekyll',
    themeFolder: './winston-jekyll',
    scssFolder: './winston-jekyll/_sass',
    jsFolder: './winston-jekyll/js',
    imagesFolder: './winston-jekyll/images',
    contentFolder: './winston-jekyll/_posts',
    dataFolder: './winston-jekyll/_data',
    content: [
      {
        src: '_index.md',
        dst: 'index.md',
      },
      {
        src: 'pages/about.md',
        dst: 'about.md',
      },
      {
        src: 'posts/_index.md',
        dst: 'blog.md',
      },
      {
        src: 'posts/post1.md',
        dst: 'collections/_blog/post1.md',
      },
      {
        src: 'posts/post2.md',
        dst: 'collections/_blog/post2.md',
      },
      {
        src: 'posts/post3.md',
        dst: 'collections/_blog/post3.md',
      },
    ],
  },
  hexo: {
    ssg: 'hexo',
    themeFolder: './winston-hexo',
    scssFolder: './winston-hexo/themes/winston/source/sass',
    jsFolder: './winston-hexo/themes/winston/source/js',
    imagesFolder: './winston-hexo/themes/winston/source/images',
    contentFolder: './winston-hexo/source',
    dataFolder: './winston-hexo/source/_data',
    content: [
      {
        src: '_index.md',
        dst: 'source/index.md',
      },
      {
        src: 'pages/about.md',
        dst: 'source/about.md',
      },
      {
        src: 'posts/_index.md',
        dst: 'source/blog.md',
      },
      {
        src: 'posts/post1.md',
        dst: 'source/_posts/post1.md',
      },
      {
        src: 'posts/post2.md',
        dst: 'source/_posts/post2.md',
      },
      {
        src: 'posts/post3.md',
        dst: 'source/_posts/post3.md',
      },
    ],
  },
  gridsome: {
    ssg: 'gridsome',
    themeFolder: './winston-gridsome',
    scssFolder: './winston-gridsome/src/assets/scss',
    jsFolder: './winston-gridsome/src/assets/js',
    imagesFolder: './winston-gridsome/src/assets/images',
    dataFolder: './winston-gridsome/data',
    content: [
      {
        src: '_index.md',
        dst: 'content/index.md',
      },
      {
        src: 'pages/about.md',
        dst: 'content/about.md',
      },
      {
        src: 'posts/_index.md',
        dst: 'content/blog.md',
      },
      {
        src: 'posts/post1.md',
        dst: 'content/posts/post1.md',
      },
      {
        src: 'posts/post2.md',
        dst: 'content/posts/post2.md',
      },
      {
        src: 'posts/post3.md',
        dst: 'content/posts/post3.md',
      },
    ],
  },
};

console.log('Copying Files...');

async function copyFiles() {
  for (let ssg in themes) {
    const theme = themes[ssg];

    console.log(`\n${theme.ssg}`);
    console.log(`Copying ${theme.ssg} assets...`);

    try {
      await fs
        .remove(theme.dataFolder)
        .then(() => console.log(`Remove\t${theme.dataFolder}`));
      await fs
        .copy(dataFolder, theme.dataFolder)
        .then(() => console.log(`Copy\t${theme.dataFolder}`));
      await fs
        .remove(theme.scssFolder)
        .then(() => console.log(`Removed ${theme.scssFolder}`));
      await fs
        .copy(scssFolder, theme.scssFolder)
        .then(() => console.log(`Copied ${theme.scssFolder}`));
      await fs
        .remove(theme.jsFolder)
        .then(() => console.log(`Removed ${theme.jsFolder}`));
      await fs
        .copy(jsFolder, theme.jsFolder)
        .then(() => console.log(`Copied ${theme.jsFolder}`));
      await fs
        .remove(theme.imagesFolder)
        .then(() => console.log(`Removed ${theme.imagesFolder}`));
      await fs
        .copy(imagesFolder, theme.imagesFolder)
        .then(() => console.log(`Copied ${theme.imagesFolder}`));
      await fs
        .remove(theme.cssFolder)
        .then(() => console.log(`Removed ${theme.cssFolder}`));
      await fs
        .copy(cssFolder, theme.cssFolder)
        .then(() => console.log(`Copied ${theme.cssFolder}`));
    } catch (err) {
      console.error(err);
    }

    console.log(`\nCopying ${theme.ssg} files...`);

    try {
      for (let page of theme.content) {
        await fs
          .copy(
            path.join(contentFolder, page.src),
            path.join(theme.themeFolder, page.dst)
          )
          .then(() =>
            console.log(
              `Copied ${(path.join(contentFolder, page.src),
              path.join(theme.themeFolder, page.dst))}`
            )
          );
      }
    } catch (err) {
      console.error(err);
    }
  }
}

copyFiles();
