export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '夏朝是中国历史上第一个什么制的王朝？',
    options: ['禅让制', '世袭制', '封建制', '郡县制'],
    correctIndex: 1,
    explanation: '夏启废除禅让制，确立世袭制，开启"家天下"局面，是中国历史上第一个世袭制王朝。',
  },
  {
    id: 2,
    question: '大禹治水采用的主要方法是什么？',
    options: ['堵截法', '疏导法', '填埋法', '分流法'],
    correctIndex: 1,
    explanation: '禹吸取父鲧"堵"法失败的教训，改用"疏导"之法——高处凿通，低处疏导，使洪水归流入海。',
  },
  {
    id: 3,
    question: '"华夏第一龙"绿松石龙形器出土于哪个遗址？',
    options: ['殷墟', '二里头遗址', '良渚遗址', '红山遗址'],
    correctIndex: 1,
    explanation: '2002年绿松石龙形器出土于河南洛阳偃师二里头遗址，由2000余片绿松石拼嵌而成，被誉为"华夏第一龙"。',
  },
  {
    id: 4,
    question: '夏朝共传多少代多少位君主？',
    options: ['14代17王', '13代16王', '15代18王', '12代15王'],
    correctIndex: 0,
    explanation: '据《史记·夏本纪》和古本《竹书纪年》记载，夏朝自禹至桀共传14代17王，历时约470年。',
  },
  {
    id: 5,
    question: '鸣条之战中击败夏桀、建立商朝的是谁？',
    options: ['商纣', '商汤', '盘庚', '武丁'],
    correctIndex: 1,
    explanation: '约前1600年，商汤在伊尹辅佐下于鸣条之战击败夏桀，夏朝灭亡，商朝建立。',
  },
  {
    id: 6,
    question: '夏朝由乱转治的重要转折点是？',
    options: ['太康失国', '少康中兴', '孔甲乱政', '涂山之会'],
    correctIndex: 1,
    explanation: '少康诛杀寒浞复国，励精图治使夏朝重新走向繁荣，史称"少康中兴"，是夏朝由乱转治的转折点。',
  },
];
