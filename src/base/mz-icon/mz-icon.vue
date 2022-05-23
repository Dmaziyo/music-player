  <!-- icon组件 -->
<script>
export default {
  name: 'MzIcon',
  props: {
    // type类型对应阿里icon库里面的图标
    type: {
      type: String,
      required: true
    },
    // 设置icon的大小
    size: {
      type: Number,
      default: 16
    }
  },
  methods: {
    // 返回阿里矢量图标对应的类名
    getIconCls() {
      return `icon-${this.type}`
    },
    // 返回图标的大小
    getIconStyle() {
      return { fontSize: this.size + 'px' }
    },
    // 点击事件
    onClick(e) {
      this.$emit('click', e)
    }
  },
  // 采用渲染的方式生成模板,更适合动态生成组件
  render(createElement) {
    return createElement('i', {
      style: this.getIconStyle(),
      class: `iconfont ${this.getIconCls()}`,
      on: {
        click: this.onClick
      }
    })
  }
}
</script>

<style>
</style>
