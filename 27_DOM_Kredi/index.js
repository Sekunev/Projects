//! variables

const tutar = document.querySelector("#tutar");
const vade = document.querySelector("#vade");
const tipi = document.querySelector("#krediTipi"); // kredi tipini tekrar aldık

const buton = document.querySelector("button");

// kredi tipine göre Faiz oranını bir fonksiyon ile belirledik.
const faiz = () => {
  let faizOrani;
  if (tipi.value == "konut") {
    faizOrani = 1.68;
  } else if (tipi.value == "ihtiyac") {
    faizOrani = 2.25;
  } else if (tipi.value == "arac") {
    faizOrani = 1.9;
  } else {
    alert(`Kredi Tipi Seçimi Yapınız.`);
  }
  return faizOrani;
};

// 3 rakamda bir virgül için virgül fonksiyonu.
function virgul(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const hesapla = () => {
  const faizim = faiz() / 100; // faiz oranı 100 e bölünerek formülde gerekli olan faiz oranı belirlendi
  let taksitTutari;
  taksitTutari =
    tutar.value *
    ((faizim * Math.pow(1 + faizim, vade.value)) /
      (Math.pow(1 + faizim, vade.value) - 1));
  taksitTutari.toFixed(2);
  document.getElementById("krediMiktari").innerText = virgul(tutar.value);
  document.getElementById("krediTipiTablo").innerText = tipi.value;
  document.getElementById("vadesi").innerText = vade.value;
  document.getElementById("faizOrani").innerText = faiz();
  document.getElementById("taksitTutari").innerText = virgul(
    taksitTutari.toFixed(2)
  );
  document.getElementById("genelToplam").innerText = virgul(
    (taksitTutari * vade.value).toFixed(2)
  );
  document.getElementById("plan").classList.remove("d-none");
};

buton.addEventListener("click", function (e) {
  e.preventDefault();
  hesapla();
});
