export const translations = {
  pl: {
    nav: {
      aria: "Nawigacja główna",
      name: "Karolina",
      surname: "Ćwiklińska",
      home: "Home",
      about: "O mnie",
      skills: "Umiejętności",
      projects: "Projekty",
      contact: "Kontakt",
      mobile: "Mobile",
    },

    brand: "Karolina.",

    labels: {
      changeLang: "Zmień język",
      contact: {
        email: "Napisz do mnie",
        github: "GitHub",
        linkedin: "LinkedIn",
        cv: "Pobierz CV",
        discord: "Discord",
      },
    },

    hero: {
      roles: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
      prefix: "Cześć, jestem",
      name: "Karolina Ćwiklińska",
      lead: "Łączę kreatywność i dbałość o detal. Projektuję rozwiązania od estetycznego interfejsu po stabilny backend, zawsze z myślą o użytkownikach.",
    },

    about: {
      title: "Fullstack Developer",
      body: "Tworzę kompletne aplikacje – od intuicyjnego frontendu, przez stabilny backend, aż po zarządzanie bazami danych. Łączę technologię z praktycznym podejściem do rozwiązywania problemów. Doświadczenie zdobyte w różnych branżach rozwinęło u mnie umiejętności organizacyjne, pracy zespołowej i współpracy z klientem. Obecnie koncentruję się na tworzeniu aplikacji webowych i rozwijaniu kompetencji w obszarze sztucznej inteligencji.",
      location: "Szczecin / Zdalnie",
      availability: "Elastyczna dostępność czasowa",
      langs: "Polski (ojczysty), Angielski (B2)",
      education: "Informatyka IV rok, Uniwerystet Vizja",
      spec_1: "Web Dev",
      spec_2: "AI & Data Science",
      education_old: "Licencjat z fizjoterapii, 2015, WSEiT Szczecin",
    },

    hobbyCard: {
      firstWord: "Poza",
      words: ["kodem", "nauką", "pracą"],
      description:
        "Muzyka w słuchawkach, odkrywanie nowych miejsc, wciągające gry, mecze z przyjaciółmi\
       i kulinarne eksperymenty, czyli balans między pracą a codziennością.",
    },

    timeline: [
      {
        year: "2024 – obecnie",
        title: "Freelancer – Full Stack Developer",
        where: "",
        desc: "Realizacja projektów indywidualnych: tworzenie nowoczesnych stron i aplikacji webowych w \
        Next.js i Tailwind, rozwój dedykowanych rozwiązań w oparciu o PHP/MySQL, wdrażanie usług chmurowych w \
        Microsoft Azure oraz budowa dynamicznych narzędzi interaktywnych w React.",
      },
      {
        year: "II 2024 – VIII 2024",
        title: "Junior Full Stack Developer (staż)",
        where: "IT Serwis sp. z o.o.",
        desc: "Współtworzenie aplikacji webowych: implementacja interfejsu użytkownika w React, rozwój \
        warstwy backendowej w Java/Spring Boot, projektowanie i integracja REST API, obsługa baz danych MySQL \
        oraz przygotowywanie testów jednostkowych (JUnit).",
      },
      {
        year: "2019 – obecnie",
        title: "Event Manager",
        where: "KMC Events Karolina Ćwiklińska",
        desc: "Organizacja wydarzeń, przygotowanie ofert, kontakt z klientami, zarządzanie finansami.",
      },
      {
        year: "2014 – 2024",
        title: "Koordynator",
        where: "Szczecińska Gubałówka sp. z o.o.",
        desc: "Koordynacja obiektu sportowego, zarządzanie zespołem i obsługą klienta.",
      },
    ],

    skills: {
      titleStart: "Stack",
      titleHighlight: "technologiczny",
      languages: "Języki programowania",
      frontend: "Frontend",
      backend: "Backend i bazy danych",
      tools: "Narzędzia i chmura",
      cms: "Zarządzanie i konfiguracja CMS",
    },
    projects: {
      title: "Projekty",
      desktopView: "Widok desktop",
      mobileView: "Widok mobile",
      demo: "Odwiedź stronę",
      code: "Kod",
      empty: "Brak podglądu",
      emptyDesktop: "Brak podglądu desktop",
      emptyMobile: "Brak podglądu mobile",
      prev: "Poprzedni projekt",
      next: "Następny projekt",
      prev_screen: "Poprzedni screen",
      next_screen: "Następny screen",
      showProject: "Pokaż projekt",
      showScreen: "Pokaż screen",
      projectTitle: "Tytuł projektu",
      items: [
        {
          title: "System zarządzania obsługą hangarową",
          description:
            "Aplikacja webowa do zarządzania operacjami w hangarze linii lotniczej: logowanie i autoryzacja użytkowników, rejestracja samolotów, zarządzanie zadaniami serwisowymi oraz organizacjami. \
            \n\nDostępne widoki i opcje zmieniają się w zależności od roli użytkownika (administrator, mechanik, pilot).",
          tech: [
            "Java 17",
            "Spring Boot",
            "Lombok",
            "H2",
            "REST API",
            "React.js",
            "Bootstrap",
          ],
          repo: "https://github.com/karoq18/HangarOps",
          screens: [
            "projects/hangar/hangar-2.webp",
            "projects/hangar/hangar-1.webp",
            "projects/hangar/hangar-3.webp",
            "projects/hangar/hangar-4.webp",
            "projects/hangar/hangar-5.webp",
            "projects/hangar/hangar-6.webp",
            "projects/hangar/hangar-7.webp",
            "projects/hangar/hangar-8.webp",
            "projects/hangar/hangar-9.webp",
            "projects/hangar/hangar-10.webp",
          ],
          desktopImg: "",
          mobileImg: "",
        },
        {
          title: "Portfolio",
          description:
            "Oficjalnie: portfolio. Nieoficjalnie: wieczny plac budowy.\n\nWciąż brakuje przycisku: ZRÓB MI KAWĘ ☕.",
          tech: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "Lenis",
            "React Three Fiber",
          ],
          repo: "https://github.com/karoq18/portfolio",
          live: "https://www.kcwiklinska.pl",
          screens: ["projects/portfolio/portfolio-1.webp"],
        },
        {
          title: "Forum RPG",
          description:
            "Forum RPG oparte na silniku MyBB, w pełni dostosowane do specyficznych wymagań projektu. Cały layout oraz zestaw autorskich pluginów zostały zaprojektowane i wdrożone na potrzeby gry fabularnej. \
            \n\nRozszerzenia forum integrują się z bazą danych i zapewniają szereg dedykowanych funkcji, m.in. system kart postaci, panel administracyjny do zarządzania statystykami i logami, mechanikę rzutów kością, drabinki turniejowe oraz rozbudowane sidebary wspierające nawigację i prezentację danych.",
          tech: ["PHP", "MySQL", "JavaScript", "jQuery", "MyBB"],
          repo: "https://github.com/karoq18/customplugins",
          live: "https://www.serpens.addhost.pl",
          screens: [
            "projects/serpens/serpens-1.webp",
            "projects/serpens/serpens-2.webp",
            "projects/serpens/serpens-3.webp",
            "projects/serpens/serpens-4.webp",
            "projects/serpens/serpens-5.webp",
          ],
        },
        {
          title: 'Gabinet "Emocja"',
          description:
            "Jednostronicowa strona gabinetu zbudowana w Next.js. Zawiera animowane elementy, responsywny układ i przejrzystą typografię, a także formularz kontaktowy działający bez własnego backendu.",
          tech: ["Next.js", "App Router", "Tailwind CSS", "GSAP"],
          screens: ["projects/emocja/emocja-1.webp"],
          live: "https://psychoterapia-emocja.pl/",
          desktopImg: "",
          mobileImg: "",
        },
        {
          title: "Generator karty postaci",
          description:
            "Aplikacja webowa do tworzenia kart postaci dla forum. Zawiera dynamiczne formularze oparte na konfiguracji (characterConfig) - różne typy postaci, pełną walidację pod zasady mechaniki, kontekstowe podpowiedzi dla użytkownika, podgląd na żywo oraz generowanie gotowego kodu HTML do wklejenia na forum.",
          tech: ["React", "Vite", "Context API"],
          repo: "https://github.com/karoq18/CharacterCardGenerator",
          live: "https://www.morsmordre.addhost.pl/karta/index.html",
          screens: [
            "projects/generator/character-1.webp",
            "projects/generator/character-2.webp",
            "projects/generator/character-3.webp",
            "projects/generator/character-4.webp",
          ],
          desktopImg: "",
          mobileImg: "",
        },
      ],
    },
    contact: {
      title_1: "Zapraszam do ",
      title_2: "kontaktu",
      body: "Masz pytania lub chcesz porozmawiać o współpracy? Napisz do mnie bezpośrednio lub skorzystaj z formularza – z przyjemnością odpowiem.",
      con_name: "Imię",
      con_email: "Adres e-mail",
      con_msg: "Wiadomość",
      con_msg_ph: "Twoja wiadomość…",
      send: "Wyślij",
      sending: "Wysyłam…",
      thanks: "Wiadomość została wysłana. Dziękuję!",
      error_1: "Błąd wysłania wiadomości. Spróbuj ponownie.",
      error_2: "Wystąpił problem z wysłaniem wiadomości.",
    },

    command: {
      changeLang: "Zmień język na",
      title: "Otwórz konsolę (Ctrl/Cmd + K)",
      aria: "Otwórz konsolę poleceń",
      placeholder: "Szukaj (np. „git”, „mail”, „cv”)",
      no_result: "Brak wyników",
      help: "↑/↓ nawiguj, Enter uruchom, Esc zamknij",
      type_serch: "Zacznij pisać, aby wyszukać...",
    },
  },

  en: {
    nav: {
      aria: "Main navigation",
      name: "Karolina",
      surname: "Ćwiklińska",
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      mobile: "Mobile",
    },

    brand: "Karolina.",

    labels: {
      changeLang: "Change language",
      contact: {
        email: "Email me",
        github: "GitHub",
        linkedin: "LinkedIn",
        cv: "Download CV",
        discord: "Discord",
      },
    },

    hero: {
      roles: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
      prefix: "Hello, I’m",
      name: "Karolina Ćwiklińska",
      lead: "I combine creativity and attention to detail. I design solutions from sleek interfaces to stable backends, always focused on the user experience.",
    },

    about: {
      title: "Fullstack Developer",
      body: "I create complete applications — from intuitive frontends, through stable backends, to database management. I combine technology with a practical approach to problem-solving. The experience I gained in various industries has developed my organizational skills, teamwork, and client collaboration. Currently, I am focusing on building web applications and developing my competencies in the field of artificial intelligence.",
      location: "Szczecin / Remote",
      availability: "Flexible availability",
      langs: "Polish (native), English (B2)",
      education: "Computer Science - 4th year, Vizja University",
      spec_1: "Web Dev",
      spec_2: "AI & Data Science",
      education_old: "B.Sc. in Physiotherapy, 2015, WSEiT Szczecin",
    },

    hobbyCard: {
      firstWord: "Beyond",
      words: ["code", "study", "work"],
      description:
        "Music in my headphones, discovering new places, immersive games, matches with friends, and culinary experiments - a healthy balance between work and everyday life.",
    },

    timeline: [
      {
        year: "2024 – present",
        title: "Freelancer – Full Stack Developer",
        where: "",
        desc: "Delivering individual projects: building modern websites and web apps with Next.js and Tailwind, creating custom solutions in PHP/MySQL, deploying services on Microsoft Azure, and crafting dynamic interactive tools in React.",
      },
      {
        year: "Feb 2024 – Aug 2024",
        title: "Junior Full Stack Developer (internship)",
        where: "IT Serwis sp. z o.o.",
        desc: "Co-developed web applications: UI implementation in React, backend development with Java/Spring Boot, REST API design and integration, MySQL database work, and unit testing with JUnit.",
      },
      {
        year: "2019 – present",
        title: "Event Manager",
        where: "KMC Events Karolina Ćwiklińska",
        desc: "Event organization, offer preparation, client communication, and finance management.",
      },
      {
        year: "2014 – 2024",
        title: "Coordinator",
        where: "Szczecińska Gubałówka sp. z o.o.",
        desc: "Coordination of sports facility operations, team leadership, and assurance of high-quality customer service.",
      },
    ],

    skills: {
      titleStart: "Tech",
      titleHighlight: "Stack",
      languages: "Programming languages",
      frontend: "Frontend",
      backend: "Backend & Databases",
      tools: "Tools & Cloud",
      cms: "CMS management & configuration",
    },

    projects: {
      title: "Projects",
      desktopView: "Desktop view",
      mobileView: "Mobile view",
      demo: "Visit site",
      code: "Code",
      empty: "No preview",
      emptyDesktop: "No desktop preview",
      emptyMobile: "No mobile preview",
      prev: "Previous project",
      next: "Next project",
      prev_screen: "Previous screen",
      next_screen: "Next screen",
      showProject: "Show project",
      showScreen: "Show screen",
      projectTitle: "Project title",
      items: [
        {
          title: "Hangar Operations Management System",
          description:
            "Web app for managing airline hangar operations: user authentication/ authorization, aircraft registry, maintenance task management, and organization handling. \
            \n\nViews and permissions adapt to user roles (admin, mechanic, pilot).",
          tech: [
            "Java 17",
            "Spring Boot",
            "Lombok",
            "H2",
            "REST API",
            "React.js",
          ],
          repo: "https://github.com/karoq18/HangarOps",
          screens: [
            "projects/hangar/hangar-2.webp",
            "projects/hangar/hangar-1.webp",
            "projects/hangar/hangar-3.webp",
            "projects/hangar/hangar-4.webp",
            "projects/hangar/hangar-5.webp",
            "projects/hangar/hangar-6.webp",
            "projects/hangar/hangar-7.webp",
            "projects/hangar/hangar-8.webp",
            "projects/hangar/hangar-9.webp",
            "projects/hangar/hangar-10.webp",
          ],
          desktopImg: "",
          mobileImg: "",
        },
        {
          title: "Portfolio",
          description:
            "Officially: portfolio. Unofficially: an eternal construction site.\n\nStill missing one crucial button: MAKE ME COFFEE ☕.",
          tech: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "Lenis",
            "React Three Fiber",
          ],
          repo: "https://github.com/karoq18/portfolio",
          live: "https://www.kcwiklinska.pl",
          screens: ["projects/portfolio/portfolio-1.webp"],
        },
        {
          title: "RPG Forum",
          description:
            "RPG forum built on the MyBB engine, fully customized to meet the specific requirements of the project. The entire layout and a set of custom plugins were designed and implemented specifically for the role-playing environment. \
            \n\nThese extensions integrate with the database and provide a wide range of dedicated features, including a character sheet system, an administrative panel for managing stats and logs, a dice-roll mechanic, tournament brackets, and extended sidebars enhancing navigation and data presentation.",
          tech: ["PHP", "MySQL", "JavaScript", "jQuery", "MyBB"],
          repo: "https://github.com/karoq18/customplugin",
          live: "https://www.serpens.addhost.pl",
          screens: [
            "projects/serpens/serpens-1.webp",
            "projects/serpens/serpens-2.webp",
            "projects/serpens/serpens-3.webp",
            "projects/serpens/serpens-4.webp",
            "projects/serpens/serpens-5.webp",
          ],
        },
        {
          title: '"Emocja" Psychotherapy Practice',
          description:
            "A one-page psychotherapy website built with Next.js. It features animated elements, a responsive layout with clear typography, and a contact form that works without a dedicated backend.",
          tech: ["Next.js", "App Router", "Tailwind CSS", "GSAP"],
          screens: ["projects/emocja/emocja-1.webp"],
          live: "https://psychoterapia-emocja.pl/",
          desktopImg: "",
          mobileImg: "",
        },
        {
          title: "Character Card Generator",
          description:
            "A web application for creating character sheets for forums. It features dynamic forms based on configuration (characterConfig) – different character types, full validation according to forum mechanics, contextual field hints, live preview, and generation of ready-to-use HTML code for embedding on the forum.",
          tech: ["React", "Vite", "Context API"],
          repo: "https://github.com/karoq18/CharacterCardGenerator",
          live: "https://www.morsmordre.addhost.pl/karta/index.html",
          screens: [
            "projects/generator/character-1.webp",
            "projects/generator/character-2.webp",
            "projects/generator/character-3.webp",
            "projects/generator/character-4.webp",
          ],
          desktopImg: "",
          mobileImg: "",
        },
      ],
    },

    contact: {
      title_1: "Get in ",
      title_2: "Touch",
      body: "Questions or project ideas? Contact me directly or via the form – I’ll be happy to respond.",
      con_name: "Name",
      con_email: "Email",
      con_msg: "Message",
      con_msg_ph: "Your message…",
      send: "Send",
      sending: "Sending…",
      error_1: "Error sending message. Try again.",
      error_2: "There was a problem sending your message.",
      thanks: "Thanks! Your message has been sent.",
    },

    command: {
      changeLang: "Change language to",
      title: "Open console (Ctrl/Cmd + K)",
      aria: "Open command palette",
      placeholder: "Search (e.g., “git”, “mail”, “cv”)",
      no_result: "No results",
      help: "Use ↑/↓ to navigate, Enter to run, Esc to close",
      type_serch: "Start typing to search…",
    },
  },
};
