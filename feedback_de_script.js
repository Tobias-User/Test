// ⭐ Sternebewertung + Validierung

// Wird nach dem DOM-Load ausgeführt

document.addEventListener("DOMContentLoaded", function () {
  // ⭐ Sternebewertung pro Kategorie
  document.querySelectorAll(".star-rating").forEach(group => {
    const groupName = group.dataset.group;
    const stars = group.querySelectorAll("span");
    const label = document.getElementById(`star-label-${groupName}`);

    const meanings = {
      checkin: ["Sehr schwierig", "Schwierig", "Okay", "Einfach", "Sehr einfach"],
      room: ["Sehr schlecht", "Schlecht", "Okay", "Gut", "Ausgezeichnet!"],
      recommend: ["Auf keinen Fall!", "Eher nicht", "Vielleicht", "Eher ja", "Auf jeden Fall!"],
      overall: ["Sehr schlecht", "Unterdurchschnittlich", "Akzeptabel", "Gut", "Ausgezeichnet!"]
    };

    stars.forEach(star => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.dataset.value);

        // Sterne visuell hervorheben
        stars.forEach(s => s.classList.toggle("selected", parseInt(s.dataset.value) <= rating));

        // Label-Text setzen
        if (label && meanings[groupName]?.[rating - 1]) {
          label.textContent = `${rating} Star${rating > 1 ? "s" : ""} – ${meanings[groupName][rating - 1]}`;
        }

        // Hidden-Input setzen
        let input = document.querySelector(`input[name='${groupName}_rating']`);
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = `${groupName}_rating`;
          document.getElementById("feedback-form").appendChild(input);
        }
        input.value = meanings[groupName]?.[rating - 1] || rating;

        // Zusatzfeld anzeigen, wenn Bewertung negativ ist
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


// 📩 Validierung beim Absenden des Formulars
document.getElementById("feedback-form").addEventListener("submit", function (e) {
  const email = document.querySelector('input[name="email"]').value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !pattern.test(email)) {
    alert("Please enter a valid email address.");
    e.preventDefault();
  }
});