const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const axios = require('axios');

let mainWindow;
let backendProcess;
let frontendProcess;

// Fonction pour créer la fenêtre principale
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Charge l'application frontend depuis le port spécifié
  mainWindow.loadURL('http://localhost:3001');
  
  // Ouvre les DevTools pour le débogage
  mainWindow.webContents.openDevTools();

  // Événement pour nettoyer la fenêtre
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Fonction pour démarrer les serveurs backend et frontend
function startServers(callback) {
  const backendPath = path.resolve(__dirname, 'Backend');
  const frontendPath = path.resolve(__dirname, 'Frontend/store');

  const backendCommand = `npm run dev --prefix ${backendPath}`;
  const frontendCommand = `npm run dev --prefix ${frontendPath}`;

  // Démarrage du serveur backend
  backendProcess = exec(backendCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors du démarrage du backend: ${error}`);
      return;
    }
    console.log(`Backend stdout: ${stdout}`);
    console.error(`Backend stderr: ${stderr}`);
  });

  // Démarrage du serveur frontend
  frontendProcess = exec(frontendCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors du démarrage du frontend: ${error}`);
      return;
    }
    console.log(`Frontend stdout: ${stdout}`);
    console.error(`Frontend stderr: ${stderr}`);
  });

  // Vérifie si le frontend est prêt avant de créer la fenêtre
  checkFrontendReady(() => {
    // Callback après que le frontend est prêt
    if (callback) callback();
  });
}

// Fonction pour vérifier que le frontend est prêt
function checkFrontendReady(callback) {
  const url = 'http://localhost:3001';

  axios.get(url)
    .then(response => {
      console.log('Frontend is ready!');
      if (callback) callback();
    })
    .catch(error => {
      console.error(`Erreur de connexion au frontend: ${error}`);
      setTimeout(() => checkFrontendReady(callback), 1000); // Réessayer après 1 seconde
    });
}

// Événements pour gérer la vie de l'application
app.whenReady().then(() => {
  // Démarre les serveurs avant de créer la fenêtre principale
  startServers(() => {
    createWindow();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Ferme les processus en cours avant de quitter l'application
    if (backendProcess) backendProcess.kill();
    if (frontendProcess) frontendProcess.kill();
    app.quit();
  }
});
