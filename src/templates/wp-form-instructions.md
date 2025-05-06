
# Instrukcja importu formularza do WP Form Lite

## Przygotowanie

Szablon HTML znajdujący się w pliku `wpform-template.html` został przygotowany jako wzór struktury formularza do zaimplementowania w WP Form Lite. Ze względu na ograniczenia WP Form Lite, niektóre elementy będą wymagały ręcznej konfiguracji.

## Krok po kroku

### 1. Tworzenie nowego formularza
1. Przejdź do panelu WordPress
2. Wybierz **WPForms** z menu bocznego
3. Kliknij **Dodaj nowy**
4. Nadaj nazwę formularza, np. "Formularz zgłoszeniowy Jarmark Bałtycki"

### 2. Dodawanie pól formularza
Dodaj pola w kolejności zgodnej z szablonem HTML:
- Sekcja "Dane wystawcy"
  - Pole tekstowe: Pełna nazwa firmy
  - Pole tekstowe: Imię
  - Pole tekstowe: Nazwisko
  - Pole tekstowe: Ulica
  - Pole tekstowe: Kod pocztowy (z opisem: "Format: XX-XXX")
  - Pole tekstowe: Miejscowość
  - Pole tekstowe: NIP
  - Pole email: Adres e-mail
  - Pole telefon: Numer telefonu
  - Pole wyboru (radio): "Czy uczestniczył/a Pan/Pani w Jarmarku Bałtyckim w 2024 roku?" (opcje: TAK, NIE)

- Sekcja "Informacje techniczne dla organizatora"
  - Pole wyboru (radio): Kategoria wystawcy (opcje zgodne z szablonem)
  - Pole wyboru (radio): Rodzaj stoiska (opcje zgodne z szablonem)
  - Pole tekstowe: Dokładne wymiary namiotu/food trucka (kondicional)
  - Pole wyboru (radio): Podłączenie do prądu (opcje zgodne z szablonem)
  - Pole tekstowe wielolinijkowe: Asortyment sprzedaży
  - Pole tekstowe wielolinijkowe: Uwagi (opcjonalne)
  - Pole wyboru (radio): Czy potrzebne jest miejsce parkingowe dla auta? (opcje: TAK, NIE)

- Sekcja "Wybór lokalizacji"
  - Pole HTML: Informacja o mapie i linku do pobrania
  - Pole tekstowe: Pierwszy wybór lokalizacji
  - Pole tekstowe: Drugi wybór lokalizacji
  - Pole tekstowe: Trzeci wybór lokalizacji

- Sekcja "Akceptacja warunków"
  - Pole checkbox: Akceptacja regulaminu Jarmarku Bałtyckiego
  - Pole checkbox: Zgoda na przetwarzanie danych osobowych

### 3. Konfiguracja logiki warunkowej
1. Dla pola "Dokładne wymiary namiotu/food trucka":
   - Kliknij na pole
   - Wybierz zakładkę "Kondicional Logic"
   - Włącz logikę warunkową
   - Ustaw warunek: Pokaż to pole jeśli "Rodzaj stoiska" jest "Namiot własny, inny wymiar" LUB "Food truck / przyczepa"

### 4. Dodawanie pola HTML dla mapy
1. Dodaj pole HTML
2. Wstaw kod HTML z linkiem do mapy:
   ```html
   <p><a href="/sciezka/do/mapy.pdf" target="_blank" rel="noopener noreferrer" download="mapa-jarmark-baltycki.pdf">📍 Pobierz mapę wydarzenia (PDF)</a></p>
   <p class="wpforms-field-description"><em>(prosimy o wskazanie kilku preferencji – w razie niedostępności pierwszego wyboru)</em></p>
   ```
3. Zastąp `/sciezka/do/mapy.pdf` rzeczywistym URL do pliku PDF z mapą

### 5. Konfiguracja potwierdzeń
1. Przejdź do zakładki "Potwierdzenia"
2. Wybierz typ potwierdzenia (np. "Wiadomość")
3. Wprowadź tekst potwierdzenia, np.:
   ```
   Dziękujemy za przesłanie zgłoszenia na Jarmark Bałtycki!
   Twoje zgłoszenie zostało przyjęte i zostanie rozpatrzone przez organizatorów.
   O akceptacji zgłoszenia zostaniesz poinformowany/a drogą mailową.
   ```

### 6. Konfiguracja powiadomień e-mail
1. Przejdź do zakładki "Powiadomienia"
2. Skonfiguruj powiadomienie dla administratora
   - Ustaw adres e-mail odbiorcy
   - Ustaw temat e-maila, np. "Nowe zgłoszenie na Jarmark Bałtycki"
   - Dostosuj treść e-maila, wykorzystując dostępne zmienne pól
3. Opcjonalnie dodaj powiadomienie dla zgłaszającego
   - Ustaw, aby używało adresu e-mail z pola "Adres e-mail"

### 7. Zapisywanie i publikowanie formularza
1. Kliknij "Zapisz" aby zapisać formularz
2. Skopiuj shortcode formularza
3. Wstaw shortcode na wybraną stronę WordPress

### 8. Dodanie informacji o harmonogramie wydarzenia
Po formularzu dodaj blok HTML z informacjami o harmonogramie, np.:
```html
<div class="event-schedule">
  <h3>Terminarz Jarmarku</h3>
  <p>Informacje o terminach montażu stoisk i harmonogramie wydarzenia będą dostępne po akceptacji zgłoszenia.</p>
</div>
```

## Uwagi końcowe

- Upewnij się, że wszystkie wymagane pola są oznaczone jako wymagane
- Dostosuj komunikaty błędów dla walidacji formularza
- Przetestuj formularz przed publikacją, aby upewnić się, że logika warunkowa działa poprawnie
- Rozważ dodanie reCAPTCHA dla zabezpieczenia przed spamem
