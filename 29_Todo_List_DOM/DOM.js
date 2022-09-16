const input = document.querySelector(".input");
const buton1 = document.querySelector(".buton1");
const liste = document.querySelector(".liste");
const newElement = document.createElement("ul");
const buton2 = document.querySelector(".buton2");

console.log(liste);
liste.appendChild(newElement);

function listele() {
  let listeGetir = JSON.parse(localStorage.getItem("myli"));
  // getitem ile localdeki diziyi getirdik. myli local'de string olarak saklanır. getitem ile çekildikten sonra Parse metoduyla tekrar dizi haline getirilir. liste getir'e atanır.

  newElement.innerHTML = "";

  // localStorage listeyi boşalttık
  // localden alınan listegetir dizisi for uygulanarak içindeki elemanlar innerHTML metoduyla li elemanları içine yerleştirilir.

  for (let i = 0; i < listeGetir.length; i++) {
    newElement.innerHTML += ` <li
  class="myli container w-50 border border-2 d-flex justify-content-between p-2">
  ${listeGetir[i]}
  <button id="${i}" onclick = 'elemansil("${i}")' class="buton2 border border-0 ms-5">
    <i class="fa-solid fa-trash-can"></i>
  </button>
</li>`;
  }
}

// Yukarıda eleman sil fonksiyonu içerisine ${i} kullanarak her elemanın dizideki index numarası yazılmış oldu. Böylece onclick metodu kullanıldığında eleman sil fonksiyonu çağrılacak parametre olarakta ilgili elemanın index numarasını alacak.

// Aşağıda buton1'e tıklandığında myli class'lı tüm elemanları myli değişkenine atadık. böylelikle listedeki tüm elemanlar bir dizi olarak elimize Geldi
//  daha sonra sonListe değişkenine getitems metodu ile local'de kayıtlı diziyi çektik. Daha sonra if ile dizinin içerisi dolu mu kontrol ettik ve  dizi var ise input'tan aldığımız veriyi local'den çektiğimiz diziye ekledik. Ve ismini yeni liste koyduk. ardından setitem metoduyla yeni listemizi local'e kaydettik. Else ile yani localde bir dizi yok ise inputtan aldığımız veriyi kendi başına bir dizi yapıp tek verilik diziyi local'e kaydettik. Ardından listeleyi çağırdık.

buton1.addEventListener("click", () => {
  const myli = document.getElementsByClassName("myli");

  let sonListe = JSON.parse(localStorage.getItem("myli"));

  if (sonListe) {
    let yeniListe = [input.value, ...sonListe];
    localStorage.setItem("myli", JSON.stringify(yeniListe));
    // localStorage'da sadece str saklandığı için str'ye çevrildi.
  } else {
    let yeniListe = [input.value];
    localStorage.setItem("myli", JSON.stringify(yeniListe));
  }
  listele();

  input.value = "";
  input.focus();
});

// Sayfa her yüklendiğinde listeyi tekrar oluştur dedik.

window.onload = function () {
  listele();
};

// Yukarda elemansil fonksiyonu içerisine sırayla her elemanın index numarasını sırayla koymuştuk. Artık silme butonuna tıklandığında localdeki diziyi alıyoruz silmek istediğimiz elemanın index numarasını bildiğimizden dolayı local'deki diziden splice metodu ile elemanı siliyoruz. Böylece splice metodu sonrası dizimiz güncellenmiş oluyor. ve Güncel halini setitem metodu ile local'e ekliyoruz.

function elemansil(id) {
  let listeGetir = JSON.parse(localStorage.getItem("myli"));
  listeGetir.splice(id, 1);
  localStorage.setItem("myli", JSON.stringify(listeGetir));
  listele();
}
