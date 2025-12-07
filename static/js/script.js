document.addEventListener("DOMContentLoaded", () => {
    const items = Array.from(document.querySelectorAll(".animal-card"));
    const itemsPerPage = 6;
    let currentPage = 1;

    const paginationContainer = document.querySelector(".page-numbers");

    if (!paginationContainer) {
        console.error("pagination.js: .page-numbers não encontrado no HTML.");
        return;
    }

    const totalPages = Math.ceil(items.length / itemsPerPage);

    function renderPagination() {
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.classList.add("page-btn");
            btn.textContent = i;

            if (i === currentPage) btn.classList.add("active");

            btn.addEventListener("click", () => {
                currentPage = i;
                renderPage();
            });

            paginationContainer.appendChild(btn);
        }
    }

    function renderPage() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;

        items.forEach((item, index) => {
            item.style.display = index >= start && index < end ? "block" : "none";
        });

        renderPagination();
    }

    renderPage();
});
