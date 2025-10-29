export type Difficulty = "TEHLIKELI" | "DENGELI" | "RAHAT";

export interface Item {
  name: string;
  why?: string;
}

export interface RunePlan {
  tree: string; // örn: "Resolve"
  keystone?: string; // örn: "Grasp of the Undying"
  minor: string[]; // ["Second Wind", "Overgrowth", ...]
}

export interface MundoMatchup {
  myChampion: "Dr. Mundo";
  enemyChampion: string;

  difficulty: Difficulty;
  difficultyReason?: string; // yeni: "Gwen gerçek true damage vuruyor" gibi mini uyarı
  winrateHint?: number; // istersen %43.5 gibi

  core_items: Item[];
  boots?: string;

  runes_primary: RunePlan;
  runes_secondary?: RunePlan;

  early_plan: string[];
}
