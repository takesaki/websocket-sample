<script setup lang="ts">
import Bbs from '../components/Bbs.vue'
import Control from '../components/Control.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import type { BbsMessage } from '../types/bbs'

const ws = ref<WebSocket>()
const bbsRecords = ref<BbsMessage[]>([]);
const socketId = ref<number>(-1);
// WebSocket event handlers
const setupWebSocket = () => {
  if (ws.value?.readyState === WebSocket.OPEN) return;
  //ws.value = new WebSocket('ws://localhost:8080/ws')
  ws.value = new WebSocket('wss://ws.takenet.dev/ws')
  console.log('Initializing WebSocket:', ws); 

  ws.value.onopen = () => {
    console.log('WebSocket connection established ');
  };

  ws.value.onerror = (error: any) => {
    console.error('WebSocket error:', error);
  };

  ws.value.onmessage = (event) => {
    console.log('WebSocket message received:', event.data);
    try {
        const data = JSON.parse(event.data);
        if(data.type === 'message'){
          bbsRecords.value.push(data); 
        }
        if(data.type === 'connected'){
          console.log('Control message received:', data);
          socketId.value = data.message;
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
  };

  ws.value.onclose = () => {
    console.log('WebSocket connection closed');
    console.log('Reconnecting...'); 
    setupWebSocket();
  };
};

onMounted(() => {
  setupWebSocket();
});

onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
});

</script>

<template>
  <main>
    <Control :ws="ws" :socketId="socketId" />
    <Bbs :records="bbsRecords" />
  </main>
</template>
