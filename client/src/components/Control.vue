<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
//import { axios } from 'axios
import type { WebSocketMessage } from '../types/bbs'

const props = defineProps<{
  ws: WebSocket | undefined
  socketId: number
}>()

let message = ref<string>('')
onMounted(() => {
  //setupWebSocket();
});

onUnmounted(() => {

});

const sendMessage = () => {
  send(message.value);
  message.value = '';
}

const send = (message: string) => {
  if (props.ws) {
    props.ws.send(message);
  }else{
    console.error('WebSocket is not connected');
  }
}
</script>

<template>
  <div class="control-container">
    <h1 class="text-center">ID: {{ socketId }}</h1>
    <div class="input-container">
      <v-text-field
        v-model="message"
        label="Enter message"
        class="message-input"
      ></v-text-field>
      <v-btn @click="sendMessage" class="send-button">send</v-btn>
    </div>
    <div class="input-container">
      <div class="button-container">
        <v-btn @click="send('OK')" class="send-button">OK</v-btn>
        <v-btn @click="send('NG')" class="send-button">NG</v-btn>
        <v-btn @click="send('？')" class="send-button">？</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.control-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.button-container {
  display: block;
  justify-content: space-evenly;
  margin: 15px;
}

.message-input {
  width: 100%;
}

.send-button {
  min-width: 100px;
  margin: 0 2px;
}
</style>
