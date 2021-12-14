<template>
  <div>
    <Navbar />
    <Sidebar />
    <div class="main-content" style="min-height: 530px;">
      <Herocard :clientCount="cardClientCount" />
      <!-- List and Chart -->
      <Chartlist @client-count="clientCount" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/partial/Navbar'
import Sidebar from '@/components/partial/Sidebar'
import Herocard from '@/components/Pages/Dashboard/Herocard';
import Chartlist from '@/components/Pages/Dashboard/Chartlist';
export default {
  components: {
    Herocard,
    Chartlist,
    Navbar,
    Sidebar
  },
  data() {
    return {
      cardClientCount: 0
    }
  },
  methods: {
    clientCount(count) {
      this.cardClientCount = count;
    }
  }
}
</script>