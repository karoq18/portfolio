import { PiGraduationCap } from 'react-icons/pi';
import { RxDiscordLogo } from "react-icons/rx";
import { FiLoader, FiTerminal, FiGithub, FiLinkedin, FiMapPin, 
  FiGlobe, FiClock, FiUser, FiCpu, FiCode, FiCheck, FiMail, FiFileText, 
  FiChevronLeft, FiChevronRight, FiExternalLink, FiHome } from 'react-icons/fi';
import {
  SiTypescript, SiJavascript, SiPhp, SiReact, SiNodedotjs, SiNextdotjs, SiSpring, SiExpress,
  SiTailwindcss, SiBootstrap, SiHtml5, SiCss3, SiMysql, SiAstro, SiGreensock, SiRedux,
  SiReactquery, SiZod, SiDocker, SiMongodb, SiGithub, SiPostman, SiWordpress, SiDrupal,
  SiGhost, SiStrapi, SiIntellijidea, SiFigma
} from 'react-icons/si';
import { FaDatabase, FaTools, FaGitAlt, FaJava } from 'react-icons/fa';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { TbBrandFramerMotion, TbBrandVercel, TbBrandAzure } from 'react-icons/tb';
import { IoChatbubblesOutline } from "react-icons/io5";

export const CONTACT = {
  mail: "karolina@kcwiklinska.pl",
  email: 'mailto:karolina@kcwiklinska.pl',
  github: 'https://github.com/karoq18',
  linkedin: 'https://www.linkedin.com/in/kcwiklinska/',
  cv: '/Karolina-Cwiklinska-CV.pdf', 
  discord: 'https://discord.com/users/karoq18',
} as const;

export const ICONS = {
  email: FiMail,
  github: FiGithub,
  linkedin: FiLinkedin,
  cv: FiFileText,
  discord: RxDiscordLogo,
  location: FiMapPin,
  clock: FiClock,
  globe: FiGlobe,
  education: PiGraduationCap,
  spec_1: FiCheck,
  spec_2: FiLoader,
  home: FiHome,
  about: FiUser,
  projects: FiCode,
  skills: FiCpu,
  console: FiTerminal,
  left: FiChevronLeft,
  right: FiChevronRight,
  demo: FiExternalLink,
} as const;

export const TECH_ICONS = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  php: SiPhp,
  react: SiReact,
  node: SiNodedotjs,
  next: SiNextdotjs,
  spring: SiSpring,
  express: SiExpress,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  html5: SiHtml5,
  css3: SiCss3,
  mysql: SiMysql,
  astro: SiAstro,
  gsap: SiGreensock,
  redux: SiRedux,
  reactQuery: SiReactquery,
  zod: SiZod,
  docker: SiDocker,
  mongodb: SiMongodb,
  github: SiGithub,
  postman: SiPostman,
  wordpress: SiWordpress,
  drupal: SiDrupal,
  ghost: SiGhost,
  strapi: SiStrapi,
  database: FaDatabase,
  tools: FaTools,
  git: FaGitAlt,
  java: FaJava,
  vscode: BiLogoVisualStudio,
  framerMotion: TbBrandFramerMotion,
  vercel: TbBrandVercel,
  azure: TbBrandAzure,
  mybb: IoChatbubblesOutline,
  intellij:SiIntellijidea,
  figma: SiFigma
} as const;
