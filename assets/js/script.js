// Script para a navbar fixa ao rolar a página
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("fixed", window.scrollY > 50);
  }
});

// Menu mobile toggle
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const navLinks = document.querySelectorAll(".nav-links li a");

if (toggle && nav) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("show");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("show");
    }
  });
}

// Acordeão de Dúvidas Frequentes (FAQ)
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach(other => other.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});

// ==========================================================================
// LÓGICA DE TROCA DE TEMA (LIGHT/DARK MODE)
// ==========================================================================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  body.classList.add("dark-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  let theme = body.classList.contains("dark-theme") ? "dark" : "light";
  themeIcon.classList.replace(theme === "dark" ? "fa-moon" : "fa-sun", theme === "dark" ? "fa-sun" : "fa-moon");
  localStorage.setItem("theme", theme);
});

// ==========================================================================
// LÓGICA DE TRADUÇÃO (PT/EN)
// ==========================================================================
const translations = {
  pt: {
    "nav-home": "Home",
    "nav-about": "A Empresa",
    "nav-solutions": "Soluções",
    "nav-contracts": "Contratos",
    "nav-impact": "Impacto",
    "nav-contact": "Contato",
    "hero-title": "Tecnologia que impulsiona resultados, não apenas resolve problemas.",
    "hero-subtitle": "Sua empresa merece uma TI estratégica. Do suporte ágil ao desenvolvimento de software sob medida, aceleramos sua transformação digital com segurança e eficiência.",
    "hero-btn": "Agende um Diagnóstico Estratégico",
    "about-title": "O Futuro do seu Negócio é Tech",
    "about-text": "A Virtus Solutions nasceu para eliminar a complexidade tecnológica das empresas. Não somos apenas um suporte; somos o braço direito da sua diretoria para decisões de tecnologia.",
    "solutions-title": "Nosso Ecossistema de Soluções",
    "s1-t": "Suporte 360º", "s1-d": "Help Desk e Field Service com SLAs rigorosos. Atendimento humano e ágil.",
    "s2-t": "Fábrica de Software", "s2-d": "Desenvolvimento sob medida de sistemas e apps para automatizar processos.",
    "s3-t": "Segurança & LGPD", "s3-d": "Proteção de dados e auditorias. Blindamos sua empresa contra ameaças.",
    "s4-t": "Cloud & Transformação", "s4-d": "Migração para nuvem e gestão de servidores para ganhar escalabilidade.",
    "s5-t": "Redes & Infra", "s5-d": "Projetos de conectividade e Wi-Fi corporativo de alta performance.",
    "s6-t": "Consultoria em TI", "s6-d": "Gestão estratégica (vCIO) e planejamento focado em ROI.",
    "contracts-title": "Modelos de Parceria",
    "c1-t": "Sob Demanda (Spot)", "c1-d": "Ideal para projetos pontuais ou resoluções de problemas emergenciais.",
    "c2-t": "Suporte Mensal", "c2-d": "Contratos de suporte contínuo com SLAs e redução de custos fixos.",
    "c3-t": "Full TI Outsourcing", "c3-d": "Terceirização completa. Sua empresa foca no negócio, nós na tecnologia.",
    "impact-title": "O Valor Real da TI Estratégica",
    "i1-l": "Redução de Custos", "i1-t": "Economia de até 19%", "i1-d": "Terceirização estratégica reduz custos operacionais significativamente.",
    "i2-l": "Cibersegurança", "i2-t": "R$ 6,4 Milhões por Incidente", "i2-d": "Este é o custo médio de um vazamento de dados no Brasil.",
    "i3-l": "Produtividade", "i3-t": "Ganho de 62% em Eficiência", "i3-d": "Cloud e automação permitem foco total no core business.",
    "contact-title": "Vamos Transformar seu Negócio?",
    "contact-subtitle": "Fale com um especialista e receba uma análise inicial.",
    "contact-btn": "Solicitar Contato de Especialista",
    "tech-title": "Ecossistema Tecnológico",
    "footer-tag": "Estratégia em Tecnologia da Informação."
  },
  en: {
    "nav-home": "Home",
    "nav-about": "Company",
    "nav-solutions": "Solutions",
    "nav-contracts": "Contracts",
    "nav-impact": "Impact",
    "nav-contact": "Contact",
    "hero-title": "Technology that drives results, doesn't just solve problems.",
    "hero-subtitle": "Your company deserves strategic IT. From agile support to custom software development, we accelerate your digital transformation with security and efficiency.",
    "hero-btn": "Schedule a Strategic Diagnosis",
    "about-title": "Your Business Future is Tech",
    "about-text": "Virtus Solutions was born to eliminate technological complexity for companies. We are not just support; we are your board's right hand for technology decisions.",
    "solutions-title": "Our Solutions Ecosystem",
    "s1-t": "360º Support", "s1-d": "Help Desk and Field Service with strict SLAs. Human and agile service.",
    "s2-t": "Software Factory", "s2-d": "Custom development of systems and apps to automate processes.",
    "s3-t": "Security & LGPD", "s3-d": "Data protection and audits. We shield your company against threats.",
    "s4-t": "Cloud & Transformation", "s4-d": "Cloud migration and server management for scalability.",
    "s5-t": "Networking & Infra", "s5-d": "Connectivity projects and high-performance corporate Wi-Fi.",
    "s6-t": "IT Consulting", "s6-d": "Strategic management (vCIO) and ROI-focused planning.",
    "contracts-title": "Partnership Models",
    "c1-t": "On Demand (Spot)", "c1-d": "Ideal for specific projects or emergency problem solving.",
    "c2-t": "Monthly Support", "c2-d": "Continuous support contracts with SLAs and fixed cost reduction.",
    "c3-t": "Full IT Outsourcing", "c3-d": "Complete outsourcing. Your company focuses on business, we focus on tech.",
    "impact-title": "The Real Value of Strategic IT",
    "i1-l": "Cost Reduction", "i1-t": "Up to 19% Savings", "i1-d": "Strategic outsourcing significantly reduces global operating costs.",
    "i2-l": "Cybersecurity", "i2-t": "$1.2M per Incident", "i2-d": "Average cost of a data breach. Proactive prevention reduces this risk.",
    "i3-l": "Productivity", "i3-t": "62% Efficiency Gain", "i3-d": "Cloud and automation allow full focus on core business.",
    "contact-title": "Let's Transform Your Business?",
    "contact-subtitle": "Talk to a specialist and receive an initial analysis.",
    "contact-btn": "Request Specialist Contact",
    "tech-title": "Technology Ecosystem",
    "footer-tag": "Information Technology Strategy."
  }
};

const langSwitch = document.getElementById("lang-switch");

function updateLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  localStorage.setItem("language", lang);
}

langSwitch.addEventListener("change", (e) => {
  updateLanguage(e.target.value);
});

// Verifica idioma salvo
const savedLang = localStorage.getItem("language") || "pt";
langSwitch.value = savedLang;
updateLanguage(savedLang);
