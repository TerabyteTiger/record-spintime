<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './supabase'
import gsap from 'gsap'
import { useSpintimeStore } from './stores/SpintimeStore'

const session = ref()

const SpintimeStore = useSpintimeStore()

// This needs to be moved into the store probs
onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <header class="flex justify-between bg-teal-400 mb-4 p-4 align-baseline">
    <h1 class="text-2xl text-white">Record Spintime</h1>
    <nav class="space-x-2">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/account">Account</RouterLink>
    </nav>
  </header>
  <main class="">
    <RouterView />
  </main>
</template>

<style>
body {
  @apply h-screen;
}
</style>
