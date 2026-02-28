<template>
  <main class="max-w-5xl mx-auto px-6 py-16 space-y-20">
    <header class="text-center space-y-6">

      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 text-balance">
        {{ project.title }}
      </h1>

      <div class="space-y-2">
        <p class="text-xl md:text-2xl text-gray-700 font-medium">
          <template v-for="(author, index) in project.authors" :key="index">
            <a v-if="author.homepage" :href="author.homepage" target="_blank" rel="noopener noreferrer"
              class="hover:underline hover:text-blue-600 transition">
              {{ author.name }}
            </a>
            <span v-else>
              {{ author.name }}
            </span>

            <sup class="ml-0.5 text-[0.65em] align-super text-gray-600">
              <span>{{ author.affIds.join(',') }}</span>
              <span v-if="author.star">*</span>
            </sup>

            <span v-if="index < project.authors.length - 1">, </span>
          </template>
        </p>

        <p class="text-xl text-gray-500">
          <template v-for="(aff, i) in project.affiliations" :key="i">
            <span class="mr-3">
              <sup class="text-[0.75em] align-super">{{ i + 1 }}</sup>
              {{ aff }}
            </span>
          </template>
        </p>

        <p v-if="project.authors.some(a => a.star)" class="text-base text-gray-500">
          * Equal contribution.
        </p>
      </div>

      <div class="flex justify-center gap-3 flex-wrap pt-2">
        <a v-for="l in project.links" :key="l.label" class="px-5 py-2.5 text-base font-semibold rounded-xl border-2 border-blue-200
                 text-blue-700  hover:border-blue-400 transition-all duration-200 shadow-sm" :href="l.href"
          target="_blank" rel="noreferrer">
          {{ l.label }}
        </a>
      </div>
    </header>


    <FigureBlock :title="project.teaser.title" :src="project.teaser.src" :caption="project.teaser.caption" />

    <Section title="Abstract" accent="teal">
      <p class="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
        {{ project.abstract }}
      </p>
    </Section>

    <Section title="Pipeline" accent="blue">
      <FigureBlock :title="project.pipeline.title" :src="project.pipeline.src" :caption="project.pipeline.caption" />
    </Section>

    <Section title="Videos" accent="sky">
      <Vedios />
    </Section>

    <Section title="Citation" accent="violet">
      <pre class="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 text-base overflow-x-auto text-gray-700 leading-relaxed font-mono"
      >{{ project.citationBibtex }}</pre>
    </Section>

    <footer class="pt-8 text-center text-sm text-gray-400 border-t border-gray-100">
      © {{ new Date().getFullYear() }} Project Page
    </footer>
  </main>
</template>

<script setup lang="ts">
import Section from './components/Section.vue'
import FigureBlock from './components/FigureBlock.vue'
import Vedios from './components/Vedios.vue'
import { project } from './content/project'
</script>