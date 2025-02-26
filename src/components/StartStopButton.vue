<template>
  <button class="px-4 py-2 bg-slate-300 hover:bg-slate-500 m-4 rounded" @click="handleClick()">
    {{ SpintimeStore.currentlySpinning() ? 'Stop Timer' : 'Start Timer' }}
  </button>
</template>

<script setup>
import { useSpintimeStore } from '@/stores/SpintimeStore'
import { supabase } from '../supabase'
import { onMounted, ref } from 'vue'
const emit = defineEmits(['startSpinning', 'stopSpinning'])

const SpintimeStore = useSpintimeStore()
const userId = ref(null)
async function handleClick() {
  let res = await SpintimeStore.save(userId)
  if (res) {
    emit('startSpinning')
  } else {
    emit('stopSpinning')
  }
}

onMounted(async () => {
  await supabase.auth.getSession().then(async (data) => {
    userId.value = data.data.session.user.id
    let recsFound = await SpintimeStore.checkRunning(userId.value)
    if (recsFound > 0) {
      console.log('emitting startSpinning')
      emit('startSpinning')
    }
  })
})
</script>
