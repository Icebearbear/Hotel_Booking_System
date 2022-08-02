const JSONDATA = require("../booking-sys/src/data/destinations.json");

 export function newFilter(term){JSONDATA.filter((value)=>{
    if (value.term == undefined){return null;}
    return value.term.toLowerCase().includes(term.toLowerCase());
  })};

  