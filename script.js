document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('nav button');
  const sections = document.querySelectorAll('main section');
  const poemList = document.getElementById('poem-list');
  const poemDetail = document.getElementById('poem-detail');
  const poemTitle = document.getElementById('poem-title');
  const poemText = document.getElementById('poem-text');
  let currentOpenIndex = null;
  let poesie = [];

  // Fallback: poesie statiche se il fetch fallisce
  const poesieDiDefault = [
    {
      titolo: "Io",
      testo: `Nel tramonto che sfuma lento,\nuna luce dorata si spande,\ne accende il cuore contento,\ndi speranze e di attese grandi.`
    },
    {
      titolo: "Oro e sogni",
      testo: `Tra fili d'oro e sogni persi,\ncammino lieve su sentieri,\nla mente vola e si disperde,\nin versi dolci e sinceri.`
    },
    {
      titolo: "Il silenzio d'oro",
      testo: `Nel silenzio della sera,\nuna pace d'oro si posa,\nsulle ali leggere,\ndi una notte silenziosa.`
    }
       {
      titolo: "Nei tuoi occhi",
      testo: `Nel silenzio della sera,\nuna pace d'oro si posa,\nsulle ali leggere,\ndi una notte silenziosa.`
    }
  ];

  // Caricamento poesie da file JSON
  fetch('poesie.json')
    .then(response => {
      if (!response.ok) throw new Error('File non trovato');
      return response.json();
    })
    .then(data => {
      poesie = data;
      generaListaPoesie();
    })
    .catch(err => {
      console.warn('Uso poesie di default (file non caricato):', err.message);
      poesie = poesieDiDefault;
      generaListaPoesie();
    });

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

  // Mostra dettagli poesia
  function showPoem(index) {
    if (currentOpenIndex === index) {
      poemDetail.style.display = 'none';
      currentOpenIndex = null;
    } else {
      const poem = poesie[index];
      poemTitle.textContent = poem.titolo;
      poemText.textContent = poem.testo;
      poemDetail.style.display = 'block';
      currentOpenIndex = index;
      poemDetail.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Genera lista poesie
  function generaListaPoesie() {
    poemList.innerHTML = ''; // Pulisce la lista
    poesie.forEach((poem, idx) => {
      const li = document.createElement('li');
      li.textContent = poem.titolo;
      li.addEventListener('click', () => showPoem(idx));
      poemList.appendChild(li);
    });
  }
});
