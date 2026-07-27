// Catalogul magazinului, introdus manual dupa fotografiile rafturilor (iulie 2026).
// Câmpul "hipomak" = true doar pentru produsele identificate vizual ca fiind
// de la producătorul turc Hipomak Hydraulic (cutii/marcaj "hipomak" pe piesă).
// Pentru restul pieselor Hipomak (PTO, pompe) codul exact din catalogul PDF
// Hipomak nu a putut fi confirmat inca - vezi nota din antetul paginii.

const PRODUCTS = [
  // Robinete hidraulice (ball valves)
  { id: "rb-12-3c", name: 'Robinet hidraulic 1/2" 3 căi', category: "robinete", code: "3 canale", price: 2760, image: "images/robinete-3cai.jpg", tags: [] },
  { id: "rb-14-3c", name: 'Robinet hidraulic 1/4" 3 căi', category: "robinete", code: "3 canale", price: 1550, image: "images/robinete-3cai.jpg", tags: [] },
  { id: "rb-38-3c", name: 'Robinet hidraulic 3/8" 3 căi', category: "robinete", code: "3 canale", price: 1350, image: "images/robinete-3cai.jpg", tags: [] },
  { id: "rb-brevini", name: "Robinet Brevini", category: "robinete", code: "", price: 18000, image: "images/robinete-3cai.jpg", tags: ["Brevini"] },
  { id: "rb-motorina", name: "Robinet motorină", category: "robinete", code: "", price: 950, image: "images/robinete-3cai.jpg", tags: [] },

  // Mufe de cuplare rapidă
  { id: "mufa-1in", name: 'Mufă cuplare 1"', category: "mufe", code: "", price: 2700, image: "images/mufe-cuplare-1.jpg", tags: [] },
  { id: "mufa-112in", name: 'Mufă cuplare 1" 1/2', category: "mufe", code: "", price: 4150, image: "images/mufe-cuplare-1.jpg", tags: [] },
  { id: "mufa-hyva", name: 'Mufă cuplare Hyva 1"', category: "mufe", code: "", price: 3000, image: "images/mufe-cuplare-1.jpg", tags: ["Hyva"] },
  { id: "mufa-34a", name: 'Mufă cuplare 3/4"', category: "mufe", code: "Oleocon", price: 2500, image: "images/mufe-cuplare-oleocon.jpg", tags: ["Oleocon"] },
  { id: "mufa-12-38", name: 'Mufă cuplare 1/2" - 3/8"', category: "mufe", code: "Oleocon", price: 1850, image: "images/mufe-cuplare-oleocon.jpg", tags: ["Oleocon"] },
  { id: "mufa-34b", name: 'Mufă cuplare 3/4" (var. 2)', category: "mufe", code: "Oleocon", price: 1850, image: "images/mufe-cuplare-oleocon.jpg", tags: ["Oleocon"] },
  { id: "mufa-1inb", name: 'Mufă cuplare 1" (var. 2)', category: "mufe", code: "Oleocon", price: 2500, image: "images/mufe-cuplare-oleocon.jpg", tags: ["Oleocon"] },
  { id: "mufa-114in", name: 'Mufă cuplare 1" 1/4', category: "mufe", code: "Oleocon", price: 3500, image: "images/mufe-cuplare-oleocon.jpg", tags: ["Oleocon"] },
  { id: "mufa-1inc", name: 'Mufă cuplare 1" (var. 3)', category: "mufe", code: "Oleocon", price: 2700, image: "images/mufe-cuplare-oleocon.jpg", tags: ["Oleocon"] },
  { id: "mufa-12in", name: 'Mufă cuplare 1/2"', category: "mufe", code: "Ferro", price: 1000, image: "images/mufe-ferro-remorca.jpg", tags: ["Ferro"] },
  { id: "mufa-remorca", name: "Mufă cuplare remorcă", category: "mufe", code: "", price: 500, image: "images/mufe-ferro-remorca.jpg", tags: [] },
  { id: "mufa-aer-remorca", name: "Mufă aer remorcă", category: "mufe", code: "", price: 125, image: "images/mufe-ferro-remorca.jpg", tags: [] },

  // Joystick-uri si butoane de comanda
  { id: "joy-extra-pto", name: "Comandă extra PTO", category: "joystick", code: "", price: 1500, image: "images/joystick-comenzi.jpg", tags: [] },
  { id: "joy-comanda", name: "Joystick comandă", category: "joystick", code: "", price: 1850, image: "images/joystick-comenzi.jpg", tags: [] },
  { id: "buton-4", name: "Cutie comandă 4 butoane", category: "joystick", code: "Koçaysan / JTC", price: 1700, image: "images/butoane-joystick.jpg", tags: ["JTC"] },
  { id: "buton-3", name: "Cutie comandă 3 butoane", category: "joystick", code: "Koçaysan / JTC", price: 1500, image: "images/butoane-joystick.jpg", tags: ["JTC"] },
  { id: "buton-2", name: "Cutie comandă 2 butoane", category: "joystick", code: "Koçaysan / JTC", price: 1250, image: "images/butoane-joystick.jpg", tags: ["JTC"] },
  { id: "buton-1", name: "Cutie comandă 1 buton", category: "joystick", code: "Koçaysan / JTC", price: 1000, image: "images/butoane-joystick.jpg", tags: ["JTC"] },
  { id: "myler-12", name: "Myler buton 1-2", category: "joystick", code: "", price: 4700, image: "images/butoane-joystick.jpg", tags: [] },

  // PTO (prize de putere)
  { id: "pto-scania", name: "PTO Scania", category: "pto", code: "", price: 21000, image: "images/pompe-pto-scania.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-3342", name: "PTO 33-42", category: "pto", code: "33-42", price: 9500, image: "images/pto-cutii-viteza.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-atego", name: "PTO Atego", category: "pto", code: "20870", price: 9500, image: "images/pto-flanse.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-20120", name: "PTO 20120", category: "pto", code: "20120", price: 9500, image: "images/pto-flanse.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-lohul", name: "PTO 20890 Lohul", category: "pto", code: "20890", price: 9500, image: "images/pto-camioane.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-actros", name: "PTO Actros", category: "pto", code: "", price: 12500, image: "images/pto-camioane.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-lohur", name: "PTO 20610 Lohur", category: "pto", code: "20610", price: 9500, image: "images/pto-camioane.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-romur", name: "PTO 20151 Romur", category: "pto", code: "20151", price: 9500, image: "images/pto-camioane.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-20121", name: "PTO 20121", category: "pto", code: "20121", price: 9500, image: "images/pto-hipomak.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "pto-kohu", name: "PTO 20180 Kohu", category: "pto", code: "20180", price: 14500, image: "images/pto-hipomak.jpg", tags: ["Hipomak"], hipomak: true },

  // Pompe hidraulice
  { id: "pompa-romir", name: "Pompă hidraulică Romir 21021", category: "pompe", code: "21021", price: 13000, image: "images/pompe-hidraulice-1.jpg", tags: [] },
  { id: "pompa-diamond", name: "Pompă Diamond 30-B2 (Sal) 150", category: "pompe", code: "30-B2", price: 14500, image: "images/pompe-diamond-platinum.jpg", tags: ["Diamond"] },
  { id: "pompa-platinum", name: "Pompă Platinum 30-B1 (Sal) 150", category: "pompe", code: "30-B1", price: 11500, image: "images/pompe-diamond-platinum.jpg", tags: ["Platinum"] },
  { id: "pompa-30b1", name: "Pompă 30-B1", category: "pompe", code: "30-B1", price: 8000, image: "images/pompe-diamond-platinum.jpg", tags: [] },

  // Repartizoare, limitatoare de presiune
  { id: "rep-33kp", name: "Repartizor 33KP18222", category: "repartizoare", code: "33KP18222", price: 5500, image: "images/repartizor-limitator.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "lim-32k", name: "Limitator 32K-32A", category: "repartizoare", code: "32K-32A", price: 1500, image: "images/repartizor-limitator.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "rep-31ap18421", name: "Repartizor 31AP18421", category: "repartizoare", code: "31AP18421", price: 1500, image: "images/repartizoare.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "rep-31ap19211", name: "Repartizor 31AP19211", category: "repartizoare", code: "31AP19211", price: 6250, image: "images/repartizoare.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "rep-31ap19321", name: "Repartizor 31AP19321", category: "repartizoare", code: "31AP19321", price: 10000, image: "images/repartizoare.jpg", tags: ["Hipomak"], hipomak: true },
  { id: "exp-flex-15", name: "Exp Flex QTYd-15", category: "repartizoare", code: "QTYd-15", price: 3500, image: "images/repartizor-limitator.jpg", tags: [] },
  { id: "exp-flex-25", name: "Exp Flex QTYd-25", category: "repartizoare", code: "QTYd-25", price: 4250, image: "images/repartizor-limitator.jpg", tags: [] },

  // Radiatoare / racire ulei
  { id: "radiator-ulei", name: "Radiator răcire ulei hidraulic", category: "radiatoare", code: "", price: 11000, image: "images/radiator-racire-ulei.jpg", tags: [] },
];

const CATEGORY_LABELS = {
  robinete: "Robinete hidraulice",
  mufe: "Mufe de cuplare rapidă",
  joystick: "Joystick-uri și comenzi",
  pto: "PTO (prize de putere)",
  pompe: "Pompe hidraulice",
  repartizoare: "Repartizoare și limitatoare",
  radiatoare: "Radiatoare / răcire ulei",
};
