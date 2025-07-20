importScripts('fetch-file-shim.js');
importScripts('comlink.min.js');
;(function(){
  const origImport = importScripts;
  self.importScripts = function (...paths) {
    const base = self.location.href.replace(/\/?[^/]*$/, '/');
    const fixed = paths.map(p => {
      if (/simlib\.js/.test(p)) {
        const [name, query] = p.split('?');
        const abs = base.replace(/workers\/?$/, '') + 'lib/' + name.replace(/^\.\//, '');
        return abs + (query ? '?' + query : '');
      }
      return p;
    });
    return origImport.apply(null, fixed);
  };
})();

importScripts('../lib/simwrapper.js');