import Loader from './loader.js';

new Vue({
    el: '#app',
    data: {
        menuOpen: false,
        scrollY: 0
    },
    computed: {
        scrolled() {
            return this.scrollY > 50;
        },
        // [NOVO] Lógica centralizada para a cor dos links
        navLinkClass() {
            return {
                'text-gray-800 hover:text-pink-400': this.scrolled || this.menuOpen,
                'text-white hover:text-pink-100': !this.scrolled && !this.menuOpen
            };
        }
    },
    methods: {
        scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            // Adicional: Fecha o menu se estiver aberto ao navegar para uma seção
            if (this.menuOpen) {
                this.menuOpen = false;
            }
        },
        handleScroll() {
            this.scrollY = window.scrollY;
            // [REMOVIDO] Não precisamos mais chamar funções de animação imperativas
            // this.animateHeader();
            // this.animateMenu();
            const header = document.getElementById('header');
            const branding = document.getElementById('branding');
            const brand = document.getElementById('brand');
            const links = document.querySelectorAll('.nav-link');
            const hamburger = document.getElementById('hamburger');
            // Compute if scrolled
            const scrolled = this.scrolled;

            header.classList.toggle('bg-white', scrolled);
            header.classList.toggle('bg-gradient-to-r', !scrolled);
            header.classList.toggle('shadow-lg', scrolled);
            header.classList.toggle('shadow-xl', !scrolled);

            branding.classList.toggle('py-4', scrolled);
            branding.classList.toggle('py-6', !scrolled);

            brand.classList.toggle('text-2xl', scrolled);
            brand.classList.toggle('text-3xl', !scrolled);

            hamburger.classList.toggle('scale-100', scrolled);
            hamburger.classList.toggle('scale-150', !scrolled);

            links.forEach(link => {
                link.classList.toggle('text-gray-800', scrolled);
                link.classList.toggle('text-white', !scrolled);
                link.classList.toggle('hover:text-pink-400', scrolled);
                link.classList.toggle('hover:text-pink-100', !scrolled);
            });
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
            // [REMOVIDO] A chamada para animateMenu() não é mais necessária
        },
        showLoader() {
            Loader.loadContent({
                onProgress: () => {},
                onComplete: () => {},
                onError: () => {},
                onAbort: () => {}
            });
        }
        // [REMOVIDO] animateHeader e animateMenu não são mais necessários
    },
    // [REMOVIDO] O watcher não é mais necessário, 'computed' faz o trabalho
    // watch: { ... },
    mounted() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        this.showLoader();
    }
});
