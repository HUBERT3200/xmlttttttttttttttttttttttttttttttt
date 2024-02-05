console.info("0.0.1");

// Tworzymy obiekt XMLHttpRequest
var xhr = new XMLHttpRequest();

var ul = document.getElementById("jsonList");

// Ustawiamy metodę i ścieżkę do pliku XML
xhr.open(
  "GET",
  "https://hubert3200.github.io/xmlttttttttttttttttttttttttttttttt/xml",
  true
);

// Ustawiamy typ odpowiedzi na dokument XML
xhr.overrideMimeType("application/xml");

// Obsługa zdarzenia dla gotowej odpowiedzi
xhr.onreadystatechange = function () {
  // Sprawdzamy, czy żądanie zostało zakończone
  if (xhr.readyState == 4 && xhr.status == 200) {
    // Pobieramy odpowiedź jako tekst
    var xmlText = xhr.responseText;

    // Tworzymy obiekt DOMParser
    var parser = new DOMParser();

    // Parsujemy tekst jako dokument XML
    var xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Wywołujemy funkcję przetwarzającą dokument XML
    processXML(xmlDoc);
  }
};

// Wysyłamy żądanie
xhr.send();

// Funkcja przetwarzająca dokument XML
function processXML(xmlDoc) {
  // Pobieramy elementy z dokumentu XML
  var tekstDoWrzucenia = "nie działa";
  var nazwa = xmlDoc.getElementsByTagName("nazwa")[0].childNodes[0].nodeValue;
  var skladniki = xmlDoc.getElementsByTagName("składnik");
  var kroki = xmlDoc.getElementsByTagName("krok");

  // Przetwarzamy elementy
  tekstDoWrzucenia = `<li class="dont"><h1> ${nazwa} </h1><hr /><p><strong>Składniki:</strong></p><ul>`;

  for (var i = 0; i < skladniki.length; i++) {
    tekstDoWrzucenia += "<li>" + skladniki[i].childNodes[0].nodeValue + "</li>";
  }

  tekstDoWrzucenia += "</ul>";

  tekstDoWrzucenia += "<p><strong>Instrukcje:</strong></p><ol>";
  for (var j = 0; j < kroki.length; j++) {
    tekstDoWrzucenia += "<li>" + kroki[j].childNodes[0].nodeValue + "</li>";
  }
  tekstDoWrzucenia += "</ol>";

  tekstDoWrzucenia += "</li>";
  console.log(tekstDoWrzucenia);
  ul.innerHTML = tekstDoWrzucenia;
}
