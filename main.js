const { app, BrowserWindow } = require('electron'); // Import des modules nécessaires d'Electron
const path = require('path'); // Import du module 'path' pour manipuler les chemins de fichiers
const { exec } = require('child_process'); // Import du module 'child_process' pour lancer des processus

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800, // Largeur de la fenêtre principale
    height: 600, // Hauteur de la fenêtre principale
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Chemin vers le fichier preload.js
      nodeIntegration: true, // Active l'intégration de Node.js dans le renderer
      contextIsolation: false, // Désactive l'isolation de contexte pour simplifier le développement
    }
  });

  // Charge l'application frontend depuis le port spécifié
  mainWindow.loadURL('http://localhost:3001');
}

app.whenReady().then(() => {
  // Démarre les serveurs avant de créer la fenêtre principale
  startServers();

  createWindow();

  // Crée une nouvelle fenêtre si l'utilisateur clique sur l'icône de l'application dans la barre de menu macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Ferme l'application si toutes les fenêtres sont fermées, sauf sur macOS
  if (process.platform !== 'darwin') {
    app.quit(); 
  }
});

function startServers() {
  const backendPath = path.resolve(__dirname, 'Backend'); // Remplacez 'path/to/backend' par le chemin réel vers votre backend
  const frontendPath = path.resolve(__dirname, 'Frontend/store'); // Assurez-vous que 'Frontend/store' est correct

  const backendCommand = `npm run dev --prefix ${backendPath}`;
  const frontendCommand = `npm run dev --prefix ${frontendPath}`;

  // Démarrage du serveur backend
  exec(backendCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors du démarrage du backend: ${error}`);
      return;
    }
    console.log(`Backend stdout: ${stdout}`);
    console.error(`Backend stderr: ${stderr}`);
  });

  // Démarrage du serveur frontend
  exec(frontendCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors du démarrage du frontend: ${error}`);
      return;
    }
    console.log(`Frontend stdout: ${stdout}`);
    console.error(`Frontend stderr: ${stderr}`);
  });
}
