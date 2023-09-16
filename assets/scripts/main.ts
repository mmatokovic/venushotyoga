import "instant.page"
import "autotrack"
import * as Turbo from "@hotwired/turbo"

Turbo.start()

const hamburger = document.getElementById("hamburger-btn");
const close = document.getElementById("close-btn");
const mobile = document.getElementById("mobile-menu") as HTMLElement;

hamburger?.addEventListener('click', () => {
    mobile.toggleAttribute("hidden");
    document.body.classList.toggle("overflow-hidden");
});

close?.addEventListener('click', () => {
    mobile.toggleAttribute("hidden");
    document.body.classList.toggle("overflow-hidden");
});

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('closeButton');

    if (popup) {
        setTimeout(() => {
            popup.classList.remove('hidden');
        }, 4000);

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                popup.classList.add('hidden');
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.classList.add('hidden');
            }
        });
    }
});