
import XtxSkeleton from './xtx-skeleton.vue'
import xtxCarousel from './xtx-carousel.vue'
import xtxMore from './xtx-more.vue'
export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(xtxCarousel.name, xtxCarousel)
    app.component(xtxMore.name, xtxMore)
  }

}
