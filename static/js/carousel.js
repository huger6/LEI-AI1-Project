document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. SHUFFLE LOGIC --- */
    const track = document.querySelector('.carousel-track');
    
    if (track) {
        const cards = Array.from(track.children);
        
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap element positions
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        track.innerHTML = '';
        cards.forEach(card => track.appendChild(card));
    }

    /* --- 2. NAVIGATION LOGIC (ARROWS) --- */
    const carousel = document.getElementById('relatedCarousel');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');

    if (!carousel) return; 

    // Calculate scroll width based on first visible card size
    const getScrollAmount = () => {
        const card = carousel.querySelector('.pet-card');
        // Card width + gap (20px) or 300px as fallback
        return card ? card.offsetWidth + 20 : 300; 
    };

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }
});