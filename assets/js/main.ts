/**
 * @file
 * A TypeScript file. Runs first, before other things have loaded.
 */

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

// Readme shortcode
const detailsElements = document.querySelectorAll<HTMLDetailsElement>('#read_more_details');

detailsElements.forEach((detailsElement: HTMLDetailsElement) => {
    const previousElement = detailsElement.previousElementSibling as HTMLElement;

    if (previousElement && !previousElement.classList.contains('inline')) {
        previousElement.classList.add('inline');
    }

    detailsElement.addEventListener('toggle', () => {
        const readMore = detailsElement.querySelector('#read_more') as HTMLElement;

        if (detailsElement.open) {
            readMore.style.display = 'none';
        } else {
            readMore.style.display = 'inline';
        }
    })
});


function hideLoading(): void {
    const loadingIndicator: HTMLElement | null = document.getElementById('loadingIndicator');

    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

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
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitButton) {
            submitButton.style.backgroundColor = "green";
        }
      })
      .catch((error) => alert(error));
  };
  
  document
    .querySelector("form")
    ?.addEventListener("submit", handleSubmit);
