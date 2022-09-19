let check = document.querySelectorAll(".check");
let spanh2 = document.querySelector(".spanh2");
let span = document.querySelector(".spanli");
let sum = document.querySelectorAll(".sum");

// sum'ı secerken querySelectorAll ıle secersek bıze NodeList olarak donuyor.o yuzden sum tek olarak yazarsak alamayız. ancak ındexını belırtırsek verıyı alabılırız. tek elemanı oldugu ıcın sum [0] yazmamız gerekıyor.

console.log(check);
console.log(span);
console.log(spanh2);
console.log(sum);

let sayac = 0;
check.forEach((i) => {
  i.addEventListener("click", () => {
    console.log(i.nextElementSibling);
    console.log(i);
    i.classList.contains("fa-circle-check") // Class'larının içerisinde fa-circle-check varmı ? varsa true yoksa false döndür.
      ? (i.classList.add("fa-circle-xmark"),
        i.classList.remove("fa-circle-check"),
        i.classList.add("text-success"),
        i.classList.remove("text-danger"),
        i.nextElementSibling.classList.toggle("text-decoration-line-through"),
        sayac++)
      : (i.classList.add("fa-circle-check"),
        i.classList.remove("fa-circle-xmark"),
        i.nextElementSibling.classList.toggle("text-decoration-line-through"),
        i.classList.add("text-danger"),
        i.classList.remove("text-success"),
        sayac--);

    spanh2.innerHTML = `${sayac}&nbsp`;
  });
});

sum[0].innerHTML = document.querySelectorAll("ul li").length;

console.log(typeof document.querySelectorAll("ul li").length);
console.log(sum.innerHTML);
