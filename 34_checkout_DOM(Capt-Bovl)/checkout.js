// const taxRate = 0.18;
// const shippingPrice = 15;
// const shippingFreePrice = 300;

// sayfa yüklendiğinde yukardaki değişkenleri LS' e kaydedelim.
window.addEventListener("load", () => {
  calculateCartPrice(); // calculateCartPrice en son ekledik.
  //set items to LocalStorage
  calculateCartPrice;
  // localStorage.setItem("taxRate", taxRate);
  // localStorage.setItem("shippingPrice", shippingPrice);
  // localStorage.setItem("shippingFreePrice", shippingFreePrice);

  //set items to sessionStorage
  // sessionStorage.setItem("taxRate", taxRate);
  // sessionStorage.setItem("shippingPrice", shippingPrice);
  // sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

// Capturing yapacağımız en yakın statik elemanı seçelim.(products)
const productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (e) => {
  // className ile yakalarsak class'ın tam ismini yazmalıyız. classList.contains ile classlardan herhangi birini yazsak da olur.
  if (e.target.className == "fa-solid fa-minus") {
    if (e.target.parentElement.querySelector(".quantity").innerText > 1) {
      e.target.parentElement.querySelector(".quantity").innerText--;
      calculateProductPrice(e.target);
      calculateCartPrice();
    } else {
      if (
        confirm(
          `${
            e.target.parentElement.parentElement.querySelector("h2").innerText
          } will be deleted!!!`
        )
      ) {
        //remove
        // e.target.parentElement.parentElement.parentElement.remove();

        //! closest() ile kisa yoldan secim yapilabilir. closest() metodu: belirtilen elementin parent'larin ilk uygun parent'i secer.
        e.target.closest(".product").remove();
        calculateCartPrice();
      }
    }
    // console.log("minus btn is clicked!");
  } else if (e.target.classList.contains("fa-plus")) {
    // console.log("plus btn is clicked!");
    // plus' a tıklandığında p içerisindeki sayının artması gerekiyor. ona ulaşmamız gerekli. burada previousElementSibling ile ulaştık.
    e.target.previousElementSibling.innerText++;
    calculateProductPrice(e.target);
    calculateCartPrice();
  } else if (e.target.className == "remove-product") {
    // console.log("remove btn is clicked!");
    e.target.parentElement.parentElement.parentElement.remove();
    calculateCartPrice();
  } else {
    // console.log("other element is clicked!");
  }
});

const calculateProductPrice = (btn) => {
  const productInfoDiv = btn.parentElement.parentElement;
  const price = productInfoDiv.querySelector(".product-price strong").innerText;
  const quantity = productInfoDiv.querySelector(".quantity").innerText;
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = (price * quantity).toFixed(2);

  // alert(productTotalDiv);
  console.log(productInfoDiv);
};
const calculateCartPrice = () => {
  const productsTotalPricesDivs = document.querySelectorAll(
    ".product-line-price"
  );

  //foreach kullanabilmek için ==> NodeList, Array'a ihtiyaç var. o yüzden querySelectorAll kullandık.

  let subtotal = 0;
  productsTotalPricesDivs.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });
  // console.log(subtotal);
  const taxPrice = subtotal * localStorage.getItem("taxRate");

  //?Aşağıda kargo ücreti 0-shippingFreePrice(300) arasında ise shippingPrice (15) değilse 0 olsun dedik.
  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );
  // console.log(shippingPrice);

  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping").children[1].innerText =
    shippingPrice.toFixed(2);
  document.querySelector("#cart-total").lastElementChild.innerText = (
    subtotal +
    taxPrice +
    shippingPrice
  ).toFixed(2);
};
