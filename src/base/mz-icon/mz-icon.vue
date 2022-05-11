  <!-- icon组件 -->
<script>
export default {
  name: 'MzIcon',
  props: {
    type: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  methods: {
    getIconCls() {
      return `icon-${this.type}`
    },
    getIconStyle() {
      return { fontSize: this.size + 'px' }
    },
    onClick(e) {
      this.$emit('click', e)
    },
  },
  // 采用渲染的方式生成模板,更适合动态生成组件
  render(createElement) {
    return createElement('i', {
      style: this.getIconStyle(),
      class: `iconfont ${this.getIconCls()}`,
      on: {
        click: this.onClick,
      },
    })
  },
}
</script>

<style>
</style>
