# Avaluació d'Accessibilitat i Usabilitat en l'Aplicació Web

Aquest document descriu el procés d'avaluació d'accessibilitat i usabilitat realitzat per a l'aplicació web desenvolupada amb Remix. En aquest projecte, l'objectiu és identificar possibles problemes d'accessibilitat i usabilitat, així com proposar canvis per millorar l'experiència de l'usuari.

## Objectius

1. Identificar problemes d'accessibilitat i usabilitat en l'aplicació web.
2. Dur a terme proves d'usabilitat amb usuaris reals.
3. Analitzar els resultats i proposar millores concretes.

## Fases de l'activitat

### 1. Preparació

#### Tasques a provar:

Les següents tasques són les que els usuaris han de poder realitzar fàcilment a l'aplicació:

- **Registrar-se**
- **Crear una recepta**
- **Comentar tant les receptes com els comentaris**
- **Canviar algun paràmetre del seu perfil**
- **Sortir de l'aplicació**

#### Verificació d'accessibilitat:

S'han utilitzat eines d'accessibilitat per identificar possibles problemes tècnics en l'aplicació:

- **Wave**: Segons l'eina, l'aplicació està força bé, però hi ha errors en el contrast, ja que Wave no detecta bé les ombres.

### 2. Realització de proves amb usuaris

#### Selecció d'usuaris:

Es van seleccionar tres usuaris amb nivells d'experiència diferents amb la tecnologia per obtenir una àmplia gamma de perspectives. Això inclou usuaris que no estaven familiaritzats amb l'aplicació.

#### Execució de les proves:

Els usuaris van realitzar les següents tasques mentre es monitoritzava:

- Temps que trigaven a completar cada tasca.
- Dificultats o errors que trobaven.
- Reaccions verbals o no verbals (e.g., confusió, frustració).

### 3. Anàlisi i proposta de millores

#### Resultats obtinguts:

### **Prova**

- **Usuari 1**: _David_ (Usuari gairebé sense experiència utilitzant l'ordinador)

  - **Temps de completació**: 15 minuts
  - **Dificultats/Errors**:
    - En el moment de registrar-se, no es va fixar en la notificació d'alerta i es va quedar mirant fins que se'n va adonar.
    - A causa de la seva manca de coneixements en idiomes i poca experiència amb el portàtil, no trobava la finestra correcta quan se li demanava.
  - **Punts Positius**:
    - Quan va registrar un nou comentari o subcomentari, no va tenir cap problema. El que li va costar més va ser trobar la pestanya. Tot i això, una vegada la va trobar, ho va fer sense problemes.
  - **Reaccions**:
    - “És fàcil i còmoda. Un cop t'has mirat les pestanyes, és bastant fàcil d'utilitzar.”
  - **Proposta Usuari**:
    - Implementar icones per ajudar en la identificació i augmentar la mida de la lletra.

- **Usuari 2**: _Eric_ (Usuari més experimentat però no acostuma a seguir la seva intuïció i no llegeix)

  - **Temps de completació**: 10 minuts
  - **Dificultats/Errors**:
    - L'usuari no va tenir dificultats, però quan se li va demanar que tingués la sessió tancada, va eliminar el seu usuari per accident.
  - **Punts Positius**:
    - Ha utilitzat l'aplicació sense problemes.
  - **Reaccions**:
    - “No entenc l'anglès.”
  - **Proposta Usuari**:
    - Traduir l'aplicació a altres idiomes.
    - Afegir una foto d'usuari.
    - Fer que el panell principal no sigui blanc (millorar la visibilitat).

- **Usuari 3**: _Vanesa_ (Usuari més experimentat amb l'ordinador però sense experiència amb aplicacions mòbils)
  - **Temps de completació**: 12 minuts
  - **Dificultats/Errors**:
    - Va tenir algunes dificultats per trobar la secció de comentaris i usuaris.
  - **Punts Positius**:
    - Va aconseguir completar totes les tasques sense grans dificultats un cop va identificar on havien de realitzar-les.
  - **Reaccions**:
    - "Vaig trobar l'aplicació una mica difícil de navegar al principi, però un cop vaig entendre el disseny, tot va ser bastant senzill."
  - **Proposta Usuari**:
    - Millorar la senyalització i les icones per facilitar la comprensió del disseny de l'aplicació.

# Resum de Principals Problemes i Propostes de Millora

## Principals Problemes

### 1. **Problemes d'Accessibilitat:**

- **Contrast insuficient:** Els textos i botons tenien un contrast insuficient per a usuaris amb dificultats de visió, especialment amb ombres que dificultaven la llegibilitat (observat amb l'eina Wave).
- **Problemes amb la identificació d'elements visuals:** Alguns usuaris van trobar dificultats per identificar elements o seccions per la manca d'icones clares.
- **Absència de text alternatiu per a imatges:** La manca de descripció alternativa per a les imatges va dificultar la comprensió del contingut per a usuaris amb lectors de pantalla.

### 2. **Problemes de Usabilitat:**

- **Confusió en la navegació de la interfície:** Els usuaris menys experimentats van tenir dificultats en la localització de certes funcionalitats, com ara el registre o la finestra d'alerta.
- **Funcionalitat no intuïtiva:** Alguns usuaris, com _Eric_, van eliminar l'usuari per error en intentar tancar sessió, el que indica que la interfície no era prou clara.
- **Problemes en la localització i configuració:** Alguns usuaris com _David_ van tenir dificultats per identificar les seccions de l'aplicació o per canviar paràmetres relacionats amb el seu perfil a causa de la manca de feedback visual clar.
- **Idioma:** Els usuaris van destacar la dificultat d'utilitzar l'aplicació si no està disponible en l'idioma desitjat, com va ser el cas de _Eric_ amb la dificultat d'entendre l'anglès.

## Propostes de Millora

### 1. **Millores en Accessibilitat:**

- **Millorar el contrast de colors:** Augmentar el contrast dels textos i botons per complir amb les directrius WCAG i assegurar que els textos siguin llegibles en diverses condicions.
- **Afegir etiquetes ARIA i descripcions alternatives:** Implementar etiquetes ARIA per millorar l'accessibilitat dels elements interactius i afegir descripcions alternatives a les imatges per a persones amb discapacitat visual o que utilitzin lectors de pantalla.
- **Afegir icones per a facilitar la identificació:** Afegir icones clares per ajudar a identificar les funcionalitats principals com "Seguir", "Deixar de seguir" o "Eliminar", que actualment poden ser confuses.

### 2. **Millores en Usabilitat:**

- **Redissenyar el botó "Tancar sessió":** Millorar la ubicació i funcionalitat d'aquests botons per evitar accidents com la eliminació d'usuaris per error, com va passar amb _Eric_.
- **Millorar la localització de les funcions i pestanyes:** Afegir indicadors visuals i optimitzar la ubicació de les pestanyes i opcions per a usuaris poc experimentats, com _David_, perquè sigui més fàcil identificar-les i navegar per l'aplicació.
- **Millorar la comprensió de la funcionalitat de seguiment:** Afegir icones i textos explicatius als botons de "Seguir" i "Deixar de seguir" per evitar confusions i millorar l'usuabilitat per als usuaris.
- **Afegir un canvi d'idioma:** Incorporar una funcionalitat per canviar l'idioma de l'aplicació, com va suggerir _Eric_, per facilitar l'ús a una audiència més àmplia.
- **Millorar l'idioma de la interfície:** Implementar un canvi d'idioma per a facilitar l'ús a persones que no dominen l'anglès.

### 4. Implementació

S'han implementat algunes de les millores proposades:

- **Millora del contrast de colors**: Es van fer ajustos als estils CSS per garantir que el contrast de textos i fons sigui suficient.
- **Afegida la funcionalitat de teclat**: S'ha millorat l'ordre de tabulació per facilitar la navegació per teclat.
- **Millores en les icones**: S'han afegit icones clares als botons de seguiment i altres elements interactius per millorar la comprensió de les seves funcions.

Amb aquestes millores, s'espera que l'aplicació sigui més accessible i fàcil d'utilitzar per una major varietat d'usuaris.
