<script setup lang="ts">
import Header from '@/components/Header.vue'; 
import { ref } from 'vue';
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

const tokenValue = ref(null);
tokenValue.value = sessionStorage.getItem('token-user');
</script>

<template>
  <!-- <Header />
  <RouterView /> -->
  <div class="h-screen bg-gray-100">
    <!-- <Sidebar /> -->
    <div class="flex-1 flex flex-col">
      <Header v-if="tokenValue" />
      <main class="flex-1 p-6"   :class="[
        tokenValue ? 'ml-64 mt-24' : null
      ]">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
</style>