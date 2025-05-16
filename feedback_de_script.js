// ⭐ Sternebewertung + Validierung

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".star-rating").forEach(group => {
    const groupName = group.dataset.group;
    const stars = group.querySelectorAll("span");
    const label = document.getElementById(`star-label-${groupName}`);

    const meanings = {
      checkin: ["Sehr schwierig", "Schwierig", "Okay", "Einfach", "Sehr einfach"],
      room: ["Sehr schlecht", "Schlecht", "Okay", "Gut", "Ausgezeichnet!"],
      recommend: ["Auf keinen Fall", "Eher nicht", "Vielleicht", "Eher ja", "Auf jeden Fall"],
      overall: ["Sehr schlecht", "Unterdurchschnittlich", "Akzeptabel", "Gut", "Ausgezeichnet!"]
    };

    stars.forEach(star => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.dataset.value);

        stars.forEach(s => s.classList.toggle("selected", parseInt(s.dataset.value) <= rating));

        if (label && meanings[groupName]?.[rating - 1]) {
          label.textContent = `${rating} Stern${rating > 1 ? "e" : ""} – ${meanings[groupName][rating - 1]}`;
        }

        let input = document.querySelector(`input[name='${groupName}_rating']`);
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = `${groupName}_rating`;
          document.getElementById("feedback-form").appendChild(input);
        }
        input.value = meanings[groupName]?.[rating - 1] || rating;

        const explain = document.getElementById(`${groupName}_rating_explain`);
        if (explain) {
          if (rating <= 3) {
            explain.style.display = "block";
            explain.required = true;
          } else {
            explain.style.display = "none";
            explain.required = false;
            explain.value = "";
          }
        }
      });
    });
  });
});

document.getElementById("feedback-form").addEventListener("submit", function (e) {
  const email = document.querySelector('input[name="email"]').value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const overallInput = document.querySelector("input[name='overall_rating']");
  if (!overallInput || overallInput.value.trim() === "") {
    alert("Bitte bewerten Sie den Gesamtaufenthalt (Gesamtnote).");
    e.preventDefault();
    return;
  }

  if (!email || !pattern.test(email)) {
    alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    e.preventDefault();
  }
});
