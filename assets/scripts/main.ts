import "instant.page"
import "autotrack"

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

const handleSubmit = (event: Event) => {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formDataString = new URLSearchParams(formData as any).toString();
  
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formDataString,
    })
      .then(() => {
        // Form successfully submitted
        console.log("Form successfully submitted");
        
        // Show the "send" div
        const sendDiv = document.getElementById("send");
        if (sendDiv) {
          sendDiv.style.display = "block";
        }
      })
      .catch((error) => alert(error));
  };
  
  document
    .querySelector("form")
    ?.addEventListener("submit", handleSubmit);
