document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. LÓGICA DE ALEATORIEDADE (SHUFFLE) --- */
    const track = document.querySelector('.carousel-track');
    
    if (track) {
        // 1. Converter os elementos filhos (os cards) num Array real
        const cards = Array.from(track.children);
        
        // 2. Algoritmo "Fisher-Yates" para baralhar o array
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Troca os elementos de posição
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        // 3. (Opcional) Limitar a quantidade. 
        // Se quiseres mostrar apenas 8 aleatórios, descomenta a linha abaixo:
        // const selectedCards = cards.slice(0, 8); 
        // E troca 'cards' por 'selectedCards' no forEach abaixo.

        // 4. Limpar o HTML atual e voltar a inserir os cards pela nova ordem
        track.innerHTML = '';
        cards.forEach(card => track.appendChild(card));
    }

    /* --- 2. LÓGICA DE NAVEGAÇÃO (SETAS) --- */
    const carousel = document.getElementById('relatedCarousel');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');

    if (!carousel) return; 

    // Calcula a largura do scroll baseada no tamanho do primeiro card visível
    const getScrollAmount = () => {
        const card = carousel.querySelector('.pet-card');
        // Largura do card + gap (20px) ou 300px como fallback
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