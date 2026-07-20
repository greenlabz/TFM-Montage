export type GuideStep = {
  title: string
  text: string
}

export type Guide = {
  slug: string
  number: string
  category: string
  title: string
  teaser: string
  quickAnswer: string
  image: string
  imageAlt: string
  readingTime: string
  keywords: string[]
  materials: string[]
  steps: GuideStep[]
  mistakes: string[]
  professionalWhen: string
  faq: { question: string; answer: string }[]
  sources: { label: string; url: string }[]
}

const commonSources = {
  sanding: {
    label: "OBI: Holz richtig schleifen",
    url: "https://www.obi.de/magazin/wohnen/innengestaltung/upcycling-moebel/holz-schleifen",
  },
  coating: {
    label: "Umweltbundesamt: Lacke und Lasuren",
    url: "https://www.umweltbundesamt.de/lacke-lasuren",
  },
  protection: {
    label: "Umweltbundesamt: Holzschutzmittel",
    url: "https://www.umweltbundesamt.de/holzschutzmittel",
  },
}

export const guides: Guide[] = [
  {
    slug: "holz-richtig-oelen",
    number: "01",
    category: "Oberfläche",
    title: "Holz richtig ölen: dünn auftragen, sauber abnehmen",
    teaser: "So wird die Oberfläche gleichmäßig, ohne klebrige Stellen oder dunkle Ränder.",
    quickAnswer: "Holz wird in Faserrichtung geschliffen, vollständig entstaubt und nur dünn geölt. Nach der Einwirkzeit muss überschüssiges Öl restlos abgenommen werden. Mehrere dünne Aufträge sind sicherer als eine satte Schicht.",
    image: "/holzpflege.jpg",
    imageAlt: "Geölte Holzoberfläche mit sichtbarer natürlicher Maserung",
    readingTime: "7 Min.",
    keywords: ["Holz ölen", "Holzöl auftragen", "klebriges Holzöl", "Holzpflege"],
    materials: ["passendes Holzöl", "fusselfreie Baumwolltücher", "Schleifpapier Körnung 120 bis 180", "Staubsauger und weiche Bürste", "Handschuhe"],
    steps: [
      { title: "Oberfläche bestimmen", text: "Öl gehört auf rohes oder bereits geöltes Holz. Lackierte Flächen nehmen es nicht auf. An einer verdeckten Stelle zeigt ein Wassertropfen, ob die Fläche saugt. Perlt er vollständig ab, liegt meist eine geschlossene Beschichtung vor." },
      { title: "Gleichmäßig vorbereiten", text: "In Faserrichtung schleifen und die Körnung nicht überspringen. Kanten nur leicht brechen. Staub aus Poren und Fugen entfernen; feuchter Schleifstaub erzeugt später Flecken." },
      { title: "Dünn sättigen", text: "Öl abschnittsweise mit Tuch oder Pinsel verteilen. Produktangabe zur Einwirkzeit beachten. Trockene Stellen nachversorgen, Pfützen und Läufer vermeiden." },
      { title: "Überschuss abnehmen", text: "Mit sauberem Tuch so lange nachwischen, bis die Fläche trocken wirkt. Klebrige Stellen entstehen fast immer durch zu viel Öl. Erst nach vollständiger Trocknung einen zweiten dünnen Auftrag prüfen." },
      { title: "Tücher sicher lagern", text: "Ölgetränkte Tücher können sich selbst entzünden. Nach Herstellerangabe behandeln: ausgebreitet im Freien trocknen oder in einem dicht schließenden, geeigneten Metallbehälter verwahren und örtlich korrekt entsorgen." },
    ],
    mistakes: ["Öl auf unbekannten Lack auftragen", "zu viel Material stehen lassen", "mit kreisenden Schleifspuren arbeiten", "benutzte Öltücher zusammenknüllen"],
    professionalWhen: "Bei großen zusammenhängenden Flächen, unbekannten Altbeschichtungen oder wertvollen Furnieren lohnt eine fachliche Probe. So bleibt der Farbton über die gesamte Fläche gleich.",
    faq: [
      { question: "Wie lange muss Holzöl trocknen?", answer: "Das hängt vom Produkt, Holz, Auftrag und Raumklima ab. Maßgeblich ist die Herstellerangabe. Kühle Räume und hohe Luftfeuchte verlängern die Zeit deutlich." },
      { question: "Warum bleibt geöltes Holz klebrig?", answer: "Meist wurde zu viel Öl aufgetragen oder der Überschuss zu spät abgenommen. Fläche nicht weiter belasten und die Hinweise des Ölherstellers zur Nachbehandlung beachten." },
      { question: "Muss Holz vor dem Ölen geschliffen werden?", answer: "Rohes, raues oder ungleich saugendes Holz ja. Bei einer intakten, bereits geölten Pflegefläche kann gründliches Reinigen und ein feiner Zwischenschliff genügen." },
    ],
    sources: [commonSources.sanding, commonSources.coating],
  },
  {
    slug: "wasserflecken-auf-holz-entfernen",
    number: "02",
    category: "Pflege",
    title: "Wasserflecken auf Holz: erst den Fleck lesen",
    teaser: "Weiße Ringe sitzen meist oben. Dunkle Flecken gehen oft tiefer. Davon hängt die Reparatur ab.",
    quickAnswer: "Weiße oder milchige Ringe deuten häufig auf Feuchtigkeit in der Beschichtung hin. Dunkle Flecken sind meist tiefer ins Holz gezogen. Zuerst trocken reinigen und verdeckt testen; aggressive Hausmittel können Lack und Farbton dauerhaft verändern.",
    image: "/Detailarbeit_Holz.jpeg",
    imageAlt: "Detailaufnahme einer Holzoberfläche bei der Bearbeitung",
    readingTime: "6 Min.",
    keywords: ["Wasserflecken Holz entfernen", "weiße Ringe Holztisch", "dunkle Wasserflecken Holz"],
    materials: ["weiches weißes Tuch", "milde pH-neutrale Reinigung", "passendes Pflegeprodukt", "feines Schleifpapier nur für offene Oberflächen"],
    steps: [
      { title: "Farbe und Oberfläche prüfen", text: "Weißer Schleier, dunkler Rand oder aufgestellte Fasern brauchen unterschiedliche Maßnahmen. Kläre außerdem, ob die Fläche lackiert, geölt, gewachst oder roh ist." },
      { title: "Vollständig trocknen lassen", text: "Nässe aufnehmen, Luft zirkulieren lassen und nicht sofort mit starker Hitze arbeiten. Punktuelle Hitze kann Lack anlösen, Furnierleim schwächen oder Spannungsrisse erzeugen." },
      { title: "Mild beginnen", text: "Mit trockenem Tuch reinigen. Danach nur ein zur Oberfläche passendes Pflegemittel an verdeckter Stelle testen. Keine Mischung verschiedener Hausmittel aufeinandergeben." },
      { title: "Tiefe Schäden eingrenzen", text: "Bei offenem Massivholz kann ein sehr feiner, flächiger Schliff helfen. Nie nur die dunkle Stelle ausschleifen: Das erzeugt eine Mulde und einen sichtbaren hellen Hof." },
    ],
    mistakes: ["Föhn oder Bügeleisen unkontrolliert einsetzen", "Essig, Zahnpasta und Öl mischen", "Furnier punktuell durchschleifen", "feuchtes Holz direkt versiegeln"],
    professionalWhen: "Dunkle Flecken unter Lack, gelöstes Furnier, Schimmelgeruch oder ein größerer Wasserschaden brauchen Ursachenklärung. Erst die Feuchtequelle stoppen, dann die Oberfläche reparieren.",
    faq: [
      { question: "Gehen weiße Wasserringe von allein weg?", answer: "Manche werden beim langsamen Austrocknen schwächer. Bleibt der Ring, sitzt Feuchte oder eine Veränderung in der Beschichtung. Dann nur oberflächenverträglich weiterarbeiten." },
      { question: "Kann man dunkle Wasserflecken abschleifen?", answer: "Bei massivem, offenem Holz manchmal. Dunkle Verfärbungen können tief reichen. Bei Furnier ist Schleifen riskant, weil die Nutzschicht sehr dünn ist." },
      { question: "Wie verhindere ich neue Wasserflecken?", answer: "Flüssigkeit zügig aufnehmen, Untersetzer nutzen und Pflege oder Beschichtung regelmäßig prüfen. Besonders Kanten und Fugen dürfen nicht offen bleiben." },
    ],
    sources: [commonSources.sanding, commonSources.coating],
  },
  {
    slug: "kratzer-dellen-holz-reparieren",
    number: "03",
    category: "Reparatur",
    title: "Kratzer und Dellen im Holz reparieren",
    teaser: "Oberflächlicher Strich, tiefe Kerbe oder Druckstelle? Drei Schäden, drei saubere Wege.",
    quickAnswer: "Leichte Kratzer in geöltem Holz lassen sich oft reinigen, fein anschleifen und nachölen. Tiefe Kerben werden passend gefüllt. Dellen in offenem Massivholz können sich mit dosierter Feuchte und Wärme teilweise aufrichten; bei Lack und Furnier ist dieser Weg riskant.",
    image: "/Bodenverlegung.jpeg",
    imageAlt: "Verlegter Holzboden mit gleichmäßiger Oberfläche",
    readingTime: "8 Min.",
    keywords: ["Kratzer Holz reparieren", "Delle Holztisch entfernen", "Parkett Kratzer ausbessern"],
    materials: ["weiches Tuch", "feines Schleifpapier", "Hartwachs oder Holzspachtel im passenden Ton", "Kunststoffspachtel", "passendes Pflegeöl"],
    steps: [
      { title: "Schaden klassifizieren", text: "Mit dem Fingernagel quer über die Stelle fahren. Bleibt er nicht hängen, liegt der Schaden meist nur in Pflegefilm oder Beschichtung. Eine fühlbare Kerbe braucht Füllmaterial oder einen flächigen Neuaufbau." },
      { title: "Leichte Kratzer angleichen", text: "Fläche reinigen. Geöltes Holz sehr fein in Faserrichtung anschleifen und sparsam nachölen. Lackierte Flächen nicht punktuell ölen." },
      { title: "Kerben füllen", text: "Hartwachs eignet sich für kleine, belastete Stellen; Spachtel eher vor einer deckenden Beschichtung. Farbton aus zwei passenden Tönen mischen und die Maserung nicht mit einer breiten, einfarbigen Fläche zudecken." },
      { title: "Dellen vorsichtig aufrichten", text: "Nur bei geeignetem, offenem Massivholz: minimal befeuchten und Wärme durch ein Tuch dosieren. Dazwischen prüfen. Bei Furnier, MDF oder geschlossener Lackierung auslassen." },
      { title: "Glanzgrad angleichen", text: "Eine Reparatur fällt oft wegen des Glanzes auf, nicht wegen der Farbe. Nach vollständiger Aushärtung die Pflege über einen größeren, natürlich begrenzten Bereich angleichen." },
    ],
    mistakes: ["Möbelstift ohne Farbprobe verwenden", "nur einen kleinen Punkt grob ausschleifen", "Furnier mit Dampf ablösen", "Parkett sofort voll belasten"],
    professionalWhen: "Bei großflächigen Parkettschäden, durchgeschliffenem Furnier oder tiefen Schäden an tragenden Holzteilen ist eine örtliche Reparatur oft nicht dauerhaft.",
    faq: [
      { question: "Welcher Reparaturstift passt zu meinem Holz?", answer: "Holzart allein reicht nicht. Alter, Öl, Beize und Licht verändern den Ton. Immer mehrere Töne an unauffälliger Stelle vergleichen." },
      { question: "Kann man Dellen aus lackiertem Holz dämpfen?", answer: "Nicht ohne Risiko. Wärme und Feuchte können Lack weiß werden lassen oder ablösen. Bei geschlossener Oberfläche ist eine Füll- und Lackreparatur meist kontrollierbarer." },
      { question: "Wann muss Parkett komplett geschliffen werden?", answer: "Nicht bei jedem Kratzer. Erst wenn viele tiefe Schäden, Laufstraßen oder eine insgesamt verschlissene Oberfläche vorliegen, ist ein flächiger Aufbau sinnvoll." },
    ],
    sources: [
      { label: "OBI: Parkett reparieren", url: "https://www.obi.de/magazin/bauen/boden/parkett-reparieren" },
      commonSources.sanding,
    ],
  },
  {
    slug: "holz-richtig-lackieren",
    number: "04",
    category: "Oberfläche",
    title: "Holz lackieren: Vorbereitung entscheidet",
    teaser: "Saubere Kanten, ruhige Fläche, keine Nasen. Der Ablauf für einen belastbaren Lackaufbau.",
    quickAnswer: "Holz wird gereinigt, gleichmäßig geschliffen, entstaubt und bei Bedarf grundiert. Lack in mehreren dünnen Schichten in Faserrichtung auftragen. Zwischen den Schichten nur nach Herstellerangabe fein anschleifen und jede Lage vollständig trocknen lassen.",
    image: "/Elegantes_Wohninterieur.jpeg",
    imageAlt: "Lackierte Holzelemente in einem ruhigen Wohninterieur",
    readingTime: "8 Min.",
    keywords: ["Holz lackieren Anleitung", "Holz grundieren", "Holzlack ohne Pinselstriche"],
    materials: ["geeigneter Lack und Grundierung", "Schleifpapier 120, 180 und 240", "Staubbindetuch", "Qualitätspinsel oder Lackrolle", "Abdeckmaterial"],
    steps: [
      { title: "System festlegen", text: "Innen oder außen, maßhaltig oder nicht, deckend oder transparent: Lack und Grundierung müssen zum Bauteil und zueinander passen. Produktdatenblatt lesen." },
      { title: "Altfläche tragfähig machen", text: "Fett, Silikon und lose Schichten entfernen. Intakten Altlack matt schleifen. Unbekannte Beschichtungen an kleiner Stelle auf Verträglichkeit testen." },
      { title: "Poren und Kanten grundieren", text: "Saugende Hölzer, MDF-Kanten und problematische Inhaltsstoffe brauchen oft eine passende Grundierung. Sie verhindert fleckigen Glanz und übermäßigen Lackverbrauch." },
      { title: "Dünn lackieren", text: "Kanten zuerst, Flächen danach. Material gleichmäßig verteilen und zuletzt ohne Druck in eine Richtung verschlichten. Nicht in bereits anziehenden Lack zurückarbeiten." },
      { title: "Zwischenschliff und Endlage", text: "Nach Trocknung Staubeinschlüsse fein glätten, gründlich entstauben und die Endlage dünn auftragen. Belastung erst nach Durchhärtung." },
    ],
    mistakes: ["Silikonreste überlackieren", "dicke Schicht gegen Deckungsprobleme", "zwischen Systemen ohne Test wechseln", "Trocknung und Durchhärtung verwechseln"],
    professionalWhen: "Fenster, Türen, Treppen und große Fronten verlangen gleichmäßigen Auftrag und abgestimmten Lack. Bei unbekannten Altanstrichen schützt eine Probefläche vor flächigem Versagen.",
    faq: [
      { question: "Welche Körnung vor dem Lackieren?", answer: "Häufig endet der Vorschliff bei 180 bis 240. Holz, vorhandene Beschichtung und Lacksystem geben den genauen Aufbau vor." },
      { question: "Muss Holz immer grundiert werden?", answer: "Nein. Bei stark saugenden Flächen, MDF-Kanten, bestimmten Holzinhaltsstoffen oder einem System mit vorgeschriebener Grundierung aber schon." },
      { question: "Warum sieht man Pinselstriche?", answer: "Typische Ursachen sind zäher Lack, falsches Werkzeug, zu langes Nacharbeiten oder eine zu warme, zugige Umgebung." },
    ],
    sources: [
      { label: "BAUHAUS: Holz lackieren und lasieren", url: "https://www.bauhaus.at/ratgeber/renovieren-modernisieren/holz-lackieren-und-lasieren" },
      commonSources.coating,
    ],
  },
  {
    slug: "alten-lack-von-holz-entfernen",
    number: "05",
    category: "Oberfläche",
    title: "Alten Lack entfernen, ohne das Holz zu ruinieren",
    teaser: "Schleifen, schaben, Wärme oder Abbeizer? So wählst du den mildesten wirksamen Weg.",
    quickAnswer: "Lose Lackschichten zuerst mechanisch und schonend lösen. Flächen werden meist geschliffen, Profile eher geschabt. Wärme und Abbeizer brauchen Materialkenntnis, Lüftung und Schutz. Unbekannte alte Anstriche nicht trocken abschleifen, bevor mögliche Schadstoffe geklärt sind.",
    image: "/Verschonern2.jpg",
    imageAlt: "Altes Holzbauteil während einer behutsamen Aufarbeitung",
    readingTime: "9 Min.",
    keywords: ["Lack von Holz entfernen", "Holz abbeizen", "alten Lack abschleifen"],
    materials: ["Farbschaber mit scharfer Klinge", "Schleifmittel mit Absaugung", "Schutzbrille und geeigneter Atemschutz", "Abdeckfolie", "Testfläche"],
    steps: [
      { title: "Anstrich einschätzen", text: "Alter, Schichtdicke, Haftung und Untergrund prüfen. Bei sehr alten oder unbekannten Beschichtungen vor Staub und Hitze mögliche Schadstoffe fachlich abklären." },
      { title: "Mildeste Methode testen", text: "An verdeckter Stelle mit einem scharfen Schaber beginnen. Löst sich nur die lose Schicht, bleibt mehr Holzsubstanz erhalten." },
      { title: "Flächen kontrolliert schleifen", text: "Mit Absaugung und passender Körnung arbeiten. Maschine ständig bewegen, Kanten nicht rund schleifen und Profile von Hand bearbeiten." },
      { title: "Chemie oder Wärme begrenzen", text: "Nur geeignete Produkte und sichere Arbeitsbedingungen nutzen. Wärme kann Harz, Furnierleim und angrenzende Materialien schädigen; Abbeizer müssen vollständig neutralisiert oder entfernt werden." },
      { title: "Für den Neuaufbau vorbereiten", text: "Rückstände beseitigen, Oberfläche gleichmäßig schleifen und vollständig trocknen lassen. Erst dann das neue System auf einer Probe prüfen." },
    ],
    mistakes: ["unbekannten Altanstrich staubig trocken schleifen", "Heißluft nahe Glas oder Fugen einsetzen", "Profile mit grober Maschine verrunden", "Abbeizerreste überlackieren"],
    professionalWhen: "Bei denkmalwerten Bauteilen, Bleiverdacht, großen Flächen oder mehreren unbekannten Schichten sollte ein Fachbetrieb Proben und Aufbau festlegen.",
    faq: [
      { question: "Ist Abbeizen besser als Schleifen?", answer: "Nicht pauschal. Abbeizer erreicht Profile, bringt aber Chemie und Rückstände ins Spiel. Schleifen ist gut kontrollierbar, erzeugt jedoch Staub und trägt Holz ab." },
      { question: "Kann Lack mit Heißluft entfernt werden?", answer: "Bei geeigneten Bauteilen ja, aber mit Brand-, Dampf- und Materialrisiko. Alte unbekannte Anstriche und hitzeempfindliche Verbindungen gehören nicht in einen ungeprüften Versuch." },
      { question: "Muss jeder Lackrest weg?", answer: "Für einen deckenden Neuaufbau reicht oft ein fester, verträglicher und matt geschliffener Altanstrich. Für Öl oder transparente Optik muss die geschlossene Schicht vollständig weg." },
    ],
    sources: [commonSources.sanding, commonSources.coating],
  },
  {
    slug: "holz-schleifen-koernung",
    number: "06",
    category: "Grundwissen",
    title: "Welche Körnung für Holz? Ein klarer Schleifplan",
    teaser: "Grob formt, mittel glättet, fein bereitet vor. Diese Reihenfolge verhindert sichtbare Schleifspuren.",
    quickAnswer: "Für rohes Holz startet man je nach Zustand meist mit 80 oder 100, glättet mit 120 bis 150 und endet vor Öl häufig bei 150 bis 180, vor Lack bei etwa 180 bis 240. Immer in Faserrichtung arbeiten und Körnungen nicht zu weit überspringen.",
    image: "/Akustik2.jpg",
    imageAlt: "Holzleisten mit sauber geschliffenen Oberflächen",
    readingTime: "6 Min.",
    keywords: ["Holz schleifen Körnung", "Schleifpapier Holz Tabelle", "Körnung vor Ölen"],
    materials: ["Schleifklotz oder passende Maschine", "Körnungen 80, 120, 180 und 240", "Absaugung", "Schutzbrille und Atemschutz", "Streiflicht"],
    steps: [
      { title: "Startkörnung wählen", text: "Tiefe Sägespuren oder alter Aufbau brauchen gröberes Papier. Eine bereits glatte Fläche startet feiner. Zu grob bedeutet unnötige Riefen, zu fein am Anfang kostet Zeit." },
      { title: "Riefen vollständig entfernen", text: "Jede Stufe muss die Spuren der vorherigen beseitigen. Streiflicht zeigt Kratzer besser als frontales Licht. Erst danach wechseln." },
      { title: "Faser respektieren", text: "Letzte Schleifgänge immer in Faserrichtung. Querkratzer werden durch Öl oder Beize deutlich dunkler sichtbar." },
      { title: "Endkörnung zur Oberfläche wählen", text: "Zu fein geschliffenes Holz kann Öl oder Beize ungleich aufnehmen. Lack braucht dagegen eine ruhigere Fläche. Das Beschichtungsdatenblatt hat Vorrang." },
      { title: "Staub zwischen Stufen entfernen", text: "Staubkörner unter dem Papier erzeugen neue Kratzer. Absaugen, Papier ausklopfen oder wechseln und Kanten mit weniger Druck bearbeiten." },
    ],
    mistakes: ["von 80 direkt auf 240 springen", "Kanten mit Maschinendruck verrunden", "gegen die Faser fertig schleifen", "Atemschutz bei Altanstrichen weglassen"],
    professionalWhen: "Furnier, profilierte Altbauteile und große sichtbare Flächen verzeihen wenig Abtrag. Hier spart eine professionelle Probefläche Material und Zeit.",
    faq: [
      { question: "Welche Körnung vor dem Ölen?", answer: "Oft 150 bis 180. Entscheidend sind Holz und Öl. Zu feiner Schliff kann die Aufnahme bremsen; die Herstellerangabe bleibt maßgeblich." },
      { question: "Welche Körnung für einen Zwischenschliff?", answer: "Meist fein, etwa 240 oder feiner, ohne die Schicht durchzuschleifen. Nur ausführen, wenn das verwendete System ihn vorsieht." },
      { question: "Warum wird Holz nach dem Schleifen fleckig?", answer: "Häufig wegen ungleichmäßiger Körnung, Restleim, Druckstellen, quer laufenden Kratzern oder unterschiedlich saugenden Bereichen." },
    ],
    sources: [commonSources.sanding],
  },
  {
    slug: "ausgerissenes-scharnier-reparieren",
    number: "07",
    category: "Reparatur",
    title: "Ausgerissenes Scharnier wieder fest bekommen",
    teaser: "Nicht einfach eine dickere Schraube eindrehen. So sitzt die Tür wieder gerade und dauerhaft.",
    quickAnswer: "Beschädigtes Schraubloch sauber ausbohren, passenden Holzdübel mit Leim einsetzen, bündig kürzen und nach Aushärtung neu vorbohren. Bei Spanplatte kann ein geeignetes Zweikomponenten-Reparaturmaterial sinnvoller sein. Danach Scharnier ausrichten.",
    image: "/tom pic.png",
    imageAlt: "Handwerker bei einer präzisen Möbelreparatur",
    readingTime: "7 Min.",
    keywords: ["Scharnier ausgerissen reparieren", "Topfscharnier Spanplatte reparieren", "Möbeltür Scharnier locker"],
    materials: ["passender Holzdübel oder Reparaturmaterial", "Holzleim", "Bohrer mit Tiefenmarkierung", "scharfer Stechbeitel oder Säge", "Bohrschablone"],
    steps: [
      { title: "Tür entlasten", text: "Tür aushängen und zweites Scharnier prüfen. Weiteres Wackeln vergrößert das Loch und kann die Kante ausbrechen." },
      { title: "Trägermaterial erkennen", text: "Massivholz, MDF und Spanplatte brauchen unterschiedliche Reparaturen. Bei ausgebrochener Spanplatte fehlt oft Material; ein eingeleimter kleiner Zahnstocher reicht dann nicht." },
      { title: "Schadstelle aufbauen", text: "Massivholz kontrolliert auf Dübeldurchmesser bohren, Dübel vollflächig leimen und bündig einsetzen. Spanplatte mit dafür freigegebenem Reparaturmaterial formstabil ergänzen." },
      { title: "Neu bohren", text: "Nach kompletter Aushärtung Position mit Schablone übertragen. Bohrtiefe markieren und kleiner als Schraubenkern vorbohren. Nicht bis zur Sichtseite durchbohren." },
      { title: "Tür einstellen", text: "Scharniere spannungsfrei montieren. Spaltmaß und Höhe an den Einstellschrauben korrigieren, nicht durch übermäßiges Anziehen der Befestigungsschrauben." },
    ],
    mistakes: ["immer größere Schraube einsetzen", "ohne Tiefenanschlag bohren", "Tür während der Reparatur hängen lassen", "Leim vor Aushärtung belasten"],
    professionalWhen: "Ist die Korpuskante großflächig gebrochen, die Tür schwer oder das zweite Scharnier ebenfalls locker, braucht es einen größeren Einsatz oder eine neue Montageposition.",
    faq: [
      { question: "Kann ich Zahnstocher in das Schraubloch leimen?", answer: "Bei einer kleinen Massivholz-Reparatur kann ein sauber passender Holzspan kurzfristig helfen. Bei Spanplatte oder starkem Ausbruch ist ein definierter Dübel- oder Reparaturaufbau dauerhafter." },
      { question: "Welcher Bohrer ist für Topfscharniere nötig?", answer: "Der Topf selbst wird meist mit einem Forstnerbohrer gesetzt; das ausgerissene Befestigungsloch ist kleiner. Maße am vorhandenen Scharnier prüfen und eine Schablone nutzen." },
      { question: "Warum hängt die Tür nach der Reparatur schief?", answer: "Meist sitzt die Grundplatte versetzt oder die Einstellschrauben stehen unterschiedlich. Erst festen Sitz prüfen, dann Höhe, Tiefe und seitlichen Abstand einstellen." },
    ],
    sources: [
      { label: "selbst.de: Ausgerissenes Scharnier reparieren", url: "https://www.selbst.de/ausgerissenes-scharnier-reparieren-12319.html" },
    ],
  },
  {
    slug: "furnier-reparieren",
    number: "08",
    category: "Reparatur",
    title: "Furnier reparieren, ohne durchzuschleifen",
    teaser: "Lose Kante, Blase oder Fehlstelle: Furnier braucht Druck, Geduld und sehr wenig Abtrag.",
    quickAnswer: "Loses Furnier vorsichtig anheben, alten losen Leim entfernen, geeigneten Leim dünn einbringen und zwischen glatten Zulagen pressen. Blasen nicht blind aufschneiden. Furnier ist sehr dünn und darf nur minimal geschliffen werden.",
    image: "/Verschonern1.jpg",
    imageAlt: "Aufarbeitung eines furnierten Möbelstücks",
    readingTime: "8 Min.",
    keywords: ["Furnier reparieren", "Furnier Blase entfernen", "Furnier kleben"],
    materials: ["geeigneter Holzleim", "dünner Spachtel oder Leimspritze", "glatte Zulagen", "Backpapier als Trennlage", "Zwingen"],
    steps: [
      { title: "Schaden abgrenzen", text: "Prüfen, ob nur eine Kante lose ist, eine Blase vorliegt oder Furnier fehlt. Klopfen und flaches Streiflicht zeigen hohle Bereiche." },
      { title: "Zugang schaffen", text: "Lose Kante nur so weit anheben wie nötig. Sprödes Furnier nicht zurückbiegen. Bei einer geschlossenen Blase hängt der Zugang von Oberfläche und Leim ab." },
      { title: "Leim sparsam verteilen", text: "Alte lose Reste entfernen, ohne Träger oder Furnier auszudünnen. Leim vollflächig, aber dünn einbringen. Herausquellenden Leim sofort passend zum System abnehmen." },
      { title: "Flächig pressen", text: "Backpapier, glatte Zulage und gleichmäßigen Druck verwenden. Zwinge nicht direkt auf Furnier setzen. Press- und Trockenzeit des Leims einhalten." },
      { title: "Oberfläche angleichen", text: "Nur sehr fein und mit Schleifklotz arbeiten. Kanten sind am schnellsten durchgeschliffen. Farb- und Glanzunterschiede zunächst an einer Probe abstimmen." },
    ],
    mistakes: ["Blase mit viel Wasser fluten", "Zwinge punktuell direkt ansetzen", "Furnier maschinell grob schleifen", "Leimreste unter Öl oder Lack belassen"],
    professionalWhen: "Historische Möbel, große Blasen, fehlende Maserungsstücke oder stark verzogene Träger gehören in erfahrene Hände. Passendes Ersatzfurnier und Pressdruck entscheiden über die Optik.",
    faq: [
      { question: "Kann man Furnier abschleifen?", answer: "Nur sehr begrenzt. Furnier ist häufig deutlich dünner als ein Millimeter. Ein grober oder langer Schliff erreicht schnell den Träger." },
      { question: "Wie bekommt man eine Furnierblase flach?", answer: "Der alte Leim muss reaktiviert oder neuer Leim eingebracht und die Stelle flächig gepresst werden. Welche Methode passt, hängt von Alter und Leimart ab." },
      { question: "Welcher Leim hält Furnier?", answer: "Für viele moderne Reparaturen eignet sich passender Holzleim. Bei alten Möbeln können andere Leime vorhanden sein; eine falsche Kombination erschwert spätere Restaurierung." },
    ],
    sources: [
      { label: "OBI: Möbel restaurieren", url: "https://www.obi.de/magazin/wohnen/innengestaltung/upcycling-moebel/moebel-restaurieren" },
    ],
  },
  {
    slug: "aufgequollenes-holz-reparieren",
    number: "09",
    category: "Feuchteschaden",
    title: "Aufgequollenes Holz: erst trocknen, dann entscheiden",
    teaser: "Massivholz kann sich beruhigen. Spanplatte bleibt oft dauerhaft geschädigt. So erkennst du den Unterschied.",
    quickAnswer: "Feuchtequelle sofort stoppen, Wasser aufnehmen und das Bauteil langsam bei guter Luftzirkulation trocknen. Nicht mit starker Punktwärme beschleunigen. Massivholz kann sich teilweise zurückformen; aufgequollene MDF- oder Spanplattenkanten müssen oft ersetzt oder neu aufgebaut werden.",
    image: "/Keller2.jpg",
    imageAlt: "Holzbauteile in einem Innenraum mit erhöhtem Feuchterisiko",
    readingTime: "7 Min.",
    keywords: ["aufgequollenes Holz reparieren", "Spanplatte Wasserschaden", "Holzmöbel aufgequollen"],
    materials: ["saugfähige Tücher", "Ventilator oder natürliche Luftbewegung", "Feuchtemessgerät bei größeren Schäden", "Schleifklotz", "passende Versiegelung"],
    steps: [
      { title: "Ursache stoppen", text: "Leck, stehendes Wasser, Kondensat oder offene Kante finden. Eine kosmetische Reparatur hält nicht, solange neue Feuchte nachkommt." },
      { title: "Material bestimmen", text: "Massivholz zeigt durchgehende Faser. Spanplatte hat sichtbare Späne, MDF eine feine homogene Kante. Plattenwerkstoffe verlieren bei starkem Quellen oft dauerhaft Festigkeit." },
      { title: "Langsam trocknen", text: "Bauteil entlasten, Wasser abnehmen und Luft an alle Seiten lassen. Zu starke Punktwärme erzeugt Verzug, Risse oder gelöste Beschichtungen." },
      { title: "Festigkeit prüfen", text: "Nach vollständiger Trocknung drücken und klopfen. Weiche, bröselige oder delaminierte Bereiche sind nicht tragfähig und sollten ersetzt werden." },
      { title: "Oberfläche schließen", text: "Nur feste, trockene Bereiche vorsichtig plan schleifen und mit passendem Aufbau schützen. Kanten und Bohrungen besonders sorgfältig abdichten." },
    ],
    mistakes: ["nasses Holz sofort lackieren", "mit Heizlüfter punktuell überhitzen", "weiche Spanplatte nur überspachteln", "Schimmelgeruch ignorieren"],
    professionalWhen: "Bei Schimmel, wiederkehrender Feuchte, beschädigtem Bodenaufbau oder tragenden Holzteilen braucht es Messung und Ursachenklärung. Verdeckte Feuchte kann größer sein als die sichtbare Stelle.",
    faq: [
      { question: "Zieht sich aufgequollenes Holz wieder zusammen?", answer: "Massivholz teilweise, wenn es langsam trocknet. Plattenwerkstoffe bleiben nach starkem Quellen häufig dicker und verlieren Festigkeit." },
      { question: "Kann man aufgequollene Spanplatte schleifen?", answer: "Nur wenn sie nach dem Trocknen fest bleibt und der Schaden oberflächlich ist. Weiche oder zerfallende Bereiche werden durch Schleifen nicht wieder tragfähig." },
      { question: "Wie lange muss Holz nach einem Wasserschaden trocknen?", answer: "Das hängt von Dicke, Aufbau, Luftfeuchte und Belüftung ab. Optisch trocken reicht nicht; bei größeren Schäden sollte die Feuchte gemessen werden." },
    ],
    sources: [
      { label: "OBI: Holzplatten schützen", url: "https://www.obi.de/magazin/bauen/baustoffe/holzplatten" },
      commonSources.protection,
    ],
  },
  {
    slug: "holzwurm-erkennen",
    number: "10",
    category: "Holzschutz",
    title: "Holzwurm erkennen: alte Löcher oder aktiver Befall?",
    teaser: "Löcher allein beweisen keinen aktuellen Befall. Frisches Bohrmehl und neue Spuren sind entscheidend.",
    quickAnswer: "Runde Ausfluglöcher können Jahrzehnte alt sein. Aktiver Befall zeigt sich eher durch frisches, helles Bohrmehl, neue Löcher oder Fraßgeräusche. Stelle beobachten, Bohrmehl entfernen und kontrollieren. Tragende Bauteile und aktiven Befall fachlich prüfen lassen; Innenräume nicht vorsorglich mit Bioziden behandeln.",
    image: "/Treppenhaus1.jpg",
    imageAlt: "Ältere Holzkonstruktion in einem Treppenhaus",
    readingTime: "7 Min.",
    keywords: ["Holzwurm erkennen", "Holzwurm Bohrmehl", "Holzwurm bekämpfen"],
    materials: ["helle Unterlage oder Papier", "weiche Bürste", "Lupe", "Bleistift zur Markierung", "Kamera für Kontrollfotos"],
    steps: [
      { title: "Spuren dokumentieren", text: "Löcher fotografieren und Bereich markieren. Vorhandenes Bohrmehl vorsichtig entfernen, damit neue Ablagerungen erkennbar werden." },
      { title: "Mehrere Wochen beobachten", text: "Helle Unterlage auslegen und regelmäßig kontrollieren. Frisches, helles Mehl direkt unter neuen Löchern ist aussagekräftiger als dunkle alte Reste." },
      { title: "Bauteil einordnen", text: "Bei Möbeln ist das Risiko anders als bei Balken, Treppen oder Dachstuhl. Tragfähigkeit lässt sich nicht allein nach Anzahl sichtbarer Löcher beurteilen." },
      { title: "Feuchte und Klima prüfen", text: "Viele Holzschädlinge bevorzugen bestimmte Feuchtebedingungen. Undichte Stellen und dauerhaft hohe Feuchte beheben, statt nur Symptome zu behandeln." },
      { title: "Gezielt entscheiden", text: "Aktiven Befall bestimmen lassen. Wärmebehandlung kann je nach Objekt eine Alternative sein. Chemische Mittel nur gezielt, zugelassen und nach fachlicher Bewertung einsetzen." },
    ],
    mistakes: ["jedes alte Loch als aktiv werten", "vorsorglich Innenräume einsprühen", "tragenden Balken selbst ausstemmen", "Feuchteursache übersehen"],
    professionalWhen: "Frisches Bohrmehl, weiches Holz oder Befall an Dachstuhl, Treppe und anderen tragenden Teilen verlangt eine schnelle fachliche Beurteilung.",
    faq: [
      { question: "Wie sieht frisches Holzwurm-Bohrmehl aus?", answer: "Es ist meist hell und liegt neu unter den Löchern. Farbe und Struktur hängen von Holzart und Schädling ab; eine Artbestimmung nur nach dem Mehl ist unsicher." },
      { question: "Sind alte Holzwurmlöcher gefährlich?", answer: "Nicht automatisch. Sie zeigen früheren Befall. Entscheidend sind aktueller Befall, Querschnittsverlust und Funktion des Bauteils." },
      { question: "Hilft Hitze gegen Holzwurm?", answer: "Professionelle Wärmeverfahren können wirken, wenn im gesamten Holz die notwendige Temperatur sicher erreicht wird. Eigenversuche bergen Brand- und Materialrisiken." },
    ],
    sources: [commonSources.protection],
  },
  {
    slug: "holz-aussenbereich-schuetzen",
    number: "11",
    category: "Holzschutz",
    title: "Holz draußen schützen: Konstruktion vor Chemie",
    teaser: "Wasser muss ablaufen, Hirnholz braucht Schutz, Luft muss zirkulieren. Dann hält auch die Oberfläche länger.",
    quickAnswer: "Dauerhafter Holzschutz beginnt konstruktiv: Abstand zum Boden, Gefälle, geschützte Hirnholzflächen und schnelle Trocknung. Erst danach folgt eine passende Lasur, Farbe oder ein Öl. Regelmäßig prüfen und kleine Fehlstellen früh ausbessern.",
    image: "/Akustik1.png",
    imageAlt: "Holzkonstruktion mit klaren Fugen und geschützten Flächen",
    readingTime: "8 Min.",
    keywords: ["Holz außen schützen", "Holzlasur oder Öl", "konstruktiver Holzschutz"],
    materials: ["Bürste und milde Reinigung", "passender Außenanstrich", "Pinsel für Kanten und Hirnholz", "Schleifvlies", "Abstandhalter falls konstruktiv möglich"],
    steps: [
      { title: "Wasserweg prüfen", text: "Waagerechte Taschen, offene Hirnholzflächen und Bodenkontakt halten Wasser fest. Gefälle, Tropfkanten und Luftspalt sind wirksamer als eine dicke Beschichtung." },
      { title: "Holzart und Bauteil beachten", text: "Zaun, Terrasse, Fenster und Fassade sind unterschiedlich maßhaltig und belastet. Ein Produkt für Gartenmöbel ist nicht automatisch für Fenster geeignet." },
      { title: "Oberfläche vorbereiten", text: "Algen, Schmutz und lose Schichten entfernen. Holz trocknen lassen und Vergrauung nur so weit abtragen, wie der gewünschte Aufbau erfordert." },
      { title: "Passenden Schutz aufbauen", text: "Dünnschichtlasuren bleiben bei nicht maßhaltigen Teilen wartungsfreundlicher; deckende Systeme schützen stärker vor UV. Öl betont Holz, braucht draußen aber meist häufigere Pflege." },
      { title: "Jährlich kontrollieren", text: "Frühjahrskontrolle an Kanten, Schrauben, Fugen und Wetterseite. Kleine offene Stellen reinigen und systemgerecht schließen, bevor Wasser tiefer eindringt." },
    ],
    mistakes: ["feuchtes Holz beschichten", "Bodenkontakt nur mit Öl lösen wollen", "Hirnholz offen lassen", "unterschiedliche Systeme ungeprüft überarbeiten"],
    professionalWhen: "Morsche Anschlüsse, instabile Geländer, tragende Terrassen- oder Dachkonstruktionen dürfen nicht nur überstrichen werden. Erst Statik und Holzsubstanz prüfen.",
    faq: [
      { question: "Ist Lasur oder Öl für außen besser?", answer: "Das hängt vom Bauteil ab. Lasur bietet meist längere Intervalle und UV-Schutz, Öl lässt sich oft einfacher pflegen, muss aber häufiger erneuert werden." },
      { question: "Warum wird Holz draußen grau?", answer: "UV-Licht baut oberflächliches Lignin ab, Regen wäscht Bestandteile aus. Vergrauung ist zunächst optisch; dauerhafte Feuchte kann zusätzlich die Substanz schädigen." },
      { question: "Muss druckimprägniertes Holz gestrichen werden?", answer: "Nicht zwingend sofort. Die Imprägnierung ersetzt aber keinen konstruktiven Schutz und schützt nicht dauerhaft vor UV-bedingter Vergrauung." },
    ],
    sources: [commonSources.protection, commonSources.coating],
  },
  {
    slug: "holzschneidebrett-pflegen",
    number: "12",
    category: "Pflege",
    title: "Holzschneidebrett reinigen und pflegen",
    teaser: "Kurz nass, sofort trocken, nie in die Spülmaschine. So bleibt das Brett glatt und hygienisch.",
    quickAnswer: "Holzbretter direkt nach Gebrauch mit warmem Wasser, Spülmittel und Bürste reinigen, kurz abspülen und hochkant vollständig trocknen. Nicht einweichen oder in die Spülmaschine geben. Raue, trockene Flächen können mit einem ausdrücklich lebensmitteltauglichen Pflegeöl behandelt werden.",
    image: "/ratgeber.jpg",
    imageAlt: "Saubere Holzfläche als Beispiel für regelmäßige Holzpflege",
    readingTime: "6 Min.",
    keywords: ["Holzschneidebrett pflegen", "Schneidebrett ölen", "Holzbrett reinigen"],
    materials: ["Spülbürste", "mildes Spülmittel", "sauberes Tuch", "lebensmitteltaugliches Pflegeöl", "feines Schleifpapier bei rauer Oberfläche"],
    steps: [
      { title: "Direkt reinigen", text: "Lebensmittelreste nicht antrocknen lassen. Beide Seiten kurz mit warmem Wasser, Spülmittel und Bürste reinigen. Langes Wässern vermeiden." },
      { title: "Getrennt arbeiten", text: "Für rohes Fleisch und Fisch ein separates, gut zu reinigendes Brett nutzen. Tiefe Schnittfurchen, in denen Reste bleiben, sind ein Austauschsignal." },
      { title: "Richtig trocknen", text: "Wasser abnehmen und Brett hochkant mit Luft an beiden Seiten trocknen lassen. Nicht flach auf feuchter Arbeitsplatte liegen lassen und nicht an Heizkörper stellen." },
      { title: "Raue Fasern glätten", text: "Vollständig trockenes Brett fein in Faserrichtung schleifen. Staub gründlich entfernen. Tiefe Risse oder gelöste Leimfugen nicht nur überschleifen." },
      { title: "Lebensmitteltauglich pflegen", text: "Nur ein dafür ausgewiesenes Öl dünn auftragen, einziehen lassen und Überschuss abnehmen. Produktangaben zu Trocknung und Nutzung beachten; Öltücher brandsicher behandeln." },
    ],
    mistakes: ["Spülmaschine verwenden", "Brett im Wasser liegen lassen", "Speiseöl ohne Eignungsprüfung nutzen", "tiefe Risse weiterverwenden"],
    professionalWhen: "Ein Brett mit tiefen Rissen, schwarzem Belag, Geruch oder offenen Leimfugen sollte aus hygienischen Gründen ersetzt werden.",
    faq: [
      { question: "Darf ein Holzbrett in die Spülmaschine?", answer: "Nein. Lange Hitze und Nässe lassen Holz stark quellen und schwinden. Risse, Verzug und gelöste Leimfugen sind typische Folgen." },
      { question: "Welches Öl eignet sich für Schneidebretter?", answer: "Nur ein Produkt, das ausdrücklich für Flächen mit Lebensmittelkontakt vorgesehen ist. Herstellerhinweise zu Auftrag und Aushärtung beachten." },
      { question: "Wie oft sollte ein Holzbrett geölt werden?", answer: "Nicht nach starrem Kalender. Wenn die Fläche rau, sehr hell oder stark saugend wird, ist Pflege fällig. Häufigkeit hängt von Nutzung und Reinigung ab." },
    ],
    sources: [
      { label: "Verbraucherzentrale: Küchenutensilien aus Holz", url: "https://www.verbraucherzentrale.de/wissen/lebensmittel/lebensmittelproduktion/kuechenutensilien-aus-holz-das-sind-die-vor-und-nachteile-107472" },
      commonSources.coating,
    ],
  },
]

export const guideCategories = ["Alle", ...Array.from(new Set(guides.map((guide) => guide.category)))]

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
