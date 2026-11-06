export type FigureItem = { title: string; src: string; caption?: string };
export type ContentItem = { title: string; body: string };
export type ResultItem = { label: string; value: string; detail: string };

export interface ProjectContent {
  title: string;
  summary: string;
  abstract: string;
  highlights: ContentItem[];
  executionSteps: ContentItem[];
  benchmarkSummary: string;
  results: ResultItem[];
  geograspSummary: string;
  limitations: string;
  futureWork: string;
  teaser: FigureItem;
  pipeline: FigureItem;
  citationBibtex: string;
}

export const project: ProjectContent = {
  title:
    "AdaClearGrasp: A Closed-Loop Execution Harness for Dexterous Grasping in Cluttered Environments",

  summary:
    "AdaClearGrasp coordinates clearing, dexterous grasping, and recovery through vision-language planning, validated skill calls, and execution feedback. The harness adapts the skill sequence while our trained GeoGrasp policy remains fixed.",

  abstract:
    "In cluttered environments, direct dexterous grasping often fails because of physical interference, visual occlusions, and unstable contacts, while indiscriminate clearing may unnecessarily disturb the scene. Robust manipulation therefore requires coordinating clearing and grasping while adapting to execution failures. We present AdaClearGrasp, a closed-loop execution harness for dexterous grasping in cluttered environments. The harness connects a pretrained vision-language model (VLM) planner to structured atomic skills through the Model Context Protocol (MCP) and returns typed execution feedback to guide subsequent decisions. Given visual observations, language instructions, and execution feedback, the planner selects among clearing, grasping, and recovery skills and revises its strategy after incomplete clearing or execution failure. Target acquisition is performed by GeoGrasp, a geometry-aware reinforcement learning skill based on relative hand-object distances that generalizes to unseen object geometries in simulation. We also introduce Clutter-Bench, a ManiSkill3 benchmark comprising seven target objects, three clutter levels, and 210 reproducible scenarios. We further evaluate sim-to-real transfer through 90 trials on a physical xArm7-XHand platform. Experiments show that AdaClearGrasp consistently improves grasp success over the evaluated baselines, particularly in dense clutter.",

  highlights: [
    {
      title: "Closed-loop correction",
      body: "Typed execution outcomes and updated observations guide the planner to revise clearing, grasping, or recovery strategies after incomplete clearing or execution failure.",
    },
    {
      title: "GeoGrasp within the loop",
      body: "GeoGrasp is our trained reinforcement learning skill for target acquisition. It adopts a relative hand-object representation and remains fixed while the harness adapts the surrounding skill sequence.",
    },
    {
      title: "Evaluation across clutter",
      body: "Clutter-Bench provides reproducible evaluation across seven target objects and three clutter levels. We also assess the integrated system through 90 physical trials without grasp-policy fine-tuning.",
    },
  ],

  executionSteps: [
    {
      title: "Select",
      body: "The VLM planner uses the current observation, language instruction, and preceding execution feedback to select a clearing, grasping, or recovery skill.",
    },
    {
      title: "Validate",
      body: "The harness checks the structured request against parameter, workspace, inverse-kinematics, and collision constraints. Invalid or infeasible requests return feedback without executing the requested motion.",
    },
    {
      title: "Execute",
      body: "Validated requests invoke geometric clearing and recovery primitives or our trained GeoGrasp policy through a shared Model Context Protocol interface.",
    },
    {
      title: "Feedback",
      body: "A typed execution status and updated observation inform the next decision. The planner can adjust the interaction direction, switch skills, or reset the arm or hand before continuing.",
    },
  ],

  benchmarkSummary:
    "Clutter-Bench is a reproducible ManiSkill3 benchmark for language-conditioned dexterous grasping. Seven target objects, three clutter levels with 2, 4, and 6 obstacles, and ten layouts per target-level pair yield 210 scenarios. Each scenario is evaluated ten times per method, giving 2,100 trials overall and 700 per clutter level.",

  results: [
    {
      label: "Simulation success",
      value: "89% / 84% / 76%",
      detail: "Task success with 2, 4, and 6 obstacles, respectively, across 700 trials per clutter level.",
    },
    {
      label: "Real-world transfer",
      value: "70.0%",
      detail: "63 successes in 90 trials on the xArm7-XHand platform without grasp-policy fine-tuning.",
    },
    {
      label: "Reproducible scenarios",
      value: "210",
      detail: "Seven target objects and three clutter levels, with ten layouts per target-level pair.",
    },
  ],

  geograspSummary:
    "GeoGrasp is our trained geometry-aware reinforcement learning skill for target acquisition. It adopts relative hand-object distance observations and is evaluated independently of clearing and recovery in clutter-free simulation on three training categories and four unseen categories. Mean success across the four unseen categories is approximately 66.0%.",

  limitations:
    "Performance depends on VLM decisions and object pose estimates, and recovery cannot resolve every grasp slip or clearing disturbance. Evaluation covers seven targets and up to six obstacles in simulation. Physical trials use categories seen during GeoGrasp training, while generalization to unseen object geometries is assessed separately in simulation.",

  futureWork:
    "Future work will improve state estimation, reduce disturbances during clearing, and enrich execution feedback for recovery. We will broaden object and scene diversity, evaluate unseen real objects, and extend the shared interface to additional manipulation skills and robotic hands.",

  teaser: {
    title: "Adaptive clearing and dexterous grasping",
    src: "/images/teaser.webp",
    caption:
      "AdaClearGrasp coordinates clearing, grasping, and recovery through a closed-loop execution harness. VLM-based planning and typed execution feedback enable strategy revision as physical interactions change the scene.",
  },

  pipeline: {
    title: "Closed-loop execution harness",
    src: "/images/pipeline.webp",
    caption:
      "The planner selects a skill from the current observation, language instruction, and execution feedback. The MCP service validates and dispatches the request to a clearing or recovery primitive or the GeoGrasp skill. A typed execution status guides subsequent planning and recovery.",
  },

  citationBibtex: `@misc{adacleargrasp2026,
  title  = {AdaClearGrasp: A Closed-Loop Execution Harness for Dexterous Grasping in Cluttered Environments},
  author = {{Anonymous Authors}},
  year   = {2026},
  note   = {Anonymous manuscript}
}`,
};
