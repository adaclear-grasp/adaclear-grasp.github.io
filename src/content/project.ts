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
    "In densely cluttered environments, due to physical interference, visual occlusions, and unstable contacts, directly performing dexterous grasping on target objects often fails, while aggressive object singulation methods are difficult to guarantee safety in real-world settings. Therefore, enabling robots to adaptively choose between clearing clutter and directly grasping is crucial for achieving safe, robust, and efficient grasping.In this work, we propose AdaClearGrasp, a closed-loop dexterous grasping system based on vision-language models (VLMs) for densely cluttered scenes. AdaClearGrasp leverages a pretrained VLM to jointly interpret visual observations and textual task descriptions to determine whether interfering objects obstruct the target grasp. If interference is detected, the system generates a high-level planning skeleton to execute predefined atomic clearing skills; otherwise, it directly performs grasping to avoid unnecessary interactions and improve efficiency. For dexterous grasping, we train a reinforcement learning policy using the hand–object distance representation, enabling zero-shot dynamic dexterous grasping across diverse object geometries and physical properties. During execution, closed-loop visual feedback is used to monitor task progress, and failures trigger replanning to adapt subsequent actions.To systematically evaluate performance, we introduce \texttt{Clutter-Bench}, the first simulation benchmark for language-conditioned target dexterous grasping with graded clutter complexity. \texttt{Clutter-Bench} includes seven target objects with three clutter levels, yielding 210 task scenarios. We further conduct sim-to-real experiments on three target objects under three clutter levels, covering 18 scenarios. Results show that AdaClearGrasp achieves higher grasp success rates than baseline methods in densely cluttered environments.",

  teaser: {
    title: "Teaser",
    src: "/images/teaser.png",
    caption: "One-sentence teaser.",
  },
  pipeline: {
    title: "Pipeline",
    src: "/images/pipeline.png",
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
