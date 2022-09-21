//! Local stroge'nin özellikleri.:
// ?-Kullanımı kolay
//? -String Depolama-
//? Küçük boyutlu
//? - depolama alanı olduğu için DOM alı gibi sayfa yenilendiğinde veriler silinmez.

//! Local strojde saklanacaklar:
// Aşağıdakiler JSON formatında -->
// ama bu işlemleri Lokalstroge'de yapmak mantıklı değil dışarıda yapıp LS' atmak daha mantıklı.
//? 1- Text listesi,
//? 2- Completed mı değlmi. yani tamamlandımı tamamlanmadımı verisi.Completed
//? 3- Her öğe ayrıca silineceği için öğelere özel uniq İd
//* ======================================================
//*                     TODO APP
//* ======================================================
// todo 1
//?Selectors
const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");
// todo 1

// todo 5
// todos dizisini localStorage'daki veriler ile guncelle
//! eger localStroge'de todos adinda bir item bulunmaz ise Short-circuit yöntemi ile bos array atamasi yap.
// JSON.parse ile LS'de string halindeki verileri Array'ya çevirdik.

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
console.log(todos);
// todo 5

// todo 6
//? renderSavedTodos fonksiyonunun amacı todos içinde dolaş, içerisindeki herbir todo(bu ismi elemanlarına biz verdik.) ya ulaş, bu elemanlara (todo) aşağıda daha önce tanımladığımız createListElement fonksiyonunu çağır ve her todo'yu ona parametre olarak gönder. (createListElement fonksiyonunun görevi : aldığı objeyi DOM'a yazdırmaktı.)

const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};

// fonksiyonu çağırarak sayfa her yenilendiğinde LS'deki verilerin DOM'a yazdırılmasını sağlamış olduk.
renderSavedTodos();
// todo 6

// todo 2
//? girilen veriyi objeye çevirelim.
addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("PLease enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      // id'ye milisaniye cinsinden uniq bir değer vermiş olduk.
      completed: false,
      text: todoInput.value,
    };

    // todo 2
    //! yeni bir li elementi olusturup bunu DOM'a bas
    createListElement(newTodo);
    // todo 6 devamı
    //?Yeni olusturulan todo'yu diziye sakla
    todos.push(newTodo);

    // stringleştirdiğimiz todos arrayı her eklemeden sonra local S atıyoruz.
    localStorage.setItem("TODOS", JSON.stringify(todos));
    console.log(todos);
    // todo 6 devamı
    todoInput.value = "";
  }
});

// todo 3

function createListElement(newTodo) {
  const { id, completed, text } = newTodo; //!destr. functıonnın sonunda yazıldı...
  //! her bır newtodo ıcerısını gırecek olan li elemanı 1 tane check bır tane text bır de de trash dan olusturgu ıcın. bu elemanları tek tek oluasturup ıcerısıne ıd degerı ve completed class ataması yapacagız.
  //? yeni bir li elementi olustur ve bu elemente obje icerisindeki
  //? id degerini ve completed class'ini ata

  const li = document.createElement("li");
  // li.id = newTodo.id;

  li.setAttribute("id", id); //li nın ıd sını bu sekılde atayabılırız. set Attribute

  //!bunu tum elemanlar olusturulup baglantı yapıldıktan sonra yazdık!!! css de hazırlamıs oldugumuz bır completed classını (kı yukarıdakı objede default olarak false seklınde tanımlamamız gerekıyor. bız ıstedıgımız zaman bu class calıssın syle verılsın. yazı degıssın,ustu cızelsın vs vs... UNUTMA; zaten bır style degısıklıgı genelde bu sekılde yapılıyor. oncesınde bır classı css de hazırlıyorsunuz. bunu bır yere baglı tutuyorsunuz. true olursa bunu cagırıyorsunuz. false ıse zaten bu styleler kullanmıyorsunuz.) true-flas sartına gore li ye ekleyıp-cıkartmayı yazıyoruz asagıda. ternary ıl ede yapılır. 2.sı de short cırcus yontemıyle yapılabılır. (sagındakı true ıse && solundakıkını yap)
  // newTodo.completed ? li.classList.add("completed") : "";
  // todo li oluşturulduktan sonra bu şekilde oluşturuldu.

  completed && li.classList.add("checked");
  //? okey ikonu olustur ve li elementine bagla
  const okIcon = document.createElement("i"); //olusturduk
  okIcon.setAttribute("class", "fas fa-check"); // bu class kendısıne kazandırdık
  li.appendChild(okIcon); //bunu lı nın bır cocugu yaptık. ona bagladık
  //? todo basligi icin bir p elementi ve yazi dugumu olusturarak li'ye bagla
  const p = document.createElement("p"); //burda sadece ıcı bos bır p elementı olustu.
  const pTextNode = document.createTextNode(text); //bunun ıcerıgını bır dugum olusturarak yapıyoruz
  p.appendChild(pTextNode); //bu dugumu bos olan p nın bır cocugu yaptık. ona bagladık. p nın ıcı oldu
  li.appendChild(p); //ıcı dolu hale helmıs p yı---> lı nın bır cocugu yaptık. ona bagladık
  //? delete ikonu olustur ve li elementine bagla... yukarıda yaptıgımız gıbı
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);
  console.log(li);
  //? meydana gelen li elementini ul'ye child olarak ata
  todoUl.appendChild(li);
}
// todo 3

// todo 4
//! Ul elementinin cocuklarindan herhangi birisinden bir event gelirse
//! bunu tespit et ve gerekini yap. (Capturing)
todoUl.addEventListener("click", (e) => {
  console.log(e.target);

  // todo 7-1
  //  li elementinin getAttribute'nu (id) oku.
  //? id değişkeni e.target metodu ile tanımlandığı için sadece tıklanan trash'ın id'sini döndürür.
  const id = e.target.parentElement.getAttribute("id");
  // todo 7-1

  //! event, bir delete butonundan geldi ise
  if (e.target.classList.contains("fa-trash")) {
    //? delete butonunun parent'ini DOM'dan sil
    e.target.parentElement.remove();

    // aşağıdaki kısmı(else if'e kadar olan bölüm.) anlamak için önce  // todo 5'i incele.
    // todo 7
    //? Dizinin ilgili elementini LS'den sil
    //* todos arrayına git. elemenlarını (todo --> obje'dir.) dolaş, key'i id olanlardan value'si id'ye eşit olmayanları  getir. gelen değerleri tekrar todos değişkenine ata. (todos güncellenmiş oldu.)
    // id değişkenini if blogunun üzerinde tanımlamıştık.
    todos = todos.filter((todo) => todo.id !== Number(id));

    //? yukarda silme işlemini gerçekleştirdikden sonra todos dizisinin son halini localStorage'e sakla
    localStorage.setItem("TODOS", JSON.stringify(todos));
    // todo 7
  } else if (e.target.classList.contains("fa-check")) {
    //! event, bir okey butonundan geldi ise
    //? ilgili li elementinde checked adinda bir class'i varsa bunu sil
    //?  aksi takdirde ekle (DOM)
    e.target.parentElement.classList.toggle("checked");
    // console.log(e.target.parentElement);

    // todo 7-2

    //? yukarda else if bloğunda DOM'daki e.target.parentElement (li)'ye toggle ile checked clasını vererek kırmızı veya yeşil olmasını sağladık. aynı şeyin LS de de yapmamız derekli. aşağıda da bunu yaptık.

    let todosChecked = todos.filter((todo) => todo.id === Number(id));
    if (todosChecked[0].completed == true) {
      todosChecked[0]["completed"] = false;
    } else {
      todosChecked[0]["completed"] = true;
    }

    // todosChecked[0]["completed"]

    console.log(todos);
    console.log(todosChecked);
    console.log(todosChecked[0]);
    // sonrasındada yaptığımız değişiklikleri tekrar LS'ye localStorage.setItem ile gönderdik.
    localStorage.setItem("TODOS", JSON.stringify(todos));
    // todo 7-2
  }
});
// todo 4

//? Enter tusu ile ekleme mumkun olsun
todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

//? Baslangicta input aktif olsun
window.onload = function () {
  todoInput.focus();
};
