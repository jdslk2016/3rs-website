const yearElement = document.getElementById("year");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = form.querySelector('button[type="submit"]');
const revealItems = document.querySelectorAll(".reveal");

yearElement.textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  formStatus.textContent = "Sending your message...";
  formStatus.className = "form-status";
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to send message.");
    }

    form.reset();
    formStatus.textContent = "Thank you. Your inquiry has been sent successfully.";
    formStatus.classList.add("success");
  } catch (error) {
    formStatus.textContent =
      "Sorry, the message could not be sent. Please email jdslkrr@gmail.com or try again.";
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Inquiry";
  }
});
