import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { AppDataSource } from './data-source';
import userRoutes from './routes/router';

// Charger les variables d'environnement
dotenv.config();

// Vérifier et créer le dossier "uploads" s'il n'existe pas
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Dossier 'uploads' créé à ${uploadDir}`);
}

// Initialisation de la connexion à la base de données
AppDataSource.initialize()
  .then(() => {
    console.log("Connexion à la base de données réussie");

    const app = express();

    // Activer CORS pour autoriser les requêtes depuis toutes les origines
    app.use(cors());
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Middleware pour parser les requêtes JSON
    app.use(express.json());

    // Utilisation des routes définies dans le fichier router
    app.use(userRoutes);

    // Récupérer les variables d'environnement avec des valeurs par défaut
    const PORT =  3000;
    const HOST =  'localhost';

    // Démarrer le serveur
    app.listen(Number(PORT), HOST, () => {
      console.log(`Serveur démarré sur http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données :", error);
  });
