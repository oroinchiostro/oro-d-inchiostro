document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('nav button');
  const sections = document.querySelectorAll('main section');
  const poemList = document.getElementById('poem-list');
  const poemDetail = document.getElementById('poem-detail');
  const poemTitle = document.getElementById('poem-title');
  const poemText = document.getElementById('poem-text');
  let currentOpenIndex = null;

  // Navigazione tra le sezioni
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const sectionId = button.getAttribute('data-section');
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
          section.classList.add('active');
        }
      });

      if (sectionId !== 'archivio') {
        poemDetail.style.display = 'none';
        currentOpenIndex = null;
      }
    });
  });

  // Funzione per mostrare dettagli poesia
  function showPoem(poem, index) {
    if (currentOpenIndex === index) {
      poemDetail.style.display = 'none';
      currentOpenIndex = null;
    } else {
      poemTitle.textContent = poem.titolo;
      poemText.textContent = poem.testo;
      poemDetail.style.display = 'block';
      currentOpenIndex = index;
      poemDetail.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Carica le poesie da poesie.json
  fetch('poesie.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Impossibile caricare poesie.json');
      }
      return response.json();
    })
    .then(poesie => {
      poesie.forEach((poesia, idx) => {
        const li = document.createElement('li');
        li.textContent = poesia.titolo;
        li.addEventListener('click', () => showPoem(poesia, idx));
        poemList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Errore nel caricamento delle poesie:', error);
      poemList.innerHTML = '<li style="color: red;">Errore nel caricamento delle poesie.</li>';
    });
});
