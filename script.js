document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  let index = 0;
  let isScrolling = false;

  function scrollToIndex(i) {
    if (i < 0 || i >= sections.length) return;
    isScrolling = true;
    sections[i].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      isScrolling = false;
    }, 800); // ajustar si querés más suave o rápido
  }

  function showVisible() {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        sec.classList.add("visible");
      } else {
        sec.classList.remove("visible");
      }
    });
  }

  // Inicial
  showVisible();

  window.addEventListener("wheel", e => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
      index++;
    } else {
      index--;
    }

    index = Math.max(0, Math.min(index, sections.length - 1));
    scrollToIndex(index);
  });

  window.addEventListener("scroll", showVisible);
});

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

document.addEventListener('DOMContentLoaded', () => {
  fetch('invitados.csv')
    .then(response => response.text())
    .then(csvText => {
      const lines = csvText.trim().split('\n');
      const select = document.getElementById('invitadoSelect');

      // Saltamos el encabezado si lo hay
      lines.slice(1).forEach(line => {
        const nombre = line.trim();
        if (nombre) {
          const option = document.createElement('option');
          option.value = nombre;
          option.textContent = nombre;
          select.appendChild(option);
        }
      });
    })
    .catch(error => {
      console.error('Error al cargar el CSV:', error);
    });
});