<template>
  <main class="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-16 md:space-y-20">
    <header class="text-center space-y-6">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 text-balance">
        {{ project.title }}
      </h1>
      <p class="text-xl text-gray-600 font-medium">Anonymous Authors</p>
      <p class="max-w-3xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed">
        {{ project.summary }}
      </p>
      <nav aria-label="Page sections" class="flex justify-center flex-wrap gap-x-6 gap-y-3 pt-2 text-sm font-semibold text-sky-800">
        <a href="#overview" class="hover:underline underline-offset-4">Overview</a>
        <a href="#harness" class="hover:underline underline-offset-4">Execution harness</a>
        <a href="#evaluation" class="hover:underline underline-offset-4">Evaluation</a>
        <a href="#demos" class="hover:underline underline-offset-4">Demos</a>
      </nav>
    </header>

    <FigureBlock :title="project.teaser.title" :src="project.teaser.src" :caption="project.teaser.caption" />

    <Section id="overview" title="Overview" accent="teal">
      <div class="grid md:grid-cols-3 gap-5">
        <article v-for="item in project.highlights" :key="item.title" class="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 space-y-3">
          <h3 class="text-lg font-semibold text-gray-900">{{ item.title }}</h3>
          <p class="text-sm md:text-base leading-relaxed text-gray-700">{{ item.body }}</p>
        </article>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 pt-3">Abstract</h3>
      <p class="text-base md:text-lg text-gray-700 leading-relaxed">{{ project.abstract }}</p>
    </Section>

    <Section id="harness" title="Closed-Loop Execution Harness" accent="sky">
      <FigureBlock :title="project.pipeline.title" :src="project.pipeline.src" :caption="project.pipeline.caption" />
      <ol class="grid sm:grid-cols-2 gap-5 pt-3">
        <li v-for="(step, index) in project.executionSteps" :key="step.title" class="flex items-start gap-4 rounded-2xl border border-sky-100 p-5">
          <span class="shrink-0 flex items-center justify-center size-9 rounded-full bg-sky-100 text-sky-800 font-bold">{{ index + 1 }}</span>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ step.title }}</h3>
            <p class="text-sm md:text-base leading-relaxed text-gray-700">{{ step.body }}</p>
          </div>
        </li>
      </ol>
    </Section>

    <Section id="evaluation" title="Clutter-Bench and Evaluation" accent="blue">
      <p class="text-base md:text-lg text-gray-700 leading-relaxed">{{ project.benchmarkSummary }}</p>
      <div class="grid md:grid-cols-3 gap-5">
        <article v-for="result in project.results" :key="result.label" class="rounded-2xl border border-blue-100 bg-blue-50/40 p-5 space-y-3">
          <h3 class="text-sm font-semibold text-blue-800">{{ result.label }}</h3>
          <p class="text-2xl font-bold tracking-tight text-gray-900">{{ result.value }}</p>
          <p class="text-sm leading-relaxed text-gray-700">{{ result.detail }}</p>
        </article>
      </div>
    </Section>

    <Section id="geograsp" title="GeoGrasp: Our Trained Grasping Skill" accent="emerald">
      <p class="text-base md:text-lg text-gray-700 leading-relaxed">{{ project.geograspSummary }}</p>
      <p class="text-sm leading-relaxed text-gray-600">The videos below illustrate grasping across the seven target categories. Apple, Cube, and Cup are training categories. Ball, Can, LEGO, and Pear are unseen categories. These demonstrations are separate from the clutter-free evaluation reported above.</p>
      <Grasp7Videos />
    </Section>

    <Section id="demos" title="Execution Demos" accent="cyan">
      <p class="text-base md:text-lg text-gray-700 leading-relaxed">
        Explore representative clearing, grasping, and recovery sequences with 2, 4, or 6 surrounding obstacles.
        Each replay shows the recorded skill call, planner explanation, and available execution feedback alongside the video.
      </p>
      <Vedios />
    </Section>

    <Section title="Scope and Future Work" accent="slate">
      <p class="text-base md:text-lg text-gray-700 leading-relaxed">{{ project.limitations }}</p>
      <p class="text-base md:text-lg text-gray-700 leading-relaxed">{{ project.futureWork }}</p>
    </Section>

    <footer class="pt-8 text-center text-sm text-gray-500 border-t border-gray-100">
      AdaClearGrasp · Anonymous project page
    </footer>
  </main>
</template>

<script setup lang="ts">
import Section from './components/Section.vue'
import FigureBlock from './components/FigureBlock.vue'
import Vedios from './components/Vedios.vue'
import Grasp7Videos from './components/Grasp7Videos.vue'
import { project } from './content/project'
</script>
