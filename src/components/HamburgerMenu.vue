<template>
  <div ref="menuRef" class="relative">
    <!-- Botón hamburguesa -->
    <button
      @click="toggleMenu"
      :class="[isOpen
        ? 'bg-orange-500 ring-2 ring-orange-500/50'
        : 'bg-blue-800 ring-2',
        'relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 focus:outline-none'
      ]"
      aria-label="Abrir/Cerrar menú"
    >
      <span class="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 w-5 h-0.5 bg-white"
            :class="isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-3'"></span>
      <span class="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 w-5 h-0.5 bg-white"
            :class="isOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'"></span>
      <span class="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 w-5 h-0.5 bg-white"
            :class="isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-7'"></span>
    </button>

    <transition >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-4 z-20"
      >
        <ul class="space-y-2">
          <li>
            <button
              id="toggle-theme-mobile"
              class="w-full px-4 py-2 text-left rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition text-sm"
            >
              🌙 {{ props.t.nav.temaOscuro }}
            </button>
          </li>
          <li>
            <SelectLanguage :lang="props.lang" :label="props.t.nav.idioma" />
          </li>
          <li><a :href="route('')" class="block hover:text-blue-600">{{ props.t.nav.inicio }}</a></li>
          <li><a :href="route('/sobre-nosotros')" class="block hover:text-blue-600">{{ props.t.nav.sobreNosotros }}</a></li>
          <li><a :href="route('/noticias')" class="block hover:text-blue-600">{{ props.t.nav.noticias }}</a></li>
          <li><a :href="route('/tarifas')" class="block hover:text-blue-600">{{ props.t.nav.tarifas }}</a></li>
          <li><a :href="route('/socios')" class="block hover:text-blue-600">{{ props.t.nav.socios }}</a></li>
          <li><a :href="route('/politica-privacidad')" class="block hover:text-blue-600">{{ props.t.nav.privacidad }}</a></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import SelectLanguage from './SelectLanguage.vue'

const props = defineProps({
  t: { type: Object, required: true },
  lang: { type: String, required: true }
})

const isOpen = ref(false)
const menuRef = ref(null)

// ¡Usa props.t y props.lang directamente!
function route(url) {
  if (url === '') return `/${props.lang}`
  return `/${props.lang}${url}`
}

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function onClickOutside(event) {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  // DARK MODE
  const html = document.documentElement

  watch(isOpen, (open) => {
    if (!open) return
    nextTick(() => {
      setTimeout(() => {
        const toggleBtn = document.getElementById('toggle-theme-mobile')
        if (!toggleBtn) return

        // Puedes dejar la lógica de dark mode aquí igual...
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const savedTheme = localStorage.theme
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)

        html.classList.toggle('dark', isDark)
        toggleBtn.textContent = isDark ? props.t.nav.temaClaro : props.t.nav.temaOscuro

        toggleBtn.onclick = () => {
          const newIsDark = html.classList.toggle('dark')
          localStorage.theme = newIsDark ? 'dark' : 'light'
          toggleBtn.textContent = newIsDark ? props.t.nav.temaClaro : props.t.nav.temaOscuro
        }
      }, 50)
    })
  })
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>