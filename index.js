export default {
    install: function (Vue, options) {

        Vue.$skip = 0;
        Vue.mutates = {el:{},binding:{}};
        Vue.skipEvent = (e)=>{
            Vue.EventHandler(Vue.mutates.el, Vue.mutates.binding);
        },
        Vue.EventHandler = (el, binding) => {
            var rect = el.getBoundingClientRect();

            if (binding.modifiers.bottom) {
                if (rect.y - window.innerHeight <= 0) {
                    if (!Vue.$skip)
                        Vue.$skip = window.scrollY;
                    el.classList.add("floating-directive");
                }
            } else {
                if (rect.y <= 0) {
                    if (!Vue.$skip)
                        Vue.$skip = window.scrollY;
                    el.classList.add("floating-directive");
                }
            }
            if (Vue.$skip > 0 && Vue.$skip > window.scrollY) {
                Vue.$skip = 0;
                el.classList.remove("floating-directive");
            }
        };
// 2. 전역 에셋 추가
        Vue.directive('pick-up-scroll', {
            bind(el, binding) {
                Vue.mutates.el = el;
                Vue.mutates.binding = binding;
                window.addEventListener('scroll', Vue.skipEvent );
            },
            unbind() {
                window.removeEventListener('scroll', Vue.skipEvent);
            }
        })
    }

}
