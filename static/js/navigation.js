document.addEventListener('DOMContentLoaded', function() {
    // Definitions
    const itemsPerPage = 6;
    const cards = document.querySelectorAll('.pet-card');
    const paginationContainer = document.querySelector('.pagination .page-numbers');
    let currentPage = 1;
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    // Function to show cards for current page
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        cards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Update buttons and scroll to top of list
        updatePaginationButtons();
    }

    // Function to create navigation buttons
    function updatePaginationButtons() {
        paginationContainer.innerHTML = ''; // Clear old buttons

        // Previous button (<)
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

        // Numeric buttons (1, 2, 3...)
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

        // Next button (>)
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

    // Helper function to scroll smoothly when changing pages
    function scrollToTop() {
        const listContainer = document.querySelector('.lista-animais-container');
        if (listContainer) {
            listContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Initialize
    if (cards.length > 0) {
        showPage(1);
    }
});