#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const root = path.resolve(__dirname);
const scssFolder = path.join(root, './scss');
const jsFolder = path.join(root, './js');
const imagesFolder = path.join(root, './images');
const contentFolder = path.join(root, './content');
const dataFolder = path.join(root, './data');

const themes = {
  hugo: {
    ssg: 'hugo',
    themeFolder: 'winston-hugo',
    scssFolder: 'winston-hugo/assets/scss',
    jsFolder: 'winston-hugo/assets/js',
    imagesFolder: 'winston-hugo/static/images',
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
    dataFolder: './winston-hexo/_data',
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

    // switch (theme.ssg) {
    //   case 'hugo':
    //     copyHugo(theme);
    //     break;
    //   case 'jekyll':
    //     copyJekyll(theme);
    //     break;
    //   case 'hexo':
    //   copyHexo(theme);
    //   break;
    // }
  }
}

copyFiles();

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

async function copyJekyll(theme) {
  // try {
  //   await fs
  //     .remove(theme.dataFolder)
  //     .then(() => console.log(`Removed ${theme.dataFolder}`));
  //   await fs
  //     .copy(dataFolder, theme.dataFolder)
  //     .then(() => console.log(`Copied ${(dataFolder, theme.dataFolder)}`));
  //   await fs
  //     .copy(
  //       path.join(contentFolder, '/_index.md'),
  //       path.join(theme.themeFolder, '/index.md')
  //     )
  //     .then(() => console.log(`Copied ${(dataFolder, theme.dataFolder)}`));
  // } catch (err) {
  //   console.error(err);
  // }
  // // Copy Homepage
  // fs.copy(
  //   path.join(contentFolder, '/_index.md'),
  //   path.join(theme.themeFolder, '/index.md'),
  //   err => {
  //     if (err) return console.error(err);
  //     console.log(
  //       `copied ${path.join(contentFolder, '/_index.md')} folder => ${path.join(
  //         theme.themeFolder,
  //         '/index.md'
  //       )}`
  //     );
  //   }
  // );
  // // Copy About Page
  // fs.copy(
  //   path.join(contentFolder, '/pages/about.md'),
  //   path.join(theme.themeFolder, '/about.md'),
  //   err => {
  //     if (err) return console.error(err);
  //     console.log(
  //       `copied ${path.join(
  //         contentFolder,
  //         '/pages/about.md'
  //       )} folder => ${path.join(theme.themeFolder, '/about.md')}`
  //     );
  //   }
  // );
  // fs.remove(path.join(theme.themeFolder, '/_posts'), err => {
  //   if (err) return console.error(err);
  //   console.log(`removed ${path.join(theme.themeFolder, '/_posts')} folder`);
  //   fs.copy(
  //     path.join(contentFolder, '/posts'),
  //     path.join(theme.themeFolder, '/_posts'),
  //     err => {
  //       if (err) return console.error(err);
  //       console.log(
  //         `copied ${path.join(contentFolder, '/posts')} folder => ${path.join(
  //           theme.themeFolder,
  //           '/_posts'
  //         )}`
  //       );
  //     }
  //   );
  // });
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
