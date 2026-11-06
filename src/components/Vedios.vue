<template>
  <div class="space-y-14">
    <section v-for="group in groups" :key="group.domain" class="space-y-8">
      <div class="space-y-2">
        <h3 class="text-2xl font-semibold text-gray-900">{{ group.title }}</h3>
        <p class="text-sm leading-relaxed text-gray-600">{{ group.description }}</p>
      </div>
      <VideoRow
        v-for="row in ROWS.filter(row => row.domain === group.domain)"
        :key="row.domain + ':' + row.object"
        :row="row"
        :default-obstacles="6"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import VideoRow from './VideoRow.vue'
import { ROWS, type Domain } from '../content/videoGrid'

const groups: Array<{ domain: Domain; title: string; description: string }> = [
  {
    domain: 'real',
    title: 'Real-world transfer',
    description: 'xArm7-XHand demonstrations on training categories, with the grasping policy transferred from simulation without fine-tuning. Videos play at half speed for inspection.',
  },
  {
    domain: 'sim',
    title: 'Simulation in clutter',
    description: 'Representative Clutter-Bench executions across seven target objects. Change the obstacle count for each target to explore different clutter levels.',
  },
]
</script>
