<template>
  <div ref="menuRef" class="relative">
    <!-- Botón hamburguesa -->
    <button
      @click="toggleMenu"
      :class="[
        'relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 focus:outline-none',
        isOpen
          ? 'bg-orange-500 ring-2 ring-orange-500/50'
          : 'bg-blue-800 ring-2'
      ]"
      aria-label="Abrir/Cerrar menú"
    >
      <span
        class="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 w-5 h-0.5 bg-white"
        :class="isOpen
          ? 'top-1/2 -translate-y-1/2 rotate-45'
          : 'top-3'"
      ></span>
      <span
        class="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 w-5 h-0.5 bg-white"
        :class="isOpen
          ? 'opacity-0'
          : 'top-1/2 -translate-y-1/45'"
      ></span>
      <span
        class="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 w-5 h-0.5 bg-white"
        :class="isOpen
          ? 'top-1/2 -translate-y-1/2 -rotate-45'
          : 'top-7'"
      ></span>
    </button>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform -translate-y-2 scale-95"
      enter-to-class="opacity-100 transform translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 transform translate-y-0 scale-100"
      leave-to-class="opacity-0 transform -translate-y-2 scale-95"
    >
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
              🌙 Tema oscuro
            </button>
          </li>

         
          <li><SelectLanguage class="md:hidden" /></li>

      
          <li><a href="/" class="block hover:text-blue-600">Inicio</a></li>
          <li><a href="/sobre-nosotros" class="block hover:text-blue-600">Sobre Nosotros</a></li>
          <li><a href="/noticias" class="block hover:text-blue-600">Noticias</a></li>
          <li><a href="/tarifas" class="block hover:text-blue-600">Tarifas</a></li>
          <li><a href="/socios" class="block hover:text-blue-600">Socios</a></li>
          <li><a href="/politica-privacidad" class="block hover:text-blue-600">Política de Privacidad</a></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SelectLanguage from './SelectLanguage.vue'
import { nextTick, watch } from 'vue'

const isOpen = ref(false)
const menuRef = ref(null)

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

  const html = document.documentElement

  watch(isOpen, (open) => {
    if (!open) return

    nextTick(() => {
      setTimeout(() => {
        const toggleBtn = document.getElementById('toggle-theme-mobile')
        if (!toggleBtn) return

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const savedTheme = localStorage.theme
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)

        html.classList.toggle('dark', isDark)
        toggleBtn.textContent = isDark ? '🌞 Tema claro' : '🌙 Tema oscuro'

        toggleBtn.onclick = () => {
          const newIsDark = html.classList.toggle('dark')
          localStorage.theme = newIsDark ? 'dark' : 'light'
          toggleBtn.textContent = newIsDark ? '🌞 Tema claro' : '🌙 Tema oscuro'
        }
      }, 50) // pequeño delay para esperar a que la transición renderice
    })
  })
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>
