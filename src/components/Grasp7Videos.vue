<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <article v-for="item in items" :key="item.file" class="space-y-3">
      <div class="flex flex-wrap items-center gap-2">
        <h3 class="text-base font-semibold text-gray-900">{{ item.label }}</h3>
        <span class="rounded-full px-2 py-1 text-xs font-medium" :class="item.seen ? 'bg-sky-50 text-sky-800' : 'bg-amber-50 text-amber-800'">
          {{ item.seen ? 'Seen' : 'Unseen' }}
        </span>
      </div>
      <div class="rounded-2xl overflow-hidden bg-gray-900 border border-gray-200">
        <video class="w-full object-contain block" controls preload="metadata" playsinline :aria-label="`${item.label} grasping demonstration in simulation`">
          <source :src="`/videos/grasp7/${item.file}.mp4`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const items = [
  { file: 'apple', label: 'Apple', seen: true },
  { file: 'cube', label: 'Cube', seen: true },
  { file: 'mug', label: 'Cup', seen: true },
  { file: 'ball', label: 'Ball', seen: false },
  { file: 'can', label: 'Can', seen: false },
  { file: 'lego', label: 'LEGO', seen: false },
  { file: 'pear', label: 'Pear', seen: false },
]
</script>
