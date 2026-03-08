<template>
  <div class="space-y-8">
    <!-- <div class="flex items-center gap-3">
      <span class="inline-block w-1.5 h-7 rounded-full bg-sky-500 flex-shrink-0"></span>
      <h3 class="text-xl md:text-2xl font-bold text-sky-800">Grasping Results</h3>
    </div> -->

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in items" :key="item" class="space-y-3">
        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center px-3 py-1.5 rounded-full
                   bg-gradient-to-r from-sky-100 to-blue-100
                   text-sky-700 text-base font-bold capitalize tracking-wide shadow-sm"
          >
            {{ item }}
          </span>
        </div>

        <div class="rounded-2xl overflow-hidden bg-gray-900 shadow-md border-2 border-sky-100 hover:border-sky-300 transition-colors duration-200">
          <video
            class="w-full  object-contain block"
            controls
            preload="metadata"
            playsinline
          >
            <source :src="`/videos/grasp7/${item}.mp4`" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ['apple', 'ball', 'can', 'cube', 'lego', 'mug', 'pear']
</script>