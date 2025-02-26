<script setup>
import SpinningRecord from '@/components/SpinningRecord.vue'
import StartStopButton from '@/components/StartStopButton.vue'
import { ref } from 'vue'

// catch emit(startSpinning) and make record start spinning
// this only runs if there's an already running record
const spinningRecord = ref(null)

function start() {
  spinningRecord.value.startSpinning()
}
function stop() {
  spinningRecord.value.stopSpinning()
}
</script>

<template>
  <main>
    <SpinningRecord ref="spinningRecord"></SpinningRecord>
    <StartStopButton @start-spinning="start()" @stop-spinning="stop()"></StartStopButton>
  </main>
</template>
