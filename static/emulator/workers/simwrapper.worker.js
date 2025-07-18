importScripts('fetch-file-shim.js');
importScripts('../lib/simwrapper.js');
importScripts('comlink.min.js');
importScripts('comlink.min.m.js');
;(function(){
  const origImport = importScripts;
  self.importScripts = function(...paths) {
    const fixed = paths.map(p => {
      if (/^simlib\.js/.test(p)) {
        return `../lib/${p}`;
      }
      return p;
    });
    return origImport.apply(null, fixed);
  };
})();

importScripts('../lib/simwrapper.js?1687185326516');