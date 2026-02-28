<template>
  <section class="space-y-5">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="inline-block w-1.5 h-7 rounded-full bg-indigo-500 flex-shrink-0"></span>
        <div>
          <span class="text-xl md:text-2xl font-bold text-gray-900">{{ row.object }}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-sm font-semibold text-gray-500 whitespace-nowrap">clutter count</span>
        <select
          v-model.number="selected"
          class="text-sm font-semibold rounded-xl border-2 border-indigo-200 bg-white
                 px-4 py-2 text-indigo-700 cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                 hover:border-indigo-400 transition-colors duration-150"
        >
          <option v-for="o in obstacleOptions" :key="o" :value="o">{{ o }}</option>
        </select>
      </div>
    </div>

    <div
      class="grid gap-5 md:gap-8"
      :class="row.runs.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
    >
      <div v-for="run in row.runs" :key="run" class="space-y-2">
        <VideoTile
          :domain="row.domain"
          :src="buildSrc(row.domain, row.object, selected, run)"
          :label="`#${run}`"
          :meta="`${selected} obstacles`"
        />
      </div>
    </div>

    <div class="pt-4 border-b-2 border-gray-100"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VideoTile from './VideoTile.vue'
import type { RowSpec, Obstacles } from '../content/videoGrid'
import { OBSTACLE_OPTIONS } from '../content/videoGrid'

const props = defineProps<{
  row: RowSpec
  defaultObstacles?: Obstacles
}>()

const obstacleOptions = OBSTACLE_OPTIONS
const selected = ref<Obstacles>(props.defaultObstacles ?? 2)

watch(
  () => props.defaultObstacles,
  (v) => {
    if (v) selected.value = v
  }
)

const buildSrc = (domain: 'sim' | 'real', object: string, obstacles: Obstacles, run: number) =>
  `/videos/${domain}/${object}/${obstacles}/${run}/0.mp4`
</script>
