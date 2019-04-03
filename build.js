const glob = require('tiny-glob');
const marked = require('marked');
const fs = require('fs');
const template = require('./template');
const baseUrl = 'https://mick-whats-images.netlify.com';
(async function() {
  let files = await glob('**/*.{png,jpeg,jpg}');
  let md = `# mick-whats images

  [![Netlify Status](https://api.netlify.com/api/v1/badges/71321e3e-3db9-4b91-9dc3-16cfc4c137f7/deploy-status)](https://app.netlify.com/sites/sad-nobel-60023c/deploys)


  `;
  files.forEach(_path => {
    const url = `${baseUrl}/${_path}`;
    const text = [
      `## ${_path}`,
      '### image',
      '---',
      `![_path](${_path})`,
      '---',
      '### code',
      '```\n',
      '# path',
      url,
      '# html',
      `<a href="${url}">${_path}</a>`,
      '# markdown',
      `[${_path}](${url})`,
      '```',
      '### link',
      `[${_path}](${url})`,
      '---',
      ''
    ];

    md += text.join('\n\n');
  });
  const html = template.replace('<!-- page content -->', marked(md));
  fs.writeFileSync('README.md', md);
  fs.writeFileSync('index.html', html);
})();
