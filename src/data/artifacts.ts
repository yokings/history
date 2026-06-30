export interface Artifact {
  id: number;
  name: string;
  era: string;
  unearthed: string;
  material: string;
  summary: string;
  description: string;
  significance: string;
  imageUrl: string;
  tag: 'national-treasure' | 'bronze' | 'jade' | 'pottery';
}

export const artifacts: Artifact[] = [
  {
    id: 1,
    name: '绿松石龙形器',
    era: '二里头文化 距今约3800年',
    unearthed: '2002年二里头遗址VT15M3',
    material: '绿松石、白玉、青铜',
    summary: '"华夏第一龙"，由2000余片绿松石拼嵌而成，中国早期龙形象文物中最精美、体量最大的一件。',
    description: '2002年春出土于二里头遗址3号宫殿基址的贵族墓葬。龙身长64.5厘米，中部最宽处4厘米，由2000余片各种形状的绿松石片组合而成，每片长0.2-0.9厘米，厚约0.1厘米。龙头置于绿松石片粘嵌的梯形托座上，以三节实心半圆形青、白玉柱组成额面中脊和鼻梁，绿松石蒜头状鼻端硕大醒目，眼眶中以圆饼形白玉为睛。龙身由12组菱形图案组成鳞纹，连续分布于全身，龙脊中线两侧饰片倒角处理，形成棱角分明的脊背线条。放置于墓主人骨架之上，头朝西北，尾向东南。龙身中部镶嵌青铜铃铛，与《诗经》"龙旂阳阳，和铃央央"祭祀场景遥相呼应。',
    significance: '证明了早在夏代先民已把龙作为图腾崇拜，学术界普遍认为是华夏龙图腾最直接、最正统的根源，是华夏儿女作为"龙的传人"的最初起源和有力实证。其梭形眼、菱形额饰、波状身躯等特征直接影响了商周青铜器饕餮纹与龙纹，成为华夏龙形象的标准范式。被誉为"华夏第一龙""中华第一龙"。',
    imageUrl: 'https://console.enterprise.trae.cn/api/ide/v1/text_to_image?prompt=Chinese%20national%20treasure%20turquoise%20dragon-shaped%20artifact%20from%20Erlitou%20site%2C%20ancient%20Xia%20dynasty%2C%202000%20turquoise%20pieces%20inlaid%20into%20a%2064.5cm%20long%20dragon%20with%20white%20jade%20eyes%2C%20dark%20museum%20background%20with%20dramatic%20lighting%2C%20bronze%20green%20and%20gold%20tones%2C%20archaeological%20photography%20style&image_size=landscape_4_3',
    tag: 'national-treasure',
  },
  {
    id: 2,
    name: '嵌绿松石兽面纹铜牌饰',
    era: '约公元前1700-前1500年',
    unearthed: '二里头遗址贵族墓葬',
    material: '青铜、绿松石',
    summary: '青铜铸造框架与绿松石镶嵌工艺，单片绿松石厚仅1-2毫米，历经3500年未脱落，将中国青铜镶嵌工艺提前千余年。',
    description: '长约15厘米、宽不足10厘米，采用青铜铸造框架与绿松石镶嵌工艺制成。单片绿松石厚度仅1-2毫米，历经3500年未脱落，工艺之精湛令人叹为观止。兽面纹饰被推测为早期龙形象，与同期出土的绿松石龙形器共同构成夏代阶级分化的物证。作为二里头文化贵族墓葬随葬品，其纹饰关联反映了中原与西北、西南地区的早期文明交流。',
    significance: '将中国青铜镶嵌工艺出现时间提前了1000余年。是商周青铜器兽面纹装饰的先驱，通过纹饰关联反映了中原与西北、西南地区的早期文明交流，是研究夏代礼制与早期文明交流的重要实物。',
    imageUrl: 'https://console.enterprise.trae.cn/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20bronze%20plaque%20inlaid%20with%20turquoise%20animal%20mask%20pattern%20from%20Erlitou%20Xia%20dynasty%2C%2015cm%20wide%2C%20intricate%20turquoise%20inlay%20forming%20taotie%20mask%20design%2C%20dark%20museum%20exhibition%20lighting%2C%20green%20patina%20and%20gold%20turquoise%2C%20archaeological%20treasure&image_size=landscape_4_3',
    tag: 'bronze',
  },
  {
    id: 3,
    name: '青铜爵',
    era: '二里头文化 距今约3700年',
    unearthed: '二里头遗址',
    material: '青铜',
    summary: '二里头文化典型酒器，中国早期青铜礼器代表，标志着青铜礼器时代的开启。',
    description: '二里头出土的青铜爵是目前已知中国最早的青铜礼器之一。器形为典型的饮酒器：前有流（倾酒的槽），后有尾，中部为杯腹，一侧有鋬（把手），下有三足。器壁较薄，铸造工艺已相当成熟。这种青铜爵是夏代贵族礼仪活动的重要礼器，体现了早期国家礼制雏形。二里头遗址出土的多件青铜爵，显示当时已能批量铸造青铜礼器。',
    significance: '标志着中国青铜礼器时代的开启，是研究中国早期青铜铸造技术和礼制形成的关键实物。从陶爵到青铜爵的演变，反映了夏代社会从部落联盟向早期国家的转型。',
    imageUrl: 'https://console.enterprise.trae.cn/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20bronze%20jue%20wine%20vessel%20from%20Erlitou%20Xia%20dynasty%2C%20three-legged%20drinking%20cup%20with%20long%20spout%20and%20handle%2C%20green%20patina%20bronze%2C%20dark%20museum%20background%2C%20dramatic%20side%20lighting%2C%20archaeological%20photography&image_size=landscape_4_3',
    tag: 'bronze',
  },
  {
    id: 4,
    name: '七孔玉刀',
    era: '二里头文化 距今约3700年',
    unearthed: '二里头遗址',
    material: '玉',
    summary: '二里头出土的大型玉礼器，七孔设计独特，是夏代玉器工艺的代表作。',
    description: '大型玉制礼器，刀形器身钻有七个圆孔，故称"七孔玉刀"。玉质温润，工艺精湛，器身修长，刃部锋利但未见实用痕迹，表明其为礼仪用器而非实用工具。七孔的设计可能具有特殊的礼制或象征意义。此刀出土于高等级墓葬，是墓主贵族身份地位的象征。',
    significance: '是研究夏代玉器工艺和礼制的重要实物。大型玉礼器的出现，反映了二里头文化时期社会分化的加剧和礼制的形成，为研究中国早期玉文化提供了关键资料。',
    imageUrl: 'https://console.enterprise.trae.cn/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20jade%20knife%20with%20seven%20holes%20from%20Erlitou%20Xia%20dynasty%2C%20large%20ritual%20jade%20blade%2C%20translucent%20pale%20green%20jade%2C%20museum%20dark%20background%2C%20soft%20museum%20lighting%2C%20archaeological%20treasure%20photography&image_size=landscape_4_3',
    tag: 'jade',
  },
  {
    id: 5,
    name: '陶盉',
    era: '二里头文化 距今约3700年',
    unearthed: '二里头遗址',
    material: '陶土',
    summary: '二里头文化典型陶器，夏代日常礼器与生活用器的代表，反映制陶工艺水平。',
    description: '二里头文化最具代表性的陶器之一。器形为三足封顶盉：顶部封闭，前有管状流，后有鋬，下有三袋足。此种设计既可盛酒又可温酒，是夏代贵族礼仪与日常生活的重要器物。陶盉的形制后来影响了青铜盉的设计。二里头出土的陶盉数量众多，形制规整，反映了当时成熟的制陶工艺和社会礼制。',
    significance: '是研究夏代日常生活与礼制的重要实物。陶盉从生活用器到礼器的演变，体现了二里头文化时期礼制的形成过程，为理解中国早期礼乐文明提供了重要线索。',
    imageUrl: 'https://console.enterprise.trae.cn/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20pottery%20he%20vessel%20from%20Erlitou%20Xia%20dynasty%2C%20three-legged%20 pottery%20wine%20warmer%20with%20spout%20and%20handle%2C%20earthen%20brown%20color%2C%20museum%20dark%20background%2C%20archaeological%20exhibit%20photography&image_size=landscape_4_3',
    tag: 'pottery',
  },
];

export const artifactTagLabels: Record<Artifact['tag'], string> = {
  'national-treasure': '国宝',
  bronze: '青铜',
  jade: '玉器',
  pottery: '陶器',
};
