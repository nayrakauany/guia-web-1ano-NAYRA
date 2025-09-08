document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle: default to light theme
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    const saved = localStorage.getItem('site-theme');
    const applyTheme = (t) => {
        if (t === 'light') htmlEl.classList.add('light');
        else htmlEl.classList.remove('light');
        if (themeToggle) themeToggle.textContent = t === 'light' ? '🌞' : '🌙';
        if (themeToggle) themeToggle.setAttribute('aria-pressed', t === 'light');
    };
    if (saved) applyTheme(saved);
    else applyTheme('light');
    if (themeToggle) themeToggle.addEventListener('click', ()=>{
        const current = htmlEl.classList.contains('light') ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        localStorage.setItem('site-theme', next);
        applyTheme(next);
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    const backToTop = document.getElementById('backToTop');

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e){
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            target.scrollIntoView({behavior: 'smooth', block: 'start'});
            // update focus for accessibility
            setTimeout(()=> target.setAttribute('tabindex','-1') || target.focus(), 700);
        });
    });

    // IntersectionObserver to reveal sections and set active nav link
    const obsOptions = {root:null,rootMargin:'-20% 0px -40% 0px',threshold:0};
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            const id = entry.target.id;
            if(entry.isIntersecting){
                entry.target.classList.add('active','reveal-active');
                // reveal
                entry.target.classList.add('reveal','active');
                // set active link
                navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+id));
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, obsOptions);

    sections.forEach(s=>{
        s.classList.add('reveal');
        observer.observe(s);
    });

    // Back to top
    function checkScroll(){
        if(window.scrollY > 400) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    }
    window.addEventListener('scroll', checkScroll);
    backToTop.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
    checkScroll();
});

// Typing subtitle (outside DOMContentLoaded so it will run after scripts loaded)
document.addEventListener('DOMContentLoaded', ()=>{
    const phrases = [
        'Aprenda HTML, CSS e JavaScript de forma prática',
        'Exercícios, conceitos e boas práticas',
        'Construa projetos reais passo a passo'
    ];
    const el = document.getElementById('typed');
    if (!el) return;
    let partIndex = 0, charIndex = 0, isDeleting = false;

    function tick(){
        const current = phrases[partIndex];
        if (!isDeleting) {
            el.textContent = current.slice(0, ++charIndex);
            if (charIndex === current.length){
                isDeleting = true;
                setTimeout(tick, 1200);
                return;
            }
        } else {
            el.textContent = current.slice(0, --charIndex);
            if (charIndex === 0){
                isDeleting = false;
                partIndex = (partIndex + 1) % phrases.length;
            }
        }
        const delay = isDeleting ? 40 : 80;
        setTimeout(tick, delay);
    }
    tick();
});
