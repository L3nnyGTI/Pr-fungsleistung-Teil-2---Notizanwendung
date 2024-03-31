# Pr-fungsleistung-Teil-2---Notizanwendung
Neue Datenbankkonzepte DHBW HDH - Prüfungsleistung Teil 2 - Notizanwendung: Ammar, Püll, Ratter


***Schritte zum Ausführen von unserer Notizanwendung:***
1. CouchDB herunterladen
2. CouchDB installieren
ACHTUNG:
2.1 Bei der Installation entweder den Benutzername: "admin" und Passwort: "1234" verwenden
2.2 Oder bei neuem Benutzername und Passwort, in der server.js Datei die Zeile 2 bearbeiten. Sprich statt "admin:1234" den neuen Benutzername und Passwort
3. Nach erfolgreicher Installation PC ggf. neustarten
4. Den Ordner "Abgabe - Final - Notizanwendung" aus dem GitHub Repository herunterladen
5. Den heruntergeladenen Ordner "Abgabe - Final - Notizanwendung" in VS Code öffnen
6. Im Terminal nach cd backend navigieren und dort "npm install" eingeben und ausführen
7. Im Terminal nach cd notizapp und dort "npm install"
8. Im Terminal noch "npm install -g @vue/cli" eingeben
9. Im Terminal Backend starten: cd backend dann node server.js
10. Im Terminal Frontend starten: cd notizapp dann npm run serve
11. Nun läuft das Frontend und Backend
12. Nun auf den localhost klicken und die Notizanwendung sofort austesten!

***Datenbank aufrufen:***
1. http://localhost:5984/_utils/
2. Dort mit entsprechenden Anmeldedaten anmelden
3. "create database" und z.B. mit "notes" benamsen
   
