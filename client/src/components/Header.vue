<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>
      {{ msg }}
    </v-app-bar-title>
  </v-app-bar>
</template>

<style lang="scss" scoped>

</style>