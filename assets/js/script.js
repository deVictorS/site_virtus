// Script para a navbar fixa ao rolar a página
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("fixed", window.scrollY > 50);
  }
});

// Menu mobile toggle
const toggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");
const nav = document.getElementById("nav-links");
const navLinks = document.querySelectorAll(".nav-links li a");

if (toggle && nav) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("show");
  });

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      nav.classList.remove("show");
    });
  }

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
// MOUSE GLOW EFFECT
// ==========================================================================
const glow = document.querySelector(".mouse-glow");
window.addEventListener("mousemove", (e) => {
  if (glow && document.body.classList.contains("dark-theme")) {
    glow.style.setProperty("--x", e.clientX + "px");
    glow.style.setProperty("--y", e.clientY + "px");
  }
});

// ==========================================================================
// CARD TILT INTERACTION
// ==========================================================================
document.querySelectorAll(".service-box, .contract-box").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
  });
});

// ==========================================================================
// REVEAL ANIMATIONS ON SCROLL
// ==========================================================================
const reveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", reveal);

// ==========================================================================
// LÓGICA DE TROCA DE TEMA (LIGHT/DARK MODE)
// ==========================================================================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Default to dark theme for "Tech-Noir" look
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "dark") {
  body.classList.add("dark-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
} else {
  body.classList.remove("dark-theme");
  themeIcon.classList.replace("fa-sun", "fa-moon");
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
    "diff-title": "Por que a Virtus?",
    "d1-t": "Previsibilidade de Custos", "d1-d": "Elimine gastos surpresas com TI. Nossos modelos de contrato permitem um planejamento financeiro preciso para PMEs.",
    "d2-t": "Time de Especialistas", "d2-d": "Tenha acesso a uma equipe multidisciplinar (vCIO, Segurança, Cloud) sem o custo de manter um departamento interno.",
    "d3-t": "Agilidade de Resposta", "d3-d": "Sabemos que para uma PME, cada minuto parado é prejuízo. Nosso suporte é focado em resolução rápida e proativa.",
    "d4-t": "Segurança Corporativa", "d4-d": "Levamos o nível de segurança de grandes corporações para o seu negócio, protegendo seus dados contra ataques modernos.",
    "faq-title": "Dúvidas Frequentes",
    "q1-t": "Minha empresa é pequena. Realmente preciso de Outsourcing?", "q1-a": "Sim! Justamente por ser pequena, você não pode desperdiçar tempo com falhas técnicas. Oferecemos tecnologia de ponta com custo reduzido.",
    "q2-t": "Qual o tempo de resposta em caso de problemas?", "q2-a": "Trabalhamos com SLAs rigorosos. Para problemas críticos, o suporte inicia em poucos minutos de forma remota ou presencial.",
    "q3-t": "Meus dados estarão seguros com vocês?", "q3-a": "A segurança é nosso pilar. Utilizamos criptografia, backups redundantes e monitoramento 24/7 para proteger seu negócio.",
    "q4-t": "Como funciona o contrato? Tem fidelidade?", "q4-a": "Temos modelos flexíveis. Nossos contratos mensais buscam parceria de longo prazo, mas sempre prezamos pela transparência.",
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
    "diff-title": "Why Virtus?",
    "d1-t": "Cost Predictability", "d1-d": "Eliminate IT surprise expenses. Our contract models allow precise financial planning for SMEs.",
    "d2-t": "Expert Team", "d2-d": "Access a multidisciplinary team (vCIO, Security, Cloud) without the cost of an in-house department.",
    "d3-t": "Response Agility", "d3-d": "We know that for an SME, every minute down is a loss. Our support focuses on fast, proactive resolution.",
    "d4-t": "Enterprise Security", "d4-d": "We bring enterprise-level security to your business, protecting your data against modern attacks.",
    "faq-title": "Frequently Asked Questions",
    "q1-t": "My company is small. Do I really need Outsourcing?", "q1-a": "Yes! Especially because you're small, you can't afford technical downtime. We offer top-tier technology at a reduced cost.",
    "q2-t": "What is the response time in case of problems?", "q2-a": "We work with strict SLAs. For critical issues, support begins in minutes, either remotely or on-site.",
    "q3-t": "Will my data be secure with you?", "q3-a": "Security is our pillar. We use encryption, redundant backups, and 24/7 monitoring to protect your business.",
    "q4-t": "How does the contract work? Is there a lock-in?", "q4-a": "We have flexible models. Our monthly contracts aim for long-term partnership, always prioritizing transparency.",
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
    const key = element.dataset.i18n;
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
