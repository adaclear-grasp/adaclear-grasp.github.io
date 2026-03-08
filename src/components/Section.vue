<template>
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <!-- 左侧彩色竖条 -->
      <span :class="['inline-block w-1.5 h-8 rounded-full flex-shrink-0', barColor]"></span>
      <h2 :class="['text-2xl md:text-3xl font-bold tracking-tight', titleColor]">
        {{ title }}
      </h2>
    </div>
    <!-- 分隔线 -->
    <div :class="['h-px w-full', dividerColor]"></div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  accent?:
    | 'blue'
    | 'indigo'
    | 'sky'
    | 'teal'
    | 'violet'
    | 'green'
    | 'emerald'
    | 'cyan'
    | 'purple'
    | 'pink'
    | 'rose'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'slate'
}>()

const palette: Record<string, { bar: string; title: string; divider: string }> = {
  // 蓝色系
  blue:    { bar: 'bg-blue-500',    title: 'text-blue-800',    divider: 'bg-blue-100' },
  indigo:  { bar: 'bg-indigo-500',  title: 'text-indigo-800',  divider: 'bg-indigo-100' },
  sky:     { bar: 'bg-sky-500',     title: 'text-sky-800',     divider: 'bg-sky-100' },
  cyan:    { bar: 'bg-cyan-500',    title: 'text-cyan-800',    divider: 'bg-cyan-100' },

  // 绿色系
  teal:    { bar: 'bg-teal-500',    title: 'text-teal-800',    divider: 'bg-teal-100' },
  green:   { bar: 'bg-green-500',   title: 'text-green-800',   divider: 'bg-green-100' },
  emerald: { bar: 'bg-emerald-500', title: 'text-emerald-800', divider: 'bg-emerald-100' },
  lime:    { bar: 'bg-lime-500',    title: 'text-lime-800',    divider: 'bg-lime-100' },

  // 紫/粉色系
  violet:  { bar: 'bg-violet-500',  title: 'text-violet-800',  divider: 'bg-violet-100' },
  purple:  { bar: 'bg-purple-500',  title: 'text-purple-800',  divider: 'bg-purple-100' },
  pink:    { bar: 'bg-pink-500',    title: 'text-pink-800',    divider: 'bg-pink-100' },
  rose:    { bar: 'bg-rose-500',    title: 'text-rose-800',    divider: 'bg-rose-100' },

  // 暖色系
  red:     { bar: 'bg-red-500',     title: 'text-red-800',     divider: 'bg-red-100' },
  orange:  { bar: 'bg-orange-500',  title: 'text-orange-800',  divider: 'bg-orange-100' },
  amber:   { bar: 'bg-amber-500',   title: 'text-amber-800',   divider: 'bg-amber-100' },
  yellow:  { bar: 'bg-yellow-500',  title: 'text-yellow-800',  divider: 'bg-yellow-100' },

  // 中性色
  slate:   { bar: 'bg-slate-500',   title: 'text-slate-800',   divider: 'bg-slate-100' },
}

const colors = computed(() => palette[props.accent ?? 'blue'])
const barColor = computed(() => colors.value.bar)
const titleColor = computed(() => colors.value.title)
const dividerColor = computed(() => colors.value.divider)
</script>