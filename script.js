// Tworzymy obiekt XMLHttpRequest
var xhr = new XMLHttpRequest();

// Ustawiamy metodę i ścieżkę do pliku XML
xhr.open("GET", "../xml.xml", true);

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
  var nazwa = xmlDoc.getElementsByTagName("nazwa")[0].childNodes[0].nodeValue;
  var skladniki = xmlDoc.getElementsByTagName("składnik");
  var kroki = xmlDoc.getElementsByTagName("krok");

  // Przetwarzamy elementy
  console.log("Nazwa przepisu: " + nazwa);

  console.log("Składniki:");
  for (var i = 0; i < skladniki.length; i++) {
    console.log("- " + skladniki[i].childNodes[0].nodeValue);
  }

  console.log("Kroki:");
  for (var j = 0; j < kroki.length; j++) {
    console.log(j + 1 + ". " + kroki[j].childNodes[0].nodeValue);
  }
}
