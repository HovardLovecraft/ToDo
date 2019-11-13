class Planet {
    element
    constructor(name, planetURL){
        this.name = name;
        this.planetURL = planetURL;
        this.init()
    }
    init(){
        this.element = document.createElement('option');
        this.element.innerHTML = this.name;
    }
}



class Hero {
  element;
  constructor(name, planets, starShips, isOnShip, heroURL){
      this.name = name; //string
      this.planets = planets; // []
      this.starShips = starShips; // []
      this.isOnShip = false; // bool
      this.heroURL = heroURL; // string
      this.init();
  }

  //methods
  init(){
      this.element = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.innerHTML = this.name;
      const tdPlanet = document.createElement('td');
      const selectPlanet = document.createElement('select');
      // selectPlanet.setAttribute('name', this.name);
      for (let i = 0; i < this.planets.length; i++) {
          selectPlanet.appendChild(this.planets[i].element);
      }
      // this.planets.forEach((planet) => selectPlanet.appendChild(planet.element));
      this.element.appendChild(tdName);
      tdPlanet.appendChild(selectPlanet);
      this.element.appendChild(tdPlanet);
  }
}

class Game {
  element;
  constructor() {
      this.init()
  }

  init() {
      const element = document.getElementById('game');
      const table = document.createElement('table');
      const theadHeroes = document.createElement('thead');
      const theadPlanets = document.createComment('thead');
      const tbody = document.createElement('tbody');
      const tr = document.createElement('tr');
      const thName = document.createElement('th');
      const thPlanet = document.createElement('th');
      thName.innerHTML = 'Hero Name';
      thPlanet.innerHTML = 'Planet Name';
      tr.appendChild(thName);
      theadHeroes.appendChild(tr);
      tr.appendChild(thPlanet);
      
      
      table.appendChild(theadHeroes);
      table.appendChild(tbody);
      element.appendChild(table);
      this.element = tbody;
      Promise.all([
          httpGetJSON('https://swapi.co/api/people/'),
          httpGetJSON('https://swapi.co/api/planets/')])
          .then(([heroes, planets]) => {
              planets = planets.results.map((planet) => new Planet(planet.name));
              setTimeout(() => {
                planets.forEach(p => console.log(p.element.innerHTML));
              heroes = heroes.results.map((hero) => new Hero(hero.name, planets));
              heroes.forEach((hero) => this.render(hero.element));
              }, 100);
          });

  }

  render(el) {
      this.element.appendChild(el);
  }

  alertName(obj){
    alert(obj.name);
  }
}

const game = new Game();





class Starship {
  constructor(name, speed, starShipURL){
      this.name = name;
      this.speed = speed;
      this.starShipURL = starShipURL;
  }
  fly() {
      Hero.isOnShip = true;
  }
}

function httpGetJSON(url) {

  return new Promise(function(resolve, reject) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(JSON.parse(this.response));

      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}

//   httpGetJSON('https://swapi.co/api/people/')
//   .then(
//     (data) => Promise.all((data).results.forEach(console.log(data.results)))
//   )
//   .then(
//     (results) => Promise.all((results).forEach(console.log(data.name)))
// )




// Logging starships of selected Hero
//   httpGet('https://swapi.co/api/people/1/')
//   .then(
//     (data) => Promise.all((data).starships.map((url) => httpGet(url)))
//   )
//   .then(
//       (data) => data.forEach(starship => console.log((starship).name)),
//       (err) => console.error(err)
//   );



// httpGetJSON('https://swapi.co/api/people/')
//     .then((heroes) => heroes.results.map((hero) => new Hero(hero.name)))
//     //.then((heroes) => console.log(heroes))
//     // .then((heroes) => heroes.forEach((hero) => hero.init()))
//     .then((heroes) => heroes.forEach((hero) => this.render(hero.element)));
// httpGetJSON('https://swapi.co/api/planets/')
//     .then((planets) => planets.results.map((planet) => new Planet(planet.name)))
//     .then((planets) => planets.forEach((planet) => this.render(planet.element)));
//     //.then((planets) => console.log(planets))
