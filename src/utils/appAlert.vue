<template>
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="visible" :class="alertClasses" role="alert">
        <button @click="closeAlert" class="absolute top-2 right-2 text-lg font-bold">
          ×
        </button>
        <div class="flex items-center">
          <svg v-if="type === 'success'" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-if="type === 'error'" class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p class="ml-2">{{ message }}</p>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'success' // 'success' or 'error'
      },
      duration: {
        type: Number,
        default: 5000 // Duration in milliseconds
      }
    },
    data() {
      return {
        visible: true
      };
    },
    mounted() {
      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    },
    methods: {
      closeAlert() {
        this.visible = false;
      }
    },
    computed: {
      alertClasses() {
        return [
          'relative p-4 mb-4 text-sm font-medium rounded-lg',
          this.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        ];
      }
    }
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>