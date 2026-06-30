// 中华历史朝代通用数据类型
// 所有朝代页面共用此 schema，生成器据此创建模板

export type EmperorTag = 'founder' | 'normal' | 'restore' | 'lost' | 'tyrant' | 'reform' | 'golden';

export interface Emperor {
  id: number;
  name: string;
  alias?: string;
  reign: string;
  yearsOnThrone?: number;
  generation?: number;
  era?: string; // 年号（秦汉以后有年号）
  tag: EmperorTag;
  achievements: string;
  evaluation: string;
  textbookPoints?: string[]; // 课本考点
}

export type EventCategory = 'founding' | 'war' | 'reform' | 'prosperity' | 'disaster' | 'fall' | 'culture' | 'diplomacy';

export interface HistoricalEvent {
  id: number;
  title: string;
  time: string;
  icon: string;
  category: EventCategory;
  summary: string;
  details: string;
  impact: string;
  figures: string[];
  textbookPoints?: string[]; // 课本考点
}

export type ArtifactTag = 'national-treasure' | 'bronze' | 'jade' | 'pottery' | 'painting' | 'calligraphy' | 'porcelain' | 'silk' | 'stone' | 'gold-silver';

export interface Artifact {
  id: number;
  name: string;
  era: string;
  unearthed: string;
  material: string;
  summary: string;
  description: string;
  significance: string;
  imageUrl?: string;
  tag: ArtifactTag;
  location?: string; // 现藏地点
  textbookPoints?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  textbookSource?: string; // 课本出处，如"七上第4课"
}

export type TextbookGrade =
  | '七上' | '七下' | '八上' | '八下'
  | '高一上' | '高一下' | '高二上' | '高二下'
  | '小学通用';

export interface TextbookKnowledge {
  grade: TextbookGrade;
  unit: string; // 单元名称
  keyPoints: string[]; // 必背知识点
  examFrequent: string[]; // 高频考点
}

export type DynastyAccent = {
  primary: string; // 主色调 CSS var 名或色值
  secondary: string;
  watermark: string; // 巨型水印字（通常是朝代名）
  subtitle: string; // 副标题/口号
};

export interface DynastyInfo {
  id: string; // URL slug，如 'xia', 'shang', 'zhou'
  name: string; // 朝代名，如 '夏'
  fullName: string; // 全称，如 '夏朝'
  period: string; // 起止，如 '约前2070—前1600'
  duration: string; // 延续年数
  capital: string; // 都城
  founder: string; // 开国君主
  lastRuler: string; // 末代君主
  emperors?: string; // 帝王概况
  summary: string; // 朝代概述
  highlights: string[]; // 朝代亮点
  textbook: TextbookKnowledge[]; // 课本对应
  accent: DynastyAccent;
  stats: { label: string; value: string; unit?: string }[];
  emperors_data?: Emperor[];
  events_data?: HistoricalEvent[];
  artifacts_data?: Artifact[];
  quiz_data?: QuizQuestion[];
}
