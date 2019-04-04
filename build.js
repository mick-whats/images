const glob = require('tiny-glob');
const fs = require('fs');
const template = require('./template');

const BASE_URL = 'https://mick-whats-images.netlify.com';
const IMAGE_DIR_NAME = 'assets/';

(async function() {
  const files = await glob('**/*.{png,jpeg,jpg}');
  let list = '';
  files.forEach(basePath => {
    const _path = basePath.replace(IMAGE_DIR_NAME, '');
    list += `
    <li>
      <a href="${_path}">
        <img src="${_path}" width="150px">
        <span class='uk-padding'>${_path}</span>
      </a>
    </li>`;
  });
  const html = template.replace('<!-- page content -->', list);
  fs.writeFileSync(IMAGE_DIR_NAME + 'index.html', html);
})();
