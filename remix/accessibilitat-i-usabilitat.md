# Avaluació d'Accessibilitat i Usabilitat en l'Aplicació Web

Aquest document descriu el procés d'avaluació d'accessibilitat i usabilitat realitzat per a l'aplicació web desenvolupada amb Remix. En aquest projecte, l'objectiu és identificar possibles problemes d'accessibilitat i usabilitat, així com proposar canvis per millorar l'experiència de l'usuari.

## Objectius

1. Identificar problemes d'accessibilitat i usabilitat en l'aplicació web.
2. Dur a terme proves d'usabilitat amb usuaris reals.
3. Analitzar els resultats i proposar millores concretes.

## Fases de l'activitat

### 1. Preparació

#### Tasques a Provar:

Les següents tasques són les que els usuaris han de poder realitzar fàcilment a l'aplicació:

- **Veure la informació d'un usuari:** L'usuari ha de poder veure les dades del perfil d'un altre usuari, com el seu nom d'usuari i les seves receptes.
- **Valorar un usuari:** Els usuaris han de poder assignar una valoració a altres usuaris mitjançant un sistema de puntuació en forma d'estrelles.
- **Seguir o deixar de seguir un usuari:** Els usuaris han de poder afegir o eliminar un usuari dels seus seguidors.

#### Verificació d'Accessibilitat:

S'han utilitzat eines d'accessibilitat per identificar possibles problemes tècnics en l'aplicació:

- **Wave:**
- Segons ho que diu esta be pero hi han errors en el contrast ja que el wave no detecta ve les ombres.

### 2. Realització de Proves amb Usuaris

#### Selecció d'Usuaris:

Es van seleccionar tres usuaris amb nivells d'experiència diferents amb la tecnologia per obtenir una àmplia gamma de perspectives. Això inclou usuaris que no estaven familiaritzats amb l'aplicació.

#### Execució de les Proves:

Els usuaris van realitzar les següents tasques mentre es monitoritzava:

- Temps que trigaven a completar cada tasca.
- Dificultats o errors que trobaven.
- Reaccions verbals o no verbals (e.g., confusió, frustració).

### 3. Anàlisi i Proposta de Millores

#### Resultats Obtinguts:

Les observacions de les proves amb usuaris es van recollir en un document anomenat `accessibilitat-i-usabilitat.md`. A continuació es resumeixen els principals problemes trobats:

- **Problemes d'Accessibilitat:**
  - Alguns textos i botons no tenien contrast suficient per a usuaris amb dificultats de visió.
  - La manca de descripcions alternatives per a les imatges de perfil i els botons podria dificultar la seva comprensió per a usuaris amb lectors de pantalla.
  
- **Problemes de Usabilitat:**
  - Els usuaris van tenir dificultats per entendre la funcionalitat del botó "Afegir a Seguidors" i "Eliminar de Seguidors" a causa de la falta de text descriptiu o icones clares.
  - Algunes seccions de l'aplicació, com la llista de receptes, eren difícils de llegir per a usuaris que utilitzen teclat o dispositius d'entrada alternatius.

### **Resultat de la Prova**

- **Usuari 1**: *Laura*
  - **Temps de completació**: 2 minuts
  - **Dificultats/Errors**:
    - Laura va tenir una mica de dificultat per entendre la funcionalitat del botó de "seguir". Va preguntar si pasava a una altre pestanya o era una forma de afegir com una especie de seguir usuari.
  - **Reaccions**:
    - “No entenc per què es mostra un botó que sembla inactiu. Hauria de ser més clar quan l'usuari està seguit o no.”
    - Va tenir una reacció positiva quan va poder veure la valoració i va fer clic per valorar (no va identificar un problema amb les estrelles).
  
- **Usuari 2**: *Jordi*
  - **Temps de completació**: 4 minuts
  - **Dificultats/Errors**:
    - Problemes per entendre la interacció amb les estrelles per valorar l'usuari.
  - **Reaccions**:
    - “No sé si he seguit aquesta persona o le marcat com a dolent. Potser hi ha un missatge que haurien d'afegir per confirmar-ho.”
    - Va semblar desorientat en el moment de valorar l'usuari. No estava segur si la seva acció s'havia registrat correctament.

- **Usuari 3**: *Marta*
  - **Temps de completació**: 1 minut
  - **Dificultats/Errors**:
    - No va presentar dificultats.
  - **Reaccions**:
    - Marta va navegar per la pàgina de forma molt eficient, però va mencionar que la interfície podria ser més neta, ja que hi ha molts botons alhora.

#### Propostes de Millora:

**Accessibilitat:**

1. **Millorar el contrast de colors**: Es recomana augmentar el contrast dels textos i botons per complir amb les directrius WCAG.
2. **Afegir etiquetes ARIA**: Implementar etiquetes ARIA per a elements interactius per millorar l'accessibilitat a usuaris de lectors de pantalla.
3. **Text alternatiu per a imatges**: Afegir descripcions alternatives a les imatges per facilitar la comprensió del contingut visual.

**Usabilitat:**

1. **Millorar la comprensió de les funcions de seguiment**: Afegir icones clares o textos explicatius als botons de "Seguir" i "Deixar de seguir" per facilitar la comprensió de la seva acció.
2. **Navegació per teclat**: Millorar la navegació per teclat afegint un ordre de tabulació lògic i facilitant l'accés als elements interactius.
3. **Redisseny de formularis**: Simplificar els formularis i afegir validacions en temps real per reduir els errors dels usuaris.

### 4. Implementació

S'han implementat algunes de les millores proposades:

- **Millora del contrast de colors**: Es van fer ajustos als estils CSS per garantir que el contrast de textos i fons sigui suficient.
- **Afegida la funcionalitat de teclat**: S'ha millorat l'ordre de tabulació per facilitar la navegació per teclat.
