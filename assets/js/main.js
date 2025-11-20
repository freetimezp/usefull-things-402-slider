const cards = document.querySelectorAll(".card");
const body = document.getElementById("body");

const names = {
    instagram: "Instagram",
    youtube: "YouTube",
    discord: "Discord",
    twitter: "X",
};

// Default activate first
activateCard(cards[0]);

cards.forEach((card) => {
    card.addEventListener("click", () => activateCard(card));

    // 3D Tilt Events
    card.addEventListener("mousemove", tiltCard);
    card.addEventListener("mouseleave", resetTilt);
});

function activateCard(activeCard) {
    cards.forEach((card) => {
        card.classList.remove("active");

        // show only first letter on inactive
        const name = names[card.classList[1]];
        card.querySelector("h1").textContent = name.charAt(0);
    });

    // activate selected
    activeCard.classList.add("active");

    const fullName = names[activeCard.classList[1]];
    activeCard.querySelector("h1").textContent = fullName;

    // background color change
    body.style.background = activeCard.dataset.color;
}

/* ============================
        3D Tilt Logic
============================ */
function tiltCard(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // up/down
    const rotateY = ((x - centerX) / centerX) * 10; // left/right

    card.classList.add("tilt");
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.classList.remove("tilt");
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
}
