<template>
  <view
    :style="{
      paddingTop: safeTop + 'px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }"
  >
    <web-view
      ref="wv"
      :src="url"
      @message="handleMsg"
      :style="{width: '100vw', height: '100vh', overflow: 'hidden'}"
    ></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  computed: {
    safeTop() {
      return uni.getSystemInfoSync().statusBarHeight || 0
    }
  },
  onLoad() {
    if (typeof document !== 'undefined') {
      const setNoScroll = () => {
        const html = document.documentElement;
        const body = document.body;
        const app = document.getElementById('app');
        if (html) { html.style.height = '100vh'; html.style.overflow = 'hidden'; html.style.margin = '0'; html.style.padding = '0'; }
        if (body) { body.style.height = '100vh'; body.style.overflow = 'hidden'; body.style.margin = '0'; body.style.padding = '0'; }
        if (app) { app.style.height = '100vh'; app.style.overflow = 'hidden'; app.style.margin = '0'; app.style.padding = '0'; }
      };
      setNoScroll();
    }

    // #ifdef APP-PLUS
    let rootUrl = ''
    if (plus.webview.assetLocalServer) {
      plus.webview.assetLocalServer.start();
      rootUrl = 'http://localhost:13131/_www/'
    } else {
      rootUrl = plus.io.convertLocalFileSystemURL('_www/')
      if (!/^file:\/\//.test(rootUrl)) {
        rootUrl = 'file://' + rootUrl
      }
    }
    this.url = rootUrl + 'static/emulator/index.html'
    // #endif

    // #ifdef H5
    this.url = '/static/emulator/index.html'
    // #endif
  },

  onReady() {
    // #ifdef APP-PLUS
    const nativeWV = this.$refs.wv?.$getAppWebview
      ? this.$refs.wv.$getAppWebview()
      : this.$refs.wv;
    if (nativeWV) {
      if (nativeWV.overrideUrlLoading) {
        nativeWV.overrideUrlLoading({ mode: 'reject', match: '*' }, e => {
          if (e.url && e.url.includes('github.com')) {
            plus.runtime.openURL(e.url);
            return true;
          }
          return false;
        });
      }
      if (typeof nativeWV.evalJS === 'function') {
        nativeWV.evalJS(`
          (function(){
            window.open = function(u){ plus.runtime.openURL(u); };
            document.addEventListener('click', function(ev){
              var a = ev.target.closest('a[target="_blank"]');
              if(a){ ev.preventDefault(); plus.runtime.openURL(a.href); }
            }, true);
          })();
        `);
      }
    }
    // #endif
  },

  onBackPress() {
    const wv = this.$refs.wv
    if (!wv) return false

    wv.canGoBack(res => {
      if (res.canGoBack) {
        wv.goBack()
      } else {
        plus.runtime.quit()
      }
    })
    return true
  },

  methods: {
    handleMsg() {}
  }

}
</script>

<style scoped>
view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex: 1;
}
</style>
