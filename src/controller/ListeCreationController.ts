// src/controllers/ListeCreationController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Creation } from "../entity/Creation";

export class ListeCreationController {
  /**
   * Récupère les créations avec leurs images associées, paginées 4 par page.
   * Le numéro de page peut être passé via le paramètre de requête "page".
   */
  static async findAllCreationPaginate(req: Request, res: Response): Promise<void> {
    try {
      // Récupération du numéro de page depuis les query params (défaut: page 1)
      const page: number = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit: number = 2; // 4 créations par page
      const skip: number = (page - 1) * limit;

      const creationRepo = AppDataSource.getRepository(Creation);

      // Récupération des créations avec leurs images associées
      const [creations, total] = await creationRepo.findAndCount({
        relations: ["images"],
        skip,
        take: limit,
        order: { date_publication: "DESC" }, // Optionnel: trier par date de publication décroissante
      });

      res.status(200).json({
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        data: creations,
      });
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des créations :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
}
