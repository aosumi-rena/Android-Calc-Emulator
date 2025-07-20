<template>
  <view :style="{paddingTop: safeTop + 'px', flex: 1}">
    <web-view
      ref="wv"
      :src="url"
      @message="handleMsg"
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
    // #ifdef APP-PLUS
    if (plus.webview.assetLocalServer) {
      plus.webview.assetLocalServer.start();
      this.url = 'http://localhost:13131/static/emulator/index.html';
    } else {
      const root = plus.io.convertLocalFileSystemURL('_www');
      this.url = root + 'static/emulator/index.html';
    }
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
        ['http://*', 'https://*'].forEach(pattern => {
          nativeWV.overrideUrlLoading({ mode: 'reject', match: pattern }, e => {
            plus.runtime.openURL(e.url);
            return true;
          });
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
view { flex: 1; }
</style>
