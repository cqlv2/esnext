// LET
console.log("\nLET\n");
let favoriteCityId="rome";
console.log(favoriteCityId);
favoriteCityId="paris";
console.log(favoriteCityId);

// CONST
console.log("\nCONST\n");
const citiesId=["paris", "nyc", "rome", "rio-de-janeiro"];
console.table(citiesId);
//citiesId=[];
citiesId.push("tokyo");
console.table(citiesId);

// CREATION D'OBJET
console.log("\nCREATION D'OBJET\n");
function getWeather(cityId){
  let city=cityId.toUpperCase();
  let temp=20;
  return{city,temp};
}
const weather=getWeather(favoriteCityId);
console.log(weather);

// AFFECTATION DESTRUCTUREE
console.log("\nAFFECTATION DESTRUCTUREE\n");
const{city:nomVille,temp:tempVille}=weather;
console.log("nom de la ville : ",nomVille);
console.log("temperature de la ville : ",tempVille);


// REST OPERATOR
console.log("\nREST OPERATOR\n");

const [parisId, nycId, ...othersCitiesId]=citiesId;
console.log(parisId);
console.log(nycId);
console.table(othersCitiesId);


console.log("\nCLASSE\n");
// • Créer une classe Trip.
class Trip{
  constructor(id, name, imageUrl){
    this.id=id;
    this.name=name;
    this.imageUrl=imageUrl;
  }
  toString(){
    return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this._price}]`;
  }

  get price(){
    return this._price;
  }
  set price(newPrice){
    this._price=newPrice;
  }

  static getDefaultTrip(){
    return new Trip("rio-de-janeiro","Rio de Janeiro","img/rio-de-janeiro.jpg");
  }

}


const parisTrip=new Trip("paris","Paris","img/paris.jpg")


console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());

parisTrip.price=100;
console.log(parisTrip.toString());

const defaultTrip=Trip.getDefaultTrip();

console.log(defaultTrip.toString());

//heritage
console.log("\nHERITAGE\n");

class FreeTrip extends Trip{
  constructor(id, name, imageUrl){
    super(id, name, imageUrl);
    this._price=0;
  }
}

freeTrip=new FreeTrip("nantes", "Nantes", "img/nantes.jpg");

console.log(freeTrip.toString());

//Promise, Set, Map, Arrow Function

console.log("\nPROMISE, SET, MAP, ARROW FUNCTION\n");

class TripService {
  constructor() {
    this.setTrip=new Set();
    this.setTrip.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
    this.setTrip.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
    this.setTrip.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));

  }
  findByName(tripName) {
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        this.setTrip.forEach((trip, i) => {
          if(trip.name==tripName) resolve(trip);
        });
      reject(`No trip with name ${tripName}`);
      }, 2000)
    });
  }
}

class PriceService {
  constructor() {
    this.priceMap=new Map();
    this.priceMap.set('paris',100)
    this.priceMap.set('rio-de-janeiro',800)
  }
  findPriceByTripId(tripId) {
  return new Promise((resolve, reject) => {
  setTimeout( () => {
    if (this.priceMap.has(tripId)) {
      resolve(this.priceMap.get(tripId))
    }
    else reject(`No price found for id ${tripId}.`)
  }, 2000)
  });
  }
}

const ts=new TripService;
const ps=new PriceService;



ts.findByName("Paris").then((trip)=>{console.log(trip);}, (err)=>{console.log(err);});
ts.findByName("Toulouse").then((trip)=>{console.log(trip);}, (err)=>{console.log(err);});
ts.findByName("Rio de Janeiro").then((trip)=>{
  ps.findPriceByTripId(trip.id).then((prix)=>{console.log(`Price found ${prix}`);},(err)=>{console.log(err);})
},(err)=>{console.log(err);});
ts.findByName("Nantes").then((trip)=>{
  ps.findPriceByTripId(trip.id).then((prix)=>{console.log(`Price found ${prix}`);},(err)=>{console.log(err);})
},(err)=>{console.log(err);});
