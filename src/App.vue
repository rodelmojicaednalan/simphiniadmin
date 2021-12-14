<template>
  <div id="app">
    <div class="main-wrapper main-wrapper-1">
      <Navbar />
      <Sidebar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/partial/Navbar'
import Sidebar from '@/components/partial/Sidebar'
export default {
    components: {
        Navbar,
        Sidebar
    }
}
</script>

<style lang="scss">
    @import '@/assets/css/index.scss';
</style>

<style scoped>
.content {
    position: fixed;
    width: 85%;
    margin-left: 17rem;
    margin-top: 6rem;
}
</style>
