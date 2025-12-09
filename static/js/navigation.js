document.addEventListener('DOMContentLoaded', function() {
    // Definições
    const itemsPerPage = 6;
    const cards = document.querySelectorAll('.pet-card');
    const paginationContainer = document.querySelector('.pagination .page-numbers');
    let currentPage = 1;
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    // Função para mostrar os cartões da página atual
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        cards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'flex'; // Ou 'block', dependendo do teu layout original
            } else {
                card.style.display = 'none';
            }
        });

        // Atualizar botões e scroll para o topo da lista
        updatePaginationButtons();
    }

    // Função para criar os botões de navegação
    function updatePaginationButtons() {
        paginationContainer.innerHTML = ''; // Limpar botões antigos

        // Botão "Anterior" (<)
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="bi bi-chevron-left"></i>';
        prevBtn.className = 'page-btn prev';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                scrollToTop();
            }
        };
        paginationContainer.appendChild(prevBtn);

        // Botões Numéricos (1, 2, 3...)
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.onclick = () => {
                currentPage = i;
                showPage(currentPage);
                scrollToTop();
            };
            paginationContainer.appendChild(btn);
        }

        // Botão "Próximo" (>)
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i>';
        nextBtn.className = 'page-btn next';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
                scrollToTop();
            }
        };
        paginationContainer.appendChild(nextBtn);
    }

    // Função auxiliar para subir suavemente quando muda de página
    function scrollToTop() {
        const listContainer = document.querySelector('.lista-animais-container');
        if (listContainer) {
            listContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Inicializar
    if (cards.length > 0) {
        showPage(1);
    }
});