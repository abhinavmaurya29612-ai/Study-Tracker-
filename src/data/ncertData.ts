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
    subCategories: ['Physics', 'Chemistry', 'Biology'],
    chapters: [
      // Physics
      { id: 'sci-1', title: 'Describing Motion Around Us', subCategory: 'Physics', status: 'Not Started' },
      { id: 'sci-2', title: 'How Forces Affect Motion', subCategory: 'Physics', status: 'Not Started' },
      { id: 'sci-3', title: 'Work, Energy and Simple Machines', subCategory: 'Physics', status: 'Not Started' },
      { id: 'sci-4', title: 'Sound Waves: Characteristics & Applications', subCategory: 'Physics', status: 'Not Started' },
      // Chemistry
      { id: 'sci-5', title: 'Exploring Mixtures & Their Separation', subCategory: 'Chemistry', status: 'Not Started' },
      { id: 'sci-6', title: 'Journey Inside the Atom', subCategory: 'Chemistry', status: 'Not Started' },
      { id: 'sci-7', title: 'Atomic Foundations of Matter', subCategory: 'Chemistry', status: 'Not Started' },
      // Biology
      { id: 'sci-8', title: 'Cell: The Building Blocks of Life', subCategory: 'Biology', status: 'Not Started' },
      { id: 'sci-9', title: 'Tissues in Action', subCategory: 'Biology', status: 'Not Started' },
      { id: 'sci-10', title: 'Life Processes & Reproduction', subCategory: 'Biology', status: 'Not Started' },
      { id: 'sci-11', title: 'Diversity and Classification', subCategory: 'Biology', status: 'Not Started' }
    ]
  },
  {
    id: 'sst',
    name: 'Social Science',
    title: 'Understanding Society: India & Beyond',
    icon: 'Globe',
    color: '#ef4444', // red
    subCategories: ['General', 'History', 'Geography', 'Political Science', 'Economics'],
    chapters: [
      // General
      { id: 'sst-1', title: 'Chapter 1: Understanding Social Science', subCategory: 'General', status: 'Not Started' },
      // History
      { id: 'sst-2', title: 'Chapter 4: Early Humans and Beginning of Civilization', subCategory: 'History', status: 'Not Started' },
      { id: 'sst-3', title: 'Chapter 5: State and Society up to 1000 CE', subCategory: 'History', status: 'Not Started' },
      // Geography
      { id: 'sst-4', title: "Chapter 2: Shaping of the Earth's Surface", subCategory: 'Geography', status: 'Not Started' },
      { id: 'sst-5', title: 'Chapter 3: Atmosphere and Climate', subCategory: 'Geography', status: 'Not Started' },
      // Political Science (Civics)
      { id: 'sst-6', title: 'Chapter 6: Democracy', subCategory: 'Political Science', status: 'Not Started' },
      { id: 'sst-7', title: 'Chapter 7: Elections', subCategory: 'Political Science', status: 'Not Started' },
      // Economics
      { id: 'sst-8', title: 'Chapter 8: Building Blocks in Economics: The Problem of Choice', subCategory: 'Economics', status: 'Not Started' },
      { id: 'sst-9', title: 'Chapter 9: The Price Puzzle: What Drives the Market', subCategory: 'Economics', status: 'Not Started' }
    ]
  },
  {
    id: 'english',
    name: 'English',
    title: 'Kaveri',
    icon: 'BookOpen',
    color: '#ec4899', // pink
    chapters: [
      { id: 'eng-1', title: 'Chapter 1: How I Taught My Grandmother to Read', status: 'Not Started' },
      { id: 'eng-2', title: 'Chapter 2: The Pot Maker', status: 'Not Started' },
      { id: 'eng-3', title: 'Chapter 3: Winds of Change', status: 'Not Started' },
      { id: 'eng-4', title: 'Chapter 4: Vitamin-M', status: 'Not Started' },
      { id: 'eng-5', title: 'Chapter 5: The World of Limitless Possibilities', status: 'Not Started' },
      { id: 'eng-6', title: 'Chapter 6: Twin Melodies', status: 'Not Started' },
      { id: 'eng-7', title: 'Chapter 7: Carrier of Words', status: 'Not Started' },
      { id: 'eng-8', title: 'Chapter 8: Follow That Dream', status: 'Not Started' }
    ]
  },
  {
    id: 'hindi',
    name: 'Hindi',
    title: 'Ganga',
    icon: 'Feather',
    color: '#f59e0b', // amber
    subCategories: ['गद्य खंड', 'काव्य खंड'],
    chapters: [
      // गद्य खंड
      { id: 'hin-1', title: 'अध्याय 1: दो बैलों की कथा (प्रेमचंद)', subCategory: 'गद्य खंड', status: 'Not Started' },
      { id: 'hin-2', title: 'अध्याय 2: क्या लिखूँ? (पदुमलाल पुन्नालाल बख्शी)', subCategory: 'गद्य खंड', status: 'Not Started' },
      { id: 'hin-3', title: 'अध्याय 3: संवादहीन (शेखर जोशी)', subCategory: 'गद्य खंड', status: 'Not Started' },
      { id: 'hin-4', title: 'अध्याय 4: ऐसी भी बातें होती हैं - लता मंगेशकर से साक्षात्कार (यतींद्र मिश्र)', subCategory: 'गद्य खंड', status: 'Not Started' },
      { id: 'hin-5', title: 'अध्याय 5: आखिरी चट्टान तक (मोहन राकेश)', subCategory: 'गद्य खंड', status: 'Not Started' },
      { id: 'hin-6', title: 'अध्याय 6: रीढ़ की हड्डी (जगदीशचंद्र माथुर)', subCategory: 'गद्य खंड', status: 'Not Started' },
      { id: 'hin-7', title: 'अध्याय 7: मैं और मेरा देश (कन्हैयालाल मिश्र \'प्रभाकर\')', subCategory: 'गद्य खंड', status: 'Not Started' },
      // काव्य खंड
      { id: 'hin-8', title: 'अध्याय 8: पद (रैदास)', subCategory: 'काव्य खंड', status: 'Not Started' },
      { id: 'hin-9', title: 'अध्याय 9: राम-लक्ष्मण-परशुराम संवाद (तुलसीदास)', subCategory: 'काव्य खंड', status: 'Not Started' },
      { id: 'hin-10', title: 'अध्याय 10: भारती, जय, विजयकरे! (सूर्यकांत त्रिपाठी \'निराला\')', subCategory: 'काव्य खंड', status: 'Not Started' },
      { id: 'hin-11', title: 'अध्याय 11: झाँसी की रानी (सुभद्रा कुमारी चौहान)', subCategory: 'काव्य खंड', status: 'Not Started' },
      { id: 'hin-12', title: 'अध्याय 12: घर की याद (भवानीप्रсад मिश्र)', subCategory: 'काव्य खंड', status: 'Not Started' }
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

  // Science
  {
    id: 'q-sci-1',
    subjectId: 'science',
    category: 'Physics',
    question: 'What is the rate of change of distance with respect to time called?',
    options: ['Acceleration', 'Speed', 'Force', 'Work'],
    correctAnswerIndex: 1,
    explanation: 'Speed is defined as the distance traveled per unit time.'
  },
  {
    id: 'q-sci-2',
    subjectId: 'science',
    category: 'Chemistry',
    question: 'Which method is commonly used to separate components of a liquid mixture with different boiling points?',
    options: ['Filtration', 'Distillation', 'Sedimentation', 'Evaporation'],
    correctAnswerIndex: 1,
    explanation: 'Distillation separates liquid components based on differences in boiling points.'
  },
  {
    id: 'q-sci-3',
    subjectId: 'science',
    category: 'Biology',
    question: 'Which organelle is known as the "Powerhouse of the Cell"?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
    correctAnswerIndex: 1,
    explanation: 'Mitochondria generate cellular energy in the form of ATP.'
  },

  // Social Science
  {
    id: 'q-sst-1',
    subjectId: 'sst',
    category: 'History',
    question: 'Which period in human history is associated with the early development of tools and civilization?',
    options: ['Early Humans Era', 'Industrial Revolution', 'Space Age', 'Digital Era'],
    correctAnswerIndex: 0,
    explanation: 'Early Humans and Beginning of Civilization covers early tools and societal foundations.'
  },
  {
    id: 'q-sst-2',
    subjectId: 'sst',
    category: 'Political Science',
    question: 'In a democratic setup, how are representatives chosen by the citizens?',
    options: ['Hereditary succession', 'Elections', 'Nomination by monarch', 'Random draw'],
    correctAnswerIndex: 1,
    explanation: 'Elections are the core democratic mechanism for choosing representatives.'
  },
  {
    id: 'q-sst-3',
    subjectId: 'sst',
    category: 'Economics',
    question: 'What fundamental economic problem arises due to unlimited wants and limited resources?',
    options: ['The Problem of Choice (Scarcity)', 'Inflation', 'Trade Deficit', 'Monopoly'],
    correctAnswerIndex: 0,
    explanation: 'Economics studies how individuals make choices under conditions of resource scarcity.'
  },

  // English
  {
    id: 'q-eng-1',
    subjectId: 'english',
    question: 'In Chapter 1 "How I Taught My Grandmother to Read", who is the author of the story?',
    options: ['Sudha Murty', 'Ruskin Bond', 'R.K. Narayan', 'Sarojini Naidu'],
    correctAnswerIndex: 0,
    explanation: 'Sudha Murty wrote the inspiring story "How I Taught My Grandmother to Read".'
  },

  // Hindi
  {
    id: 'q-hin-1',
    subjectId: 'hindi',
    question: "'दो बैलों की कथा' के मुख्य पात्रों (बैलों) के नाम क्या हैं?",
    options: ['हीरा और मोती', 'राम और श्याम', 'जय और विजय', 'सोना और रूपा'],
    correctAnswerIndex: 0,
    explanation: "प्रेमचंद की कहानी 'दो बैलों की कथा' में दो बैलों के नाम हीरा और मोती हैं।"
  }
];
