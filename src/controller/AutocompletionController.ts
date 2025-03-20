// src/controllers/Autocompletion.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Creation } from "../entity/Creation";

export class AutocompletionController {
    /**
     * Recherche dans la table Creation par titre ou description
     * Le paramètre de requête "q" doit être fourni.
     */
    static async getCompletionRecherche(req: Request, res: Response): Promise<void> {
        try {
            const { q } = req.query;
            if (!q || typeof q !== "string") {
                res.status(400).json({ message: "Le paramètre 'q' est requis." });
            }

            const creationRepo = AppDataSource.getRepository(Creation);
            // Requête qui recherche dans "titre" et "description" avec LIKE
            const creations = await creationRepo.createQueryBuilder("creation")
                .where("creation.titre LIKE :q OR creation.description LIKE :q", { q: `%${q}%` })
                .getMany();

            res.status(200).json(creations);
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des créations pour l'autocomplétion :", error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
}
