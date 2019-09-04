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
    contentFolder: './winston-hugo/_posts',
  },
};

for (let ssg in themes) {
  console.log(themes[ssg].themeFolder);

  fs.copy(scssFolder, themes[ssg].scssFolder, err => {
    if (err) return console.error(err);
    console.log(`copied ${scssFolder} folder => ${themes[ssg].scssFolder}`);
  });
  fs.copy(jsFolder, themes[ssg].jsFolder, err => {
    if (err) return console.error(err);
    console.log(`copied ${jsFolder} folder => ${themes[ssg].jsFolder}`);
  });
  fs.copy(imagesFolder, themes[ssg].imagesFolder, err => {
    if (err) return console.error(err);
    console.log(`copied ${imagesFolder} folder => ${themes[ssg].imagesFolder}`);
  });

  if (themes[ssg].ssg === 'hugo') {
    // Copy Content Folder
    fs.remove(themes[ssg].contentFolder, err => {
      if (err) return console.error(err);
      console.log(`removed ${themes[ssg].contentFolder} folder`);

      fs.copy(contentFolder, themes[ssg].contentFolder, err => {
        if (err) return console.error(err);
        console.log(
          `copied ${contentFolder} folder => ${themes[ssg].contentFolder}`
        );
      });
    });

    // Copy Data Folder
    fs.remove(themes[ssg].dataFolder, err => {
      if (err) return console.error(err);
      console.log(`removed ${themes[ssg].dataFolder} folder`);

      fs.copy(dataFolder, themes[ssg].dataFolder, err => {
        if (err) return console.error(err);
        console.log(
          `copied ${dataFolder} folder => ${themes[ssg].dataFolder}`
        );
      });
    });
  }

  if (themes[ssg].ssg === 'jekyll') {
    fs.copy(
      path.join(contentFolder, '/_index.md'),
      path.join(themes[ssg].themeFolder, '/index.md'),
      err => {
        if (err) return console.error(err);
        console.log(
          `copied ${path.join(
            contentFolder,
            '/_index.md'
          )} folder => ${path.join(themes[ssg].themeFolder, '/index.md')}`
        );
      }
    );

    fs.copy(
      path.join(contentFolder, '/pages/about.md'),
      path.join(themes[ssg].themeFolder, '/about.md'),
      err => {
        if (err) return console.error(err);
        console.log(
          `copied ${path.join(
            contentFolder,
            '/pages/about.md'
          )} folder => ${path.join(themes[ssg].themeFolder, '/about.md')}`
        );
      }
    );

    fs.remove(path.join(themes[ssg].themeFolder, '/_posts'), err => {
      if (err) return console.error(err);
      console.log(
        `removed ${path.join(themes[ssg].themeFolder, '/_posts')} folder`
      );

      fs.copy(
        path.join(contentFolder, '/posts'),
        path.join(themes[ssg].themeFolder, '/_posts'),
        err => {
          if (err) return console.error(err);
          console.log(
            `copied ${path.join(contentFolder, '/posts')} folder => ${path.join(
              themes[ssg].themeFolder,
              '/_posts'
            )}`
          );
        }
      );
    });
  }

  //   fs.copy(
  //     path.join(contentFolder, '/pages/about.md'),
  //     path.join(themes[ssg].themeFolder, '/about.md')
  //   ).then(() => {
  //     if (err) return console.error(err);
  //     console.log(`copied posts folder to ${themes[ssg].contentFolder}`);
  //   });

  //   fs.remove(path.join(themes[ssg].themeFolder, '/_posts'))
  //     .then(() => {
  //       fs.copy(
  //         path.join(contentFolder, '/posts'),
  //         path.join(themes[ssg].themeFolder, '/_posts')
  //       ).then(() => {
  //         if (err) return console.error(err);
  //         console.log(`copied posts folder to ${themes[ssg].contentFolder}`);
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
}

// themes.forEach(theme => {
//   fs.copy(scssFolder, theme, err => {
//     if (err) return console.error(err);

//     console.log('success!');
//   }); // copies directory, even if it has subdirectories or files
// });

// const token = process.env.GITHUB_TOKEN;

// loadTheme = async file => {
//   console.log(file);
//   const data = fs.readFileSync(path.join(themesFolder, file));
//   const frontmatter = yamlFront.loadFront(data);

//   if (frontmatter.github) {
//     let github = gh(frontmatter.github);
//     let themeGithubData = {
//       name: github.name,
//       owner: github.owner,
//       repo: github.repo,
//       demo: frontmatter.demo,
//     };

//     repoResponse = await axios.get(
//       `https://api.github.com/repos/${github.repo}`,
//       {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       }
//     );

//     themeGithubData.stars = repoResponse.data.stargazers_count;
//     themeData.push(themeGithubData);
//   }
// };

// Promise.all(themeFiles.map(file => loadTheme(file)))
//   .then(res => {
//     fs.writeFileSync('./data/stars.json', JSON.stringify(themeData));
//   })
//   .catch(error => {
//     console.log(error.message, error.config.url);
//   });

// const imageFiles = fs.readdirSync('./static/hires');

// imageFiles.forEach(image => {
//   im.crop(
//     {
//       srcPath: `./static/hires/${image}`,
//       dstPath: `./static/images/theme/thumbnail/${image}`,
//       width: 280,
//       height: 180,
//       quality: 1,
//       gravity: 'North',
//     },
//     function(err, stdout, stderr) {
//       if (err) throw err;
//       console.log(`resized ${image} to 280x180`);
//     }
//   );
// });
