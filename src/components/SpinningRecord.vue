<template>
  <img
    alt="a vinyl record with a yellow accent around the center hole."
    id="record"
    src="@/assets/record.svg"
    width="300"
  />
</template>

<script setup>
import gsap from 'gsap'
import { onMounted } from 'vue'

var timeline = gsap.timeline({ repeat: -1 })

onMounted(() => {
  timeline.to('#record', { rotation: 360, duration: 3, repeat: -1, ease: 'none' })
  timeline.pause()
})

function startSpinning() {
  timeline.resume()
}

function stopSpinning() {
  timeline.pause()
}

defineExpose({
  startSpinning,
  stopSpinning,
})
</script>
