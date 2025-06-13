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

  // Carica poesie
  fetch('poesie.json')
    .then(response => {
      if (!response.ok) throw new Error('Impossibile caricare poesie.json');
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

  // === Gestione LIBRI ===
  const bookGallery = document.getElementById('book-gallery');
  const bookViewer = document.getElementById('book-viewer');
  const bookTitle = document.getElementById('book-title');
  const bookPage = document.getElementById('book-page');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const closeBtn = document.getElementById('close-book');

  let currentBook = null;
  let currentPage = 0;
  let libri = [];

  fetch('libri.json')
    .then(response => {
      if (!response.ok) throw new Error('Impossibile caricare libri.json');
      return response.json();
    })
    .then(data => {
      libri = data;
      libri.forEach((libro, index) => {
        const cover = document.createElement('div');
        cover.className = 'book-cover';
        cover.textContent = libro.titolo;
        cover.addEventListener('click', () => openBook(index));
        bookGallery.appendChild(cover);
      });
    })
    .catch(error => {
      console.error('Errore nel caricamento dei libri:', error);
      bookGallery.innerHTML = '<p style="color: red;">Errore nel caricamento dei libri.</p>';
    });

  function openBook(index) {
    currentBook = libri[index];
    currentPage = 0;
    updateBookView();
    bookViewer.style.display = 'block';
  }

  function updateBookView() {
    if (!currentBook) return;
    bookTitle.textContent = currentBook.titolo;
    bookPage.textContent = currentBook.pagine[currentPage];
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === currentBook.pagine.length - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateBookView();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < currentBook.pagine.length - 1) {
      currentPage++;
      updateBookView();
    }
  });

  closeBtn.addEventListener('click', () => {
    bookViewer.style.display = 'none';
    currentBook = null;
    currentPage = 0;
  });
});
