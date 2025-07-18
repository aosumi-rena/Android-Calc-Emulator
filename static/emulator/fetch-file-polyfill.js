(function () {
  if (location.protocol !== 'file:') return;

  const root = plus.io.convertLocalFileSystemURL('_www/static/emulator/');
  const origFetch = window.fetch;

  window.fetch = function (input, init = {}) {
    if (typeof input !== 'string' || /^[a-z][a-z0-9+.-]*:/.test(input)) {
      return origFetch(input, init);
    }

    const full = root + input.replace(/^\.?\//, '');

    return new Promise((resolve, reject) => {
      plus.io.resolveLocalFileSystemURL(full, entry => {
        entry.file(file => {
          const reader = new FileReader();
          reader.onload = () => {
            const arrayBuf = reader.result;
            resolve(new Response(arrayBuf, { status: 200 }));
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        }, reject);
      }, reject);
    });
  };
})();
