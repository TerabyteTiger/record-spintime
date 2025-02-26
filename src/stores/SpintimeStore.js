import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { supabase } from '../supabase'

export const useSpintimeStore = defineStore('spintime', () => {
  const newRecord = {
    start_time: null,
    end_time: null,
    total_runtime_minutes: null,
    uid: null,
  }

  const currentRecord = ref({
    ...newRecord,
  })

  async function checkRunning(uid) {
    // Check if there is already a record in the db that's running. if so, replace current record
    // an item is "Running" if the end_time is null and start_time is not
    const { data, error } = await supabase
      .from('spintimes')
      .select('*', {
        count: 1,
      })
      .is('end_time', null)
      .eq('uid', uid)
    if (data.length > 0) {
      currentRecord.value = data[0]
    }
    return data.length
  }

  async function save(uid) {
    // if uid null, set to cliu id
    let timestamp = dayjs().unix()
    if (currentRecord.value.uid == null) {
      currentRecord.value.uid = uid
    }
    if (currentRecord.value.start_time == null) {
      currentRecord.value.start_time = timestamp
      const { data, error } = await supabase.from('spintimes').insert(currentRecord.value).select()
      currentRecord.value = data[0]
      return true
    } else {
      currentRecord.value.end_time = timestamp
      currentRecord.value.total_runtime_minutes =
        Math.round(((currentRecord.value.end_time - currentRecord.value.start_time) / 60) * 100) /
        100

      const { error } = await supabase
        .from('spintimes')
        .update(currentRecord.value)
        .eq('id', currentRecord.value.id)
      if (error != null) {
        console.error(error)
      } else {
        resetCurrentRecord()
        return false
      }
    }
  }

  function resetCurrentRecord() {
    currentRecord.value = {
      ...newRecord,
    }
  }

  function currentlySpinning() {
    return !(currentRecord.value.start_time == null)
  }

  // async function signUp(username, password) {
  //   const { data, error } = await client.value.auth.signUp({
  //     email: username,
  //     password: password,
  //     options: {
  //       emailRedirectTo: 'https://localhost:5173/verifyEmail',
  //     },
  //   })
  //   if (error === null) {
  //     user.value = data
  //   } else {
  //     // handle error
  //   }
  // }

  return { newRecord, currentRecord, checkRunning, save, resetCurrentRecord, currentlySpinning }
})
