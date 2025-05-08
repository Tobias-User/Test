document.addEventListener("DOMContentLoaded", function () {
    const config = [
      { name: "checkin", textareaId: "checkin_explain" },
      { name: "clean", textareaId: "clean_explain" },
      { name: "recommend", textareaId: "recommend_explain" },
    ];
  
    config.forEach(({ name, textareaId }) => {
      const radios = document.querySelectorAll(`input[name="${name}"]`);
      const textarea = document.getElementById(textareaId);
      textarea.disabled = true;
  
      radios.forEach(radio => {
        radio.addEventListener("change", () => {
          if (radio.value === "Ja" && radio.checked) {
            textarea.disabled = true;
            textarea.value = "";
          } else if (radio.value === "Nein" && radio.checked) {
            textarea.disabled = false;
          }
        });
      });
    });
  
    // Formularvalidierung
    document.getElementById('feedback-form').addEventListener('submit', function (e) {
      const email = document.getElementById('email').value.trim();
      const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        e.preventDefault();
        return;
      }
  
      const fieldsToValidate = [
        { radio: 'checkin', explain: 'checkin_explain', message: 'Bitte erklären Sie das Problem mit dem Check-in.' },
        { radio: 'clean', explain: 'clean_explain', message: 'Bitte erklären Sie das Problem mit der Sauberkeit.' },
        { radio: 'recommend', explain: 'recommend_explain', message: 'Bitte erklären Sie, warum Sie uns nicht empfehlen würden.' },
      ];
  
      for (let field of fieldsToValidate) {
        const noChecked = document.querySelector(`input[name="${field.radio}"][value="Nein"]:checked`);
        const explanation = document.getElementById(field.explain);
        if (noChecked && explanation.value.trim() === '') {
          alert(field.message);
          explanation.focus();
          e.preventDefault();
          return;
        }
      }
    });
  });
  