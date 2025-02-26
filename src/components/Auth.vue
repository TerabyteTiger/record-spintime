<template>
  <form class="flex flex-col" @submit.prevent="handleLogin" v-if="!sessionExists">
    <div class="">
      <h1 class="">Supabase + Vue 3</h1>
      <p class="">Sign in via magic link with your email below</p>
      <div>
        <input class="" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          class=""
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
  <div v-else>You are logged in :)</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

const sessionExists = ref(false)

onMounted(async () => {
  sessionExists.value = await supabase.auth.getSession().then((data) => {
    return data.data.session == null ? false : true
  })
})
</script>
