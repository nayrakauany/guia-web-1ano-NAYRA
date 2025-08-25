// Adiciona uma classe 'active' ao scroll para destacar a seção atual
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    function highlightSection() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - 200 && 
                scrollPosition < sectionTop + sectionHeight - 200) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Adiciona animação suave ao scroll
    window.addEventListener('scroll', highlightSection);
});
