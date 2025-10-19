document.addEventListener("DOMContentLoaded", () => {
  const deleteForms = document.querySelectorAll(".delete-form");

  deleteForms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault(); // Prevent immediate form submission

      const noteCard = form.closest(".note-card");
      noteCard.classList.add("fade-out"); // trigger CSS animation

      // Wait for animation to finish, then submit form
      setTimeout(() => {
        form.submit();
      }, 300); // match CSS transition duration
    });
  });
});
