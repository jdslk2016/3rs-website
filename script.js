const yearElement = document.getElementById("year");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = form.querySelector('button[type="submit"]');

yearElement.textContent = new Date().getFullYear();

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
