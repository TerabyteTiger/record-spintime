<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Session info: {{ session }}</p>
    <h2>What is this?</h2>
    <p>
      Record spintime is an app I made because I'm too forgetful and often forgot to start or stop
      my Stylus timer when listening to my vinyl records. As someone who both wants to care for his
      records and is a data nerd, putting together a small webapp to track this data was a
      no-brainer! Hopefully by making it available to the world, someone else will either find it
      useful or feel inspired to create something for themselves.
    </p>
    <h2>Project Status</h2>
    <p>
      Record spintime is currently in an Alpha release and may have unexpected behaviors or bugs. If
      you find any, please
    </p>
    <!-- <h2>Data collection</h2>
    <p>
      Data is collected using <a href="https://supabase.com/">Supabase</a>. Your email address is
      saved when you create an account and tied to your user id, which is referenced in each record
      created within Record Spintime.
    </p> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase.js'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })
})
</script>
