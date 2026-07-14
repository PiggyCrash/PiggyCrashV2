const portfolioData = [
  {
    "id": "1",
    "name": "Portfolio Website",
    "categories": ["WebApp"],
    "stacks": ["Three.js"],
    "pictures": [
      "assets/project/piggycrash_home.png",
      "assets/project/piggycrash_gameplay.png"
    ],
    "description": "A high-fidelity holographic portfolio site featuring an interactive 3D Earth wireframe and responsive interactive layouts.",
    "organization": "Portfolio",
    "status": "public",
    "link": "https://github.com/dgashandy/piggycrash"
  },
  {
    "id": "2",
    "name": "Drugs Recommendation System",
    "categories": ["ML/AI", "WebApp"],
    "stacks": ["Scikit-Learn (Sklearn)", "Flask", "Jinja2"],
    "pictures": [
      "assets/project/recommendation_system_dexa.jpg"
    ],
    "description": "An intuitive web application that groups similar patient data through machine learning clustering to provide smarter, automated drug recommendations",
    "organization": "Hackathon",
    "status": "public",
    "link": "https://github.com/PiggyCrash/dexa-analisis"
  },
  {
    "id": "3",
    "name": "sgpgrid",
    "categories": ["WebApp"],
    "stacks": ["Next.js", "React.js", "Node.js", "Express.js", "Typescript", "TypeORM", "PostgreSQL", "Redis", "Docker"],
    "pictures": [
      "assets/project/sgpgrid.png"
    ],
    "description": "The Grid (sgpgrid) is a leading B2B sales intelligence platform that helps businesses uncover over 500,000 verified company profiles and decision-makers across Singapore and Southeast Asia",
    "organization": "QVantage",
    "status": "public",
    "link": "https://sgpgrid.com/"
  },
  {
    "id": "4",
    "name": "Ventry (Visitor Entry System)",
    "categories": ["WebApp"],
    "stacks": [".NET", "Bootstrap", "Microsoft Form", "Node-RED"],
    "pictures": [
      "assets/project/project_template.png"
    ],
    "description": "Digital solution designed to automate and streamline the entire guest registration and check-in process within an organization with only 3 steps, register, qr security check-in, and check-out.",
    "organization": "PT.PCI Elektronik Internasional",
    "status": "private",
    "link": ""
  },
  {
    "id": "5",
    "name": "IMS (Inventory Management System)",
    "categories": ["WebApp", "Data Engineering"],
    "stacks": [".NET", "Bootstrap", "Node-RED"],
    "pictures": [
      "assets/project/project_template.png"
    ],
    "description": "Platform designed to streamline and automate the manufacturing supply chain. The system optimizes factory-to-warehouse operations by combining the features of real-time raw material tracking, automated supply chain logistics, and multi-warehouse storage optimization.",
    "organization": "PT.PCI Elektronik Internasional",
    "status": "private",
    "link": ""
  },
  {
    "id": "6",
    "name": "HRS (Human Resource System)",
    "categories": ["WebApp"],
    "stacks": [".NET", "Bootstrap"],
    "pictures": [
      "assets/project/project_template.png"
    ],
    "description": "A robust Human Resource System built to modernize employee tracking",
    "organization": "PT.PCI Elektronik Internasional",
    "status": "private",
    "link": ""
  },
  {
    "id": "7",
    "name": "SchReminder (Scholarship Reminder System)",
    "categories": ["AIAgent", "Scraper/Crawler", "Data Engineering"],
    "stacks": ["FastAPI", "Cerebras-GPT-OSS-120B", "GithubActions", "Google Sheets API", "BeautifulSoup4"],
    "pictures": [
      "assets/project/schreminder.png"
    ],
    "description": "An automated academic scout agent (based on gpt-oss-120b model) that tracks, crawls, and verifies scholarship application windows in real-time, synchronizes the verified data back to a tracking Google Sheet, and emails styled HTML digest reports to your inbox",
    "organization": "Portfolio",
    "status": "public",
    "link": "https://github.com/PiggyCrash/SchReminder"
  },
  {
    "id": "8",
    "name": "FinTrack (Financial Tracker System)",
    "categories": ["AIAgent", "MobileApp"],
    "stacks": ["ReactNative", "SQLite", "Firebase", "Cerebras-Llama-2-7B"],
    "pictures": [
      "assets/project/fintrack_1.png",
      "assets/project/fintrack_2.png",
      "assets/project/fintrack_3.png"
    ],
    "description": "An automated financial tracking app (based on Cerebras-Llama-2-7B model) that helps users monitor their expenses, set budgets, and analyze their spending patterns.",
    "organization": "Portfolio",
    "status": "public",
    "link": "https://github.com/PiggyCrash/FinTrack"
  },
  {
    "id": "9",
    "name": "PathDFinder (SmartMap AI Agents)",
    "categories": ["AIAgent", "WebApp"],
    "stacks": ["FastAPI", "PostgreSQL", "OpenWebUI", "Cerebras-Llama-2-7B", "Docker"],
    "pictures": [
      "assets/project/pathdfinder_1.png",
      "assets/project/pathdfinder_2.png"
    ],
    "description": "An AI Agents pathfinding application (based on Cerebras-Llama-2-7B model) that helps users find optimal routes and analyze their travel patterns.",
    "organization": "Portfolio",
    "status": "public",
    "link": "https://github.com/PiggyCrash/path_d_finder"
  },
  {
    "id": "10",
    "name": "Excess Break Dashboard",
    "categories": ["Data Engineering", "WebApp"],
    "stacks": ["NET", "Bootstrap", "Node-RED"],
    "pictures": [
      "assets/project/project_template.png"
    ],
    "description": "A data engineering dashboard for monitoring and analyzing excess break data for employees management.",
    "organization": "PT.PCI Elektronik Internasional",
    "status": "private",
    "link": ""
  },
  {
    "id": "11",
    "name": "E-Commerce Shopify",
    "categories": ["WebApp"],
    "stacks": ["Liquid", "Shopify"],
    "pictures": [
      "assets/project/project_template.png"
    ],
    "description": "An e-commerce website built on the Shopify platform.",
    "organization": "Freelance",
    "status": "private",
    "link": ""
  },
  {
    "id": "12",
    "name": "Wound Detection (Image Processing)",
    "categories": ["ML/AI"],
    "stacks": ["OpenCV"],
    "pictures": [
      "assets/project/wound_detection.png"
    ],
    "description": "An image processing application for detecting wounds in medical images.",
    "organization": "Universitas Gadjah Mada",
    "status": "public",
    "link": "https://github.com/PiggyCrash/Digital-Image-Processing/tree/main/Wound%20Detection%20Automation"
  },
  {
    "id": "13",
    "name": "ICSME Trend Modelling",
    "categories": ["ML/AI"],
    "stacks": ["NLTK", "Scikit-Learn (Sklearn)"],
    "pictures": [
      "assets/project/icsme_trend_modelling.png"
    ],
    "description": "A machine learning application for trend modeling in ICSME (International Conference on Software Maintenance and Evolution) data.",
    "organization": "Universitas Gadjah Mada",
    "status": "public",
    "link": "https://github.com/PiggyCrash/ICSME-Tren-Modelling"
  },
  {
    "id": "14",
    "name": "FPY/RTY (First Pass Yield / Return to Yield) Dashboard",
    "categories": ["Data Engineering", "WebApp"],
    "stacks": [".NET", "Bootstrap", "Node-RED", "Azure Data Factory", "PowerBI"],
    "pictures": [
      "assets/project/project_template.png"
    ],
    "description": "A full system from ingesting different pipeline to a standardized format from test machine results, transformed, loaded from a user control dashboard for monitoring and analyzing FPY/RTY (First Pass Yield / Return to Yield) data.",
    "organization": "PT.PCI Elektronik Internasional",
    "status": "private",
    "link": ""
  },
  {
    "id": "15",
    "name": "Simple Group Chat Application",
    "categories": ["DesktopApp"],
    "stacks": ["Java"],
    "pictures": [
      "assets/project/project_template.png"
    ],
    "description": "A simple prototype of group chat application built using Java, allowing multiple users to communicate in real-time within a group chat environment.",
    "organization": "Universitas Gadjah Mada",
    "status": "public",
    "link": "https://github.com/PiggyCrash/Group-Chatting-System"
  },
  {
    "id": "16",
    "name": "ScrapDgital (Web Scraper for Digital Products)",
    "categories": ["AIAgent", "Scraper/Crawler", "WebApp"],
    "stacks": ["React.js", "Tailwind CSS", "Next.js", "Typescript", "Node.js", "PostgreSQL", "PrismaORM", "Puppeteer", "BeautifulSoup4", "Cerebras-Llama-2-7B"],
    "pictures": [
      "assets/project/scrapedgit_1.png",
      "assets/project/scrapedgit_2.png"
    ],
    "description": "An AI-powered search engine for Indonesian e-commerce platforms. Describe what you're looking for in natural language, and we'll find and rank the best products across Tokopedia, Shopee, Lazada, Blibli, and Bukalapak.",
    "organization": "Portfolio",
    "status": "public",
    "link": "https://github.com/dgashandy/ScrapeDgit"
  },
  {
    "id": "17",
    "name": "Comparation of Recommendation System Algorithms (Undergraduate Thesis)",
    "categories": ["ML/AI"],
    "stacks": ["Scikit-Learn (Sklearn)", "Pandas", "Numpy", "Matplotlib"],
    "pictures": [
      "assets/project/undergraduate_thesis.png"
    ],
    "description": "This research aims to enhance the effectiveness of drug sales by proposing a machine learning-based recommendation system. Two proposed algorithms, k-means clustering and k-nearest neighbor (k-NN) classifier, are employed to address the algorithm selection challenge in recommendation system development",
    "organization": "Universitas Gadjah Mada",
    "status": "public",
    "link": "https://etd.repository.ugm.ac.id/penelitian/detail/232899"
  }
];
