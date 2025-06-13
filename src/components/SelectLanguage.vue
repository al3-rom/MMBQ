<template>
  <div class="text-gray-700 dark:text-gray-100 flex items-center gap-2">
    <label for="lang" class="text-sm font-medium md:hidden">{{ label || 'Idioma:' }}</label>
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
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  lang: { type: String, default: 'es' },     
  label: { type: String, default: '' }      
})

const locale = ref(props.lang)

watch(() => props.lang, (newLang) => {
  locale.value = newLang
})

onMounted(() => {
  if (window.location.pathname.startsWith('/en')) {
    locale.value = 'en'
  } else {
    locale.value = 'es'
  }
})

function onLocaleChange() {
  const currentPath = window.location.pathname
  // Detecta si ya hay /es o /en al inicio y lo reemplaza correctamente
  let newPath = currentPath.replace(/^\/(es|en)/, '')

  if (locale.value === 'en') {
    newPath = '/en' + (newPath === '/' ? '' : newPath)
  } else {
    newPath = '/es' + (newPath === '/' ? '' : newPath)
  }

  window.location.pathname = newPath
}
</script>
