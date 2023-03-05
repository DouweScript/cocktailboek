const alcoholJS = require("./alcohol");
const alcohol = alcoholJS.alcohol;
const nonAlcohol = alcoholJS.nonAlcohol;
let {alcoholDB} = alcoholJS.alcoholDB;
let {nonAlcoholDB} = alcoholJS.nonAlcoholDB;

alcoholDB = {};
nonAlcoholDB = {};

//lijst aan sterke alcohol van de soos
const Apfelkorn = new alcohol("Apfelkorn", 14.5, 1.10, 40);
const AppleSour = new alcohol("Apple Sour", 17, 1.10, 40);
const BacardiBlack = new alcohol("Bacardi Black", 38, 1.60, 40);
const BacardiBlanca = new alcohol("Bacardi Blanca", 37.5, 1.60, 40);
const BacardiLemon = new alcohol("Bacardi Lemon", 32, 1.60, 40);
const BacardiRazz = new alcohol("Bacardi Razz", 32, 1.60, 40);
const Baileys  = new alcohol("Baileys", 17, 1.60, 40);
const Beerenburg = new alcohol("Beerenburg", 35, 1.10, 40);
const Blueberry = new alcohol("Blueberry", 17, 1.30, 40);
const BlueCuracao = new alcohol("Blue Curacao", 14.5, 1.10, 40);
const CafeMarakesh = new alcohol("Cafe Marakesh", 23, 1.30, 40);
const Coebergh = new alcohol("Coebergh", 14.5, 1.10, 40);
const CognacChateau = new alcohol("Cognac Chateau", 40, 2.30, 40);
const CognacRemyMartin = new alcohol("Cognac Remy Martin", 40, 3.00, 40);
const Cointreau = new alcohol("Cointreau", 40, 2.00, 40);
const CremeDeBananes  = new alcohol("Creme De Bananes", 15, 1.30, 40);
const CremeDeCassis = new alcohol("Creme De Cassis", 17, 1.10, 40);
const Disaronno = new alcohol("Disaronno", 28, 1.60, 40);
const Dommelsch = new alcohol("Dommelsch", 5, 1.00, 250);
const Dropshot = new alcohol("Dropshot", 20, 1.10, 40);
const GinBulldog = new alcohol("Gin Bulldog", 40, 3.00, 40);
const GinSylvius = new alcohol("Gin Sylvius", 45, 3.00, 40);
const GinTanqueray = new alcohol("Gin Tanqueray", 45.7, 2.00, 40);
const Goldstrike = new alcohol("Goldstrike", 50, 2.00, 40);
const GordonsGin = new alcohol("Gordons Gin", 37.5, 1.60, 40);
const GrandManier = new alcohol("Grand Manier", 40, 2.30, 40);
const HagelEnDonder = new alcohol("Hagel en Donder", 25, 1.30, 40);
const Hoegaarden = new alcohol("Hoegaarden", 5, 1.50, 40);
const Ketel1 = new alcohol("Ketel1", 35, 1.10, 40);
const Jagermeister = new alcohol("Jagermeister", 35, 1.60, 40);
const Jameson = new alcohol("Jameson", 40, 2.00, 40);
const Kontiki = new alcohol("Kontiki", 24, 1.30, 40);
const KuyperBessen = new alcohol("Kuyper Bessen", 20, 1.10, 40);
const KuyperCoconut = new alcohol("Kuyper Coconut", 15, 1.30, 40);
const Licor43 = new alcohol("Licor43", 31, 1.60, 40);
const Limoncello = new alcohol("Limoncello", 32, 2.00, 40);
const Marasquin = new alcohol("Marasquin", 29 , 1.60, 40);
const MartiniRosso = new alcohol("Martini Rosso", 15, 1.10, 40);
const Malibu = new alcohol("Malibu", 21, 1.30, 40);
const MispelbloemBrandewijn = new alcohol("Mispelbloem Brandewijn", 35, 1.30, 40);
const Oranjebitter = new alcohol("Oranjebitter", 30, 1.30, 40);
const Ouzo = new alcohol("Ouzo", 38, 1.30, 40);
const Passoa = new alcohol("Passoa", 14.9, 1.10, 40);
const PeachTree = new alcohol("Peach Tree", 20, 1.30, 40);
const Pernod = new alcohol("Pernod", 40, 1.60, 40);
const PinaColada = new alcohol("Pina Coloda", 15, 1.10, 40);
const PisangAmbon = new alcohol("Pisang Ambon", 21, 1.30, 40);
const PuschkinBlack = new alcohol("Puschkin Black", 16.6, 1.10, 40);
const Safari = new alcohol("Safari", 20, 1.30, 40);
const Sambuca  = new alcohol("Sambuca", 38, 1.60, 40);
const Schelvispekel = new alcohol("Schelvispekel", 35, 1.10, 40);
const Sippersbitter = new alcohol("Sippersbitter", 30, 1.10, 40);
const Sperma = new alcohol("Sperma", 15, 1.30, 40);
const SmirrnoffVodka = new alcohol("Smirrnoff Vodka", 37.5, 1.30, 40);
const Stroh80 = new alcohol("Stroh 80", 80,  3.00, 40);
const Tequila = new alcohol("Tequila", 38, 2.00, 40);
const TiaMaria = new alcohol("Tia Maria", 20, 1.60, 40);
const VodkaRood = new alcohol("Vodka Rood", 18, 1.10, 40);
const Vieux = new alcohol("Vieux", 35, 1.10, 40);
const Wortegemse = new alcohol("Wortegemse", 24.2, 1.10, 40);

alcoholJS.databaseWriter("alcohol");

//lijst van cocktails uit het cocktailboek
/*
const bananenBoner = new Cocktail("Bananenboner", longdrink, "Bananensap", [[1, Blueberry.name], [1, Passoa.name]],
    calcAlcPer(calcAlcVol(Blueberry, 1) + calcAlcVol(Passoa, 1), volLongdrink),
    (prijsnonAlcoholKlein + calcPriceShot(Blueberry, 1) + calcPriceShot(Passoa, 1)), "Bruno", null);

const dubbelnonAlcohol = new Cocktail("Dubbel nonAlcohol", social, "Sprite", [[1, BacardiLemon.name], [1, SmirrnoffVodka.name], [1,Apfelkorn.name]],
    calcAlcPer(calcAlcVol(BacardiLemon, 1) + calcAlcVol(SmirrnoffVodka,1) + calcAlcVol(Apfelkorn, 2), volSocial),
    (2 * prijsnonAlcoholGroot + calcPriceShot(BacardiLemon, 2) + calcPriceShot(SmirrnoffVodka, 1) + calcPriceShot(Apfelkorn,1)), null, null);

const paarseMoederneuker = new Cocktail("Paarse moederneuker", longdrink, "Cassis", [[0.5, BlueCuracao.name], [0.5, Coebergh.name], [0.5, GordonsGin.name], [0.5, SmirrnoffVodka.name]],
    calcAlcPer(calcAlcVol(Coebergh, 0.5) + calcAlcVol(BlueCuracao, 0.5) + calcAlcVol(GordonsGin, 0.5) + calcAlcVol(SmirrnoffVodka, 0.5), volLongdrink),
    (prijsnonAlcoholGroot + calcPriceShot(BlueCuracao, 0.5) + calcPriceShot(Coebergh, 0.5) + calcPriceShot(GordonsGin, 0.5) + calcPriceShot(SmirrnoffVodka, 0.5)), null, null);

const lustrumbocobaco = new Cocktail("LustrumBoCoBaCo", social, "Cola", [[1, BacardiRazz.name], [1, BacardiBlack.name], [1, BacardiLemon.name], [1, BacardiBlanca.name]],
    calcAlcPer(calcAlcVol(BacardiRazz, 1) + calcAlcVol(BacardiBlack, 1) + calcAlcVol(BacardiLemon,1) + calcAlcVol(BacardiBlanca, 1), volSocial),
    (2 * prijsnonAlcoholGroot + calcPriceShot(BacardiRazz, 1) + calcPriceShot(BacardiLemon,1) + calcPriceShot(BacardiBlanca, 1) + calcPriceShot(BacardiBlack, 1)), null, null);

const braveBull = new Cocktail("Brave bull", tumbler, "ijsblokjes", [[1, Tequila.name], [1, CafeMarakesh.name]], (calcAlcPer(calcAlcVol(Tequila, 1) + calcAlcVol(CafeMarakesh, 1), 80)), (calcPriceShot(Tequila,1) + calcPriceShot(CafeMarakesh,1)), "Christiaan", null);

const ak47 = new Cocktail("AK-47", shot, null, [[0.33, Dropshot.name], [0.33, CafeMarakesh.name], [0.33, Stroh80.name]],
    calcAlcPer(calcAlcVol(Dropshot, 0.33) + calcAlcVol(CafeMarakesh, 0.33) + calcAlcVol(Stroh80, 0.33), volShotglas),
    calcPriceShot(Dropshot, 0.33) + calcPriceShot(CafeMarakesh, 0.33) + calcPriceShot(Stroh80, 0.33), null, null);

const b52 = new Cocktail("B52", shot, null, [[0.33, Baileys.name], [0.33, CafeMarakesh.name], [0.33, GrandManier.name]],
    calcAlcPer(calcAlcVol(Baileys, 0.33) + calcAlcVol(CafeMarakesh, 0.33) + calcAlcVol(GrandManier, 0.33), volShotglas),
    calcPriceShot(Baileys, 0.33) + calcPriceShot(CafeMarakesh, 0.33) + calcPriceShot(GrandManier, 0.33), null, null);

const blackHeaven = new Cocktail("Black Heaven", shot, null, [[0.5, Dropshot.name], [0.5, Sambuca.name]],
    calcAlcPer(calcAlcVol(Dropshot, 0.5) + calcAlcVol(Sambuca, 0.5), volShotglas),
    calcPriceShot(Dropshot, 0.5) + calcPriceShot(Sambuca, 0.5), null, null);

const slappeSlet = new Cocktail("Slappe Slet", longdrink, "Sprite", [[0.5, Kontiki.name], [0.5, VodkaRood.name]],
    calcAlcPer(calcAlcVol(Kontiki, 0.5) + calcAlcVol(VodkaRood, 0.5), volLongdrink),
    calcPriceShot(Kontiki, 0.5) + calcPriceShot(VodkaRood, 0.5) + prijsnonAlcoholGroot, null, null);

const smurf = new Cocktail("Smurf", longdrink, "Sprite", [[0.5, BlueCuracao.name], [0.5, Sambuca.name], [0.5, PinaColada.name]],
    calcAlcPer(calcAlcVol(BlueCuracao, 0.5) + calcAlcVol(Sambuca, 0.5) + calcAlcVol(PinaColada, 0.5), volLongdrink),
    calcPriceShot(BlueCuracao, 0.5) + calcPriceShot(Sambuca, 0.5) + calcPriceShot(PinaColada, 0.5) + prijsnonAlcoholGroot, null, null);

const caribeanUltimate = new Cocktail("Caribean Ultimate", tumbler, "Sinasappelsap", [[1, BlueCuracao.name], [1, BacardiBlanca.name], [1, Passoa.name]],
    calcAlcPer(calcAlcVol(BlueCuracao,1) + calcAlcVol(BacardiBlanca,1) + calcAlcVol(Passoa,1), volLongdrink),
    calcPriceShot(BlueCuracao, 1) + calcPriceShot(BacardiBlanca, 1) + calcPriceShot(Passoa,1) + prijsnonAlcoholKlein, null, null);

const chocomania = new Cocktail("Chocomania", social, "Chocomel", [[1, PinaColada.name], [1, Malibu.name], [1, Passoa.name], [1, Jameson.name], [1, BacardiBlack.name]],
    calcAlcPer(calcAlcVol(PinaColada,1) + calcAlcVol(Malibu, 1) + calcAlcVol(Passoa, 1) + calcAlcVol(Jameson, 1) + calcAlcVol(BacardiBlack, 2), volSocial),
    calcPriceShot(PinaColada,1) + calcPriceShot(Malibu, 1) + calcPriceShot(Passoa, 1) + calcPriceShot(Jameson, 1) + calcPriceShot(BacardiBlack, 2) + prijsnonAlcoholKlein, null, null);

const fireball = new Cocktail("Fireball", shot, null, [[0.33, Sambuca.name], [0.67, Goldstrike.name]],
    calcAlcPer(calcAlcVol(Sambuca,0.33) + calcAlcVol(Goldstrike, 0.67), volShotglas),
    calcPriceShot(Sambuca, 0.33) + calcPriceShot(Goldstrike, 0.67), null, null);

const grandCafeMalibu = new Cocktail("Grand Cafe Malibu", longdrink, "Chocomel", [[0.5, GrandManier.name], [0.5, CafeMarakesh.name], [1, Malibu.name]],
    calcAlcPer(calcAlcVol(GrandManier, 0.5) + calcAlcVol(CafeMarakesh, 0.5) + calcAlcVol(Malibu, 1), volLongdrink),
    calcPriceShot(GrandManier, 0.5)  + calcPriceShot(CafeMarakesh, 0.5) + calcPriceShot(Malibu, 1) + prijsnonAlcoholKlein, null, null);

const nysa = new Cocktail("Nysa", tumbler, "Fanta", [[0.5, Ketel1.name], [0.5, BlueCuracao.name]],
    calcAlcPer(calcAlcVol(Ketel1, 0.5) + calcAlcVol(BlueCuracao, 0.5), volTumbler),
    calcPriceShot(Ketel1, 0.5) + calcPriceShot(BlueCuracao, 0.5) + prijsnonAlcoholGroot, null, null);

const god = new Cocktail("GOD", longdrink, "Ginger Ale", [[1, Oranjebitter.name], [1, Disaronno.name]],
    calcAlcPer(calcAlcVol(Oranjebitter, 1) + calcAlcVol(Disaronno, 1), volTumbler),
    calcPriceShot(Oranjebitter, 1) + calcPriceShot(Disaronno,1) + prijsnonAlcoholKlein, null, null);

const raketje = new Cocktail("Raketje", longdrink, "Fanta", [[1, BacardiRazz.name]],
    calcAlcPer(calcAlcVol(BacardiRazz, 1), volLongdrink),
    calcPriceShot(BacardiRazz, 1) + prijsnonAlcoholGroot, null, "Doe een raket ijsje in het glas voeg vervolgens de ingredienten toe");

const redband = new Cocktail("Redband", social, "Sprite", [[1, Apfelkorn.name], [1, CremeDeBananes.name], [1, HagelEnDonder.name], [1, Ketel1.name], [1, Passoa.name], [1, Disaronno.name]],
    calcAlcPer(calcAlcVol(Apfelkorn, 1) + calcAlcVol(CremeDeBananes, 1) + calcAlcVol(HagelEnDonder, 1) + calcAlcVol(Ketel1, 1) + calcAlcVol(Passoa, 1) + calcAlcVol(Disaronno,1), volSocial),
    calcPriceShot(Apfelkorn, 1) + calcPriceShot(CremeDeBananes, 1) + calcPriceShot(HagelEnDonder, 1) + calcPriceShot(Ketel1, 1) + calcPriceShot(Passoa, 1) + calcPriceShot(Disaronno,1) + prijsnonAlcoholGroot, null, null);

const stoplicht = new Cocktail("Stoplicht", longdrink, "Sinasappelsap", [[0.5, PisangAmbon.name], [0.5, Coebergh.name]],
    calcAlcPer(calcAlcVol(PisangAmbon, 0.5) + calcAlcVol(Coebergh, 0.5), volLongdrink),
    calcPriceShot(PisangAmbon, 0.5) + calcPriceShot(Coebergh, 0.5) + prijsnonAlcoholKlein, null, null);

const ubotter = new Cocktail("U-Botter", tumbler, "Bitter Lemon", [[0.33, PisangAmbon.name], [0.33, TiaMaria.name], [0.33, Jameson.name]],
    calcAlcPer(calcAlcVol(PisangAmbon, 0.33) + calcAlcVol(TiaMaria, 0.33) + calcAlcVol(Jameson, 0.33), volTumbler),
    calcPriceShot(PisangAmbon, 0.33) + calcPriceShot(TiaMaria, 0.33) + calcPriceShot(Jameson, 0.33) + prijsnonAlcoholKlein, null, null);

const waternoodsramp = new Cocktail("1953", longdrink, "Sprite", [[1, BlueCuracao.name]],
    calcAlcPer(calcAlcVol(BlueCuracao, 1), volLongdrink),
    calcPriceShot(BlueCuracao, 1) + prijsnonAlcoholGroot, "Coline & Max", "Op de bar zetten en scheutje suiker toevoegen. Dan zie je waarom hij 1953 heet");

const aquafreshdeo = new Cocktail("Aqua-fresh Deo", longdrink, "sinas", [[1, BlueCuracao.name], [1, SmirrnoffVodka.name]],
    calcAlcPer(calcAlcVol(BlueCuracao, 1) + calcAlcVol(SmirrnoffVodka, 1), volLongdrink),
    calcPriceShot(BlueCuracao, 1) + calcPriceShot(SmirrnoffVodka, 1) + prijsnonAlcoholGroot, null, "remt physiologica");

const banaantje = new Cocktail("Banaantje", longdrink, "Chocomel", [[1, SmirrnoffVodka.name], [1, Cointreau.name], [1, Baileys.name]],
    calcAlcPer(calcAlcVol(SmirrnoffVodka, 1) + calcAlcVol(Cointreau, 0.33) + calcAlcVol(Baileys, 0.33), volLongdrink),
    calcPriceShot(SmirrnoffVodka, 1) + calcPriceShot(Cointreau, 0.33) + calcPriceShot(Baileys, 0.66), null, null);

const blauweMeuk = new Cocktail("Blauwe Meuk", longdrink, "Sprite", [[1, Disaronno.name], [1, BlueCuracao.name]],
    calcAlcPer(calcAlcVol(Disaronno, 1) + calcAlcVol(BlueCuracao, 1), volLongdrink),
    calcPriceShot(Disaronno, 1) + calcPriceShot(BlueCuracao, 1) + prijsnonAlcoholGroot, null, null);

const boswachter = new Cocktail("Boswachter", longdrink, "Cola", [[0.5, Apfelkorn.name], [0.25, Malibu.name], [0.25, Jagermeister.name]],
    calcAlcPer(calcAlcVol(Apfelkorn, 0.5) + calcAlcVol(Malibu, 0.25) + calcAlcVol(Jagermeister, 0.25), volLongdrink),
    calcPriceShot(Apfelkorn, 0.5) + calcPriceShot(Malibu, 0.25) + calcPriceShot(Jagermeister, 0.25) + prijsnonAlcoholKlein, null, null);

const dieptebom = new Cocktail("Dieptebom", longdrink, "Ginger Ale", [[1, HagelEnDonder.name]],
    calcAlcPer(calcAlcVol(HagelEnDonder,1), volLongdrink),
    calcPriceShot(HagelEnDonder,1) + prijsnonAlcoholKlein, null, "Borrel glas in longdrink laten vallen. Het wapen tegen de U-130");

const dubbelnonAlcoholss = new Cocktail("DubbelnonAlcoholss", longdrink, "Appelsap", [[1, Cointreau.name], [1, Kontiki.name]],
    calcAlcPer(calcAlcVol(Cointreau,1)+ calcAlcVol(Kontiki, 1), volLongdrink),
    calcPriceShot(Cointreau,1) + calcPriceShot(Kontiki,1) + prijsnonAlcoholKlein, "Coline & Max", "Serveren met Rietjes");

const froggy  = new Cocktail("Froggy", longdrink, "Tonic", [[1, Kontiki.name], [1, PisangAmbon.name]],
    calcAlcPer(calcAlcVol(Kontiki,1) + calcAlcVol(PisangAmbon, 1), volLongdrink),
    calcPriceShot(Kontiki,1) + calcPriceShot(PisangAmbon,1) + prijsnonAlcoholGroot, null, null);

const fruitxxl = new Cocktail("Fruit XXL", longdrink, "Appelsap", [[1, Safari.name], [1, Kontiki.name], [1, BacardiLemon.name]],
    calcAlcPer(calcAlcVol(Safari,1) + calcAlcVol(Kontiki,1) + calcAlcVol(BacardiLemon,1), volLongdrink),
    calcPriceShot(Safari,1) + calcPriceShot(Kontiki,1) + calcPriceShot(BacardiLemon,1) + prijsnonAlcoholKlein, null, null);

const groeneThee = new Cocktail("Groene Thee", longdrink, "Ice Tea", [[1, PisangAmbon.name]],
    calcAlcPer(calcAlcVol(PisangAmbon, 1), volLongdrink),
    calcPriceShot(PisangAmbon, 1) + prijsnonAlcoholGroot, null, null);

const hetzelfdeMaarDanZonderIjs = new Cocktail("Hetzelfde, maar dan zonder ijs!", longdrink, "Chocomel", [[0.5, GrandManier.name], [0.5, CafeMarakesh.name], [1, Malibu.name]],
    calcAlcPer(calcAlcVol(GrandManier,0.5) + calcAlcVol(CafeMarakesh,0.5) + calcAlcVol(Malibu, 1), volLongdrink),
    calcPriceShot(GrandManier, 0.5) + calcPriceShot(CafeMarakesh, 0.5) + calcPriceShot(Malibu, 1) + prijsnonAlcoholKlein, null, null);

const jcSpecial = new Cocktail("J.C. Special", longdrink, "Sprite", [[1, BacardiBlanca.name], [1, Vieux.name], [0.5, GordonsGin.name]],
    calcAlcPer(calcAlcVol(BacardiBlanca,1) + calcAlcVol(Vieux, 1) + calcAlcVol(GordonsGin, 0.5), volLongdrink),
    calcPriceShot(BacardiBlanca, 1) + calcPriceShot(Vieux, 1) + calcPriceShot(GordonsGin, 0.5) + prijsnonAlcoholGroot, null, null);

const jonasmania  = new Cocktail("Jonasmania", longdrink, "Appelsap", [[0.5, Coebergh.name], [0.5, HagelEnDonder.name], [0.33, PinaColada.name]],
    calcAlcPer(calcAlcVol(Coebergh, 0.5) + calcAlcVol(HagelEnDonder, 0.5) + calcAlcVol(PinaColada, 0.33), volLongdrink),
    calcPriceShot(Coebergh, 0.5) + calcPriceShot(HagelEnDonder, 0.5) + calcPriceShot(PinaColada, 0.33) +  prijsnonAlcoholKlein, null, "SHAKE WELL WITH ICE AND STIRR INTO GLASS");

const kindercola = new Cocktail("Kindercola", longdrink, "Cola", [[2, Stroh80.name]],
    calcAlcPer(calcAlcVol(Stroh80, 2), volLongdrink),
    calcPriceShot(Stroh80, 2) + prijsnonAlcoholGroot, null, null);

const knipperbol = new Cocktail("Knipperbol", longdrink, "Sinasappelsap", [[1, Ketel1.name]],
    calcAlcPer(calcAlcVol(Ketel1, 1), volLongdrink),
    calcPriceShot(Ketel1, 1) + prijsnonAlcoholKlein, null, null);

const koetjeboe = new Cocktail("KoetjeBoe!", longdrink, "Chocomel", [[0.5, Malibu.name], [0.5, PinaColada.name], [0.5, BacardiBlanca.name]],
    calcAlcPer(calcAlcVol(Malibu, 0.5) + calcAlcVol(PinaColada, 0.5) + calcAlcVol(BacardiBlanca, 0.5), volLongdrink),
    calcPriceShot(Malibu, 0.5) + calcPriceShot(PinaColada, 0.5) + calcPriceShot(BacardiBlanca, 0.5) + prijsnonAlcoholKlein, null, "Dit was een cocktail van de dierendag 2001.5")

const kutMetPeren = new Cocktail("Kut-Met-Peren", longdrink, "Bier", [[1, TiaMaria.name], [1, PisangAmbon.name]],
    calcAlcPer(calcAlcVol(TiaMaria,1) + calcAlcVol(PisangAmbon,1) + calcAlcVolBier(1), volLongdrink),
    calcPriceShot(TiaMaria,1) + calcPriceShot(PisangAmbon,1) + calcPriceShot(Dommelsch, 1), null, "In vaasje met inlegkruisje(zonder vleugels)");

const limonade = new Cocktail("Limonade", longdrink, "Sprite", [[0.5, Passoa.name], [0.5, BacardiRazz.name]],
    calcAlcPer(calcAlcVol(Passoa, 0.5) + calcAlcVol(BacardiRazz, 0.5), volLongdrink),
    calcPriceShot(Passoa, 0.5) + calcPriceShot(BacardiRazz, 0.5) + prijsnonAlcoholGroot, null, null);

const mijnTelefoon = new Cocktail("Mijn Telefoon", longdrink, "Ginger Ale", [[1, Stroh80.name], [0.5, GordonsGin.name]],
    calcAlcPer(calcAlcVol(Stroh80,1) + calcAlcVol(GordonsGin,1), volLongdrink),
    calcPriceShot(Stroh80,1) + calcPriceShot(GordonsGin, 0.5) + prijsnonAlcoholKlein, null, null);

const orgasmotron = new Cocktail("orgasmotron", longdrink, null, [[1, Baileys.name], [1, Cointreau.name], [1, TiaMaria.name], [1,SmirrnoffVodka.name]],
    calcAlcPer(calcAlcVol(Baileys, 1) + calcAlcVol(Cointreau, 1) + calcAlcVol(TiaMaria, 1) + calcAlcVol(SmirrnoffVodka, 1), volLongdrink),
    calcPriceShot(Baileys, 1) + calcPriceShot(Cointreau,1) + calcPriceShot(TiaMaria,1) + calcPriceShot(SmirrnoffVodka,1), null, null);

const pisangAmbier = new Cocktail("Pisang Ambier", longdrink, "Bier", [[0.5, PisangAmbon.name]],
    calcAlcPer(calcAlcVol(PisangAmbon, 0.5) + calcAlcVolBier(1), volLongdrink),
    calcPriceShot(PisangAmbon, 0.5) + calcPriceShot(Dommelsch, 1), null, "Serveren met een schuimbanaantje");

const rainbowWarrior = new Cocktail("Rainbow Warrio", longdrink, "Sinasappelsap", [[0.25, Passoa.name], [0.25, BlueCuracao.name], [0.25, PisangAmbon.name], [0.25, Coebergh.name]],
    calcAlcPer(calcAlcVol(Passoa, 0.25) + calcAlcVol(BlueCuracao, 0.25) + calcAlcVol(PisangAmbon, 0.25) + calcAlcVol(Coebergh, 0.25), volLongdrink),
    calcPriceShot(Passoa, 0.25) + calcPriceShot(BlueCuracao, 0.25) + calcPriceShot(PisangAmbon,0.25) + calcPriceShot(Coebergh, 0.25) + prijsnonAlcoholKlein, null, null);

const vlaamseKopstoot = new Cocktail("Vlaamse Kopstoot", "Hoegaarden glas", "Hoegaarden", [[1, Wortegemse.name]],
    calcAlcPer(calcAlcVol(Wortegemse, 1) + calcAlcVolBier(1), volLongdrink),
    calcPriceShot(Wortegemse, 1) + calcPriceShot(Hoegaarden, 1), null, "Doe de Wortegemse in een shotglas en doe deze omgekeerd in het glas, doe daarna de hoegaarden erbij");

const	rexona = new Cocktail("Rexona", tumbler, null, [[1, BlueCuracao.name], [1, HagelEnDonder.name], [1, PinaColada.name]],
    calcAlcPer(calcAlcVol(BlueCuracao, 1) + calcAlcVol(HagelEnDonder,1) + calcAlcVol(PinaColada, 1), 120),
    calcPriceShot(BlueCuracao,1) + calcPriceShot(HagelEnDonder, 1) + calcPriceShot(PinaColada,1), null, null);

const rood = new Cocktail("Rood", longdrink, "Fanta", [[1, Passoa.name], [1, GordonsGin.name], [0.5, Coebergh.name]],
    calcAlcPer(calcAlcVol(Passoa,1) + calcAlcVol(GordonsGin,1) + calcAlcVol(Coebergh, 1), volLongdrink),
    calcPriceShot(Passoa,1) + calcPriceShot(GordonsGin,1) + calcPriceShot(Coebergh, 0.5) + prijsnonAlcoholGroot, null, null);

const sweetSurprise = new Cocktail("Sweet Surprise", longdrink, "Chocomel", [[1, TiaMaria.name], [1, Disaronno.name], [0.25, CognacRemyMartin.name]],
    calcAlcPer(calcAlcVol(TiaMaria,1) + calcAlcVol(Disaronno,1) + calcAlcVol(CognacRemyMartin, 0.25), volLongdrink),
    calcPriceShot(TiaMaria, 1) + calcPriceShot(Disaronno,1) + calcPriceShot(CognacRemyMartin, 0.25) + prijsnonAlcoholKlein, null, null);

const systemShock = new Cocktail("System Shock" , longdrink, "Tonic", [[1, Tequila.name]],
    calcAlcPer(calcAlcVol(Tequila, 1), volLongdrink),
    calcPriceShot(Tequila, 1) + prijsnonAlcoholGroot, null, "Shockerend !!");

const tBeertje = new Cocktail("T-Beertje", longdrink, "Ice Tea", [[1, Beerenburg.name]],
    calcAlcPer(calcAlcVol(Beerenburg, 1) , volLongdrink),
    calcPriceShot(Beerenburg, 1) + prijsnonAlcoholGroot, null ,null);

const zonsondergang = new Cocktail("Zonsondergang", longdrink, "Sinasappelsap", [[0.75, Cointreau.name], [0.25, Ketel1.name]],
    calcAlcPer(calcAlcVol(Cointreau, 0.75) + calcAlcVol(Ketel1, 0.25), volLongdrink),
    calcPriceShot(Cointreau, 0.75) + calcPriceShot(Ketel1, 0.25) + prijsnonAlcoholKlein, null, "Serveren met suikerrandje en schijfje citroen");

const brentSpar = new Cocktail("Brent Spar", tumbler, "Bitter Lemon", [[0.5, Jameson.name], [0.5, TiaMaria.name]],
    calcAlcPer(calcAlcVol(Jameson, 0.5) + calcAlcVol(TiaMaria, 0.5), volTumbler),
    calcPriceShot(Jameson, 0.5) + calcPriceShot(TiaMaria, 0.5) + prijsnonAlcoholGroot, null, "Afzinken in tumbler zodat het borrelglaasje net onder water staat");

const colaDream = new Cocktail("Cola Dream", tumbler, null, [[1, "Cola"], [2,Vieux.name]],
    calcAlcPer(calcAlcVol(Vieux, 2), 120),
    calcPriceShot(Vieux,2), null, null);

const fryslanBopper = new Cocktail("Fryslan Bopper", tumbler, null, [[0.33, Sippersbitter.name], [0.33, Beerenburg.name], [0.33, Ketel1.name]],
    calcAlcPer(calcAlcVol(Sippersbitter, 0.33) + calcAlcVol(Beerenburg, 0.33) + calcAlcVol(Ketel1, 0.33), 40),
    calcPriceShot(Sippersbitter, 0.33) + calcPriceShot(Beerenburg, 0.33) + calcPriceShot(Ketel1, 0.33), null,
    "Zet een tumbler die een beetje nat is in de vriezer. Laat deze 1 uur staan. Maak de cocktail al van te voren klaar in een borrelglas. Dien de cocktail op als er sterke zeilverhalen aan de bar worden verteld, in het ingevroren glas");

const gps = new Cocktail("De G.P.S.", tumbler, null, [[1, GordonsGin.name], [1, Passoa.name], [1,Safari.name]],
    calcAlcPer(calcAlcVol(GordonsGin, 1) + calcAlcVol(Passoa, 1) + calcAlcVol(Safari, 1), 120),
    calcPriceShot(GordonsGin, 1) + calcPriceShot(Passoa, 1) + calcPriceShot(Safari, 1), null ,null);

const inekesWraak = new Cocktail("Ineke's Wraak", tumbler, "Scheutje Grand Manier", [[0.67, Baileys.name], [0.33, Disaronno.name]],
    calcAlcPer(calcAlcVol(Baileys, 0.67) + calcAlcVol(Disaronno, 0.33), 40),
    calcPriceShot(Baileys, 0.67) + calcPriceShot(Disaronno, 0.33), null, null);

const kater = new Cocktail("De Kater", tumbler, null, [[1, Jameson.name], [1, HagelEnDonder.name], [1, Stroh80.name]],
    calcAlcPer(calcAlcVol(Jameson, 1) + calcAlcVol(HagelEnDonder, 1) + calcAlcVol(Stroh80, 1), 120),
    calcPriceShot(Jameson, 1) + calcPriceShot(HagelEnDonder, 1) + calcPriceShot(Stroh80, 1), null, null);

const kitten = new Cocktail("De Kitten", tumbler, null, [[1, Jameson.name], [1, HagelEnDonder.name], [2, "Fanta"]],
    calcAlcPer(calcAlcVol(Jameson, 1) + calcAlcVol(HagelEnDonder, 1), 160),
    calcPriceShot(Jameson, 1) + calcPriceShot(HagelEnDonder, 1) + 0.4 * prijsnonAlcoholGroot, null, null);

const lemonWithABite = new Cocktail("Lemon with a bite", tumbler, null, [[0.5, Jameson.name], [0.5, MartiniRosso.name]],
    calcAlcPer(calcAlcVol(Jameson, 0.5) + calcAlcVol(MartiniRosso, 0.5), 40),
    calcPriceShot(Jameson, 0.5) + calcPriceShot(MartiniRosso, 0.5), null ,"Tumbler afbinden met een zuur matje");

const lrSpecial = new Cocktail("LR-special", tumbler, null,  [[1, BacardiBlanca.name], [1, GordonsGin.name], [0.5, CremeDeCassis.name], [3, "Sinasappelsap"]],
    calcAlcPer(calcAlcVol(BacardiBlanca, 1) + calcAlcVol(GordonsGin, 1) + calcAlcVol(CremeDeCassis, 0.5), 220),
    calcPriceShot(BacardiBlanca, 1) + calcPriceShot(GordonsGin, 1) + calcPriceShot(CremeDeCassis, 0.5) + 0.6 * prijsnonAlcoholKlein, null, null);

const luMiniscent = new Cocktail("Lu Miniscent", tumbler, "Sinas", [[0.5, Kontiki.name], [0.5, Safari.name]],
    calcAlcPer(calcAlcVol(Kontiki, 0.5) + calcAlcVol(Safari, 0.5), volLongdrink),
    calcPriceShot(Kontiki, 0.5) + calcPriceShot(Safari, 0.5) + prijsnonAlcoholGroot, "Lucas & Kossen", null);

const marcsSurprice = new Cocktail("Marcs Surprice", tumbler, null, [[1, Kontiki.name], [1, PisangAmbon.name], [1, Disaronno.name], [1, "Sinasappelsap"]],
    calcAlcPer(calcAlcVol(Kontiki, 1) + calcAlcVol(PisangAmbon, 1) + calcAlcVol(Disaronno, 1), 160),
    calcPriceShot(Kontiki, 1) + calcPriceShot(PisangAmbon, 1) + calcPriceShot(Disaronno, 1) + 0.2 * prijsnonAlcoholKlein, null, null);

const marielleDondertOp = new Cocktail("Mariëlle Dondert Op", tumbler, null, [[0.5, BlueCuracao.name], [0.5, BacardiLemon.name], [1, HagelEnDonder.name]],
    calcAlcPer(calcAlcVol(BlueCuracao, 0.5) + calcAlcVol(BacardiLemon, 0.5) + calcAlcVol(HagelEnDonder, 1), 120),
    calcPriceShot(BlueCuracao, 0.5) + calcPriceShot(BacardiLemon, 0.5) + calcPriceShot(HagelEnDonder, 1), null, null);

const mururoaDreams = new Cocktail("Mururoa Dreams", tumbler, null, [[1, BlueCuracao.name], [2, Kontiki.name], [1, BacardiBlanca.name],],
    calcAlcPer(calcAlcVol(BlueCuracao, 1) + calcAlcVol(Kontiki, 2) + calcAlcVol(BacardiBlanca, 1),  160),
    calcPriceShot(BlueCuracao, 1) + calcPriceShot(Kontiki, 2) + calcPriceShot(BacardiBlanca, 1), "Tjerry & Bouke", "Serveren met rietjes, evt met ijs");

const nikita = new Cocktail("Nikita", tumbler, null, [[0.33, SmirrnoffVodka.name], [0.67, Cointreau.name]],
    calcAlcPer(calcAlcVol(SmirrnoffVodka, 0.33) + calcAlcVol(Cointreau, 0.67), 80),
    calcPriceShot(SmirrnoffVodka, 0.33) + calcPriceShot(Cointreau, 0.67), null, "In een keer acteroverslaan <br> Shale well with ice");

const omasAppeltaart = new Cocktail("Oma's Appeltaart", tumbler, null, [[0.5, Goldstrike.name], [1.5, Apfelkorn.name]],
    calcAlcPer(calcAlcVol(Goldstrike, 0.5) + calcAlcVol(Apfelkorn, 1.5), 80),
    calcPriceShot(Goldstrike, 0.5) + calcPriceShot(Apfelkorn, 1.5), "Coline & Max", "Aanvullen met een aantal rozijnen");

const orangeCoin = new Cocktail("Orange coin", tumbler, null, [[2, Cointreau.name]],
    calcAlcPer(calcAlcVol(Cointreau, 2), 80),
    calcPriceShot(Cointreau, 2), null, "Jus toevoegen naar smaak");

const rooieDiesel = new Cocktail("Rooie Diesel", tumbler, null, [[0.5, Apfelkorn.name], [0.5, Passoa.name], [0.5, GrandManier.name], [0.5, Tequila.name]],
    calcAlcPer(calcAlcVol(Apfelkorn, 0.5) + calcAlcVol(Passoa, 0.5) + calcAlcVol(GrandManier, 0.5) + calcAlcVol(Tequila, 0.5), 80),
    calcPriceShot(Apfelkorn, 0.5) + calcPriceShot(Passoa, 0.5) + calcPriceShot(GrandManier, 0.5) + calcPriceShot(Tequila, 0.5), null,
    "Doe dit in een shaker, voeg ijs toe en shake er rustig op los. Giet het geheel door het shakerzeefje in een longdrinkglas. PAS OP ! Deze cocktail heeft een hoog cetaangetal");

const silentKiller = new Cocktail("Silent Killer", tumbler, null, [[0.5, VodkaRood.name], [0.5, Kontiki.name], [0.5, SmirrnoffVodka.name]],
    calcAlcPer(calcAlcVol(VodkaRood, 0.5) + calcAlcVol(Kontiki, 0.5) + calcAlcVol(SmirrnoffVodka, 0.5), volTumbler),
    calcPriceShot(VodkaRood, 0.5) + calcPriceShot(Kontiki, 0.5) + calcPriceShot(SmirrnoffVodka, 0.5) + prijsnonAlcoholKlein, null, "Afvullen met AA");

const sunKiller = new Cocktail("Sun Killer", tumbler, "Sprite", [[0.5, Kontiki.name], [0.5, Malibu.name], [1, Tequila.name]],
    calcAlcPer(calcAlcVol(Kontiki, 0.5) + calcAlcVol(Malibu, 0.5) + calcAlcVol(Tequila, 1), volTumbler),
    calcPriceShot(Kontiki, 0.5) + calcPriceShot(Malibu, 0.5) + calcPriceShot(Tequila, 1) + prijsnonAlcoholGroot, null, null);

const redDevil = new Cocktail("Red Devil", tumbler, null, [[0.5, Marasquin.name], [0.5, Stroh80.name], [1, "Fanta"]],
    calcAlcPer(calcAlcVol(Marasquin, 0.5) + calcAlcVol(Stroh80, 0.5), 80),
    calcPriceShot(Marasquin, 0.5) + calcPriceShot(Stroh80, 0.5), null, null);

const tnt = new Cocktail("TNT", tumbler, null, [[0.5, Jameson.name], [0.5, Pernod.name]],
    calcAlcPer(calcAlcVol(Jameson, 0.5) + calcAlcVol(Pernod, 0.5), 40),
    calcPriceShot(Jameson, 0.5) + calcPriceShot(Pernod, 0.5), null, null);

const bolkestein = new Cocktail("Bolkestein", shot, null, [[0.5, BlueCuracao.name], [0.5, Oranjebitter.name]],
    calcAlcPer(calcAlcVol(BlueCuracao, 0.5) + calcAlcVol(Oranjebitter, 0.5), volShotglas),
    calcPriceShot(BlueCuracao, 0.5) + calcPriceShot(Oranjebitter, 0.5), null, null);

const brainexplosion = new Cocktail("Brainexplosion", shot, null, [[0.5, PeachTree.name], [0.5, Baileys.name]],
    calcAlcPer(calcAlcVol(PeachTree, 0.5) + calcAlcVol(Baileys, 0.5), volShotglas),
    calcPriceShot(PeachTree, 0.5) + calcPriceShot(Baileys, 0.5), null, "Aanvullen met lepeltje siroop");

const brainfuck = new Cocktail("Brainfuck", shot, null, [[0.5, PeachTree.name], [0.5, Sperma.name]],
    calcAlcPer(calcAlcVol(PeachTree, 0.5) + calcAlcVol(Sperma, 0.5), volShotglas),
    calcPriceShot(PeachTree, 0.5) + calcPriceShot(Sperma, 0.5), null, "Aanvullen met lepeltje siroop");

const histos92 = new Cocktail("Histos '92", shot, null, [[0.33, Sippersbitter.name], [0.67, Beerenburg.name]],
    calcAlcPer(calcAlcVol(Sippersbitter, 0.33) + calcAlcVol(Beerenburg, 0.67), volShotglas),
    calcPriceShot(Sippersbitter, 0.33) + calcPriceShot(Beerenburg, 0.67), null, "Deze cocktail is geinspireerd door de bovengenoemde alcoholen, de enige twee soorten sterke alcohol die tijden het Histos Teamzeiltoernooi '92 aanwezig waren en veelzijdig door de twee Harpyia-teams zijn genuttigd/gemixd");

const noorseMilf = new Cocktail("Noorse Milf", shot, null, [[0.5, Tequila.name], [0.5, Sambuca.name]],
    calcAlcPer(calcAlcVol(Tequila, 0.5) + calcAlcVol(Sambuca, 0.5), volShotglas),
    calcPriceShot(Tequila, 0.5) + calcPriceShot(Sambuca, 0.5), null, "Paar druppels tabasco toevoegen");

const vuilverbrander = new Cocktail("Vuilverbrander", shot, null, [[0.5, GrandManier.name], [0.5, Stroh80.name]],
    calcAlcPer(calcAlcVol(GrandManier, 0.5) + calcAlcVol(Stroh80, 0.5), volShotglas),
    calcPriceShot(GrandManier, 0.5) + calcPriceShot(Stroh80, 0.5), null, "Paar druppels tabasco toevoegen");

const roelofMetPassie = new Cocktail("Roelof met passie", social, null, [[2, Passoa.name], [1, "Flesje AA"]],
    calcAlcPer(calcAlcVol(Passoa, 2), volSocial),
    calcPriceShot(Passoa, 2) + prijsnonAlcoholKlein, null, null);

const blackWidowmakerZevensprong = new Cocktail("Black Widowmaker Zevensprong", social, null, [[1, "Cassis"], [1, BacardiBlanca.name], [1, SmirrnoffVodka.name], [1, BlueCuracao.name], [1, Coebergh.name], [1, Jameson.name], [1, GordonsGin.name]],
    calcAlcPer(calcAlcVol(BacardiBlanca, 1) + calcAlcVol(SmirrnoffVodka, 1) + calcAlcVol(BlueCuracao, 1) + calcAlcVol(Coebergh, 1) + calcAlcVol(Jameson, 1) + calcAlcVol(GordonsGin, 1), 240),
    calcPriceShot(BacardiBlanca, 1) + calcPriceShot(SmirrnoffVodka, 1) + calcPriceShot(BlueCuracao, 1) + calcPriceShot(Coebergh, 1) + calcPriceShot(Jameson, 1) + calcPriceShot(GordonsGin, 1) + 0.2 * prijsnonAlcoholGroot, null, "Goed Schudden, serveren met 7 rietjes <br> Brancards klaarhouden");

const destroyer = new Cocktail("Destroyer", social, null, [[1, SmirrnoffVodka.name], [2, PisangAmbon.name], [2, BlueCuracao.name], [5, "Sinasappelsap"]],
    calcAlcPer(calcAlcVol(SmirrnoffVodka, 1) + calcAlcVol(PisangAmbon, 2) + calcAlcVol(BlueCuracao, 2), 400),
    calcPriceShot(SmirrnoffVodka, 1) + calcPriceShot(PisangAmbon, 2) + calcPriceShot(BlueCuracao, 2) + prijsnonAlcoholKlein, null, null);

const natteOlijf = new Cocktail("Natte Olijf", shot, null, [[1, "Olijf"], [1, "Water"]], 0, 0, null, null);
*/