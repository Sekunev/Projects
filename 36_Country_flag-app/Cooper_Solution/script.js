let countrys = [];

const fetchCountryAll = () => {
  const url = `https://restcountries.com/v3.1/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderCountries(data));
};

const countryList = document.querySelector(".countryList");
const renderCountries = (data) => {
  console.log(data);

  // ülke isimlerini alfabatik olarak sıralamak için;
  let names = data.map((data) => data.name.common).sort();
  // console.log(names);
  names.forEach((item) => {
    countryList.innerHTML += `<option class="sm-fs-6" value="${item}">${item}</option>`;
  });

  // sıralamadan direk almak için
  //   data.forEach(item => {
  //  ;
  //     countryList.innerHTML += `<option value="${item.name.common}">${item.name.common}</option>`;
  //   });

  countrys = data;
  // console.log(countrys);
};

fetchCountryAll();

countryList.addEventListener("change", () => {
  infoCountries(countryList.value);
});

const infoCountries = (cName) => {
  console.log(cName);
  let info = countrys.filter((item) => item.name.common == cName);
  console.log(info);

  const countryDiv = document.querySelector(".countries");
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
    maps: { googleMaps },
  } = info[0];

  console.log(typeof common);
  console.log(typeof capital);
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
          <i class="fas fa-lg fa-money-bill-wave"></i> ${
            Object.values(currencies)[0].name
          },

          ${Object.values(currencies)[0].symbol},

        </li>
      </ul>
      <div class="card-body text-center">
        <a href="${googleMaps}" class="card-link">Google Maps</a>
      </div>
    </div>  `;
};
