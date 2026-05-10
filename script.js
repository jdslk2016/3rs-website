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

/* =========================================
   Awesome Interactive 3D Logo Effects
========================================= */

// 1. Magnetic Header Logo
const headerBrand = document.querySelector(".brand");
const headerLogo = document.querySelector(".brand img");

if (headerBrand && headerLogo) {
  headerBrand.addEventListener("mousemove", (e) => {
    const rect = headerBrand.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    headerLogo.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) scale(1.15)`;
    headerLogo.style.filter = `drop-shadow(${x * -0.6}px ${y * -0.6}px 15px rgba(6, 182, 212, 0.9))`;
  });

  headerBrand.addEventListener("mouseleave", () => {
    headerLogo.style.transform = `translate(0px, 0px) scale(1)`;
    headerLogo.style.filter = `drop-shadow(0 0 5px rgba(6, 182, 212, 0.4))`;
  });
}

// 2. 3D Parallax Tilt for Background Logo (with smooth Lerping)
const bgLogo = document.querySelector(".hero-media img");
if (bgLogo) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  // Track mouse globally for the background effect
  document.addEventListener("mousemove", (e) => {
    // Normalize coordinates from -1 to 1 based on screen center
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animateBgLogo() {
    // Smooth interpolation (Lerp)
    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;

    const rotateX = currentY * -30; // Tilt up/down
    const rotateY = currentX * 30;  // Tilt left/right
    const translateZ = Math.abs(currentX * currentY) * 80; // Pop out slightly towards edges
    
    // Base transform plus dynamic 3D rotation
    bgLogo.style.transform = `translateY(-50%) rotate(-5deg) perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    
    // Dynamic lighting (drop shadow moves opposite to light source/mouse)
    const shadowX = currentX * -40;
    const shadowY = currentY * -40;
    const brightness = 1 + Math.abs(currentX * 0.3); // Brighten when tilting

    bgLogo.style.filter = `grayscale(0.1) drop-shadow(${shadowX}px ${shadowY}px 40px rgba(6, 182, 212, 0.4)) brightness(${brightness})`;

    requestAnimationFrame(animateBgLogo);
  }

  // Start the animation loop
  animateBgLogo();
}

// 3. Dynamic Card Glow Effect
const cards = document.querySelectorAll('.service-card, .process-step, .project-card, .tech-layout > div');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});


