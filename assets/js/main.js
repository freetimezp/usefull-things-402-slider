const cards = document.querySelectorAll(".card");
const body = document.getElementById("body");
const ambient = document.querySelector(".ambient-3");

let activeCard = document.querySelector(".card.active");

// ========================================
// ACTIVATE CARD
// ========================================

function activateCard(card) {
    if (activeCard === card) return;

    cards.forEach((item) => {
        item.classList.remove("active");
    });

    card.classList.add("active");

    activeCard = card;

    const color = card.dataset.color;

    // Update CSS variable
    document.documentElement.style.setProperty("--accent", color);

    // Change ambient glow
    ambient.style.background = color;

    // Update background atmosphere
    body.style.background = `
        radial-gradient(
            circle at 20% 20%,
            ${color}18,
            transparent 35%
        ),
        radial-gradient(
            circle at 80% 80%,
            ${color}10,
            transparent 35%
        ),
        #08080c
    `;
}

// ========================================
// CARD CLICK
// ========================================

cards.forEach((card) => {
    card.addEventListener("click", () => {
        activateCard(card);
    });

    // ========================================
    // MOUSE SPOTLIGHT
    // ========================================

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width) * 100;

        const percentY = (y / rect.height) * 100;

        card.style.setProperty("--mouse-x", `${percentX}%`);

        card.style.setProperty("--mouse-y", `${percentY}%`);

        // ========================================
        // 3D TILT
        // ========================================

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 4;

        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `
            perspective(1000px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.015)
        `;
    });

    // ========================================
    // RESET TILT
    // ========================================

    card.addEventListener("mouseleave", () => {
        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    });
});

// ========================================
// INITIAL COLOR
// ========================================

const initialColor = activeCard.dataset.color;

document.documentElement.style.setProperty("--accent", initialColor);

ambient.style.background = initialColor;
