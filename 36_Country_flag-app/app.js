//*=========================================================
//*                     FLAG-APP
//*=========================================================
const select = document.getElementById("select")
select.addEventListener("change",(e)=> {

  console.log( e.target.value)
  fetchCountryByName(e.target.value)
})


const fetchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `
    <h2>Countries can not fetched</h2>
    <img src="./img/404.png" alt="" />
  `;
};

const renderCountries = (data) => {
  console.log(data);
  const countryDiv = document.querySelector(".countries");
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
    maps:{googleMaps}
  } = data[0];

  console.log(Object.values(languages));
  console.log(Object.values(currencies)[0].name);
  console.log(Object.values(currencies)[0].symbol);

  countryDiv.innerHTML = `
    <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
      <img src="${svg}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${common}</h5>
        <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <i class="fas fa-lg fa-landmark"></i> ${capital}
        </li>
        <li class="list-group-item">
          <i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
        </li>
        <li class="list-group-item">
          <i class="fas fa-lg fa-money-bill-wave"></i>
          ${Object.values(currencies).map((item) => Object.values(item) + " ")}
       </li>
      </ul>
 <div class="card-body text-center">
        <a href="${googleMaps}" target="_blank" class="card-link btn btn-secondary">Google Maps</a>
        
      </div>
    </div>

  `;
};



// fetch yöntemi ile;

let isError = false;
const fetchCountryByAllName = async () => {
  const url = "https://restcountries.com/v3.1/all";
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderNames(data))
    .catch((err) => console.log(err));
};


// async-await yöntemi ile;
// const fetchCountryByAllName = async () => {
//   const url ="https://restcountries.com/v3.1/all"
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       isError = true;
//     }
//     const data = await res.json();
//     renderNames(data);
//   } catch (error) {
//     console.log(error)
//   }
// }


const renderNames = (data)=> {
  const select = document.getElementById("select");
  if(isError) {
    document.querySelector("body") += `
      <h2>News Can not be fetched</h2>
      <img src="./img/404.png" alt="" />
    `;
    return;
  }
  data.forEach((item)=> {
    
    select.innerHTML += `
    <option value="${item.name.common}">${item.name.common}</option>
    `;
  })
  console.log(data)

}

fetchCountryByName("turkey");
fetchCountryByAllName()

