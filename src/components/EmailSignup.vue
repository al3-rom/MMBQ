
<template>
  <form @submit.prevent="onSubmit" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
    <input
      v-model="email"
      @blur="validateEmail"
      type="email"
      placeholder="Ingresa tu correo electrónico"
      class="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      id="submit-button"
      type="submit"
      :disabled="!!error || !email"
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed  transition"
    >
      ¡Únete ahora!
    </button>
  </form>

  <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>

  <p v-if="submitted" class="mt-1 text-sm text-green-600">
    ¡Gracias por enviar tu email!
  </p>
</template>

<script setup>
import { ref, watch } from 'vue'

const email     = ref('')
const error     = ref('')
const submitted = ref(false)

const emit = defineEmits(['submit'])

function validateEmail() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  error.value = pattern.test(email.value) || email.value === ''
    ? ''
    : 'Por favor ingresa un correo válido.'
}

watch(email, () => {
  if (error.value) validateEmail()
})

async function onSubmit() {
  validateEmail()
  if (error.value || !email.value) return

  
  emit('submit', email.value)

  submitted.value = true

  email.value = ''

  setTimeout(() => {
    submitted.value = false
    
  }, 5000)
}
</script>
