<template>
  <form @submit.prevent="onSubmit" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
    <input
      v-model="email"
      @blur="validateEmail"
      type="email"
      :placeholder="texts[lang].placeholder"
      class="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      id="submit-button"
      type="submit"
      :disabled="!!error || !email"
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded disabled:bg-opacity-50 disabled:cursor-not-allowed  transition"
    >
      {{ texts[lang].submit }}
    </button>
  </form>

  <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  <p v-if="submitted" class="mt-1 text-sm text-green-600">{{ texts[lang].success }}</p>
</template>


<script setup>
import { ref, watch } from 'vue'

// Recibe el idioma actual como prop (por defecto 'es')
const props = defineProps({
  lang: { type: String, default: 'es' }
})

// Textos en español e inglés
const texts = {
  es: {
    placeholder: "Ingresa tu correo electrónico",
    submit: "¡Únete ahora!",
    invalid: "Por favor ingresa un correo válido.",
    success: "¡Gracias por enviar tu email!",
    serverError: "Error conectando al servidor.",
    sendError: "No se pudo enviar el email. Intenta más tarde."
  },
  en: {
    placeholder: "Enter your email",
    submit: "Join now!",
    invalid: "Please enter a valid email.",
    success: "Thanks for submitting your email!",
    serverError: "Error connecting to the server.",
    sendError: "Could not send the email. Try again later."
  }
}

const email     = ref('')
const error     = ref('')
const submitted = ref(false)

const emit = defineEmits(['submit'])

function validateEmail() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  error.value = pattern.test(email.value) || email.value === ''
    ? ''
    : texts[props.lang].invalid
}

watch(email, () => {
  if (error.value) validateEmail()
})

async function onSubmit() {
  validateEmail()
  if (error.value || !email.value) return

  try {
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })
    const result = await response.json()
    if (result.success) {
      submitted.value = true
      email.value = ''
      setTimeout(() => { submitted.value = false }, 5000)
    } else {
      error.value = texts[props.lang].sendError
    }
  } catch (e) {
    error.value = texts[props.lang].serverError
  }
}
</script>

