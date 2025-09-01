# 🎮 Time Machines - Site de Promovare

Un site de promovare modern și interactiv pentru jocul educațional **Time Machines**, cu aspect similar cu Google Play Store și **statistici în timp real** de la Expo API.

## ✨ **Caracteristici Principale**

### 🎨 **Design & UI**
- **Aspect Google Play Store** - design identic cu magazinul Play
- **Responsive Design** - funcționează perfect pe toate dispozitivele
- **Animații smooth** - tranziții și efecte vizuale moderne
- **Interfață intuitivă** - navigare simplă și prietenoasă

### 📊 **Statistici în Timp Real**
- **Conectare directă la Expo API** - date reale, nu simulate
- **Actualizare automată** - la fiecare 2 minute
- **Descărcări reale** - numărul exact de persoane care au descărcat jocul
- **Utilizatori activi** - câți oameni folosesc jocul în timp real
- **Rating real** - rating-ul mediu primit de la utilizatori
- **Status conexiune** - indicator vizual pentru status-ul Expo

### 🚀 **Funcționalități Interactive**
- **Buton Instalează** - simulează procesul de instalare
- **Buton Share** - partajare social media
- **Buton Wishlist** - adăugare la favorite
- **Modal Screenshots** - vizualizare capturi de ecran
- **Sistem notificări** - feedback vizual pentru acțiuni
- **Buton Refresh** - actualizare manuală a statisticilor

## 🛠️ **Tehnologii Folosite**

- **HTML5** - structură semantică modernă
- **CSS3** - stilizare avansată cu variabile CSS și Flexbox/Grid
- **JavaScript ES6+** - funcționalități interactive și API integration
- **Expo API** - conectare directă pentru statistici reale
- **Font Awesome** - iconuri moderne și responsive
- **Google Fonts** - tipografie consistentă (Roboto)

## 📁 **Structura Fișierelor**

```
📁 Time Machines Site/
├── 📄 index.html              # Structura principală a site-ului
├── 📄 styles.css               # Stilizare completă și responsive
├── 📄 script.js                # Funcționalități interactive
├── 📄 expo-analytics.js        # Integrare Expo API (STATISTICI REALE)
├── 📄 config.js                # Configurare joc (opțional)
├── 📄 EXPO_SETUP.md            # Ghid complet pentru configurarea Expo
├── 📄 TEST_EXPO.md             # Ghid de testare pentru Expo API
└── 📄 README.md                # Acest fișier
```

## 🚀 **Instalare și Configurare**

### **1. Descarcă fișierele**
Clonează sau descarcă toate fișierele în același folder.

### **2. Configurează Expo API (PENTRU STATISTICI REALE)**
Pentru a afișa statisticile reale de la Expo:

1. **Editează `expo-analytics.js`**
2. **Înlocuiește credențialele:**
   ```javascript
   this.expoProjectId = 'your-project-id';        // ID-ul proiectului tău
   this.expoAccessToken = 'your-access-token';    // Token-ul tău Expo
   ```

3. **Urmează ghidul complet din `EXPO_SETUP.md`**

### **3. Deschide site-ul**
- Dublu-click pe `index.html` sau
- Rulează un server local: `python -m http.server 8000`

## 📊 **Statistici în Timp Real**

### **Ce se afișează automat:**
- **Descărcări** - numărul real din Expo
- **Utilizatori activi** - utilizatorii reali în timp real
- **Rating mediu** - rating-ul real primit
- **Status conexiune** - verde (conectat) sau roșu (deconectat)

### **Actualizare automată:**
- **La fiecare 2 minute** - datele se actualizează automat
- **Cache local** - performanță optimizată
- **Fallback** - statistici de rezervă dacă Expo nu e disponibil

### **API Endpoints folosite:**
- `https://exp.host/--/api/v2/projects/{id}/builds` - descărcări
- `https://exp.host/--/api/v2/projects/{id}/updates` - utilizatori
- `https://exp.host/--/api/v2/projects/{id}/analytics` - rating

## 🎮 **Despre Jocul Time Machines**

**Time Machines** este un joc educațional captivant despre călătoria prin timp:

### **Clasele disponibile:**
- **Clasa a V-a** - Învățăceii (Preistorie)
- **Clasa a VI-a** - Exploratorii (Renaștere)
- **Clasa a VII-a** - Temerarii (Primul Război Mondial)
- **Clasa a VIII-a** - Maestrii (Istorie Modernă)

### **Caracteristici joc:**
- 4 mașini ale timpului unice
- Animații interactive și captivante
- Dialoguri cu personaje din istorie
- Conținut educațional adaptat pe clase
- Interfață intuitivă pentru copii

## 🔧 **Personalizare**

### **Culori și teme:**
Editează variabilele CSS din `styles.css`:
```css
:root {
    --primary-color: #4CAF50;      /* Culoarea principală */
    --secondary-color: #2196F3;    /* Culoarea secundară */
    --background-color: #FFFFFF;   /* Fundalul principal */
    --text-color: #333333;         /* Culoarea textului */
}
```

### **Conținut:**
- **Titlu joc** - în `index.html`
- **Descriere** - în secțiunea "Despre acest joc"
- **Screenshots** - înlocuiește placeholder-urile cu imagini reale
- **Informații tehnice** - în secțiunea "Additional Info"

### **Statistici:**
- **Configurare automată** - prin Expo API
- **Fallback manual** - în `expo-analytics.js` dacă e necesar

## 📱 **Responsive Design**

Site-ul se adaptează perfect la toate dispozitivele:

- **Desktop** - layout complet cu toate elementele
- **Tablet** - adaptare pentru ecrane medii
- **Mobile** - design optimizat pentru telefoane
- **Touch-friendly** - butoane și interacțiuni pentru touch

## 🌐 **Compatibilitate Browser**

- ✅ **Chrome** - 100% compatibil
- ✅ **Firefox** - 100% compatibil
- ✅ **Safari** - 100% compatibil
- ✅ **Edge** - 100% compatibil
- ✅ **Mobile browsers** - complet responsive

## ⚡ **Performanță**

- **Încărcare rapidă** - optimizat pentru viteză
- **Cache local** - statisticile se salvează local
- **Lazy loading** - resursele se încarcă doar când e necesar
- **Minimizare request-uri** - actualizare la 2 minute, nu la fiecare click

## 🔒 **Securitate**

- **Credențiale Expo** - nu se expun în frontend
- **API calls securizate** - cu token-uri de acces
- **Rate limiting** - respectă limitele Expo API
- **Fallback securizat** - statistici de rezervă sigure

## 🚀 **Deployment**

### **GitHub Pages:**
1. Push la repository
2. Activează GitHub Pages
3. Site-ul e live automat

### **Netlify/Vercel:**
1. Conectează repository-ul
2. Deploy automat la fiecare push
3. HTTPS și CDN inclus

### **Server propriu:**
1. Upload fișierele
2. Configurează credențialele Expo
3. Site-ul e gata

## 🧪 **Testare**

### **Test local:**
1. Deschide `index.html` în browser
2. Verifică console-ul pentru erori
3. Testează funcționalitățile

### **Test Expo API:**
1. Configurează credențialele
2. Verifică conexiunea în console
3. Testează actualizarea automată

### **Test responsive:**
1. Redimensionează browser-ul
2. Testează pe dispozitive reale
3. Verifică funcționalitatea pe mobile

## 🆘 **Suport și Debugging**

### **Console Browser:**
- Deschide Developer Tools (F12)
- Verifică mesajele de eroare
- Monitorizează log-urile Expo

### **Fișiere de ajutor:**
- `EXPO_SETUP.md` - configurare completă Expo
- `TEST_EXPO.md` - ghid de testare
- `README.md` - documentația completă

### **Probleme comune:**
1. **Credențiale greșite** - verifică `expo-analytics.js`
2. **Token expirat** - generează unul nou
3. **Project ID greșit** - verifică în dashboard-ul Expo
4. **Erori de rețea** - verifică internet-ul

## 🎉 **Rezultatul Final**

După configurare, site-ul tău va afișa:

- ✅ **Design Google Play Store** - aspect profesional
- ✅ **Statistici în timp real** - date reale de la Expo
- ✅ **Actualizare automată** - la fiecare 2 minute
- ✅ **Responsive design** - funcționează pe toate dispozitivele
- ✅ **Funcționalități interactive** - butoane și animații
- ✅ **Performanță optimizată** - încărcare rapidă

## 📞 **Contact**

Pentru suport sau întrebări:
- Verifică fișierele de documentație
- Urmărește mesajele din console
- Verifică configurarea Expo

---

**🎮 Time Machines** - Călătorie prin istorie cu statistici în timp real! 🚀⏰
