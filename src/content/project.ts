export type LinkItem = { label: string; href: string };
export type FigureItem = { title: string; src: string; caption?: string };
export type VideoItem = {
  title: string;
  src: string;
  poster?: string;
  note?: string;
};
export type AuthorItem = {
  name: string
  homepage?: string
  affIds: number[]      
  star?: boolean        
}
export interface ProjectContent {
  title: string;
  authors: AuthorItem[];
  affiliations: string[] 
  links: LinkItem[];
  abstract: string;
  teaser: FigureItem;
  pipeline: FigureItem;
  videos: Array<{
    category: string;
    items: VideoItem[];
  }>;
  protocol: { text: string; pdf?: string; license?: string };
  citationBibtex: string;
}

export const project: ProjectContent = {
  title:
    "AdaClearGrasp: Learning Adaptive Clearing for Zero-Shot Robust Dexterous Grasping in Densely Cluttered Environments",
  authors: [
    { name: 'Author A', homepage: 'https://authorA.com', affIds: [1, 2], star: true },
    { name: 'Author B', affIds: [1] },
    { name: 'Author C', homepage: 'https://authorC.com', affIds: [2] },
  ],
  affiliations: ['Institution A', 'Institution B'],

  links: [
    { label: "Paper", href: "/paper/paper.pdf" },
    { label: "Code", href: "https://github.com/your/repo" },
  ],

  abstract:
    `In densely cluttered environments, physical interference,
visual occlusions, and unstable contacts often cause direct
dexterous grasping to fail, while aggressive singulation
strategies may compromise safety. Enabling robots to
adaptively decide whether to clear surrounding objects or
directly grasp the target is therefore crucial for robust
manipulation. We propose AdaClearGrasp, a closed-loop decision–execution
framework for adaptive clearing and zero-shot dexterous
grasping in densely cluttered environments. The framework
formulates manipulation as a controllable high-level
decision process that determines whether to directly grasp
the target or first clear surrounding objects. A pretrained
vision–language model (VLM) interprets visual observations
and language task descriptions to reason about grasp
interference and generate a high-level planning skeleton,
which invokes structured atomic skills through a unified
action interface. For dexterous grasping, we train a
reinforcement learning policy with a relative hand–object
distance representation, enabling zero-shot generalization
across diverse object geometries and physical properties.
During execution, visual feedback monitors outcomes and
triggers replanning upon failures, forming a closed-loop
correction mechanism. To evaluate language-conditioned dexterous grasping in
clutter, we introduce Clutter-Bench, the first simulation
benchmark with graded clutter complexity. It includes seven
target objects across three clutter levels, yielding 210
task scenarios. We further perform sim-to-real experiments
on three objects under three clutter levels (18 scenarios).
Results demonstrate that AdaClearGrasp significantly
improves grasp success rates in densely cluttered
environments.`,

  teaser: {
    title: "Teaser",
    src: "/images/teaser.webp",
    caption: "One-sentence teaser.",
  },
  pipeline: {
    title: "Pipeline",
    src: "/images/pipeline.webp",
    caption: "pipeline overview.",
  },

  videos: [
    {
      category: "Simulation",
      items: [
        {
          title: "Sim Case 1",
          src: "/videos/sim/sim_case1.mp4",
          note: "Policy A",
        },
        {
          title: "Sim Case 2",
          src: "/videos/sim/sim_case2.mp4",
          note: "Policy B",
        },
      ],
    },
    {
      category: "Real-world",
      items: [
        { title: "Real Demo 1", src: "/videos/real/real_case1.mp4" },
        { title: "Real Demo 2", src: "/videos/real/real_case2.mp4" },
      ],
    },
  ],

  protocol: {
    text: "Released under MIT License. Dataset is for academic use only.",
    pdf: "/paper/paper.pdf",
    license: "MIT",
  },

  citationBibtex: `@inproceedings{adacleargrasp2026,
  title     = {AdaClearGrasp: Learning Adaptive Clearing for Zero-Shot Robust Dexterous Grasping in Densely Cluttered Environments},
  author    = {Anonymous Authors},
  booktitle = {Under Review},
  year      = {2026}
}`,
};
