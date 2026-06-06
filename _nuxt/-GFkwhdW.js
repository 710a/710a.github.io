import { o as openBlock, c as createElementBlock, g as createStaticVNode, I as useRoute, d as onMounted, e as dispatcherSingleton, f as onUnmounted, O as gsapWithCSS, H as storeToRefs, al as useAppStore, y as watch, T as withDirectives, z as createBlock, a7 as withCtx, A as normalizeClass, u as unref, x as ref, aa as __nuxt_component_0, R as resolveDirective, a as createVNode, am as LogoSvg, U as store } from '#entry';

const _hoisted_1 = {
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 98 29"
};

function render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1, [...(_cache[0] || (_cache[0] = [
    createStaticVNode("<text class=\"logo-type__char\" x=\"0\" y=\"18\" font-size=\"13\" font-weight=\"700\" font-family=\"Arial, sans-serif\">H</text><text class=\"logo-type__char\" x=\"12\" y=\"18\" font-size=\"13\" font-weight=\"700\" font-family=\"Arial, sans-serif\">U</text><text class=\"logo-type__char\" x=\"27\" y=\"18\" font-size=\"13\" font-weight=\"700\" font-family=\"Arial, sans-serif\">J</text><text class=\"logo-type__char\" x=\"39\" y=\"18\" font-size=\"13\" font-weight=\"700\" font-family=\"Arial, sans-serif\">I</text><text class=\"logo-type__char\" x=\"48\" y=\"18\" font-size=\"13\" font-weight=\"700\" font-family=\"Arial, sans-serif\">A</text><text class=\"logo-type__char\" x=\"62\" y=\"18\" font-size=\"13\" font-weight=\"700\" font-family=\"Arial, sans-serif\">N</text><text class=\"logo-type__char\" x=\"77\" y=\"18\" font-size=\"13\" font-weight=\"700\" font-family=\"Arial, sans-serif\">L</text><text class=\"logo-type__char\" x=\"88\" y=\"18\" font-size=\"13\" font-weight=\"700\" font-family=\"Arial, sans-serif\">E</text>", 8)
  ]))]))
}
const LogoTypeSvg = { render: render };

const CHAR_STAGGER = 0.02;
const VISIBILITY_THRESHOLD_HERO = 0.51;
const VISIBILITY_THRESHOLD_FOOTER = 0.95;

const _sfc_main = {
  __name: "HeaderLogo",
  setup(__props) {

const route = useRoute();

const onLogoClick = (e) => {
  if (route.path === '/') {
    e.preventDefault();
    dispatcherSingleton.trigger({ name: 'scrollToY' }, { y: store.snapPoints[0].value });
  }
};

onMounted(() => {
  initCharDelays();

  dispatcherSingleton.on('scroll', onDispatcherScroll);
});

onUnmounted(() => {
  dispatcherSingleton.off('scroll', onDispatcherScroll);
});

// ? Give logo type chars a random delay
const logoTypeEl = ref(null);
let chars = null;
const initCharDelays = () => {
  chars = [...logoTypeEl.value.$el.querySelectorAll('.logo-type__char')];
  chars = gsapWithCSS.utils.shuffle(chars);

  gsapWithCSS.set(chars, {
    transitionDelay: gsapWithCSS.utils.distribute({
      amount: (chars.length - 1) * CHAR_STAGGER,
      ease: 'none'
    })
  });
};

// ? Handle logo visibility once loader is done
const isVisible = ref(false);
const { isLoaderVisible } = storeToRefs(useAppStore());
watch(
  () => isLoaderVisible.value,
  (newVal) => {
    if (!newVal) {
      isVisible.value = true;
    }
  }
);

// ? Handle logo type visibility
const isTypeHidden = ref(false);
const onDispatcherScroll = ({ currentY, total }) => {
  if (isLoaderVisible.value) return

  const progress = currentY / total;

  isTypeHidden.value =
    progress >= VISIBILITY_THRESHOLD_HERO &&
    progress <= VISIBILITY_THRESHOLD_FOOTER;
};

return (_ctx, _cache) => {
  const _component_NuxtLink = __nuxt_component_0;
  const _directive_sound = resolveDirective("sound");

  return withDirectives((openBlock(), createBlock(_component_NuxtLink, {
    to: "/",
    "aria-label": "返回首页",
    class: normalizeClass([{ 'header-logo--visible': unref(isVisible) }, "header-logo"]),
    onClick: onLogoClick
  }, {
    default: withCtx(() => [
      createVNode(unref(LogoSvg), {
        class: "header-logo__mark",
        "aria-hidden": "true"
      }),
      createVNode(unref(LogoTypeSvg), {
        ref_key: "logoTypeEl",
        ref: logoTypeEl,
        class: normalizeClass(["header-logo__type", { 'header-logo__type--hidden': unref(isTypeHidden) }]),
        "aria-hidden": "true"
      }, null, 8, ["class"])
    ]),
    _: 1
  }, 8, ["class"])), [
    [_directive_sound, { click: 'click', hover: 'hover' }]
  ])
}
}

};

export { _sfc_main as default };
