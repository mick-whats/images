const glob = require('tiny-glob');
const marked = require('marked');
const fs = require('fs');
const template = require('./template');

const BASE_URL = 'https://mick-whats-images.netlify.com';
const IMAGE_DIR_NAME = 'assets/';

(async function() {
  let files = await glob('**/*.{png,jpeg,jpg}');
  /*
  [ 'images/boip/tutorial01.png',
  'images/jxb/jxb_logo.png',
  'images/jxb/jxb_ss_01.png' ]
  */
  let md = `# mick-whats images

  [![Netlify Status](https://api.netlify.com/api/v1/badges/71321e3e-3db9-4b91-9dc3-16cfc4c137f7/deploy-status)](https://app.netlify.com/sites/sad-nobel-60023c/deploys)


  `;
  files.forEach(basePath => {
    const _path = basePath.replace(IMAGE_DIR_NAME, '');
    const url = `${BASE_URL}/${_path}`;
    const text = [
      `<a href="${url}"><img src="${_path}" width="150px"></a>`,
      `[${_path}](${url})`,
      '---',
      ''
    ];

    md += text.join('\n\n');
  });
  const html = template.replace('<!-- page content -->', marked(md));
  // fs.writeFileSync('README.md', md);
  fs.writeFileSync(IMAGE_DIR_NAME + 'index.html', html);
})();
