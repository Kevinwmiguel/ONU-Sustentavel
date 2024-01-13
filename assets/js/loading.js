let loaderInterval;

function showLoading() {
    // Mostrar o loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    // Iniciar uma animação de loader
    let rotation = 0;
    loaderInterval = setInterval(() => {
      loader.style.transform = `rotate(${rotation}deg)`;
      rotation += 5;
    }, 50);
  }

  function hideLoading() {
    // Esconder o loader
    const loader = document.querySelector('.loader');
    if (loader) {
      document.body.removeChild(loader);
      clearInterval(loaderInterval);
    }
  }