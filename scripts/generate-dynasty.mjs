#!/usr/bin/env node
/**
 * 中华历史朝代生成器
 *
 * 用法:
 *   node scripts/generate-dynasty.mjs <朝代ID> <朝代名> [--full-name <全称>]
 *
 * 示例:
 *   node scripts/generate-dynasty.mjs shang 商
 *   node scripts/generate-dynasty.mjs zhou 周 --full-name 周朝
 *   node scripts/generate-dynasty.mjs qin 秦 --full-name 秦朝
 *   node scripts/generate-dynasty.mjs han 汉 --full-name 汉朝
 *   node scripts/generate-dynasty.mjs tang 唐 --full-name 唐朝
 *   node scripts/generate-dynasty.mjs song 宋 --full-name 宋朝
 *   node scripts/generate-dynasty.mjs yuan 元 --full-name 元朝
 *   node scripts/generate-dynasty.mjs ming 明 --full-name 明朝
 *   node scripts/generate-dynasty.mjs qing 清 --full-name 清朝
 *
 * 功能:
 *   1. 在 src/dynasties/ 下生成新朝代数据文件 (含完整 TypeScript 类型)
 *   2. 自动在 src/dynasties/index.ts 中注册新朝代
 *   3. 生成课本考点、帝王、事件、文物、问答的空模板
 *   4. 你只需要填充内容即可
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const dynastiesDir = join(projectRoot, 'src', 'dynasties');
const indexPath = join(dynastiesDir, 'index.ts');

// 解析命令行参数
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('用法: node scripts/generate-dynasty.mjs <朝代ID> <朝代名> [--full-name <全称>]');
  console.error('示例: node scripts/generate-dynasty.mjs shang 商');
  process.exit(1);
}

const id = args[0].toLowerCase();
const name = args[1];
let fullName = name + '朝';

// 解析 --full-name
const fullNameIdx = args.indexOf('--full-name');
if (fullNameIdx !== -1 && args[fullNameIdx + 1]) {
  fullName = args[fullNameIdx + 1];
}

// 朝代主题色预设
const accentPresets = {
  xia: { primary: '#c9a961', secondary: '#3a6b5c', subtitle: '青铜为礼 · 龙腾九州', watermark: name },
  shang: { primary: '#8b6914', secondary: '#4a3520', subtitle: '甲骨卜辞 · 青铜鼎盛', watermark: name },
  zhou: { primary: '#b8860b', secondary: '#556b2f', subtitle: '礼乐文明 · 百家争鸣', watermark: name },
  qin: { primary: '#2d2d2d', secondary: '#8b0000', subtitle: '一统六合 · 千古一帝', watermark: name },
  han: { primary: '#c41e3a', secondary: '#b8860b', subtitle: '汉承秦制 · 丝路通西', watermark: name },
  'three-kingdoms': { primary: '#4682b4', secondary: '#8b4513', subtitle: '群雄逐鹿 · 英雄辈出', watermark: name },
  jin: { primary: '#6b8e23', secondary: '#708090', subtitle: '门阀士族 · 魏晋风度', watermark: name },
  'northern-southern': { primary: '#9370db', secondary: '#2f4f4f', subtitle: '南北对峙 · 民族融合', watermark: name },
  sui: { primary: '#cd853f', secondary: '#483d8b', subtitle: '大运河通 · 科举肇始', watermark: name },
  tang: { primary: '#ffd700', secondary: '#dc143c', subtitle: '贞观开元 · 万国来朝', watermark: name },
  'five-dynasties': { primary: '#696969', secondary: '#8b4513', subtitle: '五代十国 · 战乱频仍', watermark: name },
  song: { primary: '#87ceeb', secondary: '#20b2aa', subtitle: '文治兴盛 · 词赋华章', watermark: name },
  yuan: { primary: '#4169e1', secondary: '#2f4f4f', subtitle: '疆域辽阔 · 横跨欧亚', watermark: name },
  ming: { primary: '#daa520', secondary: '#191970', subtitle: '郑和下西洋 · 长城永固', watermark: name },
  qing: { primary: '#ffd700', secondary: '#8b0000', subtitle: '康乾盛世 · 最后帝国', watermark: name },
};

const accent = accentPresets[id] || {
  primary: '#c9a961',
  secondary: '#3a6b5c',
  subtitle: '中华文明 · 历史长河',
  watermark: name,
};

// 预设数据
const dynastyPresets = {
  shang: {
    period: '约前1600—前1046',
    duration: '约554年',
    capital: '亳、殷（今河南安阳）',
    founder: '商汤',
    lastRuler: '商纣王（帝辛）',
    emperors: '17代31王',
    summary: '商朝是中国历史上第二个王朝，以甲骨文和青铜器闻名。盘庚迁殷后国势复兴，武丁时期达到鼎盛，史称"武丁中兴"。商朝创造了辉煌的青铜文明，甲骨文是中国最早的成熟文字系统。',
    highlights: ['商汤灭夏建商', '盘庚迁殷', '武丁中兴', '甲骨文', '司母戊鼎', '牧野之战商亡'],
    textbookGrade: '七上',
    textbookUnit: '第4课 夏商周的更替 / 第5课 青铜器与甲骨文',
  },
  zhou: {
    period: '约前1046—前256',
    duration: '约790年',
    capital: '镐京（西周）、洛邑（东周）',
    founder: '周武王（姬发）',
    lastRuler: '周赧王',
    emperors: '32代37王',
    summary: '周朝分西周和东周（春秋战国），是中国历史上延续最长的朝代。西周实行分封制和宗法制，奠定了华夏礼乐文明的基础。东周时期百家争鸣，思想文化空前繁荣。',
    highlights: ['武王伐纣·牧野之战', '分封制·宗法制·礼乐制', '烽火戏诸侯', '春秋五霸', '战国七雄', '百家争鸣'],
    textbookGrade: '七上',
    textbookUnit: '第4课 夏商周的更替 / 第6-8课 春秋战国',
  },
  qin: {
    period: '前221—前207',
    duration: '15年',
    capital: '咸阳',
    founder: '秦始皇（嬴政）',
    lastRuler: '秦二世（胡亥）',
    emperors: '2代3帝',
    summary: '秦朝是中国历史上第一个统一的中央集权制封建王朝。秦始皇统一六国，建立皇帝制度，统一文字、货币、度量衡，修筑长城和驰道，奠定了中国两千多年封建政治制度的基础。',
    highlights: ['秦灭六国统一中国', '皇帝制度·三公九卿·郡县制', '统一文字/货币/度量衡', '修筑万里长城', '焚书坑儒', '陈胜吴广起义'],
    textbookGrade: '七上',
    textbookUnit: '第9课 秦统一中国 / 第10课 秦末农民大起义',
  },
  han: {
    period: '前202—220（含西汉、东汉）',
    duration: '约400年',
    capital: '长安（西汉）、洛阳（东汉）',
    founder: '汉高祖刘邦',
    lastRuler: '汉献帝刘协',
    emperors: '29帝',
    summary: '汉朝分西汉和东汉，是中国历史上强盛的大一统王朝。汉武帝时期"罢黜百家，独尊儒术"，开辟丝绸之路，国力达到鼎盛。汉朝是汉族名称的来源，华夏族自此称汉族。',
    highlights: ['楚汉之争·刘邦建汉', '文景之治', '汉武帝大一统', '张骞通西域·丝绸之路', '卫青霍去病北击匈奴', '光武中兴', '黄巾起义'],
    textbookGrade: '七上',
    textbookUnit: '第11-15课 西汉/东汉的兴亡与沟通',
  },
  tang: {
    period: '618—907',
    duration: '289年',
    capital: '长安',
    founder: '唐高祖李渊',
    lastRuler: '唐哀帝李柷',
    emperors: '21帝',
    summary: '唐朝是中国历史上最辉煌的朝代之一，贞观之治、开元盛世将中华文明推向巅峰。长安城是当时世界最大的城市，丝绸之路畅通，万国来朝，诗歌艺术达到极盛。',
    highlights: ['玄武门之变', '贞观之治', '武则天称帝（唯一女皇帝）', '开元盛世', '鉴真东渡·玄奘西行', '安史之乱', '唐诗繁荣'],
    textbookGrade: '七下',
    textbookUnit: '第2-5课 唐朝的建立与繁荣',
  },
  song: {
    period: '960—1279',
    duration: '319年',
    capital: '开封（北宋）、临安（南宋）',
    founder: '宋太祖赵匡胤',
    lastRuler: '宋少帝赵昺',
    emperors: '18帝',
    summary: '宋朝分北宋和南宋，虽军事上积弱，但经济文化空前繁荣，科技发达。活字印刷术、指南针、火药三大发明在宋代成熟应用，宋词成为文学高峰。',
    highlights: ['陈桥兵变·杯酒释兵权', '澶渊之盟', '王安石变法', '靖康之变', '岳飞抗金', '经济重心南移', '四大发明成熟'],
    textbookGrade: '七下',
    textbookUnit: '第6-8课 北宋/南宋的统治与经济',
  },
  yuan: {
    period: '1271—1368',
    duration: '97年',
    capital: '大都（今北京）',
    founder: '元世祖忽必烈',
    lastRuler: '元顺帝妥懽帖睦尔',
    emperors: '11帝',
    summary: '元朝是中国历史上第一个由蒙古族建立的大一统王朝，疆域空前辽阔。行省制度对后世影响深远，马可·波罗来华促进了中西交流，元曲成为新的文学形式。',
    highlights: ['成吉思汗统一蒙古', '忽必烈建元统一全国', '行省制度', '马可·波罗来华', '民族融合·回族形成', '红巾军起义'],
    textbookGrade: '七下',
    textbookUnit: '第10-11课 元朝的统治',
  },
  ming: {
    period: '1368—1644',
    duration: '276年',
    capital: '南京、北京',
    founder: '明太祖朱元璋',
    lastRuler: '明思宗朱由检（崇祯）',
    emperors: '16帝',
    summary: '明朝是最后一个由汉族建立的大一统封建王朝。朱元璋废除丞相制度，皇权空前强化。郑和七下西洋是世界航海史上的壮举，明朝后期资本主义萌芽开始出现。',
    highlights: ['朱元璋建明', '郑和下西洋', '戚继光抗倭', '李时珍《本草纲目》', '明长城与故宫', '李自成起义·明亡'],
    textbookGrade: '七下',
    textbookUnit: '第12-14课 明朝的统治与对外关系',
  },
  qing: {
    period: '1636—1912',
    duration: '276年',
    capital: '北京',
    founder: '清太宗皇太极（入关后首帝顺治）',
    lastRuler: '宣统帝溥仪',
    emperors: '12帝',
    summary: '清朝是中国最后一个封建王朝，由满族建立。康雍乾盛世国力强盛，奠定了现代中国版图。后期闭关锁国，鸦片战争后逐渐沦为半殖民地半封建社会。',
    highlights: ['清军入关', '康乾盛世', '郑成功收复台湾', '雅克萨之战', '闭关锁国政策', '鸦片战争', '辛亥革命·清帝退位'],
    textbookGrade: '七上/八上',
    textbookUnit: '第15-20课 清朝的兴盛与危机',
  },
};

const preset = dynastyPresets[id] || {
  period: '________',
  duration: '____',
  capital: '____',
  founder: '____',
  lastRuler: '____',
  emperors: '____',
  summary: '（请填写朝代概述）',
  highlights: ['（关键事件1）', '（关键事件2）', '（关键事件3）'],
  textbookGrade: '七上',
  textbookUnit: '（请填写对应课本单元）',
};

// 生成朝代数据文件内容
function generateDynastyFile() {
  return `import type { DynastyInfo } from '../types/dynasty';

export const ${camelCase(id)}Dynasty: DynastyInfo = {
  id: '${id}',
  name: '${name}',
  fullName: '${fullName}',
  period: '${preset.period}',
  duration: '${preset.duration}',
  capital: '${preset.capital}',
  founder: '${preset.founder}',
  lastRuler: '${preset.lastRuler}',
  emperors: '${preset.emperors}',
  summary: '${preset.summary}',
  highlights: [
${preset.highlights.map((h) => `    '${h}',`).join('\n')}
  ],
  textbook: [
    {
      grade: '${preset.textbookGrade}',
      unit: '${preset.textbookUnit}',
      keyPoints: [
        '（填写必背知识点1）',
        '（填写必背知识点2）',
        '（填写必背知识点3）',
      ],
      examFrequent: [
        '（填写高频考点1）',
        '（填写高频考点2）',
        '（填写高频考点3）',
      ],
    },
  ],
  accent: {
    primary: '${accent.primary}',
    secondary: '${accent.secondary}',
    watermark: '${accent.watermark}',
    subtitle: '${accent.subtitle}',
  },
  stats: [
    { label: '起止年份', value: '${preset.period}' },
    { label: '延续年数', value: '${preset.duration.replace(/约?(\d+).*/, '$1')}', unit: '年' },
    { label: '开国君主', value: '${preset.founder}' },
    { label: '末代君主', value: '${preset.lastRuler}' },
  ],
  emperors_data: [
    // TODO: 填充帝王世系数据
    // 示例:
    // {
    //   id: 1,
    //   name: '君主名',
    //   reign: '在位时间',
    //   yearsOnThrone: 年数,
    //   generation: 代数,
    //   tag: 'founder', // founder|normal|restore|lost|tyrant|reform|golden
    //   achievements: '主要事迹',
    //   evaluation: '历史评价',
    //   textbookPoints: ['课本考点'],
    // },
  ],
  events_data: [
    // TODO: 填充历史事件数据
    // 示例:
    // {
    //   id: 1,
    //   title: '事件名',
    //   time: '时间',
    //   icon: '字',
    //   category: 'founding', // founding|war|reform|prosperity|disaster|fall|culture|diplomacy
    //   summary: '简述',
    //   details: '详细经过',
    //   impact: '历史影响',
    //   figures: ['相关人物'],
    //   textbookPoints: ['课本考点'],
    // },
  ],
  artifacts_data: [
    // TODO: 填充国宝文物数据
    // 示例:
    // {
    //   id: 1,
    //   name: '文物名',
    //   era: '年代',
    //   unearthed: '出土地',
    //   material: '材质',
    //   summary: '简述',
    //   description: '详细描述',
    //   significance: '历史意义',
    //   imageUrl: '图片URL（可选，留空则显示首字）',
    //   tag: 'bronze', // national-treasure|bronze|jade|pottery|painting|calligraphy|porcelain|silk|stone|gold-silver
    //   location: '现藏地点（可选）',
    //   textbookPoints: ['课本考点'],
    // },
  ],
  quiz_data: [
    // TODO: 填充知识问答题
    // 示例:
    // {
    //   id: 1,
    //   question: '题目？',
    //   options: ['选项甲', '选项乙', '选项丙', '选项丁'],
    //   correctIndex: 0,
    //   explanation: '解析',
    //   difficulty: 'easy', // easy|medium|hard
    //   textbookSource: '七上第X课',
    // },
  ],
};
`;
}

function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// 检查文件是否已存在
const dynastyFilePath = join(dynastiesDir, `${id}.ts`);
if (existsSync(dynastyFilePath)) {
  console.error(`❌ 朝代文件已存在: src/dynasties/${id}.ts`);
  console.error(`   如需重新生成，请先删除该文件。`);
  process.exit(1);
}

// 1. 创建朝代数据文件
writeFileSync(dynastyFilePath, generateDynastyFile(), 'utf-8');
console.log(`✅ 已创建: src/dynasties/${id}.ts`);

// 2. 更新 index.ts 注册新朝代
let indexContent = readFileSync(indexPath, 'utf-8');

// 添加 import（在最后一个 import 后面）
const importLine = `import { ${camelCase(id)}Dynasty } from './${id}';`;
const lastImportRegex = /^import.*from ['"]\.\//;
const importLines = indexContent.split('\n').filter((l) => l.startsWith('import '));
const lastImport = importLines[importLines.length - 1];
if (lastImport && !indexContent.includes(importLine)) {
  indexContent = indexContent.replace(
    lastImport,
    lastImport + '\n' + importLine
  );
}

// 在 dynasties Record 中添加
const recordLine = `  [${camelCase(id)}Dynasty.id]: ${camelCase(id)}Dynasty,`;
if (!indexContent.includes(recordLine)) {
  indexContent = indexContent.replace(
    'export const dynasties: Record<string, DynastyInfo> = {',
    'export const dynasties: Record<string, DynastyInfo> = {\n' + recordLine
  );
}

// 在 dynastyList 中添加
const listLine = `  ${camelCase(id)}Dynasty,`;
if (!indexContent.includes(listLine)) {
  indexContent = indexContent.replace(
    'export const dynastyList: DynastyInfo[] = [',
    'export const dynastyList: DynastyInfo[] = [\n' + listLine
  );
}

writeFileSync(indexPath, indexContent, 'utf-8');
console.log(`✅ 已注册: src/dynasties/index.ts`);

// 3. 完成提示
console.log('\n' + '='.repeat(60));
console.log(`🎉 ${fullName} 朝代模板生成成功！`);
console.log('='.repeat(60));
console.log('\n📝 下一步:');
console.log(`   1. 打开 src/dynasties/${id}.ts`);
console.log(`   2. 填充 emperors_data (帝王世系)`);
console.log(`   3. 填充 events_data (历史事件)`);
console.log(`   4. 填充 artifacts_data (国宝文物)`);
console.log(`   5. 填充 quiz_data (知识问答)`);
console.log(`   6. 完善 textbook 课本考点`);
console.log(`   7. 运行 npm run dev 查看效果`);
console.log('\n💡 提示:');
console.log('   - 可以参考 src/dynasties/xia.ts 的写法');
console.log('   - 字段都是可选的，填多少显示多少');
console.log('   - 文物图片留空会自动显示文物名首字作为占位');
console.log('   - 课本考点标注 📖 会在页面上特别显示');
console.log(`   - 页面访问地址: #/dynasty/${id}`);
console.log('');
