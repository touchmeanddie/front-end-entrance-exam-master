document.addEventListener("DOMContentLoaded", () => {
  function loadSavedData() {
      const elements = document.querySelectorAll("[contenteditable='true']");
      elements.forEach(el => {
          const id = el.id;
          if (localStorage.getItem(id)) {
              el.innerHTML = localStorage.getItem(id);
          }
      });
  }

  function saveData(id, value) {
      localStorage.setItem(id, value);
  }

  const editableElements = document.querySelectorAll("[contenteditable='true']");
  editableElements.forEach(el => {
      el.addEventListener("input", () => {
          saveData(el.id, el.innerHTML);
      });
  });

  loadSavedData();
});



document.addEventListener("DOMContentLoaded", () => {
  function createRipple(event) {
    const button = event.currentTarget;
    
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    
    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
    ripple.style.left = `${event.clientX - rect.left - ripple.offsetWidth / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - ripple.offsetHeight / 2}px`;
    
    button.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }

  const rippleElements = document.querySelectorAll(".ripple-element");
  rippleElements.forEach(el => {
    el.addEventListener("click", createRipple);
  });
  
  loadSavedData();
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const element = document.getElementById('content');
  const options = {
      margin: [0, 0, 0, 0],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(options).from(element).save();
});