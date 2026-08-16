import type { Subject, QuizQuestion } from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    title: 'Ganita Manjari',
    icon: 'Calculator',
    color: '#3b82f6', // blue
    chapters: [
      { id: 'math-1', title: 'Orienting Yourself: The Use of Coordinates', status: 'Not Started' },
      { id: 'math-2', title: 'Introduction to Linear Polynomials', status: 'Not Started' },
      { id: 'math-3', title: 'The World of Numbers', status: 'Not Started' },
      { id: 'math-4', title: 'Exploring Algebraic Identities', status: 'Not Started' },
      { id: 'math-5', title: "I'm Up and Down and Round and Round", status: 'Not Started' },
      { id: 'math-6', title: 'Measuring Space: Perimeter and Area', status: 'Not Started' },
      { id: 'math-7', title: 'The Mathematics of Maybe: Introduction to Probability', status: 'Not Started' },
      { id: 'math-8', title: 'Predicting What Comes Next: Exploring Sequences and Progressions', status: 'Not Started' }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    title: 'Exploration',
    icon: 'FlaskConical',
    color: '#10b981', // emerald
    subCategories: ['Chemistry', 'Physics', 'Biology'],
    chapters: [
      // Chemistry
      { id: 'sci-1', title: 'Matter in Our Surroundings', subCategory: 'Chemistry', status: 'Not Started' },
      { id: 'sci-2', title: 'Is Matter Around Us Pure?', subCategory: 'Chemistry', status: 'Not Started' },
      { id: 'sci-3', title: 'Atoms and Molecules', subCategory: 'Chemistry', status: 'Not Started' },
      { id: 'sci-4', title: 'Structure of the Atom', subCategory: 'Chemistry', status: 'Not Started' },
      // Physics
      { id: 'sci-5', title: 'Motion', subCategory: 'Physics', status: 'Not Started' },
      { id: 'sci-6', title: 'Force and Laws of Motion', subCategory: 'Physics', status: 'Not Started' },
      { id: 'sci-7', title: 'Gravitation', subCategory: 'Physics', status: 'Not Started' },
      { id: 'sci-8', title: 'Work and Energy', subCategory: 'Physics', status: 'Not Started' },
      { id: 'sci-9', title: 'Sound', subCategory: 'Physics', status: 'Not Started' },
      // Biology
      { id: 'sci-10', title: 'The Fundamental Unit of Life', subCategory: 'Biology', status: 'Not Started' },
      { id: 'sci-11', title: 'Tissues', subCategory: 'Biology', status: 'Not Started' },
      { id: 'sci-12', title: 'Improvement in Food Resources', subCategory: 'Biology', status: 'Not Started' }
    ]
  },
  {
    id: 'english',
    name: 'English',
    title: 'Kaveri',
    icon: 'BookOpen',
    color: '#ec4899', // pink
    subCategories: ['Prose', 'Poetry', 'Supplementary'],
    chapters: [
      // Prose
      { id: 'eng-1', title: 'Prose: The Fun They Had', subCategory: 'Prose', status: 'Not Started' },
      { id: 'eng-2', title: 'Prose: The Sound of Music', subCategory: 'Prose', status: 'Not Started' },
      { id: 'eng-3', title: 'Prose: The Little Girl', subCategory: 'Prose', status: 'Not Started' },
      { id: 'eng-4', title: 'Prose: A Truly Beautiful Mind', subCategory: 'Prose', status: 'Not Started' },
      { id: 'eng-5', title: 'Prose: The Snake and the Mirror', subCategory: 'Prose', status: 'Not Started' },
      { id: 'eng-6', title: 'Prose: My Childhood', subCategory: 'Prose', status: 'Not Started' },
      { id: 'eng-7', title: 'Prose: Reach for the Top', subCategory: 'Prose', status: 'Not Started' },
      { id: 'eng-8', title: 'Prose: Kathmandu', subCategory: 'Prose', status: 'Not Started' },
      { id: 'eng-9', title: 'Prose: If I Were You', subCategory: 'Prose', status: 'Not Started' },
      // Poetry
      { id: 'eng-10', title: 'Poetry: The Road Not Taken (Robert Frost)', subCategory: 'Poetry', status: 'Not Started' },
      { id: 'eng-11', title: 'Poetry: Wind (Subramania Bharati)', subCategory: 'Poetry', status: 'Not Started' },
      { id: 'eng-12', title: 'Poetry: Rain on the Roof (Coates Kinney)', subCategory: 'Poetry', status: 'Not Started' },
      { id: 'eng-13', title: 'Poetry: The Lake Isle of Innisfree (W.B. Yeats)', subCategory: 'Poetry', status: 'Not Started' },
      { id: 'eng-14', title: 'Poetry: A Legend of the Northland (Phoebe Cary)', subCategory: 'Poetry', status: 'Not Started' },
      { id: 'eng-15', title: 'Poetry: No Men Are Foreign (James Kirkup)', subCategory: 'Poetry', status: 'Not Started' },
      { id: 'eng-16', title: 'Poetry: On Killing a Tree (Gieve Patel)', subCategory: 'Poetry', status: 'Not Started' },
      { id: 'eng-17', title: 'Poetry: A Slumber Did My Spirit Seal (William Wordsworth)', subCategory: 'Poetry', status: 'Not Started' },
      // Supplementary Stories
      { id: 'eng-18', title: 'Supplementary: The Lost Child (Mulk Raj Anand)', subCategory: 'Supplementary', status: 'Not Started' },
      { id: 'eng-19', title: 'Supplementary: The Adventures of Toto (Ruskin Bond)', subCategory: 'Supplementary', status: 'Not Started' },
      { id: 'eng-20', title: 'Supplementary: Iswaran the Storyteller (R.K. Laxman)', subCategory: 'Supplementary', status: 'Not Started' },
      { id: 'eng-21', title: 'Supplementary: In the Kingdom of Fools (A.K. Ramanujan)', subCategory: 'Supplementary', status: 'Not Started' },
      { id: 'eng-22', title: 'Supplementary: The Happy Prince (Oscar Wilde)', subCategory: 'Supplementary', status: 'Not Started' },
      { id: 'eng-23', title: 'Supplementary: The Last Leaf (O. Henry)', subCategory: 'Supplementary', status: 'Not Started' },
      { id: 'eng-24', title: 'Supplementary: A House Is Not a Home (Zan Gaudioso)', subCategory: 'Supplementary', status: 'Not Started' },
      { id: 'eng-25', title: 'Supplementary: The Beggar (Anton Chekhov)', subCategory: 'Supplementary', status: 'Not Started' }
    ]
  },
  {
    id: 'hindi',
    name: 'Hindi',
    title: 'Ganga',
    icon: 'Feather',
    color: '#f59e0b', // amber
    subCategories: ['गद्य खंड (Prose)', 'काव्य खंड (Poetry)', 'संचयन (Supplementary)'],
    chapters: [
      // गद्य खंड
      { id: 'hin-1', title: 'गद्य खंड: दो बैलों की कथा (प्रेमचंद)', subCategory: 'गद्य खंड (Prose)', status: 'Not Started' },
      { id: 'hin-2', title: 'गद्य खंड: ल्हासा की ओर (राहुल सांकृत्यायन)', subCategory: 'गद्य खंड (Prose)', status: 'Not Started' },
      { id: 'hin-3', title: 'गद्य खंड: उपभोक्तावाद की संस्कृति (श्यामाचरण दुबे)', subCategory: 'गद्य खंड (Prose)', status: 'Not Started' },
      { id: 'hin-4', title: 'गद्य खंड: सांवले सपनों की याद (जाबिर हुसैन)', subCategory: 'गद्य खंड (Prose)', status: 'Not Started' },
      { id: 'hin-5', title: 'गद्य खंड: प्रेमचंद के फटे जूते (हरिशंकर परसाई)', subCategory: 'गद्य खंड (Prose)', status: 'Not Started' },
      { id: 'hin-6', title: 'गद्य खंड: मेरे बचपन के दिन (महादेवी वर्मा)', subCategory: 'गद्य खंड (Prose)', status: 'Not Started' },
      // काव्य खंड
      { id: 'hin-7', title: 'काव्य खंड: साखियाँ एवं सबद (कबीर)', subCategory: 'काव्य खंड (Poetry)', status: 'Not Started' },
      { id: 'hin-8', title: 'काव्य खंड: वाख (ललद्यद)', subCategory: 'काव्य खंड (Poetry)', status: 'Not Started' },
      { id: 'hin-9', title: 'काव्य खंड: सवैया (रसखान)', subCategory: 'काव्य खंड (Poetry)', status: 'Not Started' },
      { id: 'hin-10', title: 'काव्य खंड: कैदी और कोकिला (माखनलाल चतुर्वेदी)', subCategory: 'काव्य खंड (Poetry)', status: 'Not Started' },
      { id: 'hin-11', title: 'काव्य खंड: ग्राम श्री (सुमित्रानंदन पंत)', subCategory: 'काव्य खंड (Poetry)', status: 'Not Started' },
      { id: 'hin-12', title: 'काव्य खंड: मेघ आए (सर्वेश्वर दयाल सक्सेना)', subCategory: 'काव्य खंड (Poetry)', status: 'Not Started' },
      { id: 'hin-13', title: 'काव्य खंड: बच्चे काम पर जा रहे हैं (राजेश जोशी)', subCategory: 'काव्य खंड (Poetry)', status: 'Not Started' },
      // संचयन
      { id: 'hin-14', title: 'संचयन: गिल्लू (महादेवी वर्मा)', subCategory: 'संचयन (Supplementary)', status: 'Not Started' },
      { id: 'hin-15', title: 'संचयन: स्मृति (श्रीराम शर्मा)', subCategory: 'संचयन (Supplementary)', status: 'Not Started' },
      { id: 'hin-16', title: 'संचयन: कल्लू कुम्हार की उनाकोटी (के. विक्रम सिंह)', subCategory: 'संचयन (Supplementary)', status: 'Not Started' },
      { id: 'hin-17', title: 'संचयन: मेरा छोटा-सा निजी पुस्तकालय (धर्मवीर भारती)', subCategory: 'संचयन (Supplementary)', status: 'Not Started' }
    ]
  },
  {
    id: 'it',
    name: 'Information Technology',
    title: 'IT Code 402',
    code: '402',
    icon: 'Laptop',
    color: '#8b5cf6', // purple
    subCategories: ['Employability Skills', 'Subject Specific Skills'],
    chapters: [
      // Employability Skills
      { id: 'it-1', title: 'Communication Skills - I', subCategory: 'Employability Skills', status: 'Not Started' },
      { id: 'it-2', title: 'Self-Management Skills - I', subCategory: 'Employability Skills', status: 'Not Started' },
      { id: 'it-3', title: 'Basic ICT Skills - I', subCategory: 'Employability Skills', status: 'Not Started' },
      { id: 'it-4', title: 'Entrepreneurial Skills - I', subCategory: 'Employability Skills', status: 'Not Started' },
      { id: 'it-5', title: 'Green Skills - I', subCategory: 'Employability Skills', status: 'Not Started' },
      // Subject Specific Skills
      { id: 'it-6', title: 'Introduction to IT-ITeS Industry', subCategory: 'Subject Specific Skills', status: 'Not Started' },
      { id: 'it-7', title: 'Data Entry & Keyboarding Skills', subCategory: 'Subject Specific Skills', status: 'Not Started' },
      { id: 'it-8', title: 'Digital Documentation', subCategory: 'Subject Specific Skills', status: 'Not Started' },
      { id: 'it-9', title: 'Electronic Spreadsheet', subCategory: 'Subject Specific Skills', status: 'Not Started' },
      { id: 'it-10', title: 'Digital Presentation', subCategory: 'Subject Specific Skills', status: 'Not Started' }
    ]
  },
  {
    id: 'sst',
    name: 'Social Science',
    title: 'Understanding Society: India & Beyond',
    icon: 'Globe',
    color: '#ef4444', // red/rose
    subCategories: ['History', 'Geography', 'Civics', 'Economics'],
    chapters: [
      // History (इतिहास)
      { id: 'sst-1', title: 'History: The French Revolution', subCategory: 'History', status: 'Not Started' },
      { id: 'sst-2', title: 'History: Socialism in Europe and the Russian Revolution', subCategory: 'History', status: 'Not Started' },
      { id: 'sst-3', title: 'History: Nazism and the Rise of Hitler', subCategory: 'History', status: 'Not Started' },
      { id: 'sst-4', title: 'History: Forest Society and Colonialism', subCategory: 'History', status: 'Not Started' },
      { id: 'sst-5', title: 'History: Pastoralists in the Modern World', subCategory: 'History', status: 'Not Started' },
      // Geography (भूगोल)
      { id: 'sst-6', title: 'Geography: India - Size and Location', subCategory: 'Geography', status: 'Not Started' },
      { id: 'sst-7', title: 'Geography: Physical Features of India', subCategory: 'Geography', status: 'Not Started' },
      { id: 'sst-8', title: 'Geography: Drainage Systems and Water Bodies', subCategory: 'Geography', status: 'Not Started' },
      { id: 'sst-9', title: 'Geography: Climate and Monsoons', subCategory: 'Geography', status: 'Not Started' },
      { id: 'sst-10', title: 'Geography: Natural Vegetation and Wildlife', subCategory: 'Geography', status: 'Not Started' },
      { id: 'sst-11', title: 'Geography: Population Dynamics', subCategory: 'Geography', status: 'Not Started' },
      // Civics (राजनीति विज्ञान)
      { id: 'sst-12', title: 'Civics: What is Democracy? Why Democracy?', subCategory: 'Civics', status: 'Not Started' },
      { id: 'sst-13', title: 'Civics: Constitutional Design', subCategory: 'Civics', status: 'Not Started' },
      { id: 'sst-14', title: 'Civics: Electoral Politics', subCategory: 'Civics', status: 'Not Started' },
      { id: 'sst-15', title: 'Civics: Working of Institutions', subCategory: 'Civics', status: 'Not Started' },
      { id: 'sst-16', title: 'Civics: Democratic Rights', subCategory: 'Civics', status: 'Not Started' },
      // Economics (अर्थशास्त्र)
      { id: 'sst-17', title: 'Economics: The Story of Village Palampur', subCategory: 'Economics', status: 'Not Started' },
      { id: 'sst-18', title: 'Economics: People as Resource', subCategory: 'Economics', status: 'Not Started' },
      { id: 'sst-19', title: 'Economics: Poverty as a Challenge', subCategory: 'Economics', status: 'Not Started' },
      { id: 'sst-20', title: 'Economics: Food Security in India', subCategory: 'Economics', status: 'Not Started' }
    ]
  }
];

export const QUIZ_BANK: QuizQuestion[] = [
  // Mathematics
  {
    id: 'q-math-1',
    subjectId: 'math',
    question: 'In the Cartesian coordinate system, what is the point of intersection of the x-axis and y-axis called?',
    options: ['Abscissa', 'Ordinate', 'Origin', 'Quadrant'],
    correctAnswerIndex: 2,
    explanation: 'The point where the x-axis and y-axis intersect is called the Origin (0,0).'
  },
  {
    id: 'q-math-2',
    subjectId: 'math',
    question: 'What is the degree of a linear polynomial in one variable?',
    options: ['0', '1', '2', '3'],
    correctAnswerIndex: 1,
    explanation: 'A linear polynomial is a polynomial of degree 1 (e.g. ax + b).'
  },
  {
    id: 'q-math-3',
    subjectId: 'math',
    question: 'Which algebraic identity equals (a + b)²?',
    options: ['a² - b²', 'a² + 2ab + b²', 'a² - 2ab + b²', 'a³ + b³'],
    correctAnswerIndex: 1,
    explanation: '(a + b)² = a² + 2ab + b².'
  },
  {
    id: 'q-math-4',
    subjectId: 'math',
    question: 'If a coin is flipped, what is the probability of getting a Head?',
    options: ['0', '1/2', '1', '1/4'],
    correctAnswerIndex: 1,
    explanation: 'There are 2 total outcomes (Head, Tail) and 1 favorable outcome (Head), so probability is 1/2.'
  },
  {
    id: 'q-math-5',
    subjectId: 'math',
    question: 'What is the perimeter of a rectangle with length 8 cm and breadth 5 cm?',
    options: ['40 cm', '26 cm', '13 cm', '52 cm'],
    correctAnswerIndex: 1,
    explanation: 'Perimeter = 2 × (length + breadth) = 2 × (8 + 5) = 2 × 13 = 26 cm.'
  },

  // Science - Physics/Chem/Bio
  {
    id: 'q-sci-1',
    subjectId: 'science',
    category: 'Chemistry',
    question: 'Which state of matter has a definite shape and fixed volume?',
    options: ['Gas', 'Liquid', 'Solid', 'Plasma'],
    correctAnswerIndex: 2,
    explanation: 'Solids have fixed shape and definite volume due to strong intermolecular forces.'
  },
  {
    id: 'q-sci-2',
    subjectId: 'science',
    category: 'Physics',
    question: 'What is the SI unit of acceleration?',
    options: ['m/s', 'm/s²', 'N', 'kg·m/s'],
    correctAnswerIndex: 1,
    explanation: 'Acceleration is rate of change of velocity, measured in meters per second squared (m/s²).'
  },
  {
    id: 'q-sci-3',
    subjectId: 'science',
    category: 'Biology',
    question: 'Which organelle is known as the "Powerhouse of the Cell"?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
    correctAnswerIndex: 1,
    explanation: 'Mitochondria generate cellular energy in the form of ATP, hence called the powerhouses.'
  },
  {
    id: 'q-sci-4',
    subjectId: 'science',
    category: 'Physics',
    question: 'Universal Law of Gravitation was formulated by which scientist?',
    options: ['Galileo Galilei', 'Albert Einstein', 'Sir Isaac Newton', 'Niels Bohr'],
    correctAnswerIndex: 2,
    explanation: 'Sir Isaac Newton proposed the Law of Universal Gravitation.'
  },
  {
    id: 'q-sci-5',
    subjectId: 'science',
    category: 'Chemistry',
    question: 'What is the atomic number of Carbon?',
    options: ['6', '12', '8', '14'],
    correctAnswerIndex: 0,
    explanation: 'Carbon has 6 protons, giving it an atomic number of 6.'
  },

  // Social Science
  {
    id: 'q-sst-1',
    subjectId: 'sst',
    category: 'History',
    question: 'In which year did the French Revolution begin with the storming of Bastille?',
    options: ['1776', '1789', '1804', '1815'],
    correctAnswerIndex: 1,
    explanation: 'The French Revolution began on July 14, 1789, with the storming of the Bastille fortress.'
  },
  {
    id: 'q-sst-2',
    subjectId: 'sst',
    category: 'Geography',
    question: 'Which line of latitude divides India into almost two equal parts?',
    options: ['Equator', 'Tropic of Capricorn', 'Tropic of Cancer', 'Arctic Circle'],
    correctAnswerIndex: 2,
    explanation: 'The Tropic of Cancer (23°30\' N) passes almost horizontally through middle of India.'
  },
  {
    id: 'q-sst-3',
    subjectId: 'sst',
    category: 'Civics',
    question: 'What is the supreme law of a country that lays down basic rules for citizens and government?',
    options: ['Preamble', 'Constitution', 'Manifesto', 'Judicial Order'],
    correctAnswerIndex: 1,
    explanation: 'The Constitution is the supreme legal framework governing a nation.'
  },
  {
    id: 'q-sst-4',
    subjectId: 'sst',
    category: 'Economics',
    question: 'What are the main factors of production in Economics?',
    options: ['Land, Labour, Physical Capital, Human Capital', 'Money, Gold, Buildings, Water', 'Raw Material, Electricity, Transport, Sales', 'Profit, Tax, Income, Rent'],
    correctAnswerIndex: 0,
    explanation: 'The 4 fundamental factors of production are Land, Labour, Physical Capital, and Human Capital.'
  },

  // Information Technology
  {
    id: 'q-it-1',
    subjectId: 'it',
    category: 'Employability Skills',
    question: 'Which of the following is an effective verbal communication barrier?',
    options: ['Active listening', 'Clear pronunciation', 'Jargon and complex vocabulary', 'Eye contact'],
    correctAnswerIndex: 2,
    explanation: 'Using heavy jargon or complex vocabulary creates a barrier for clear message understanding.'
  },
  {
    id: 'q-it-2',
    subjectId: 'it',
    category: 'Subject Specific Skills',
    question: 'In Electronic Spreadsheet (LibreOffice Calc / Excel), what symbol must precede every formula?',
    options: ['#', '@', '=', '$'],
    correctAnswerIndex: 2,
    explanation: 'All spreadsheet formulas begin with the equals sign (=).'
  },

  // English
  {
    id: 'q-eng-1',
    subjectId: 'english',
    question: 'In Robert Frost\'s poem "The Road Not Taken", what does the yellow wood symbolize?',
    options: ['A burning forest', 'Autumn and choices in life', 'Spring blossom', 'A dark nightmare'],
    correctAnswerIndex: 1,
    explanation: 'The yellow wood represents autumn of life and the crucial decision points human beings face.'
  },

  // Hindi
  {
    id: 'q-hin-1',
    subjectId: 'hindi',
    question: "'दो बैलों की कथा' कहानी के लेखक कौन हैं?",
    options: ['माखनलाल चतुर्वेदी', 'मुंशी प्रेमचंद', 'सुमित्रानंदन पंत', 'कबीर'],
    correctAnswerIndex: 1,
    explanation: "'दो बैलों की कथा' प्रसिद्ध कहानीकार मुंशी प्रेमचंद द्वारा रचित है।"
  }
];
