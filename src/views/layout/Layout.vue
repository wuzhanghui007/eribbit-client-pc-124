<template >
<AppTopnav/>
<AppHeader/>
<AppFooter/>
<div class="main">
  <router-view/>
</div>
<AppFooter/>
</template>
<script>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'

export default {
  components: {
    AppTopnav,
    AppHeader,
    AppFooter
  },
  setup () {
  }
}
</script>

<style lang="less" scoped>
.footer {
 .hoverShadow ();
}
</style>
