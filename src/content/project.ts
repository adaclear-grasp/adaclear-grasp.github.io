export type FigureItem = { title: string; src: string; caption?: string };
export type ContentItem = { title: string; body: string };
export type ResultItem = { label: string; value: string; detail: string };
export type AblationRow = { method: string; success: [number, number, number]; full?: boolean };

export interface ProjectContent {
  title: string;
  summary: string;
  abstract: string;
  highlights: ContentItem[];
  executionSteps: ContentItem[];
  executionProtocol: ContentItem[];
  budgetDetails: string[];
  successCriterion: string;
  benchmarkSummary: string;
  results: ResultItem[];
  ablationRows: AblationRow[];
  ablationSetup: string;
  ablationFinding: string;
  ablationScope: string;
  physicalSummary: string;
  physicalFinding: string;
  geograspSummary: string;
  generalizationProtocol: string;
  generalizationFinding: string;
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
    "In cluttered environments, direct dexterous grasping often fails because of physical interference, visual occlusions, and unstable contacts, while indiscriminate clearing may unnecessarily disturb the scene. Robust manipulation therefore requires coordinating clearing and grasping while adapting to execution failures. We present AdaClearGrasp, a closed-loop execution harness for dexterous grasping in cluttered environments. The harness connects a pretrained vision-language model (VLM) planner to structured atomic skills through the Model Context Protocol (MCP) and returns typed execution feedback to guide subsequent decisions. Given visual observations, language instructions, and execution feedback, the planner selects among clearing, grasping, and recovery skills and revises its strategy after incomplete clearing or execution failure. Target acquisition is performed by GeoGrasp, a geometry-aware reinforcement learning skill based on unit-normalized nearest-point hand-object vectors that generalizes to unseen object geometries in simulation. We also introduce Clutter-Bench, a ManiSkill3 benchmark comprising seven target objects, three clutter levels, and 210 reproducible scenarios. We further evaluate sim-to-real transfer through 90 trials on a physical xArm7-XHand platform. Experiments show that AdaClearGrasp consistently improves grasp success over the evaluated baselines, particularly in dense clutter.",

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

  executionProtocol: [
    {
      title: "40 skill requests",
      body: "Each processed high-level request counts toward the budget, including recovery, failed execution, and validation rejection. Observation updates and low-level control steps do not count.",
    },
    {
      title: "Up to 5 failure-triggered revisions",
      body: "A corrective decision after failure or rejection counts as a revision, even if it repeats the same skill. Routine skill selection after successful execution does not count.",
    },
    {
      title: "Reassess target accessibility",
      body: "A completed clearing motion can leave the target obstructed or disturb its pose. The planner uses the updated scene to select further clearing, grasping, or recovery while GeoGrasp remains fixed.",
    },
  ],

  budgetDetails: [
    "Multiple failure signals from one request count as one outcome. Further clearing after a completed clearing motion does not automatically consume a failure-triggered revision.",
    "The final permitted request is checked for task success before budget termination. After the fifth revision, normal execution may continue within the request budget. A further failure requiring a sixth revision ends the trial.",
    "A trial also ends unsuccessfully if the request budget is exhausted without success, or the target or surrounding objects leave the workspace.",
  ],

  successCriterion:
    "Task success requires the target center-of-mass height to remain above 0.15 m for 2 s without dropping.",

  benchmarkSummary:
    "Clutter-Bench is a reproducible ManiSkill3 benchmark for language-conditioned dexterous grasping. Seven target objects, three clutter levels with 2, 4, and 6 obstacles, and ten layouts per target-level pair yield 210 scenarios. Each scenario is evaluated ten times per method, giving 2,100 trials per method and 700 per clutter level. Stored initial configurations and a shared success criterion support comparisons across methods.",

  results: [
    {
      label: "Simulation success",
      value: "89% / 84% / 76%",
      detail: "Task success with 2, 4, and 6 obstacles, respectively, across 700 trials per clutter level.",
    },
    {
      label: "Real-world transfer",
      value: "70.0%",
      detail: "63 successes in 90 xArm7-XHand trials on seen categories, without grasp-policy fine-tuning.",
    },
    {
      label: "Reproducible scenarios",
      value: "210",
      detail: "Seven target objects and three clutter levels, with ten layouts per target-level pair.",
    },
  ],

  ablationRows: [
    { method: "GeoGrasp (No VLM)", success: [77, 40, 27] },
    { method: "AdaClearGrasp (w/o Replan)", success: [83, 60, 41] },
    { method: "AdaClearGrasp (full)", success: [89, 84, 76], full: true },
  ],

  ablationSetup:
    "All three variants use the same trained GeoGrasp policy. Direct GeoGrasp runs without high-level clearing or coordination. The no-replanning variant retains observation updates, skill selection, and validation after successful requests, but terminates at the first execution failure or validation rejection.",

  ablationFinding:
    "With six obstacles, success rises from 27% with direct grasping to 41% with skill coordination and 76% with the full harness. The gain from enabling failure-triggered replanning grows from 6 percentage points at Level-1 to 35 at Level-3, supporting feedback-driven revision as clutter increases.",

  ablationScope:
    "These results evaluate strategy revision together with additional corrective attempts, without isolating the effect of typed feedback.",

  physicalSummary:
    "The integrated system completes 63 of 90 physical trials across 18 configurations. Success is 90%, 70%, and 50% with 2, 4, and 6 obstacles, respectively. Apple, Orange Cube, and Cup belong to categories seen during GeoGrasp training. The grasping policy transfers from simulation without fine-tuning.",

  physicalFinding:
    "Each target loses 40 percentage points from Level-1 to Level-3. Clearing can also disturb the target itself, as when Cup was knocked over while neighboring objects were moved. These outcomes motivate scene reassessment after interaction and show that the current recovery skills cannot resolve every failure.",

  geograspSummary:
    "GeoGrasp is our trained reinforcement learning skill for target acquisition. It adopts the relative hand-object representation of RobustDexGrasp, using unit-normalized nearest-point vectors to encode local geometry. The policy remains fixed while the harness adapts clearing and recovery around it.",

  generalizationProtocol:
    "We evaluate GeoGrasp independently of clearing and recovery in clutter-free simulation, using 36 fixed position-orientation pairs per object. Cube, Cup, and Apple are training categories. Can, Pear, Ball, and LEGO are the fixed unseen categories.",

  generalizationFinding:
    "Success on the unseen objects is 83.3% for Can, 72.2% for Pear, 61.1% for Ball, and 47.2% for LEGO, averaging approximately 66.0%. These results characterize standalone grasp generalization. The lower success on Ball and LEGO reveals limitations even without surrounding clutter, complementing the harness ablations in cluttered scenes.",

  limitations:
    "Performance depends on VLM decisions and object pose estimates, and recovery cannot resolve every grasp slip or clearing disturbance. Evaluation covers seven targets and up to six obstacles in simulation. Physical trials use categories seen during GeoGrasp training, while generalization to unseen object geometries is assessed separately in simulation.",

  futureWork:
    "Future work will improve state estimation and recovery, evaluate unseen real objects, and extend the execution harness to additional manipulation skills and robotic hands.",

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
