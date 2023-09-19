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

const contactForm = document.getElementById('contact') as HTMLFormElement;
const contactSubmitButton = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement;

// Add an event listener to the form submission
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  // Update the submit button text to "Sending..."
  contactSubmitButton.textContent = 'Sending...';
  contactSubmitButton.style.backgroundColor = 'green';

  // Simulate a delay to mimic server-side processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Clear all form fields
  contactForm.reset();

  // Update the submit button text to "Sent"
  contactSubmitButton.textContent = 'Sent';
  contactSubmitButton.style.backgroundColor = '';
});

const form = document.getElementById('newsletter') as HTMLFormElement;
const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

// Add an event listener to the form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  // Update the submit button text to "Sending..."
  submitButton.textContent = 'Sending...';
  submitButton.style.backgroundColor = 'green';

  // Simulate a delay to mimic server-side processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Clear all form fields
  form.reset();

  // Update the submit button text to "Sent"
  submitButton.textContent = 'Sent';
  submitButton.style.backgroundColor = '';
});