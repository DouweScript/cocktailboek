const drankJS = require("./drank");
const Drank = drankJS.Drank;
const Fris = drankJS.Fris;
let {drankDB} = drankJS.drankDB;
let {frisDB} = drankJS.frisDB;

drankDB = {};
frisDB = {};

//lijst aan sterke drank van de soos
const Apfelkorn = new Drank("Apfelkorn", 14.5, 1.10, 40);
const AppleSour = new Drank("Apple Sour", 17, 1.10, 40);
const BacardiBlack = new Drank("Bacardi Black", 38, 1.60, 40);
const BacardiBlanca = new Drank("Bacardi Blanca", 37.5, 1.60, 40);
const BacardiLemon = new Drank("Bacardi Lemon", 32, 1.60, 40);
const BacardiRazz = new Drank("Bacardi Razz", 32, 1.60, 40);
const Baileys  = new Drank("Baileys", 17, 1.60, 40);
const Beerenburg = new Drank("Beerenburg", 35, 1.10, 40);
const Blueberry = new Drank("Blueberry", 17, 1.30, 40);
const BlueCuracao = new Drank("Blue Curacao", 14.5, 1.10, 40);
const CafeMarakesh = new Drank("Cafe Marakesh", 23, 1.30, 40);
const Coebergh = new Drank("Coebergh", 14.5, 1.10, 40);
const CognacChateau = new Drank("Cognac Chateau", 40, 2.30, 40);
const CognacRemyMartin = new Drank("Cognac Remy Martin", 40, 3.00, 40);
const Cointreau = new Drank("Cointreau", 40, 2.00, 40);
const CremeDeBananes  = new Drank("Creme De Bananes", 15, 1.30, 40);
const CremeDeCassis = new Drank("Creme De Cassis", 17, 1.10, 40);
const Disaronno = new Drank("Disaronno", 28, 1.60, 40);
const Dommelsch = new Drank("Dommelsch", 5, 1.00, 250);
const Dropshot = new Drank("Dropshot", 20, 1.10, 40);
const GinBulldog = new Drank("Gin Bulldog", 40, 3.00, 40);
const GinSylvius = new Drank("Gin Sylvius", 45, 3.00, 40);
const GinTanqueray = new Drank("Gin Tanqueray", 45.7, 2.00, 40);
const Goldstrike = new Drank("Goldstrike", 50, 2.00, 40);
const GordonsGin = new Drank("Gordons Gin", 37.5, 1.60, 40);
const GrandManier = new Drank("Grand Manier", 40, 2.30, 40);
const HagelEnDonder = new Drank("Hagel en Donder", 25, 1.30, 40);
const Hoegaarden = new Drank("Hoegaarden", 5, 1.50, 40);
const Ketel1 = new Drank("Ketel1", 35, 1.10, 40);
const Jagermeister = new Drank("Jagermeister", 35, 1.60, 40);
const Jameson = new Drank("Jameson", 40, 2.00, 40);
const Kontiki = new Drank("Kontiki", 24, 1.30, 40);
const KuyperBessen = new Drank("Kuyper Bessen", 20, 1.10, 40);
const KuyperCoconut = new Drank("Kuyper Coconut", 15, 1.30, 40);
const Licor43 = new Drank("Licor43", 31, 1.60, 40);
const Limoncello = new Drank("Limoncello", 32, 2.00, 40);
const Marasquin = new Drank("Marasquin", 29 , 1.60, 40);
const MartiniRosso = new Drank("Martini Rosso", 15, 1.10, 40);
const Malibu = new Drank("Malibu", 21, 1.30, 40);
const MispelbloemBrandewijn = new Drank("Mispelbloem Brandewijn", 35, 1.30, 40);
const Oranjebitter = new Drank("Oranjebitter", 30, 1.30, 40);
const Ouzo = new Drank("Ouzo", 38, 1.30, 40);
const Passoa = new Drank("Passoa", 14.9, 1.10, 40);
const PeachTree = new Drank("Peach Tree", 20, 1.30, 40);
const Pernod = new Drank("Pernod", 40, 1.60, 40);
const PinaColada = new Drank("Pina Coloda", 15, 1.10, 40);
const PisangAmbon = new Drank("Pisang Ambon", 21, 1.30, 40);
const PuschkinBlack = new Drank("Puschkin Black", 16.6, 1.10, 40);
const Safari = new Drank("Safari", 20, 1.30, 40);
const Sambuca  = new Drank("Sambuca", 38, 1.60, 40);
const Schelvispekel = new Drank("Schelvispekel", 35, 1.10, 40);
const Sippersbitter = new Drank("Sippersbitter", 30, 1.10, 40);
const Sperma = new Drank("Sperma", 15, 1.30, 40);
const SmirrnoffVodka = new Drank("Smirrnoff Vodka", 37.5, 1.30, 40);
const Stroh80 = new Drank("Stroh 80", 80,  3.00, 40);
const Tequila = new Drank("Tequila", 38, 2.00, 40);
const TiaMaria = new Drank("Tia Maria", 20, 1.60, 40);
const VodkaRood = new Drank("Vodka Rood", 18, 1.10, 40);
const Vieux = new Drank("Vieux", 35, 1.10, 40);
const Wortegemse = new Drank("Wortegemse", 24.2, 1.10, 40);

drankJS.databaseWriter("drank");

//lijst van cocktails uit het cocktailboek
/*
const bananenBoner = new Cocktail("Bananenboner", longdrink, "Bananensap", [[1, Blueberry.naam], [1, Passoa.naam]],
    calcAlcPer(calcAlcVol(Blueberry, 1) + calcAlcVol(Passoa, 1), volLongdrink),
    (prijsFrisKlein + calcPriceShot(Blueberry, 1) + calcPriceShot(Passoa, 1)), "Bruno", null);

const dubbelFris = new Cocktail("Dubbel Fris", social, "Sprite", [[1, BacardiLemon.naam], [1, SmirrnoffVodka.naam], [1,Apfelkorn.naam]],
    calcAlcPer(calcAlcVol(BacardiLemon, 1) + calcAlcVol(SmirrnoffVodka,1) + calcAlcVol(Apfelkorn, 2), volSocial),
    (2 * prijsFrisGroot + calcPriceShot(BacardiLemon, 2) + calcPriceShot(SmirrnoffVodka, 1) + calcPriceShot(Apfelkorn,1)), null, null);

const paarseMoederneuker = new Cocktail("Paarse moederneuker", longdrink, "Cassis", [[0.5, BlueCuracao.naam], [0.5, Coebergh.naam], [0.5, GordonsGin.naam], [0.5, SmirrnoffVodka.naam]],
    calcAlcPer(calcAlcVol(Coebergh, 0.5) + calcAlcVol(BlueCuracao, 0.5) + calcAlcVol(GordonsGin, 0.5) + calcAlcVol(SmirrnoffVodka, 0.5), volLongdrink),
    (prijsFrisGroot + calcPriceShot(BlueCuracao, 0.5) + calcPriceShot(Coebergh, 0.5) + calcPriceShot(GordonsGin, 0.5) + calcPriceShot(SmirrnoffVodka, 0.5)), null, null);

const lustrumbocobaco = new Cocktail("LustrumBoCoBaCo", social, "Cola", [[1, BacardiRazz.naam], [1, BacardiBlack.naam], [1, BacardiLemon.naam], [1, BacardiBlanca.naam]],
    calcAlcPer(calcAlcVol(BacardiRazz, 1) + calcAlcVol(BacardiBlack, 1) + calcAlcVol(BacardiLemon,1) + calcAlcVol(BacardiBlanca, 1), volSocial),
    (2 * prijsFrisGroot + calcPriceShot(BacardiRazz, 1) + calcPriceShot(BacardiLemon,1) + calcPriceShot(BacardiBlanca, 1) + calcPriceShot(BacardiBlack, 1)), null, null);

const braveBull = new Cocktail("Brave bull", tumbler, "ijsblokjes", [[1, Tequila.naam], [1, CafeMarakesh.naam]], (calcAlcPer(calcAlcVol(Tequila, 1) + calcAlcVol(CafeMarakesh, 1), 80)), (calcPriceShot(Tequila,1) + calcPriceShot(CafeMarakesh,1)), "Christiaan", null);

const ak47 = new Cocktail("AK-47", shot, null, [[0.33, Dropshot.naam], [0.33, CafeMarakesh.naam], [0.33, Stroh80.naam]],
    calcAlcPer(calcAlcVol(Dropshot, 0.33) + calcAlcVol(CafeMarakesh, 0.33) + calcAlcVol(Stroh80, 0.33), volShotglas),
    calcPriceShot(Dropshot, 0.33) + calcPriceShot(CafeMarakesh, 0.33) + calcPriceShot(Stroh80, 0.33), null, null);

const b52 = new Cocktail("B52", shot, null, [[0.33, Baileys.naam], [0.33, CafeMarakesh.naam], [0.33, GrandManier.naam]],
    calcAlcPer(calcAlcVol(Baileys, 0.33) + calcAlcVol(CafeMarakesh, 0.33) + calcAlcVol(GrandManier, 0.33), volShotglas),
    calcPriceShot(Baileys, 0.33) + calcPriceShot(CafeMarakesh, 0.33) + calcPriceShot(GrandManier, 0.33), null, null);

const blackHeaven = new Cocktail("Black Heaven", shot, null, [[0.5, Dropshot.naam], [0.5, Sambuca.naam]],
    calcAlcPer(calcAlcVol(Dropshot, 0.5) + calcAlcVol(Sambuca, 0.5), volShotglas),
    calcPriceShot(Dropshot, 0.5) + calcPriceShot(Sambuca, 0.5), null, null);

const slappeSlet = new Cocktail("Slappe Slet", longdrink, "Sprite", [[0.5, Kontiki.naam], [0.5, VodkaRood.naam]],
    calcAlcPer(calcAlcVol(Kontiki, 0.5) + calcAlcVol(VodkaRood, 0.5), volLongdrink),
    calcPriceShot(Kontiki, 0.5) + calcPriceShot(VodkaRood, 0.5) + prijsFrisGroot, null, null);

const smurf = new Cocktail("Smurf", longdrink, "Sprite", [[0.5, BlueCuracao.naam], [0.5, Sambuca.naam], [0.5, PinaColada.naam]],
    calcAlcPer(calcAlcVol(BlueCuracao, 0.5) + calcAlcVol(Sambuca, 0.5) + calcAlcVol(PinaColada, 0.5), volLongdrink),
    calcPriceShot(BlueCuracao, 0.5) + calcPriceShot(Sambuca, 0.5) + calcPriceShot(PinaColada, 0.5) + prijsFrisGroot, null, null);

const caribeanUltimate = new Cocktail("Caribean Ultimate", tumbler, "Sinasappelsap", [[1, BlueCuracao.naam], [1, BacardiBlanca.naam], [1, Passoa.naam]],
    calcAlcPer(calcAlcVol(BlueCuracao,1) + calcAlcVol(BacardiBlanca,1) + calcAlcVol(Passoa,1), volLongdrink),
    calcPriceShot(BlueCuracao, 1) + calcPriceShot(BacardiBlanca, 1) + calcPriceShot(Passoa,1) + prijsFrisKlein, null, null);

const chocomania = new Cocktail("Chocomania", social, "Chocomel", [[1, PinaColada.naam], [1, Malibu.naam], [1, Passoa.naam], [1, Jameson.naam], [1, BacardiBlack.naam]],
    calcAlcPer(calcAlcVol(PinaColada,1) + calcAlcVol(Malibu, 1) + calcAlcVol(Passoa, 1) + calcAlcVol(Jameson, 1) + calcAlcVol(BacardiBlack, 2), volSocial),
    calcPriceShot(PinaColada,1) + calcPriceShot(Malibu, 1) + calcPriceShot(Passoa, 1) + calcPriceShot(Jameson, 1) + calcPriceShot(BacardiBlack, 2) + prijsFrisKlein, null, null);

const fireball = new Cocktail("Fireball", shot, null, [[0.33, Sambuca.naam], [0.67, Goldstrike.naam]],
    calcAlcPer(calcAlcVol(Sambuca,0.33) + calcAlcVol(Goldstrike, 0.67), volShotglas),
    calcPriceShot(Sambuca, 0.33) + calcPriceShot(Goldstrike, 0.67), null, null);

const grandCafeMalibu = new Cocktail("Grand Cafe Malibu", longdrink, "Chocomel", [[0.5, GrandManier.naam], [0.5, CafeMarakesh.naam], [1, Malibu.naam]],
    calcAlcPer(calcAlcVol(GrandManier, 0.5) + calcAlcVol(CafeMarakesh, 0.5) + calcAlcVol(Malibu, 1), volLongdrink),
    calcPriceShot(GrandManier, 0.5)  + calcPriceShot(CafeMarakesh, 0.5) + calcPriceShot(Malibu, 1) + prijsFrisKlein, null, null);

const nysa = new Cocktail("Nysa", tumbler, "Fanta", [[0.5, Ketel1.naam], [0.5, BlueCuracao.naam]],
    calcAlcPer(calcAlcVol(Ketel1, 0.5) + calcAlcVol(BlueCuracao, 0.5), volTumbler),
    calcPriceShot(Ketel1, 0.5) + calcPriceShot(BlueCuracao, 0.5) + prijsFrisGroot, null, null);

const god = new Cocktail("GOD", longdrink, "Ginger Ale", [[1, Oranjebitter.naam], [1, Disaronno.naam]],
    calcAlcPer(calcAlcVol(Oranjebitter, 1) + calcAlcVol(Disaronno, 1), volTumbler),
    calcPriceShot(Oranjebitter, 1) + calcPriceShot(Disaronno,1) + prijsFrisKlein, null, null);

const raketje = new Cocktail("Raketje", longdrink, "Fanta", [[1, BacardiRazz.naam]],
    calcAlcPer(calcAlcVol(BacardiRazz, 1), volLongdrink),
    calcPriceShot(BacardiRazz, 1) + prijsFrisGroot, null, "Doe een raket ijsje in het glas voeg vervolgens de ingredienten toe");

const redband = new Cocktail("Redband", social, "Sprite", [[1, Apfelkorn.naam], [1, CremeDeBananes.naam], [1, HagelEnDonder.naam], [1, Ketel1.naam], [1, Passoa.naam], [1, Disaronno.naam]],
    calcAlcPer(calcAlcVol(Apfelkorn, 1) + calcAlcVol(CremeDeBananes, 1) + calcAlcVol(HagelEnDonder, 1) + calcAlcVol(Ketel1, 1) + calcAlcVol(Passoa, 1) + calcAlcVol(Disaronno,1), volSocial),
    calcPriceShot(Apfelkorn, 1) + calcPriceShot(CremeDeBananes, 1) + calcPriceShot(HagelEnDonder, 1) + calcPriceShot(Ketel1, 1) + calcPriceShot(Passoa, 1) + calcPriceShot(Disaronno,1) + prijsFrisGroot, null, null);

const stoplicht = new Cocktail("Stoplicht", longdrink, "Sinasappelsap", [[0.5, PisangAmbon.naam], [0.5, Coebergh.naam]],
    calcAlcPer(calcAlcVol(PisangAmbon, 0.5) + calcAlcVol(Coebergh, 0.5), volLongdrink),
    calcPriceShot(PisangAmbon, 0.5) + calcPriceShot(Coebergh, 0.5) + prijsFrisKlein, null, null);

const ubotter = new Cocktail("U-Botter", tumbler, "Bitter Lemon", [[0.33, PisangAmbon.naam], [0.33, TiaMaria.naam], [0.33, Jameson.naam]],
    calcAlcPer(calcAlcVol(PisangAmbon, 0.33) + calcAlcVol(TiaMaria, 0.33) + calcAlcVol(Jameson, 0.33), volTumbler),
    calcPriceShot(PisangAmbon, 0.33) + calcPriceShot(TiaMaria, 0.33) + calcPriceShot(Jameson, 0.33) + prijsFrisKlein, null, null);

const waternoodsramp = new Cocktail("1953", longdrink, "Sprite", [[1, BlueCuracao.naam]],
    calcAlcPer(calcAlcVol(BlueCuracao, 1), volLongdrink),
    calcPriceShot(BlueCuracao, 1) + prijsFrisGroot, "Coline & Max", "Op de bar zetten en scheutje suiker toevoegen. Dan zie je waarom hij 1953 heet");

const aquafreshdeo = new Cocktail("Aqua-fresh Deo", longdrink, "sinas", [[1, BlueCuracao.naam], [1, SmirrnoffVodka.naam]],
    calcAlcPer(calcAlcVol(BlueCuracao, 1) + calcAlcVol(SmirrnoffVodka, 1), volLongdrink),
    calcPriceShot(BlueCuracao, 1) + calcPriceShot(SmirrnoffVodka, 1) + prijsFrisGroot, null, "remt physiologica");

const banaantje = new Cocktail("Banaantje", longdrink, "Chocomel", [[1, SmirrnoffVodka.naam], [1, Cointreau.naam], [1, Baileys.naam]],
    calcAlcPer(calcAlcVol(SmirrnoffVodka, 1) + calcAlcVol(Cointreau, 0.33) + calcAlcVol(Baileys, 0.33), volLongdrink),
    calcPriceShot(SmirrnoffVodka, 1) + calcPriceShot(Cointreau, 0.33) + calcPriceShot(Baileys, 0.66), null, null);

const blauweMeuk = new Cocktail("Blauwe Meuk", longdrink, "Sprite", [[1, Disaronno.naam], [1, BlueCuracao.naam]],
    calcAlcPer(calcAlcVol(Disaronno, 1) + calcAlcVol(BlueCuracao, 1), volLongdrink),
    calcPriceShot(Disaronno, 1) + calcPriceShot(BlueCuracao, 1) + prijsFrisGroot, null, null);

const boswachter = new Cocktail("Boswachter", longdrink, "Cola", [[0.5, Apfelkorn.naam], [0.25, Malibu.naam], [0.25, Jagermeister.naam]],
    calcAlcPer(calcAlcVol(Apfelkorn, 0.5) + calcAlcVol(Malibu, 0.25) + calcAlcVol(Jagermeister, 0.25), volLongdrink),
    calcPriceShot(Apfelkorn, 0.5) + calcPriceShot(Malibu, 0.25) + calcPriceShot(Jagermeister, 0.25) + prijsFrisKlein, null, null);

const dieptebom = new Cocktail("Dieptebom", longdrink, "Ginger Ale", [[1, HagelEnDonder.naam]],
    calcAlcPer(calcAlcVol(HagelEnDonder,1), volLongdrink),
    calcPriceShot(HagelEnDonder,1) + prijsFrisKlein, null, "Borrel glas in longdrink laten vallen. Het wapen tegen de U-130");

const dubbelfrisss = new Cocktail("Dubbelfrisss", longdrink, "Appelsap", [[1, Cointreau.naam], [1, Kontiki.naam]],
    calcAlcPer(calcAlcVol(Cointreau,1)+ calcAlcVol(Kontiki, 1), volLongdrink),
    calcPriceShot(Cointreau,1) + calcPriceShot(Kontiki,1) + prijsFrisKlein, "Coline & Max", "Serveren met Rietjes");

const froggy  = new Cocktail("Froggy", longdrink, "Tonic", [[1, Kontiki.naam], [1, PisangAmbon.naam]],
    calcAlcPer(calcAlcVol(Kontiki,1) + calcAlcVol(PisangAmbon, 1), volLongdrink),
    calcPriceShot(Kontiki,1) + calcPriceShot(PisangAmbon,1) + prijsFrisGroot, null, null);

const fruitxxl = new Cocktail("Fruit XXL", longdrink, "Appelsap", [[1, Safari.naam], [1, Kontiki.naam], [1, BacardiLemon.naam]],
    calcAlcPer(calcAlcVol(Safari,1) + calcAlcVol(Kontiki,1) + calcAlcVol(BacardiLemon,1), volLongdrink),
    calcPriceShot(Safari,1) + calcPriceShot(Kontiki,1) + calcPriceShot(BacardiLemon,1) + prijsFrisKlein, null, null);

const groeneThee = new Cocktail("Groene Thee", longdrink, "Ice Tea", [[1, PisangAmbon.naam]],
    calcAlcPer(calcAlcVol(PisangAmbon, 1), volLongdrink),
    calcPriceShot(PisangAmbon, 1) + prijsFrisGroot, null, null);

const hetzelfdeMaarDanZonderIjs = new Cocktail("Hetzelfde, maar dan zonder ijs!", longdrink, "Chocomel", [[0.5, GrandManier.naam], [0.5, CafeMarakesh.naam], [1, Malibu.naam]],
    calcAlcPer(calcAlcVol(GrandManier,0.5) + calcAlcVol(CafeMarakesh,0.5) + calcAlcVol(Malibu, 1), volLongdrink),
    calcPriceShot(GrandManier, 0.5) + calcPriceShot(CafeMarakesh, 0.5) + calcPriceShot(Malibu, 1) + prijsFrisKlein, null, null);

const jcSpecial = new Cocktail("J.C. Special", longdrink, "Sprite", [[1, BacardiBlanca.naam], [1, Vieux.naam], [0.5, GordonsGin.naam]],
    calcAlcPer(calcAlcVol(BacardiBlanca,1) + calcAlcVol(Vieux, 1) + calcAlcVol(GordonsGin, 0.5), volLongdrink),
    calcPriceShot(BacardiBlanca, 1) + calcPriceShot(Vieux, 1) + calcPriceShot(GordonsGin, 0.5) + prijsFrisGroot, null, null);

const jonasmania  = new Cocktail("Jonasmania", longdrink, "Appelsap", [[0.5, Coebergh.naam], [0.5, HagelEnDonder.naam], [0.33, PinaColada.naam]],
    calcAlcPer(calcAlcVol(Coebergh, 0.5) + calcAlcVol(HagelEnDonder, 0.5) + calcAlcVol(PinaColada, 0.33), volLongdrink),
    calcPriceShot(Coebergh, 0.5) + calcPriceShot(HagelEnDonder, 0.5) + calcPriceShot(PinaColada, 0.33) +  prijsFrisKlein, null, "SHAKE WELL WITH ICE AND STIRR INTO GLASS");

const kindercola = new Cocktail("Kindercola", longdrink, "Cola", [[2, Stroh80.naam]],
    calcAlcPer(calcAlcVol(Stroh80, 2), volLongdrink),
    calcPriceShot(Stroh80, 2) + prijsFrisGroot, null, null);

const knipperbol = new Cocktail("Knipperbol", longdrink, "Sinasappelsap", [[1, Ketel1.naam]],
    calcAlcPer(calcAlcVol(Ketel1, 1), volLongdrink),
    calcPriceShot(Ketel1, 1) + prijsFrisKlein, null, null);

const koetjeboe = new Cocktail("KoetjeBoe!", longdrink, "Chocomel", [[0.5, Malibu.naam], [0.5, PinaColada.naam], [0.5, BacardiBlanca.naam]],
    calcAlcPer(calcAlcVol(Malibu, 0.5) + calcAlcVol(PinaColada, 0.5) + calcAlcVol(BacardiBlanca, 0.5), volLongdrink),
    calcPriceShot(Malibu, 0.5) + calcPriceShot(PinaColada, 0.5) + calcPriceShot(BacardiBlanca, 0.5) + prijsFrisKlein, null, "Dit was een cocktail van de dierendag 2001.5")

const kutMetPeren = new Cocktail("Kut-Met-Peren", longdrink, "Bier", [[1, TiaMaria.naam], [1, PisangAmbon.naam]],
    calcAlcPer(calcAlcVol(TiaMaria,1) + calcAlcVol(PisangAmbon,1) + calcAlcVolBier(1), volLongdrink),
    calcPriceShot(TiaMaria,1) + calcPriceShot(PisangAmbon,1) + calcPriceShot(Dommelsch, 1), null, "In vaasje met inlegkruisje(zonder vleugels)");

const limonade = new Cocktail("Limonade", longdrink, "Sprite", [[0.5, Passoa.naam], [0.5, BacardiRazz.naam]],
    calcAlcPer(calcAlcVol(Passoa, 0.5) + calcAlcVol(BacardiRazz, 0.5), volLongdrink),
    calcPriceShot(Passoa, 0.5) + calcPriceShot(BacardiRazz, 0.5) + prijsFrisGroot, null, null);

const mijnTelefoon = new Cocktail("Mijn Telefoon", longdrink, "Ginger Ale", [[1, Stroh80.naam], [0.5, GordonsGin.naam]],
    calcAlcPer(calcAlcVol(Stroh80,1) + calcAlcVol(GordonsGin,1), volLongdrink),
    calcPriceShot(Stroh80,1) + calcPriceShot(GordonsGin, 0.5) + prijsFrisKlein, null, null);

const orgasmotron = new Cocktail("orgasmotron", longdrink, null, [[1, Baileys.naam], [1, Cointreau.naam], [1, TiaMaria.naam], [1,SmirrnoffVodka.naam]],
    calcAlcPer(calcAlcVol(Baileys, 1) + calcAlcVol(Cointreau, 1) + calcAlcVol(TiaMaria, 1) + calcAlcVol(SmirrnoffVodka, 1), volLongdrink),
    calcPriceShot(Baileys, 1) + calcPriceShot(Cointreau,1) + calcPriceShot(TiaMaria,1) + calcPriceShot(SmirrnoffVodka,1), null, null);

const pisangAmbier = new Cocktail("Pisang Ambier", longdrink, "Bier", [[0.5, PisangAmbon.naam]],
    calcAlcPer(calcAlcVol(PisangAmbon, 0.5) + calcAlcVolBier(1), volLongdrink),
    calcPriceShot(PisangAmbon, 0.5) + calcPriceShot(Dommelsch, 1), null, "Serveren met een schuimbanaantje");

const rainbowWarrior = new Cocktail("Rainbow Warrio", longdrink, "Sinasappelsap", [[0.25, Passoa.naam], [0.25, BlueCuracao.naam], [0.25, PisangAmbon.naam], [0.25, Coebergh.naam]],
    calcAlcPer(calcAlcVol(Passoa, 0.25) + calcAlcVol(BlueCuracao, 0.25) + calcAlcVol(PisangAmbon, 0.25) + calcAlcVol(Coebergh, 0.25), volLongdrink),
    calcPriceShot(Passoa, 0.25) + calcPriceShot(BlueCuracao, 0.25) + calcPriceShot(PisangAmbon,0.25) + calcPriceShot(Coebergh, 0.25) + prijsFrisKlein, null, null);

const vlaamseKopstoot = new Cocktail("Vlaamse Kopstoot", "Hoegaarden glas", "Hoegaarden", [[1, Wortegemse.naam]],
    calcAlcPer(calcAlcVol(Wortegemse, 1) + calcAlcVolBier(1), volLongdrink),
    calcPriceShot(Wortegemse, 1) + calcPriceShot(Hoegaarden, 1), null, "Doe de Wortegemse in een shotglas en doe deze omgekeerd in het glas, doe daarna de hoegaarden erbij");

const	rexona = new Cocktail("Rexona", tumbler, null, [[1, BlueCuracao.naam], [1, HagelEnDonder.naam], [1, PinaColada.naam]],
    calcAlcPer(calcAlcVol(BlueCuracao, 1) + calcAlcVol(HagelEnDonder,1) + calcAlcVol(PinaColada, 1), 120),
    calcPriceShot(BlueCuracao,1) + calcPriceShot(HagelEnDonder, 1) + calcPriceShot(PinaColada,1), null, null);

const rood = new Cocktail("Rood", longdrink, "Fanta", [[1, Passoa.naam], [1, GordonsGin.naam], [0.5, Coebergh.naam]],
    calcAlcPer(calcAlcVol(Passoa,1) + calcAlcVol(GordonsGin,1) + calcAlcVol(Coebergh, 1), volLongdrink),
    calcPriceShot(Passoa,1) + calcPriceShot(GordonsGin,1) + calcPriceShot(Coebergh, 0.5) + prijsFrisGroot, null, null);

const sweetSurprise = new Cocktail("Sweet Surprise", longdrink, "Chocomel", [[1, TiaMaria.naam], [1, Disaronno.naam], [0.25, CognacRemyMartin.naam]],
    calcAlcPer(calcAlcVol(TiaMaria,1) + calcAlcVol(Disaronno,1) + calcAlcVol(CognacRemyMartin, 0.25), volLongdrink),
    calcPriceShot(TiaMaria, 1) + calcPriceShot(Disaronno,1) + calcPriceShot(CognacRemyMartin, 0.25) + prijsFrisKlein, null, null);

const systemShock = new Cocktail("System Shock" , longdrink, "Tonic", [[1, Tequila.naam]],
    calcAlcPer(calcAlcVol(Tequila, 1), volLongdrink),
    calcPriceShot(Tequila, 1) + prijsFrisGroot, null, "Shockerend !!");

const tBeertje = new Cocktail("T-Beertje", longdrink, "Ice Tea", [[1, Beerenburg.naam]],
    calcAlcPer(calcAlcVol(Beerenburg, 1) , volLongdrink),
    calcPriceShot(Beerenburg, 1) + prijsFrisGroot, null ,null);

const zonsondergang = new Cocktail("Zonsondergang", longdrink, "Sinasappelsap", [[0.75, Cointreau.naam], [0.25, Ketel1.naam]],
    calcAlcPer(calcAlcVol(Cointreau, 0.75) + calcAlcVol(Ketel1, 0.25), volLongdrink),
    calcPriceShot(Cointreau, 0.75) + calcPriceShot(Ketel1, 0.25) + prijsFrisKlein, null, "Serveren met suikerrandje en schijfje citroen");

const brentSpar = new Cocktail("Brent Spar", tumbler, "Bitter Lemon", [[0.5, Jameson.naam], [0.5, TiaMaria.naam]],
    calcAlcPer(calcAlcVol(Jameson, 0.5) + calcAlcVol(TiaMaria, 0.5), volTumbler),
    calcPriceShot(Jameson, 0.5) + calcPriceShot(TiaMaria, 0.5) + prijsFrisGroot, null, "Afzinken in tumbler zodat het borrelglaasje net onder water staat");

const colaDream = new Cocktail("Cola Dream", tumbler, null, [[1, "Cola"], [2,Vieux.naam]],
    calcAlcPer(calcAlcVol(Vieux, 2), 120),
    calcPriceShot(Vieux,2), null, null);

const fryslanBopper = new Cocktail("Fryslan Bopper", tumbler, null, [[0.33, Sippersbitter.naam], [0.33, Beerenburg.naam], [0.33, Ketel1.naam]],
    calcAlcPer(calcAlcVol(Sippersbitter, 0.33) + calcAlcVol(Beerenburg, 0.33) + calcAlcVol(Ketel1, 0.33), 40),
    calcPriceShot(Sippersbitter, 0.33) + calcPriceShot(Beerenburg, 0.33) + calcPriceShot(Ketel1, 0.33), null,
    "Zet een tumbler die een beetje nat is in de vriezer. Laat deze 1 uur staan. Maak de cocktail al van te voren klaar in een borrelglas. Dien de cocktail op als er sterke zeilverhalen aan de bar worden verteld, in het ingevroren glas");

const gps = new Cocktail("De G.P.S.", tumbler, null, [[1, GordonsGin.naam], [1, Passoa.naam], [1,Safari.naam]],
    calcAlcPer(calcAlcVol(GordonsGin, 1) + calcAlcVol(Passoa, 1) + calcAlcVol(Safari, 1), 120),
    calcPriceShot(GordonsGin, 1) + calcPriceShot(Passoa, 1) + calcPriceShot(Safari, 1), null ,null);

const inekesWraak = new Cocktail("Ineke's Wraak", tumbler, "Scheutje Grand Manier", [[0.67, Baileys.naam], [0.33, Disaronno.naam]],
    calcAlcPer(calcAlcVol(Baileys, 0.67) + calcAlcVol(Disaronno, 0.33), 40),
    calcPriceShot(Baileys, 0.67) + calcPriceShot(Disaronno, 0.33), null, null);

const kater = new Cocktail("De Kater", tumbler, null, [[1, Jameson.naam], [1, HagelEnDonder.naam], [1, Stroh80.naam]],
    calcAlcPer(calcAlcVol(Jameson, 1) + calcAlcVol(HagelEnDonder, 1) + calcAlcVol(Stroh80, 1), 120),
    calcPriceShot(Jameson, 1) + calcPriceShot(HagelEnDonder, 1) + calcPriceShot(Stroh80, 1), null, null);

const kitten = new Cocktail("De Kitten", tumbler, null, [[1, Jameson.naam], [1, HagelEnDonder.naam], [2, "Fanta"]],
    calcAlcPer(calcAlcVol(Jameson, 1) + calcAlcVol(HagelEnDonder, 1), 160),
    calcPriceShot(Jameson, 1) + calcPriceShot(HagelEnDonder, 1) + 0.4 * prijsFrisGroot, null, null);

const lemonWithABite = new Cocktail("Lemon with a bite", tumbler, null, [[0.5, Jameson.naam], [0.5, MartiniRosso.naam]],
    calcAlcPer(calcAlcVol(Jameson, 0.5) + calcAlcVol(MartiniRosso, 0.5), 40),
    calcPriceShot(Jameson, 0.5) + calcPriceShot(MartiniRosso, 0.5), null ,"Tumbler afbinden met een zuur matje");

const lrSpecial = new Cocktail("LR-special", tumbler, null,  [[1, BacardiBlanca.naam], [1, GordonsGin.naam], [0.5, CremeDeCassis.naam], [3, "Sinasappelsap"]],
    calcAlcPer(calcAlcVol(BacardiBlanca, 1) + calcAlcVol(GordonsGin, 1) + calcAlcVol(CremeDeCassis, 0.5), 220),
    calcPriceShot(BacardiBlanca, 1) + calcPriceShot(GordonsGin, 1) + calcPriceShot(CremeDeCassis, 0.5) + 0.6 * prijsFrisKlein, null, null);

const luMiniscent = new Cocktail("Lu Miniscent", tumbler, "Sinas", [[0.5, Kontiki.naam], [0.5, Safari.naam]],
    calcAlcPer(calcAlcVol(Kontiki, 0.5) + calcAlcVol(Safari, 0.5), volLongdrink),
    calcPriceShot(Kontiki, 0.5) + calcPriceShot(Safari, 0.5) + prijsFrisGroot, "Lucas & Kossen", null);

const marcsSurprice = new Cocktail("Marcs Surprice", tumbler, null, [[1, Kontiki.naam], [1, PisangAmbon.naam], [1, Disaronno.naam], [1, "Sinasappelsap"]],
    calcAlcPer(calcAlcVol(Kontiki, 1) + calcAlcVol(PisangAmbon, 1) + calcAlcVol(Disaronno, 1), 160),
    calcPriceShot(Kontiki, 1) + calcPriceShot(PisangAmbon, 1) + calcPriceShot(Disaronno, 1) + 0.2 * prijsFrisKlein, null, null);

const marielleDondertOp = new Cocktail("Mariëlle Dondert Op", tumbler, null, [[0.5, BlueCuracao.naam], [0.5, BacardiLemon.naam], [1, HagelEnDonder.naam]],
    calcAlcPer(calcAlcVol(BlueCuracao, 0.5) + calcAlcVol(BacardiLemon, 0.5) + calcAlcVol(HagelEnDonder, 1), 120),
    calcPriceShot(BlueCuracao, 0.5) + calcPriceShot(BacardiLemon, 0.5) + calcPriceShot(HagelEnDonder, 1), null, null);

const mururoaDreams = new Cocktail("Mururoa Dreams", tumbler, null, [[1, BlueCuracao.naam], [2, Kontiki.naam], [1, BacardiBlanca.naam],],
    calcAlcPer(calcAlcVol(BlueCuracao, 1) + calcAlcVol(Kontiki, 2) + calcAlcVol(BacardiBlanca, 1),  160),
    calcPriceShot(BlueCuracao, 1) + calcPriceShot(Kontiki, 2) + calcPriceShot(BacardiBlanca, 1), "Tjerry & Bouke", "Serveren met rietjes, evt met ijs");

const nikita = new Cocktail("Nikita", tumbler, null, [[0.33, SmirrnoffVodka.naam], [0.67, Cointreau.naam]],
    calcAlcPer(calcAlcVol(SmirrnoffVodka, 0.33) + calcAlcVol(Cointreau, 0.67), 80),
    calcPriceShot(SmirrnoffVodka, 0.33) + calcPriceShot(Cointreau, 0.67), null, "In een keer acteroverslaan <br> Shale well with ice");

const omasAppeltaart = new Cocktail("Oma's Appeltaart", tumbler, null, [[0.5, Goldstrike.naam], [1.5, Apfelkorn.naam]],
    calcAlcPer(calcAlcVol(Goldstrike, 0.5) + calcAlcVol(Apfelkorn, 1.5), 80),
    calcPriceShot(Goldstrike, 0.5) + calcPriceShot(Apfelkorn, 1.5), "Coline & Max", "Aanvullen met een aantal rozijnen");

const orangeCoin = new Cocktail("Orange coin", tumbler, null, [[2, Cointreau.naam]],
    calcAlcPer(calcAlcVol(Cointreau, 2), 80),
    calcPriceShot(Cointreau, 2), null, "Jus toevoegen naar smaak");

const rooieDiesel = new Cocktail("Rooie Diesel", tumbler, null, [[0.5, Apfelkorn.naam], [0.5, Passoa.naam], [0.5, GrandManier.naam], [0.5, Tequila.naam]],
    calcAlcPer(calcAlcVol(Apfelkorn, 0.5) + calcAlcVol(Passoa, 0.5) + calcAlcVol(GrandManier, 0.5) + calcAlcVol(Tequila, 0.5), 80),
    calcPriceShot(Apfelkorn, 0.5) + calcPriceShot(Passoa, 0.5) + calcPriceShot(GrandManier, 0.5) + calcPriceShot(Tequila, 0.5), null,
    "Doe dit in een shaker, voeg ijs toe en shake er rustig op los. Giet het geheel door het shakerzeefje in een longdrinkglas. PAS OP ! Deze cocktail heeft een hoog cetaangetal");

const silentKiller = new Cocktail("Silent Killer", tumbler, null, [[0.5, VodkaRood.naam], [0.5, Kontiki.naam], [0.5, SmirrnoffVodka.naam]],
    calcAlcPer(calcAlcVol(VodkaRood, 0.5) + calcAlcVol(Kontiki, 0.5) + calcAlcVol(SmirrnoffVodka, 0.5), volTumbler),
    calcPriceShot(VodkaRood, 0.5) + calcPriceShot(Kontiki, 0.5) + calcPriceShot(SmirrnoffVodka, 0.5) + prijsFrisKlein, null, "Afvullen met AA");

const sunKiller = new Cocktail("Sun Killer", tumbler, "Sprite", [[0.5, Kontiki.naam], [0.5, Malibu.naam], [1, Tequila.naam]],
    calcAlcPer(calcAlcVol(Kontiki, 0.5) + calcAlcVol(Malibu, 0.5) + calcAlcVol(Tequila, 1), volTumbler),
    calcPriceShot(Kontiki, 0.5) + calcPriceShot(Malibu, 0.5) + calcPriceShot(Tequila, 1) + prijsFrisGroot, null, null);

const redDevil = new Cocktail("Red Devil", tumbler, null, [[0.5, Marasquin.name], [0.5, Stroh80.naam], [1, "Fanta"]],
    calcAlcPer(calcAlcVol(Marasquin, 0.5) + calcAlcVol(Stroh80, 0.5), 80),
    calcPriceShot(Marasquin, 0.5) + calcPriceShot(Stroh80, 0.5), null, null);

const tnt = new Cocktail("TNT", tumbler, null, [[0.5, Jameson.naam], [0.5, Pernod.naam]],
    calcAlcPer(calcAlcVol(Jameson, 0.5) + calcAlcVol(Pernod, 0.5), 40),
    calcPriceShot(Jameson, 0.5) + calcPriceShot(Pernod, 0.5), null, null);

const bolkestein = new Cocktail("Bolkestein", shot, null, [[0.5, BlueCuracao.naam], [0.5, Oranjebitter.naam]],
    calcAlcPer(calcAlcVol(BlueCuracao, 0.5) + calcAlcVol(Oranjebitter, 0.5), volShotglas),
    calcPriceShot(BlueCuracao, 0.5) + calcPriceShot(Oranjebitter, 0.5), null, null);

const brainexplosion = new Cocktail("Brainexplosion", shot, null, [[0.5, PeachTree.naam], [0.5, Baileys.naam]],
    calcAlcPer(calcAlcVol(PeachTree, 0.5) + calcAlcVol(Baileys, 0.5), volShotglas),
    calcPriceShot(PeachTree, 0.5) + calcPriceShot(Baileys, 0.5), null, "Aanvullen met lepeltje siroop");

const brainfuck = new Cocktail("Brainfuck", shot, null, [[0.5, PeachTree.naam], [0.5, Sperma.naam]],
    calcAlcPer(calcAlcVol(PeachTree, 0.5) + calcAlcVol(Sperma, 0.5), volShotglas),
    calcPriceShot(PeachTree, 0.5) + calcPriceShot(Sperma, 0.5), null, "Aanvullen met lepeltje siroop");

const histos92 = new Cocktail("Histos '92", shot, null, [[0.33, Sippersbitter.naam], [0.67, Beerenburg.naam]],
    calcAlcPer(calcAlcVol(Sippersbitter, 0.33) + calcAlcVol(Beerenburg, 0.67), volShotglas),
    calcPriceShot(Sippersbitter, 0.33) + calcPriceShot(Beerenburg, 0.67), null, "Deze cocktail is geinspireerd door de bovengenoemde dranken, de enige twee soorten sterke drank die tijden het Histos Teamzeiltoernooi '92 aanwezig waren en veelzijdig door de twee Harpyia-teams zijn genuttigd/gemixd");

const noorseMilf = new Cocktail("Noorse Milf", shot, null, [[0.5, Tequila.naam], [0.5, Sambuca.naam]],
    calcAlcPer(calcAlcVol(Tequila, 0.5) + calcAlcVol(Sambuca, 0.5), volShotglas),
    calcPriceShot(Tequila, 0.5) + calcPriceShot(Sambuca, 0.5), null, "Paar druppels tabasco toevoegen");

const vuilverbrander = new Cocktail("Vuilverbrander", shot, null, [[0.5, GrandManier.naam], [0.5, Stroh80.naam]],
    calcAlcPer(calcAlcVol(GrandManier, 0.5) + calcAlcVol(Stroh80, 0.5), volShotglas),
    calcPriceShot(GrandManier, 0.5) + calcPriceShot(Stroh80, 0.5), null, "Paar druppels tabasco toevoegen");

const roelofMetPassie = new Cocktail("Roelof met passie", social, null, [[2, Passoa.naam], [1, "Flesje AA"]],
    calcAlcPer(calcAlcVol(Passoa, 2), volSocial),
    calcPriceShot(Passoa, 2) + prijsFrisKlein, null, null);

const blackWidowmakerZevensprong = new Cocktail("Black Widowmaker Zevensprong", social, null, [[1, "Cassis"], [1, BacardiBlanca.naam], [1, SmirrnoffVodka.naam], [1, BlueCuracao.naam], [1, Coebergh.naam], [1, Jameson.naam], [1, GordonsGin.naam]],
    calcAlcPer(calcAlcVol(BacardiBlanca, 1) + calcAlcVol(SmirrnoffVodka, 1) + calcAlcVol(BlueCuracao, 1) + calcAlcVol(Coebergh, 1) + calcAlcVol(Jameson, 1) + calcAlcVol(GordonsGin, 1), 240),
    calcPriceShot(BacardiBlanca, 1) + calcPriceShot(SmirrnoffVodka, 1) + calcPriceShot(BlueCuracao, 1) + calcPriceShot(Coebergh, 1) + calcPriceShot(Jameson, 1) + calcPriceShot(GordonsGin, 1) + 0.2 * prijsFrisGroot, null, "Goed Schudden, serveren met 7 rietjes <br> Brancards klaarhouden");

const destroyer = new Cocktail("Destroyer", social, null, [[1, SmirrnoffVodka.naam], [2, PisangAmbon.naam], [2, BlueCuracao.naam], [5, "Sinasappelsap"]],
    calcAlcPer(calcAlcVol(SmirrnoffVodka, 1) + calcAlcVol(PisangAmbon, 2) + calcAlcVol(BlueCuracao, 2), 400),
    calcPriceShot(SmirrnoffVodka, 1) + calcPriceShot(PisangAmbon, 2) + calcPriceShot(BlueCuracao, 2) + prijsFrisKlein, null, null);

const natteOlijf = new Cocktail("Natte Olijf", shot, null, [[1, "Olijf"], [1, "Water"]], 0, 0, null, null);
*/