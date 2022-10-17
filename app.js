const form = document.querySelector("form");
const btn = document.getElementById("btn2");
const input = document.getElementById("text1");

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  flaggApp();
  input.value=``;
})
const flaggApp = function(){
  const alert = document.getElementById("alert");
  let url = `https://restcountries.com/v3.1/name/${input.value}`;
  fetch(url).then(response => response.json()).then(data => update(data)).catch(err =>
    setTimeout(()=>{
      alert.innerHTML=`<div class="alert alert-danger " role="alert">
      ${input.value} City name not found
    </div>`
  },0))
  setTimeout(()=>{
    alert.innerHTML=``;
 },3000)
}
const update = (data) =>{
  console.log(data);
  const {capital,currencies,flags:{ svg },languages,name: { common },region,population,
  maps:{googleMaps}}=data[0];
  const div = document.querySelector(".containers");
  div.innerHTML =`<div class="card mx-auto m-3 shadow-lg w-50" style="width: 18rem;">
  <img src="${svg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h2 class="card-title text-center"> ${common}</h2>
    <h4><p class="card-text">Explanation: ${region}</p></h4>
  </div>
  <ul class="list-group list-group-flush fs-3 ">
    <li class="list-group-item >
    <i class="fa-solid fa-language"></i> Capital: <span class="badge bg-secondary ms-5 ">${capital}</span> 
    </li>
    <li class="list-group-item">
    <i class="fa-solid fa-language"></i> Languages:  <span class="badge bg-secondary ms-5">${Object.values(languages)}</span>
    </li>
    <li class="list-group-item">
     <i class="fa-solid fa-person-half-dress"></i> Population: <span class="badge bg-secondary ms-5">${population}</span>
    </li>
    <li class="list-group-item">
      <i class="fas fa-lg fa-money-bill-wave"></i>
      Currency unit:   <span class="badge bg-secondary ms-5">${Object.values(currencies).map((item) => Object.values(item) + " ")}</span>
   </li>
  </ul>
  <div class="card-body">
  <button type="button" class="btn btn-warning justify-content-center"><a href="${googleMaps}" target="_blank" class="card-link">${common} Location on earth </a></button>
  
  </div>`
}
