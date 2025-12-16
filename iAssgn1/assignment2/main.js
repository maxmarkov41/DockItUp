var generateBtn = document.getElementById('CoolBtn');
generateBtn.addEventListener('click', fetchData);
var span = document.getElementById("CoolSpan");
function fetchData() {
  fetch('/api/')
    .then(async function (response) {
        txt = document.createTextNode(await response.text());
        console.log('yes');
        span.appendChild(txt);
    })
    .catch(function (err) {
      console.log('Fetch Error: ', err);
    });
}