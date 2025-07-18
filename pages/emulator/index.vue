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
    this.url = plus.io.convertLocalFileSystemURL('_www/static/emulator/index.html')
    // #endif

    // #ifdef H5
    this.url = '/static/emulator/index.html'
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

}
</script>

<style scoped>
view { flex: 1; }
</style>
