<script setup lang="ts">
import Header from '@/components/Header.vue'; 
import { ref } from 'vue';
import { useLogin } from '@/stores/useLoginStore';
import  { storeToRefs } from 'pinia';
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
const tokenValue = ref<string | null>(null);
tokenValue.value = sessionStorage.getItem('token-user');
</script>
<template>
    <div class="h-screen bg-gray-100">
    <div class="flex-1 flex flex-col">
      <Header v-if="!!tokenValue" />
      <main class="flex-1 p-6"   :class="[
        tokenValue ? 'ml-64 mt-12 h-full h-screen bg-gray-100' : null
      ]">
        <router-view />
      </main>
    </div>
  </div>
</template>