const container =
    document.getElementById("daysContainer");

function render(region = "Shenzhen") {

    container.innerHTML = "";

    itinerary
        .filter(
            item => item.region.includes(region)
        )
        .forEach(day => {

            const card =
                document.createElement("div");

            card.className = "day-card";

            card.innerHTML = `
                <div class="day-header">
                    <div>
                        <h3>${day.day}</h3>
                        <p>${day.title}</p>
                    </div>

                    <span>▼</span>
                    
                    </div>

                    <div class="day-content">
                        <div class="day-body">
                            <div class="timeline">
                                ${day.events.map(event => `
                                <div class="timeline-item">
                                ${event}
                                </div>
                                `).join("")}
                            </div>

                        <div class="gallery">
                            ${(day.images || []).map(img => `
                            <img src="${img}">
                            `).join("")}
                        </div>
                    </div>
                </div>
                `;

            container.appendChild(card);

        });

    bindAccordions();
    bindGallery();

}

function bindAccordions() {

    document
        .querySelectorAll(".day-header")
        .forEach(header => {

            header.onclick = () => {

                header.parentElement
                    .classList.toggle("open");

            };

        });

}

function bindGallery() {

    document
        .querySelectorAll(".gallery img")
        .forEach(img => {

            img.onclick = () => {

                document
                    .getElementById("lightbox")
                    .style.display = "flex";

                document
                    .getElementById("lightboxImg")
                    .src = img.src;

            };

        });

}

render();

document
    .querySelectorAll(".region-btn")
    .forEach(btn => {

        btn.onclick = () => {

            document
                .querySelectorAll(".region-btn")
                .forEach(x =>
                    x.classList.remove("active")
                );

            btn.classList.add("active");

            render(btn.dataset.region);

        };

    });

document
    .getElementById("themeBtn")
    .onclick = () => {

        document.body
            .classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
        );

    };

if (localStorage.getItem("theme") === "true") {

    document.body.classList.add("dark");

}

document
    .getElementById("lightbox")
    .onclick = () => {

        document
            .getElementById("lightbox")
            .style.display = "none";

    };

document
    .getElementById("expandAll")
    .onclick = () => {

        document
            .querySelectorAll(".day-card")
            .forEach(card =>
                card.classList.add("open")
            );

    };

document
    .getElementById("collapseAll")
    .onclick = () => {

        document
            .querySelectorAll(".day-card")
            .forEach(card =>
                card.classList.remove("open")
            );

    };

window.onscroll = () => {

    const topBtn =
        document.getElementById("backToTop");

    topBtn.style.display =
        window.scrollY > 300
            ? "block"
            : "none";

    const scroll =
        (window.scrollY /
            (document.body.scrollHeight
                - window.innerHeight)) * 100;

    document
        .getElementById("progressBar")
        .style.width =
        scroll + "%";

};

document
    .getElementById("backToTop")
    .onclick = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };
