<template>
  <div class="text-gray-700 dark:text-gray-100 flex items-center gap-2">
    <label for="lang" class="text-sm font-medium md:hidden">Idioma:</label>
    <select
      id="lang"
      v-model="locale"
      @change="onLocaleChange"
      class="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-2xl text-sm px-1.5 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-400"
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const locale = ref('es')

function onLocaleChange() {
 
}
</script>
