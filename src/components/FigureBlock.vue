<!-- FigureBlock.vue -->
<template>
  <figure class="space-y-2">
    <img :src="src" :alt="title" class="w-full rounded-lg" />
  </figure>
</template>

<script setup lang="ts">
defineProps<{ title: string; src: string; caption?: string }>()
</script>
