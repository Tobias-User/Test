document.addEventListener("DOMContentLoaded", function () {
  const config = [
    { name: "checkin", textareaId: "checkin_explain" },
    { name: "clean", textareaId: "clean_explain" },
    { name: "recommend", textareaId: "recommend_explain" },
  ];

  config.forEach(({ name, textareaId }) => {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    const textarea = document.getElementById(textareaId);

    // Standardmäßig deaktivieren (falls z. B. "Yes" vorausgewählt ist)
    textarea.disabled = true;

    radios.forEach(radio => {
      radio.addEventListener("change", () => {
        if (radio.value === "Yes" && radio.checked) {
          textarea.disabled = true;
          textarea.value = "";
        } else if (radio.value === "No" && radio.checked) {
          textarea.disabled = false;
        }
      });
    });
  });
});


document.getElementById('feedback-form').addEventListener('submit', function (e) {
  const email = document.querySelector('input[name="email"]').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    e.preventDefault();
    return;
  }

  const fieldsToValidate =
    [
      { radio: 'checkin', explain: 'checkin_explain', message: 'Please explain the check-in issue.' },
      { radio: 'clean', explain: 'clean_explain', message: 'Please explain the cleanliness issue.' },
      { radio: 'recommend', explain: 'recommend_explain', message: 'Please explain why you would not recommend us.' },
    ];

  for (let field of fieldsToValidate) {

    const noChecked = document.querySelector(`input[name="${field.radio}"][value="No"]:checked`);
    const explanation = document.querySelector(`textarea[name="${field.explain}"]`);

    if (noChecked && explanation.value.trim() === '') {
      alert(field.message);
      explanation.focus();
      e.preventDefault();
      return;
    }

  }
});