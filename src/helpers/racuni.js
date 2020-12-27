
export function roundUp(cijena) {
  let cijenaInt = Math.ceil(cijena);
  const stepenDesetke = Math.pow(10, cijenaInt.toString().length - 1);
  cijenaInt = cijenaInt / stepenDesetke;
  cijenaInt = Math.ceil(cijenaInt);
  cijenaInt = cijenaInt * stepenDesetke;

  return cijenaInt;
}
