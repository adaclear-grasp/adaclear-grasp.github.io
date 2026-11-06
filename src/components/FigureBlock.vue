<!-- FigureBlock.vue -->
<template>
  <figure class="space-y-2">
    <img :src="src" :alt="title" class="w-full rounded-lg" />
    <figcaption v-if="caption" class="text-sm leading-relaxed text-gray-600 pt-2">{{ caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{ title: string; src: string; caption?: string }>()
</script>

