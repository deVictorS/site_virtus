// Script para a navbar fixa, botão WhatsApp e barra de progresso ao rolar a página
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const whatsapp = document.querySelector(".whatsapp-fixed");
  const progressBar = document.querySelector(".scroll-progress");
  
  // Barra de progresso
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }

  if (navbar) {
    navbar.classList.toggle("fixed", window.scrollY > 50);
  }
  
  if (whatsapp) {
    whatsapp.classList.toggle("show", window.scrollY > 300);
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
document.querySelectorAll(".service-box, .contract-box, .diff-item").forEach(card => {
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
    "nav-home": "Início",
    "nav-about": "A Empresa",
    "nav-solutions": "O que fazemos",
    "nav-contracts": "Planos",
    "nav-impact": "Resultados Reais",
    "nav-contact": "Contato",
    "hero-title": "Sua Empresa Livre de Problemas com Tecnologia.",
    "hero-subtitle": "Cuidamos de tudo: da sua internet ao sistema que sua empresa usa. TI organizada, rápida e com preço justo para o seu negócio crescer sem interrupções.",
    "hero-btn": "Quero um Diagnóstico Grátis",
    "about-title": "O braço direito que sua empresa precisa",
    "about-text": "A Virtus é o time de especialistas que cuida da tecnologia da sua empresa para você focar no que realmente importa: vender e crescer. Resolvemos desde problemas de internet lenta até a criação de sistemas modernos para facilitar seu dia a dia.",
    "solutions-title": "Soluções Simples e Eficientes",
    "s1-t": "Internet & Redes", "s1-d": "Sua internet sempre rápida e funcionando em todos os computadores. Wi-Fi de qualidade para você e seus clientes.",
    "s2-t": "Sistemas & Aplicativos", "s2-d": "Criamos ferramentas exclusivas para automatizar tarefas repetitivas e organizar os dados da sua empresa.",
    "s3-t": "Proteção Digital", "s3-d": "Protegemos seus computadores contra vírus e invasões. Seus dados e o dinheiro da sua empresa sempre seguros.",
    "s4-t": "Arquivos na Nuvem", "s4-d": "Acesse seus documentos de qualquer lugar com total segurança, sem precisar de servidores caros no escritório.",
    "s5-t": "Suporte Rápido", "s5-d": "Atendimento humano e sem demora. Teve um problema técnico? Nossa equipe resolve na hora, sem complicação.",
    "s6-t": "Consultoria e Gestão", "s6-d": "Ajudamos você a escolher as melhores tecnologias para economizar dinheiro e organizar seu negócio.",
    "contracts-title": "Como trabalhamos",
    "c1-t": "Serviços Avulsos", "c1-d": "Ideal para resolver um problema específico ou instalar algo novo na sua empresa.",
    "c2-t": "Mensalidade de Suporte", "c2-d": "Um valor fixo por mês para ter nossa equipe cuidando de tudo, com manutenção e socorro imediato.",
    "c3-t": "Gestão Total", "c3-d": "Nós assumimos toda a responsabilidade tecnológica. Você não se preocupa com nada de TI.",
    "impact-title": "Impacto Real no seu Bolso",
    "i1-l": "Sobrevivência", "i1-t": "60% das PMEs fecham após um ataque hacker", "i1-d": "Pequenas empresas são os alvos favoritos. Sem proteção profissional, a maioria não resiste ao custo de um sequestro de dados.", "i1-s": "Fonte: National Cyber Security Alliance",
    "i2-l": "Crescimento", "i2-t": "Empresas tech crescem 2x mais rápido", "i2-d": "PMEs que investem em modernização tecnológica e nuvem têm crescimento de receita muito superior aos concorrentes.", "i2-s": "Fonte: Boston Consulting Group (BCG)",
    "i3-l": "Eficiência", "i3-t": "TI eficiente economiza até 30% do orçamento", "i3-d": "Uma gestão organizada de TI elimina desperdícios e paradas de trabalho, gerando economia direta no lucro da empresa.", "i3-s": "Fonte: Deloitte / SEBRAE",
    "diff-title": "Por que escolher a Virtus?",
    "d1-t": "Preço Justo", "d1-d": "Soluções profissionais com valores que cabem no orçamento de uma pequena ou média empresa.",
    "d2-t": "Tudo Organizado", "d2-d": "Você recebe relatórios claros e sabe exatamente o que está sendo feito, sem palavras difíceis.",
    "d3-t": "Sem Burocracia", "d3-d": "Entendemos a pressa do dono de empresa. Atendimento direto ao ponto e resolução rápida.",
    "d4-t": "Modernidade", "d4-d": "Usamos o que há de mais novo para deixar sua empresa moderna e competitiva no mercado.",
    "faq-title": "Dúvidas Frequentes",
    "q1-t": "Vou economizar dinheiro contratando vocês?", "q1-a": "Sim. Organizamos sua TI para evitar gastos extras com quebras de equipamentos e perda de tempo da sua equipe.",
    "q2-t": "Atendem empresas de qualquer ramo?", "q2-a": "Sim! Atendemos desde escritórios e consultórios até lojas e pequenas indústrias que precisam de tecnologia estável.",
    "q3-t": "Minha internet é lenta. Vocês resolvem?", "q3-a": "Com certeza. Fazemos uma revisão completa na sua rede para garantir que o sinal chegue forte onde você precisa.",
    "q4-t": "O atendimento é fácil de entender?", "q4-a": "Com certeza. Falamos a sua língua e explicamos tudo de forma simples, focando em resolver o seu problema.",
    "contact-title": "Quer deixar sua TI em boas mãos?",
    "contact-subtitle": "Fale com a gente agora e receba uma análise gratuita da sua empresa.",
    "contact-btn": "Quero falar com um especialista",
    "tech-title": "Tecnologia de Ponta",
    "footer-tag": "Cuidando da tecnologia para sua empresa crescer."
  },
  en: {
    "nav-home": "Home",
    "nav-about": "About Us",
    "nav-solutions": "What we do",
    "nav-contracts": "Plans",
    "nav-impact": "Real Results",
    "nav-contact": "Contact",
    "hero-title": "Your Business Free from Tech Headaches.",
    "hero-subtitle": "We handle everything: from your internet to the systems your company uses. Organized, fast, and fairly priced IT for your business to grow smoothly.",
    "hero-btn": "Get a Free Diagnosis",
    "about-title": "The right hand your business needs",
    "about-text": "Virtus is the expert team that handles your company's tech so you can focus on what matters: selling and growing. We solve everything from slow internet to creating modern systems to simplify your day.",
    "solutions-title": "Simple & Efficient Solutions",
    "s1-t": "Internet & Networks", "s1-d": "Your internet always fast and working on every computer. Quality Wi-Fi for you and your clients.",
    "s2-t": "Systems & Apps", "s2-d": "We create exclusive tools to automate repetitive tasks and organize your company data.",
    "s3-t": "Digital Protection", "s3-d": "We protect your computers against viruses and hacking. Your data and money always safe.",
    "s4-t": "Cloud Files", "s4-d": "Access your documents from anywhere with total security, without needing expensive office servers.",
    "s5-t": "Fast Support", "s5-d": "Human and prompt service. Got a tech problem? Our team solves it right away, no complications.",
    "s6-t": "Management & Consulting", "s6-d": "We help you choose the best technology to save money and organize your business.",
    "contracts-title": "How we work",
    "c1-t": "One-off Services", "c1-d": "Ideal for solving a specific problem or installing something new.",
    "c2-t": "Monthly Support", "c2-d": "A fixed monthly fee to have our team handling everything, with maintenance and immediate help.",
    "c3-t": "Total Management", "c3-d": "We take full responsibility for your tech. You don't have to worry about anything IT-related.",
    "impact-title": "Real Budget Impact",
    "i1-l": "Survival", "i1-t": "60% of SMEs close within 6 months of a cyberattack", "i1-d": "Small businesses are top targets. Without expert protection, most can't survive the cost of a data breach.", "i1-s": "Source: National Cyber Security Alliance",
    "i2-l": "Growth", "i2-t": "Tech-driven companies grow 2x faster", "i2-d": "SMEs that invest in tech modernization and cloud see revenue growth significantly higher than competitors.", "i2-s": "Source: Boston Consulting Group (BCG)",
    "i3-l": "Efficiency", "i3-t": "Efficient IT saves up to 30% of your budget", "i3-d": "Organized IT management eliminates waste and work stoppages, generating direct savings.", "i3-s": "Source: Deloitte / SEBRAE",
    "diff-title": "Why choose Virtus?",
    "d1-t": "Fair Pricing", "d1-d": "Professional solutions with values that fit the budget of small and medium-sized businesses.",
    "d2-t": "Fully Organized", "d2-d": "You get clear reports and know exactly what's being done, without the jargon.",
    "d3-t": "No Bureaucracy", "d3-d": "We understand business owners' urgency. Straightforward service and fast resolution.",
    "d4-t": "Modernity", "d4-d": "We use the latest tech to keep your business modern and competitive.",
    "faq-title": "Frequently Asked Questions",
    "q1-t": "Will I save money hiring you?", "q1-a": "Yes. We organize your IT to avoid extra costs with equipment breakdowns and team downtime.",
    "q2-t": "Do you serve any type of business?", "q2-a": "Yes! From offices and clinics to shops and small industries that need stable technology.",
    "q3-t": "My internet is slow. Can you fix it?", "q3-a": "Absolutely. We do a full network review to ensure the signal reaches where you need it.",
    "q4-t": "Is the support easy to understand?", "q4-a": "Definitely. We speak your language and explain everything simply, focusing on solving your problem.",
    "contact-title": "Ready to leave your IT in good hands?",
    "contact-subtitle": "Talk to us now and get a free analysis of your company.",
    "contact-btn": "Talk to a specialist",
    "tech-title": "Top-Tier Tech",
    "footer-tag": "Taking care of tech so your business can grow."
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
