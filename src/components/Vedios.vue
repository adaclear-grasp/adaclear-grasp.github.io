<template>
    <div class="space-y-8">
      <VideoRow v-for="r in ROWS" :key="r.domain + ':' + r.object" :row="r" :default-obstacles="globalObstacles" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VideoRow from '../components/VideoRow.vue'
import { ROWS, type Obstacles } from '../content/videoGrid'

const globalObstacles = ref<Obstacles>(2)
</script>
