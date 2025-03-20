// src/controllers/CreationController.ts
import { Request, Response } from "express";
import multer from "multer";
import { CreationModel } from "../model/CreationModel";

// Configuration de Multer pour stocker les images dans le dossier "uploads/"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Dossier où enregistrer les images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nom unique basé sur la date actuelle
    },
});

// Configuration de Multer pour accepter jusqu'à 5 images sous le champ "images"
const upload = multer({ storage }).array("images", 3);

// Route pour créer une Création avec plusieurs images
export const createCreationWithImages = async (req: Request, res: Response) => {
    // On exécute Multer pour traiter l'upload des fichiers
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Erreur lors de l'upload des images." });
        }

        try {
            // Récupération des champs depuis le formulaire
            // Ici, on attend "Description" pour la description et "lien" pour le lien d'inspection.
            // "titre" est également récupéré mais n'est pas utilisé dans la création (à adapter selon tes besoins).
            const { description, lien, titre } = req.body;

            // Vérification que les champs obligatoires sont fournis
            if (!description || !lien) {
                return res.status(400).json({ error: "Veuillez fournir tous les champs obligatoires (Description et lien)." });
            }

            console.log("Titre :", titre);
            console.log("Description :", description);
            console.log("Lien d'inspection :", lien);

            // Récupération des fichiers uploadés
            const files = req.files as Express.Multer.File[];
            console.log("Fichiers reçus :", files);

            // Appel au modèle pour créer la création avec images
            // Ici, nous mappont : Description -> description et lien -> lien_inspection.
            const result = await CreationModel.createCreationWithImages(
                titre,
                description,
                lien,
                files
            );
            console.log("result "+result);
            

            return res.status(200).json({
                message: "Création et images ajoutées avec succès",
                creation: result.creation,
                images: result.images,
            });

        } catch (error) {
            console.error("Erreur serveur :", error);
            return res.status(500).json({ error: error });
        }
    });
};
