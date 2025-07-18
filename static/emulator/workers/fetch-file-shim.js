(() => {
  const nativeFetch = self.fetch?.bind(self);

  const isLocal = url =>
    url.startsWith('file:') ||
    url.startsWith('./')    ||
    url.startsWith('../')   ||
    url.startsWith('/')     ||
    url.startsWith('data/');

  function xhrFetch(url, responseType = 'arraybuffer') {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = responseType;
      xhr.onload = () => (xhr.status === 0 || xhr.status === 200)
        ? res(xhr.response) : rej(new Error(`xhr ${xhr.status}`));
      xhr.onerror = () => rej(new Error('xhr network error'));
      xhr.send();
    });
  }

  self.fetch = async function (input, init) {
    const url = (typeof input === 'string') ? input : input.url;
    if (!isLocal(url)) {
      return nativeFetch ? nativeFetch(input, init) :
        Promise.reject(new Error('native fetch missing'));
    }

    const respType =
          (init && init.responseType) ||
          (/\.(png|jpe?g|gif|svg)$/i.test(url) ? 'blob' : 'arraybuffer');

    const body = await xhrFetch(url, respType);

    return new Response(body, { status: 200 });
  };
})();
