<script setup lang="ts">
import Header from '@/components/Header.vue'; 
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <Header />
  <RouterView /> -->
  <div class="flex h-screen bg-gray-100">
    <!-- <Sidebar /> -->
    <div class="flex-1 flex flex-col ml-64">
      <Header />
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
</style>