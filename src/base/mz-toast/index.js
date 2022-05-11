import TempToast from './mz-toast.vue'

let instance//生成的临时样例
let showToast = false
let time //显示时间
// 写插件
const mzToast = {
  // install会在Vue.use时默认调用该方法
  install(Vue, options = {}) {
    let opt = TempToast.data()//获取组件里面的默认数据
    Object.assign(opt, options);//将options和opt的配置参数合并
    //绑定原型自定义指令
    Vue.prototype.$mzToast = (message, position) => {
      // 为了防止快速点击而造成的多次出现，连续点击两次时，快速删除上一次的状态
      if (showToast) {
        clearTimeout(time);//清除上一个状态
        instance.vm.visible = showToast = false;
        document.body.removeChild(instance.vm.$el);
      }
      if (message) {
        opt.message = message;
      }
      if (position) {
        opt.position = position;
      }
      let TempToastConstructor = Vue.extend(TempToast);//写一个vue的子类
      instance = new TempToastConstructor({
        //重写vue子类中的data
        data: opt
      })
      instance.vm = instance.$mount();//利用$mount函数提取出该Vue用例的dom元素,并且能够通过el来获取
      document.body.appendChild(instance.vm.$el);//添加元素
      instance.vm.visible = showToast = true
      time = setTimeout(() => {
        instance.vm.visible = showToast = false
        document.body.removeChild(instance.vm.$el)
      }, opt.duration);
    }
  }
}
export default mzToast;