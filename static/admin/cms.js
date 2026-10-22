if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', (user) => {
    if (!user) {
      window.netlifyIdentity.on('login', () => {
        document.location.href = '/admin/';
      });
    }
  });
}

CMS.registerEditorComponent({
  id: 'youtube',
  label: 'YouTube',
  fields: [{ name: 'id', label: 'YouTube video ID', widget: 'string' }],
  pattern: /^{{< youtube\s+(?:id=)?"?([A-Za-z0-9_-]+)"?\s*>}}$/,
  fromBlock: (match) => ({ id: match[1] }),
  toBlock: (obj) => `{{< youtube ${obj.id} >}}`,
  toPreview: (obj) => `<img src="https://i3.ytimg.com/vi/${obj.id}/hqdefault.jpg" alt="YouTube video">`,
});
