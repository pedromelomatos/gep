const infosVideos = [
    { src: "imagens/video1.mp4", label: "Ambiente de Estudos" },
    { src: "imagens/video2.mp4", label: "Ambiente de Trabalho" },
];

// 1º Criar os objetos para os elementos que serão manipulados:
const arrayNavLinks = document.querySelectorAll('nav ul li a');
const arrayFadeIn = document.querySelectorAll('.fadeIn');
const arraySlides = [];

const objTopBtn = document.getElementById('topBtn');
const objCarrossel = document.querySelector('.carrosselVideos');
const objBtnProx = document.querySelector('.btnProx');
const objBtnAnt = document.querySelector('.btnAnt');
const objInputTel = document.getElementById("telefone");
const objFormBtn = document.getElementById("btnform");

let numSlide = 0;

// 2º Adicionar os eventos para chamar as funções:
objInputTel.addEventListener("input", function () {
    funFormatarTelefone(this);
});

for (const objLink of arrayNavLinks) {
    objLink.addEventListener('click', function (event) {
        funScrollSuave(event, this);
    });
}

window.addEventListener('scroll', funExibeBtnTopo);
objTopBtn.addEventListener('click', funVoltarTopo);
objBtnProx.addEventListener('click', funProximoSlide);
objBtnAnt.addEventListener('click', funSlideAnterior);

objFormBtn.addEventListener("click", function () {
    alert("Formulário enviado com sucesso! Entraremos em contato em breve.");
});

const observer = new IntersectionObserver(function (entries) {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    }
});

for (const elementoFade of arrayFadeIn) {
    observer.observe(elementoFade);
}

// 3º Declarar as funções para executar as ações:
function funFormatarTelefone(objInput) {
    let valor = objInput.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    let formatado = "";
    if (valor.length > 0) formatado += "(";
    if (valor.length >= 1) formatado += valor.slice(0, 2);
    if (valor.length >= 2) formatado += ") ";
    if (valor.length >= 7) {
        formatado += valor.slice(2, 7) + "-" + valor.slice(7);
    } else if (valor.length > 2) {
        formatado += valor.slice(2);
    }

    objInput.value = formatado;
}

function funScrollSuave(event, link) {
    event.preventDefault();
    const destino = document.querySelector(link.getAttribute('href'));
    if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
    }
}

function funExibeBtnTopo() {
    objTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
}

function funVoltarTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function funAlertaVideo() {
    alert('Você começou a assistir um vídeo.');
}

function funCarregaCarrossel() {
    for (let i = 0; i < infosVideos.length; i++) {
        const info = infosVideos[i];

        const objSlide = document.createElement('div');
        objSlide.classList.add('slide');
        if (i === 0) objSlide.classList.add('ativo');

        const objVideo = document.createElement('video');
        objVideo.setAttribute('src', info.src);
        objVideo.setAttribute('controls', true);
        objVideo.addEventListener('play', funAlertaVideo, { once: true });

        const objLegenda = document.createElement('p');
        objLegenda.innerText = info.label;

        objSlide.appendChild(objVideo);
        objSlide.appendChild(objLegenda);

        objCarrossel.appendChild(objSlide);
        arraySlides.push(objSlide);
    }
}

function funExibeSlide(indice) {
    for (let i = 0; i < arraySlides.length; i++) {
        const slide = arraySlides[i];
        const video = slide.querySelector('video');
        if (video) video.pause();

        slide.classList.toggle('ativo', i === indice);
        slide.style.zIndex = i === indice ? 1 : 0;
        slide.style.opacity = i === indice ? 1 : 0;
    }
}

function funProximoSlide() {
    numSlide = (numSlide + 1) % infosVideos.length;
    funExibeSlide(numSlide);
}

function funSlideAnterior() {
    numSlide = (numSlide - 1 + infosVideos.length) % infosVideos.length;
    funExibeSlide(numSlide);
}

funCarregaCarrossel();