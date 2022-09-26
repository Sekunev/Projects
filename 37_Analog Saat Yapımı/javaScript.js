const sec = document.querySelector(".secs");
const min = document.querySelector(".mins");
const hours = document.querySelector(".hours");

function tiktak() {
  let second = new Date().getSeconds();
  let minute = new Date().getMinutes();
  let hour = new Date().getHours();
  console.log(second, minute, hour);

  sec.style.transform = `rotate(${180 + second * 6}deg)`; // 180 diyerek 12 ye getirdik yelkovanı.Her sn 6 derece dönecek
  min.style.transform = `rotate(${180 + minute * 6}deg)`; // 360deg / 60sn = 6 deg/sn   =>   her sn de 6deg dönmesi gerek
  hours.style.transform = `rotate(${180 + hour * 30}deg)`; // 360deg / 12hour = 30 deg/hour  =>  her hour da 30deg dönmesi gerek

  console.log(second, minute, hour);
}

setInterval(tiktak, 1000); // tiktak fonksiyonumu her sn de oynatacağım

// document
//   .querySelector(".clock")
//   .addEventListener("mousemove", arkaPlanRengiDegistir);

// function arkaPlanRengiDegistir(e) {
//   document.querySelector(".clock").style.backgroundColor = `rgb(${
//     e.clientX % 255
//   }, ${e.clientY % 255}, ${(e.clientX + e.clientY) % 255})`;
// }
