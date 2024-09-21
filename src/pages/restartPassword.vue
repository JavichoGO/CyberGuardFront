<template>
    <main class="flex items-center justify-center h-screen bg-gray-100">
        <div class="w-full max-w-lg  bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-6 text-gray-700">Reestablecer contraseña</h2>
            <div class="mb-4">
                <app-input
                v-model="modelLogin.documentNumber"
                id="new-password"
                name="new-password"
                type="text"
                label="Nueva contraseña"
              />
              </div>
              <div class="mb-4">
                <app-input
                v-model="modelLogin.documentNumber"
                id="repeat-password"
                name="repeat-password"
                type="text"
                label="Repetir contraseña"
              />
              </div>
        </div>
    </main>
</template>

<script>
import appInput from '@/utils/appInput.vue';

</script>
