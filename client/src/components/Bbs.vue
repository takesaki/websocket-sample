<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
//import { axios } from 'axios'
import BbsRecord from './BbsRecord.vue'
import type { BbsMessage, WebSocketMessage } from '../types/bbs'

const props = defineProps<{
  records: BbsMessage[]
}>()


onMounted(() => {
  
  //setupWebSocket();
});

onUnmounted(() => {
});
</script>

<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th>
            Author No.
          </th>
          <th>
            Message
          </th>
          <th>
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        <BbsRecord
          v-for="(record, index) in records"
          :type="record.type"
          :author="record.author"
          :date="record.date"
          :message="record.message"
        />
      </tbody>
    </v-table>
  </v-container>

</template>

<style scoped>
  .rotating {
    animation:rotate 1s infinite linear;
  }
  @keyframes rotate {
    0% {transform:rotate(0deg);}
    100% {transform:rotate(360deg);}
  }
</style>