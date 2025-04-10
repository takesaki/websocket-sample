<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue'
import { format, fromUnixTime } from 'date-fns'
import { ja } from 'date-fns/locale'
import type { BbsMessage } from '../types/bbs'

import "animate.css"


const props = defineProps<BbsMessage>()

const formattedDate = ref('')

const formatDate = (timestamp: number) => {
  try {
    const date = fromUnixTime(timestamp / 1000) // UNIX Timeを秒に変換
    //return format(date, 'yyyy年MM月dd日 HH:mm:ss', { locale: ja })
    return date.toLocaleString()
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

watch(() => props.date, (newDate) => {
  formattedDate.value = formatDate(newDate)
}, { immediate: true })

// Load Event
onMounted(() => {
  init();
})

/////////////////
// Methods
/////////////////
const init = () => {
  
}


</script>

<template>
  <tr class="animate__animated animate__fadeIn">
    <td class="text-body-1 font-weight-bold">{{ props.author }}</td>
    <td>
      <span>
        {{props.message ? props.message : ""}}
      </span>
    </td>
    <td class="text-body-1">
      <span>
        {{ formattedDate }}
      </span>
    </td>
  </tr>
</template>


<style lang="scss" scoped>
</style>