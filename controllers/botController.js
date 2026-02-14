const Main = require("../models/user");
const Chat = require("../models/chat");

exports.message = async (req, res, next) => {
    try{
        const {userId, text} = req.body;
        console.log("User id in bot controller", userId);
        if(!text?.trim()){
            return res.status(400).json({error: "text cannot be empty"});
        }


//In my pc its giving error to integrate API of Ai chatbot so i trained the model with some data 

        //Data
        const botResponses = {

  // ===== GREETINGS =====
  "hello": "Hi! How can I assist you today?",
  "hi": "Hello! What would you like to talk about?",
  "good morning": "Good morning! Hope you have a productive day ahead.",
  "good evening": "Good evening! How was your day?",
  "good night": "Good night! Sleep well and take care.",
  "bye": "Goodbye! Have a great day.",
  "see you": "See you soon! Take care.",

  // ===== PERSONAL =====
  "how are you": "I'm just a bot, but I'm doing great! What about you?",
  "what is your name": "I am ChatBot, your virtual assistant.",
  "who made you": "I was developed by a talented developer to assist users.",
  "i love you": "That's sweet! I'm always here to help you.",
  "can we become friend": "Of course! Friends help each other grow 😊",
  "thank you": "You're welcome!",
  "thanks": "Happy to help!",
  "what can you do": "I can answer tech questions, help in interviews, general knowledge, and chat with you.",

  // ===== PROGRAMMING =====
  "what is python": "Python is a high-level programming language known for simplicity and used in AI, data science, automation, and web development.",
  "what is java": "Java is an object-oriented programming language famous for 'Write Once, Run Anywhere' using JVM.",
  "what is javascript": "JavaScript is a scripting language used for creating interactive web applications.",
  "what is nodejs": "Node.js allows JavaScript to run on the server using the V8 engine.",
  "what is react": "React is a JavaScript library for building user interfaces, developed by Facebook.",
  "what is mongodb": "MongoDB is a NoSQL database that stores data in JSON-like format.",
  "what is sql": "SQL is used to manage and query relational databases.",
  "what is api": "API stands for Application Programming Interface. It allows communication between software systems.",
  "what is recursion": "Recursion is when a function calls itself until a base condition stops it.",
  "what is oops": "OOPS stands for Object-Oriented Programming System. It includes concepts like inheritance, polymorphism, encapsulation, and abstraction.",
  "what is html": "HTML stands for HyperText Markup Language. It structures web pages.",
  "what is css": "CSS is used to style and design web pages.",
  "difference between frontend and backend": "Frontend handles user interface. Backend manages database, server, and business logic.",

  // ===== DATA STRUCTURES =====
  "what is stack": "Stack is a linear data structure that follows LIFO (Last In First Out).",
  "what is queue": "Queue follows FIFO (First In First Out).",
  "what is linked list": "Linked List is a linear data structure where elements are connected using pointers.",
  "what is array": "Array is a collection of elements stored at contiguous memory locations.",

  // ===== INTERVIEW QUESTIONS =====
  "tell me about yourself": "Start with your background, mention your skills, highlight achievements, and connect with the job role.",
  "why should we hire you": "Focus on your skills, experience, and how you can add value to the company.",
  "what are your strengths": "Mention strengths relevant to the job with examples.",
  "what are your weaknesses": "Mention a real weakness and how you are improving it.",
  "what is leadership": "Leadership is the ability to guide and inspire others to achieve goals.",
  "where do you see yourself in 5 years": "Talk about growth, learning, and contribution to the organization.",

  // ===== GENERAL KNOWLEDGE =====
  "who is prime minister of india": "Narendra Modi is the Prime Minister of India since 2014.",
  "what is g20": "G20 is an international forum of 19 countries and the European Union for global economic cooperation.",
  "who is virat kohli": "Virat Kohli is one of India's greatest cricketers and former captain.",
  "what is ipl": "IPL is the Indian Premier League, a professional T20 cricket league started in 2008.",
  "capital of india": "The capital of India is New Delhi.",
  "largest planet": "Jupiter is the largest planet in our solar system.",
  "fastest animal": "The cheetah is the fastest land animal.",

  // ===== MATH =====
  "2+2": "2 + 2 equals 4.",
  "what is pi": "Pi is approximately 3.14159.",
  "square of 5": "The square of 5 is 25.",
  "10 factorial": "10 factorial is 3,628,800.",

  // ===== MOTIVATION =====
  "motivate me": "Keep pushing forward. Small progress every day leads to big results.",
  "i am sad": "I'm sorry you're feeling sad. Remember, tough times don’t last forever.",
  "i am tired": "Take a short break, relax, and come back stronger.",
  "i failed": "Failure is just a step toward success. Learn from it and move forward.",

  // ===== JOKES =====
  "tell me a joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
  "another joke": "Why did the computer get cold? Because it forgot to close its Windows!",

    // ===== ADVANCED PROGRAMMING =====
  "what is asynchronous programming": "Asynchronous programming allows tasks to run independently without blocking the main thread.",
  "what is multithreading": "Multithreading allows multiple threads to run concurrently within a process.",
  "what is concurrency": "Concurrency is handling multiple tasks at the same time.",
  "what is parallelism": "Parallelism is executing multiple tasks simultaneously using multiple processors.",
  "what is memory leak": "Memory leak occurs when unused memory is not released, causing performance issues.",
  "what is garbage collection": "Garbage collection automatically frees unused memory in programming languages.",
  "what is compiler": "A compiler converts high-level language code into machine code.",
  "what is interpreter": "An interpreter executes code line by line.",
  "difference between compiler and interpreter": "Compiler translates whole program at once. Interpreter translates line by line.",
  "what is dynamic programming": "Dynamic programming is an optimization technique using memoization or tabulation.",
  "what is greedy algorithm": "Greedy algorithm chooses the best option at each step.",
  "what is time complexity": "Time complexity measures how runtime increases with input size.",
  "what is space complexity": "Space complexity measures memory usage of an algorithm.",

  // ===== WEB DEVELOPMENT =====
  "what is responsive design": "Responsive design ensures websites work properly on all screen sizes.",
  "what is rest api": "REST API follows stateless architecture using HTTP methods like GET, POST, PUT, DELETE.",
  "difference between rest and graphql": "REST uses multiple endpoints. GraphQL uses a single endpoint with flexible queries.",
  "what is jwt": "JWT is a token used for secure authentication between client and server.",
  "what is cors": "CORS allows restricted resources on a web page to be requested from another domain.",
  "what is session": "Session stores user data on the server temporarily.",
  "what is cookie": "Cookie is small data stored in browser for tracking user sessions.",

  // ===== NODEJS =====
  "what is express": "Express is a minimal Node.js framework for building web applications.",
  "what is middleware": "Middleware functions execute during request-response cycle.",
  "what is event loop": "Event loop handles asynchronous operations in Node.js.",
  "what is npm": "NPM is Node Package Manager used to install dependencies.",
  "difference between require and import": "Require is CommonJS syntax. Import is ES module syntax.",

  // ===== REACT ADVANCED =====
  "what is virtual dom": "Virtual DOM is a lightweight copy of real DOM for efficient updates.",
  "what is useeffect": "useEffect runs side effects in functional components.",
  "what is usestate": "useState manages state in functional components.",
  "what is props": "Props are inputs passed to React components.",
  "what is context api": "Context API shares global state across components.",
  "what is redux": "Redux is a state management library for JavaScript apps.",
  "what is react router": "React Router handles navigation in React applications.",

  // ===== DATABASE =====
  "what is normalization": "Normalization organizes database to reduce redundancy.",
  "what is indexing": "Indexing improves database query performance.",
  "what is primary key": "Primary key uniquely identifies each record.",
  "what is foreign key": "Foreign key links two tables together.",
  "difference between sql and nosql": "SQL is relational and structured. NoSQL is non-relational and flexible.",
  "what is transaction": "Transaction ensures ACID properties in databases.",

  // ===== SYSTEM DESIGN =====
  "what is load balancing": "Load balancing distributes traffic across multiple servers.",
  "what is caching": "Caching stores frequently accessed data for faster retrieval.",
  "what is microservices": "Microservices architecture breaks app into small independent services.",
  "what is monolith architecture": "Monolith is a single unified application.",
  "what is scalability": "Scalability is ability to handle increasing load.",
  "horizontal vs vertical scaling": "Horizontal adds more machines. Vertical upgrades existing machine.",

  // ===== AI & MACHINE LEARNING =====
  "what is machine learning": "Machine learning allows systems to learn from data without explicit programming.",
  "what is deep learning": "Deep learning uses neural networks with multiple layers.",
  "what is neural network": "Neural network is model inspired by human brain.",
  "what is supervised learning": "Supervised learning uses labeled data.",
  "what is unsupervised learning": "Unsupervised learning finds patterns in unlabeled data.",
  "what is reinforcement learning": "Reinforcement learning learns via rewards and penalties.",
  "what is nlp": "NLP stands for Natural Language Processing.",
  "what is computer vision": "Computer vision enables machines to interpret visual data.",

  // ===== DEVOPS =====
  "what is docker": "Docker is a containerization platform.",
  "what is kubernetes": "Kubernetes manages containerized applications.",
  "what is ci cd": "CI/CD automates testing and deployment process.",
  "what is github actions": "GitHub Actions automates workflows directly in GitHub.",
  "what is deployment": "Deployment makes application live for users.",

  // ===== DAILY ROUTINE =====
  "what is your daily routine": "I start by answering questions, helping users, and learning from conversations all day!",
  "what should i do in morning": "Wake up early, drink water, stretch, and plan your day.",
  "morning routine": "Wake up, hydrate, exercise lightly, and review your goals.",
  "night routine": "Reflect on your day, avoid screens, and sleep on time.",
  "how to start my day": "Start with gratitude, light exercise, and a clear plan.",
  "how to improve my routine": "Set fixed wake-up time, plan tasks, and stay consistent.",
  "how to sleep early": "Avoid screens before bed and maintain a fixed sleep schedule.",
  "how many hours should i sleep": "Adults should aim for 7–8 hours of sleep.",
  "how to wake up early": "Sleep early, set alarms, and keep phone away from bed.",

  // ===== HEALTH & FITNESS =====
  "how to stay healthy": "Eat balanced meals, exercise regularly, and sleep well.",
  "how to lose weight": "Maintain calorie deficit, eat clean, and exercise regularly.",
  "how to gain weight": "Eat calorie surplus with protein and strength training.",
  "how to build muscle": "Lift weights consistently and consume enough protein.",
  "best time to exercise": "Morning or evening, whichever fits your schedule.",
  "how much water should i drink": "About 2-3 liters daily depending on activity level.",
  "how to stay fit at home": "Do bodyweight exercises like pushups, squats, and planks.",
  "how to reduce stress": "Practice meditation, breathing exercises, and physical activity.",
  "i feel tired": "Take a short break, hydrate, and get proper rest.",
  "i have headache": "Rest in a quiet place and stay hydrated.",

  // ===== STUDY & PRODUCTIVITY =====
  "how to study effectively": "Use Pomodoro technique and avoid distractions.",
  "how to concentrate": "Turn off notifications and focus on one task at a time.",
  "how to avoid distraction": "Keep phone away and set clear goals.",
  "how to manage time better": "Prioritize important tasks first.",
  "how to prepare for exams": "Revise daily, solve mock tests, and practice consistently.",
  "how to stay motivated for studies": "Set small goals and reward yourself.",
  "how to build consistency": "Show up daily, even for small progress.",
  "how to stop overthinking": "Focus on action instead of worrying.",
  "how to be productive": "Plan your day and track your tasks.",

  // ===== FOOD & LIFESTYLE =====
  "what should i eat today": "Try a balanced meal with vegetables, protein, and carbs.",
  "healthy breakfast ideas": "Oats, eggs, fruits, and nuts are great options.",
  "healthy lunch ideas": "Rice with dal, vegetables, and salad is good.",
  "healthy dinner ideas": "Light meal like soup, chapati with sabzi.",
  "fast food is bad": "Occasional fast food is okay, but moderation is key.",
  "how to eat clean": "Avoid processed foods and eat fresh ingredients.",
  "benefits of fruits": "Fruits provide vitamins, minerals, and fiber.",
  "benefits of exercise": "Exercise improves mood, health, and energy levels.",

  // ===== EMOTIONS =====
  "i am stressed": "Take deep breaths and focus on one thing at a time.",
  "i feel lonely": "Try talking to friends or engaging in hobbies.",
  "i am bored": "Try learning something new or watching a good movie.",
  "i am happy": "That's wonderful! Keep spreading positivity.",
  "i am angry": "Take a deep breath and calm down before reacting.",
  "i am confused": "Break the problem into smaller parts and think clearly.",
  "i feel anxious": "Slow breathing and grounding techniques can help.",
  "i feel demotivated": "Remember why you started and take small steps.",

  // ===== RELATIONSHIPS =====
  "how to make friends": "Be genuine, listen actively, and show kindness.",
  "how to improve communication": "Speak clearly and listen more.",
  "how to build confidence": "Practice speaking and believe in yourself.",
  "how to handle rejection": "See it as a learning experience.",
  "how to be positive": "Focus on gratitude and small achievements.",
  "how to impress someone": "Be yourself and show confidence.",
  "how to maintain relationship": "Communicate openly and show respect.",

  // ===== HOBBIES & FUN =====
  "suggest hobby": "Try reading, coding, drawing, or learning music.",
  "what can i do in free time": "Learn a new skill or exercise.",
  "recommend movie": "You can watch motivational or comedy movies.",
  "recommend book": "Atomic Habits is a great self-improvement book.",
  "tell me something interesting": "Did you know the human brain has about 86 billion neurons?",
  "fun fact": "Honey never spoils. Archaeologists found edible honey in ancient tombs.",
  "how to relax": "Listen to music or take a short walk.",

  // ===== MONEY & LIFE =====
  "how to save money": "Track expenses and avoid unnecessary spending.",
  "how to invest money": "Start with mutual funds or index funds.",
  "how to become rich": "Build skills, invest wisely, and stay disciplined.",
  "how to grow in life": "Keep learning and improving daily.",
  "how to set goals": "Make them specific, measurable, and realistic.",

  // ===== DAILY CONVERSATION =====
  "what are you doing": "I'm here chatting with you!",
  "are you busy": "Never too busy for you!",
  "do you eat": "No, but I can talk about food all day!",
  "do you sleep": "I stay awake 24/7 to assist you.",
  "are you real": "I'm a virtual assistant powered by code.",
  "can you help me": "Of course! Tell me what you need.",
  "what time is it": "Please check your device clock for exact time.",
  "what day is today": "You can check your calendar for today’s date.",
  "how old are you": "I'm timeless in the digital world!",

    // ===== HEALTH =====
  "how to stay healthy": "Eat balanced meals, exercise regularly, and sleep 7-8 hours daily.",
  "how to boost immunity": "Eat fruits, drink water, exercise, and sleep properly.",
  "how to reduce belly fat": "Maintain calorie deficit and do cardio + strength training.",
  "how to stay active": "Move every hour and include daily physical activity.",
  "how to improve digestion": "Drink warm water and eat fiber-rich foods.",
  "is walking good for health": "Yes, walking daily improves heart health and mood.",
  "how to gain energy": "Eat nutritious food and get proper rest.",
  "how to reduce stress naturally": "Try meditation, breathing exercises, and journaling.",
  "how to stay fit": "Exercise 4-5 times a week and eat clean.",
  "how to improve mental health": "Stay connected with people and take breaks when needed.",
  "why am i tired": "You may need better sleep, hydration, or proper nutrition.",
  "how to fix sleep schedule": "Sleep at same time daily and avoid screens before bed.",
  "benefits of yoga": "Yoga improves flexibility, strength, and mental calmness.",
  "benefits of meditation": "Meditation reduces stress and improves focus.",
  "how to improve posture": "Sit straight and stretch regularly.",
  "how to stop overthinking": "Focus on action instead of worrying about outcomes.",
  "how to increase stamina": "Do regular cardio and eat protein-rich foods.",
  "how to avoid burnout": "Take regular breaks and manage workload properly.",
  "healthy habits": "Drink water, exercise, eat clean, and sleep well.",
  "how to stay positive": "Focus on gratitude and small wins daily.",

  // ===== EMOTIONS =====
  "i am sad": "I'm sorry you're feeling sad. Remember, tough times don't last forever.",
  "i feel depressed": "You are not alone. Talk to someone you trust and seek support.",
  "i feel lonely": "Try connecting with friends or doing something you enjoy.",
  "i am stressed": "Take a deep breath and break your work into smaller tasks.",
  "i am anxious": "Try grounding techniques and focus on the present moment.",
  "i feel angry": "Pause, breathe deeply, and respond calmly.",
  "i feel confused": "Take time to think clearly and list your options.",
  "i am happy": "That's wonderful! Keep spreading positivity.",
  "i feel motivated": "Great! Use this energy to achieve your goals.",
  "i feel tired mentally": "Take a break and relax your mind.",
  "i am overthinking": "Focus on what you can control right now.",
  "i feel insecure": "Believe in your strengths and work on improving daily.",
  "i feel jealous": "Use that feeling as motivation to improve yourself.",
  "i feel guilty": "Learn from mistakes and move forward positively.",
  "i feel nervous": "Practice deep breathing and positive self-talk.",
  "i am bored": "Try learning something new or doing a hobby.",
  "i am frustrated": "Take a short break and return with a fresh mindset.",
  "i feel lost": "Set small goals and take one step at a time.",
  "i feel weak": "Every strong person was once weak. Keep going.",
  "i need motivation": "Small progress every day leads to big results.",

  // ===== WEATHER =====
  "how is the weather": "Please check your local weather app for accurate updates.",
  "is it raining": "You can check your weather forecast for rain updates.",
  "is it hot today": "Stay hydrated if it's hot outside.",
  "is it cold today": "Wear warm clothes if the temperature is low.",
  "weather forecast": "Check your local weather app for detailed forecast.",
  "what is temperature": "Please check your device weather for current temperature.",
  "what to wear in summer": "Wear light cotton clothes and stay hydrated.",
  "what to wear in winter": "Wear warm layers and protect yourself from cold.",
  "what to do in rainy season": "Carry umbrella and avoid waterlogged areas.",
  "what to do in summer": "Stay indoors during peak heat and drink water.",
  "what to do in winter": "Stay warm and eat healthy foods.",
  "why is it so hot": "It may be due to seasonal climate changes.",
  "why is it raining": "Rain happens when water vapor condenses into droplets.",
  "why is weather changing": "Weather changes due to climate patterns and seasons.",
  "best weather for workout": "Cool mornings or evenings are ideal for workouts.",
  "best time to go outside": "Early morning or evening is usually better.",
  "how to stay safe in heat": "Drink water and avoid direct sun exposure.",
  "how to stay safe in cold": "Wear layers and avoid prolonged exposure.",
  "storm safety tips": "Stay indoors and avoid open areas during storms.",
  "humidity effects": "High humidity can make you feel tired and sweaty.",

  // ===== DAILY WELLNESS CONVERSATION =====
  "are you feeling good": "I am always ready to help you feel better!",
  "take care": "Thank you! You take care too.",
  "stay healthy": "Yes! Health is true wealth.",
  "good health tips": "Exercise regularly and maintain balanced diet.",
  "how to feel better": "Talk to someone, relax, and take small positive steps.",
  "mental peace": "Practice gratitude and meditation daily.",
  "self care tips": "Prioritize sleep, hydration, and relaxation.",
  "how to calm down": "Close your eyes and take 5 deep breaths.",
  "how to relax mind": "Listen to music or meditate for 10 minutes.",
  "life advice": "Stay consistent, stay humble, and keep learning.",


  // ===== GIT =====
  "what is git": "Git is a distributed version control system.",
  "what is github": "GitHub is a cloud platform for hosting Git repositories.",
  "what is branch": "Branch is separate line of development in Git.",
  "what is merge": "Merge combines changes from different branches.",
  "what is pull request": "Pull request proposes changes to merge into main branch.",
  "what is rebase": "Rebase moves branch to new base commit.",

  // ===== CYBER SECURITY =====
  "what is encryption": "Encryption converts data into secure format.",
  "what is hashing": "Hashing converts data into fixed-size string.",
  "what is phishing": "Phishing is cyber attack to steal sensitive information.",
  "what is firewall": "Firewall protects network from unauthorized access.",
  "what is two factor authentication": "2FA adds extra layer of security.",

  // ===== NETWORKING =====
  "what is ip address": "IP address identifies a device on network.",
  "what is dns": "DNS converts domain names into IP addresses.",
  "what is http": "HTTP is protocol for transferring web data.",
  "what is https": "HTTPS is secure version of HTTP.",
  "what is tcp": "TCP ensures reliable data transmission.",
  "what is udp": "UDP provides faster but less reliable transmission.",

  // ===== CAREER GUIDANCE =====
  "how to become software engineer": "Learn programming, build projects, practice DSA, and apply for internships.",
  "how to prepare for interviews": "Practice DSA, system design, and mock interviews.",
  "how to improve coding": "Solve daily problems and build real projects.",
  "how to stay productive": "Set goals, avoid distractions, and track progress.",
  "how to get internship": "Apply through LinkedIn, Internshala, cold emails, and referrals.",

  // ===== PRODUCTIVITY =====
  "how to focus": "Remove distractions and use Pomodoro technique.",
  "how to manage time": "Prioritize tasks and plan your day.",
  "how to build discipline": "Start small and stay consistent.",
  "how to avoid procrastination": "Break tasks into smaller steps.",

  // ===== STARTUP & SAAS =====
  "what is saas": "SaaS is Software as a Service delivered via internet.",
  "how to build startup": "Identify problem, build MVP, validate, scale.",
  "what is mvp": "MVP is Minimum Viable Product.",
  "how to monetize app": "Use subscriptions, ads, or premium features.",

  // ===== DEBUGGING =====
  "how to debug code": "Use console logs, breakpoints, and analyze errors.",
  "what is stack trace": "Stack trace shows function calls leading to error.",
  "why code not working": "Check syntax, logic, and error messages carefully.",


  // ===== DEFAULT =====
  "default": "Sorry, I don't understand that yet. Try asking about programming, interviews, sports, or general knowledge."
};

        const normalizeText = text.toLowerCase().trim();

    const botResponse = botResponses[normalizeText] || "Sorry i don't understand that";

        const newChat = new Chat(userId, text, botResponse);
        const save = await newChat.chatSave();

        return res.status(200).json({ //this is my successcode status
            userMessage:text,
            botMessage:botResponse,
        })
    } catch (err) {
        console.log("Error in msg controller:", err);
        return res.status(500).json({error:"Internal Server Error"});
    }

}
