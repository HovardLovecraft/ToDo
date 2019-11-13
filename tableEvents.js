let table = document.getElementById('StarWarsTable');

let selectedTd;

table.onclick = function(event) {
  let target = event.target;

  while (target != this) {
    if (target.tagName == 'TD') {
      alert(target);
    }
    target = target.parentNode;
  }
}