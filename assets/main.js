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
        navLinkClass() {
            return {
                'text-gray-800 hover:text-pink-800': this.scrolled || this.menuOpen,
                'text-gray-400 hover:text-pink-400': !this.scrolled && this.menuOpen
            };
        }
    },
    methods: {
        scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            if (this.menuOpen) {
                this.menuOpen = false;
            }
        },
        handleScroll() {
            this.scrollY = window.scrollY;
            const header = document.getElementById('header');
            const branding = document.getElementById('branding');
            const brand = document.getElementById('brand');
            const hamburger = document.getElementById('hamburger');
            const scrolled = this.scrolled;

            header.classList.toggle('bg-white', scrolled);
            header.classList.toggle('opacity-90', scrolled);
            header.classList.toggle('shadow-xl', scrolled);

            branding.classList.toggle('py-4', scrolled);
            branding.classList.toggle('py-6', !scrolled);

            brand.classList.toggle('text-2xl', scrolled);
            brand.classList.toggle('text-3xl', !scrolled);

            hamburger.classList.toggle('scale-100', scrolled);
            hamburger.classList.toggle('scale-150', !scrolled);
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        showLoader() {
            Loader.loadContent({
                onProgress: () => {},
                onComplete: () => {},
                onError: () => {},
                onAbort: () => {}
            });
        }
    },
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
