// *** Selectors ***

const minus = document.querySelectorAll("#btnminus");
const plus = document.querySelectorAll("#btnplus");
const remove = document.querySelectorAll("#btnrmv");
const prototal = document.querySelectorAll("#protot");
const unit_price = document.querySelector("#unit-price");
const shipping = document.querySelectorAll("#shipping");
// console.log(prototal[0]);

let sum = 0.0;
// sayfa yüklendiğinde tüm ürünlerden 1 adet seçili geldiği için sum başlangıç değeri ürünlerin 1'er adet fiyatlarının toplanmış hali olmalı.

function shipCount(sum) {
  /*! 0-200          19
        201 - 400        29
        401- 600         39
        601          kargo bedava
    */
  if (sum > 0 && sum < 20) {
    return 2.0;
  } else if (sum >= 20 && sum < 40) {
    return 3.0;
  } else if (sum >= 40 && sum < 60) {
    return 4.0;
  } else {
    return 0.0;
  }
}

// ** plus tuşu ile yapılacaklar.
plus.forEach((item) => {
  item.addEventListener("click", () => {
    //* plus'a her bastığımızda önceki kardeş 1 artsın.
    ++item.previousElementSibling.textContent;

    //*Product Total hesaplama
    // tek ürün fiyatını price'a eşitledik.
    // let price = +unit_price.textContent;
    // price oluşturmanın farklı yöntemi.
    let price =
      +item.parentElement.previousElementSibling.children[1].children[0]
        .textContent;

    console.log(price);
    // tek ürün fiyatı ile alınacak ürün miktarını çarparak ürün toplam fiyatını bulduk.
    let productTotal = item.previousElementSibling.textContent * price;

    //Product Total değerinin yazılı olduğu span'a ulaşıp productTotal'e eşitlememiz gerekiyor aşağıdaki gibi eşitleme yaparsak ilk gördüğü prototali yani ilk kartın bilgilerini değiştirir. bunu engellemek için diğer yöntem nextElementSibling children  yöntemini kullanmalıyız.

    // prototal[0].innerHTML = productTotal; // çalışmaz.

    // eşitlemenin farklı yöntemi.
    item.parentElement.nextElementSibling.nextElementSibling.children[0].innerHTML =
      productTotal;

    //*Subtotal hesaplama
    sum = sum + price;

    document.querySelector("#subtotal").innerHTML = "$" + sum.toFixed(2);

    //*Tax hesaplama
    let tax = (sum * 0.18).toFixed(2);
    document.querySelector("#tax").innerHTML = "$" + tax;

    //Shipping hesaplama
    document.querySelector("#shipping").innerText =
      "$" + shipCount(sum).toFixed(2);

    //* ALLtotal hesaplama
    allTotal = sum + +tax + shipCount(sum); //shipping//

    document.querySelector("#total").innerHTML = "$" + allTotal.toFixed(2);
  });
});
// ** minus tuşu ile yapılacaklar.
minus.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.nextElementSibling.textContent > 0) {
      --item.nextElementSibling.textContent;
      console.log(item.nextElementSibling);

      let price =
        +item.parentElement.previousElementSibling.children[1].children[0]
          .textContent;

      productTotal = item.nextElementSibling.textContent * price;

      console.log(price);
      item.parentElement.nextElementSibling.nextElementSibling.children[0].innerHTML = ` ${productTotal}`;

      //*Subtotal hesaplama
      sum = sum - price;

      document.querySelector("#subtotal").innerHTML = "$" + sum.toFixed(2);

      //*Tax hesaplama
      tax = (sum * 0.18).toFixed(2);
      document.querySelector("#tax").innerHTML = "$" + tax;

      //Shipping hesaplama
      document.querySelector("#shipping").innerHTML =
        "$" + shipCount(sum).toFixed(2);

      //* ALLtotal hesaplama
      allTotal = sum + +tax + shipCount(sum); //shipping//
      document.querySelector("#total").innerHTML = "$" + allTotal.toFixed(2);
    }
  });
});
// ** remove ile yapılacaklar.
remove.forEach((item) => {
  item.addEventListener("click", () => {
    item.parentElement.parentElement.remove();

    sum = sum - +item.nextElementSibling.children[0].textContent;

    console.log(sum);
    console.log(shipCount(sum));
    //*Subtotal hesaplama
    document.querySelector("#subtotal").innerHTML = "$" + sum.toFixed(2);

    //*tax hesaplama
    tax = +(sum * 0.18).toFixed(2);
    document.querySelector("#tax").innerHTML = "$" + tax.toFixed(2);

    //* Shipping ALLtotal hesaplama
    if (tax == 0) {
      allTotal = sum + tax;
      document.querySelector("#total").innerHTML = "$" + allTotal.toFixed(2);
      document.querySelector("#shipping").textContent =
        "$" + shipCount(sum).toFixed(2);
    } else {
      allTotal = sum + +tax + shipCount(sum);
      document.querySelector("#total").innerHTML = "$" + allTotal.toFixed(2);
    }
  });
});

shipCount(sum);
