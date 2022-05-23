// 复用加载
export const loadMixin = {
  data() {
    return {
      mzLoadShow: true //加载状态
    }
  },
  methods: {
    _hideLoad() {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.mzLoadShow = false
      }, 200)
    }
  }
}
