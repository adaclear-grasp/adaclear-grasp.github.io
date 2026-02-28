<template>
  <div class="space-y-3">
    <div
      v-if="status === 'ok'"
      class="rounded-2xl overflow-hidden bg-gray-900 shadow-md border-2 border-gray-100"
      :style="containerStyle"
    >
      <video
        ref="videoEl"
        :key="src"
        class="w-full h-full object-contain block"
        controls
        preload="metadata"
        playsinline
        @loadedmetadata="onLoadedMeta"
        @timeupdate="onTimeUpdate"
        @seeked="onTimeUpdate"
        @play="onTimeUpdate"
      >
        <source :src="src" type="video/mp4" />
      </video>

    </div>

    <div
      v-else-if="status === 'missing'"
      class="h-48 md:h-44 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50
             flex flex-col items-center justify-center gap-2 text-gray-400"
    >
      <svg class="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 9.75v9A2.25 2.25 0 004.5 18.75z" />
      </svg>
      <span class="text-sm font-medium">Video not available</span>
    </div>

    <div class="rounded-2xl  px-4 py-3">
      <div class="flex items-start gap-2">
        <span class="mt-1 inline-flex items-center px-1 py-0.5 rounded-md
                      text-blue-800 text-xs font-bold uppercase tracking-wide">
          Step {{ currentStep?.step_id ?? '—' }}
        </span>
        <span class="inline-flex items-center px-1 py-0.5 rounded-md
        text-base font-semibold text-gray-900 leading-snug tracking-wide">
          {{ currentStep?.call ?? (timelineStatus === 'missing' ? 'No replay_timeline.jsonl' : '—') }}
        </span>
      </div>
      <div v-if="currentStep?.reason" class="mt-2 text-sm leading-relaxed text-gray-600 pl-1">
        {{ currentStep.reason }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, nextTick } from 'vue'

type TimelineStep = {
  t_video_s?: number
  t_video_ms?: number
  step_id?: number
  call?: string
  reason?: string
  ok?: boolean
  error_code?: string
  message?: string
}

const props = defineProps<{
  src: string
  domain: 'sim' | 'real'
  label: string
  meta: string
}>()


const videoEl = ref<HTMLVideoElement | null>(null)
const vw = ref(16)
const vh = ref(9)

const status = ref<'checking' | 'ok' | 'missing'>('checking')

const timelineStatus = ref<'checking' | 'ok' | 'missing'>('checking')
const steps = ref<TimelineStep[]>([])
const currentStep = ref<TimelineStep | null>(null)
const currentTime = ref(0)
const isReal = computed(() => props.domain === 'real')

function timelineUrlFromVideo(videoUrl: string) {
  return videoUrl.replace(/\/0\.mp4$/i, '/replay_timeline.jsonl')
}

async function checkExists(url: string) {
  status.value = 'checking'
  try {
    const res = await fetch(url, { method: 'HEAD' })
    status.value = res.ok ? 'ok' : 'missing'
  } catch {
    status.value = 'missing'
  }
}

function parseJsonl(text: string): TimelineStep[] {
  const out: TimelineStep[] = []
  const lines = text.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    try {
      const obj = JSON.parse(trimmed) as TimelineStep
      if (typeof obj.t_video_s !== 'number' && typeof obj.t_video_ms === 'number') {
        obj.t_video_s = obj.t_video_ms / 1000
      }
      out.push(obj)
    } catch {
    }
  }
  out.sort((a, b) => (a.t_video_s ?? 0) - (b.t_video_s ?? 0))
  return out
}

async function loadTimeline(videoUrl: string) {
  timelineStatus.value = 'checking'
  steps.value = []
  currentStep.value = null

  const url = timelineUrlFromVideo(videoUrl)
  try {
    const res = await fetch(url)
    if (!res.ok) {
      timelineStatus.value = 'missing'
      return
    }
    const text = await res.text()
    const parsed = parseJsonl(text)
    steps.value = parsed
    timelineStatus.value = parsed.length ? 'ok' : 'missing'
  } catch {
    timelineStatus.value = 'missing'
  }
}

function findCurrentStep(t: number) {
  const arr = steps.value
  if (!arr.length) return null
  let candidate: TimelineStep | null = null
  for (const s of arr) {
    const ts = s.t_video_s ?? 0
    if (ts <= t) candidate = s
    else break
  }
  return candidate
}

function onTimeUpdate() {
  const t = videoEl.value?.currentTime ?? 0
  currentTime.value = t
  currentStep.value = findCurrentStep(t)
}

async function refreshAll(videoUrl: string) {
  await checkExists(videoUrl)
  await loadTimeline(videoUrl)

  if (status.value === 'ok' && videoEl.value) {
    videoEl.value.load()
  }
  onTimeUpdate()
}


const containerStyle = computed(() => ({
  aspectRatio: `${vw.value} / ${vh.value}`, 
  width: '100%',
}))

function onLoadedMeta() {
  const el = videoEl.value
  if (!el) return

  if (el.videoWidth && el.videoHeight) {
    vw.value = el.videoWidth
    vh.value = el.videoHeight
  }

  el.playbackRate = isReal.value ? 0.5 : 1.0

  onTimeUpdate()
}



onMounted(() => {
  refreshAll(props.src)
})

watch(
  () => props.src,
  (next) => {
    refreshAll(next)
  }
)
watch(
  () => props.src,
  () => {
    nextTick(() => {
      if (videoEl.value) {
        videoEl.value.playbackRate = isReal.value ? 0.5 : 1.0
      }
    })
  }
)


</script>
