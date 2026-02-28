<template>
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <span :class="['inline-block w-1.5 h-8 rounded-full flex-shrink-0', barColor]"></span>
      <h2 :class="['text-2xl md:text-3xl font-bold tracking-tight', titleColor]">
        {{ title }}
      </h2>
    </div>
    <div :class="['h-px w-full', dividerColor]"></div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  accent?: 'blue' | 'indigo' | 'sky' | 'teal' | 'violet'
}>()

const palette = {
  blue:   { bar: 'bg-blue-500',   title: 'text-blue-800',   divider: 'bg-blue-100' },
  indigo: { bar: 'bg-indigo-500', title: 'text-indigo-800', divider: 'bg-indigo-100' },
  sky:    { bar: 'bg-sky-500',    title: 'text-sky-800',    divider: 'bg-sky-100' },
  teal:   { bar: 'bg-teal-500',   title: 'text-teal-800',   divider: 'bg-teal-100' },
  violet: { bar: 'bg-violet-500', title: 'text-violet-800', divider: 'bg-violet-100' },
}

const colors = computed(() => palette[props.accent ?? 'blue'])
const barColor = computed(() => colors.value.bar)
const titleColor = computed(() => colors.value.title)
const dividerColor = computed(() => colors.value.divider)
</script>