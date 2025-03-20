import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User"; // Assurez-vous que le chemin est correct
import { Repository } from "typeorm";

export class UserController {
  // Méthode pour récupérer la liste des utilisateurs
  static async getListeUser(req: Request, res: Response): Promise<void> {
    try {
      const userRepository: Repository<User> = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }

  // Méthode pour insérer un nouvel utilisateur dans la base de données
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, age } = req.body;

      if (!firstName || !lastName || !age) {
        res.status(400).json({ message: "Données manquantes" });
      }

      const userRepository: Repository<User> = AppDataSource.getRepository(User);

      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.age = age;

      await userRepository.save(newUser);

      res.status(201).json({
        message: "Utilisateur créé avec succès",
        user: newUser,
      });
    } catch (error) {
      console.error("❌ Erreur lors de l'insertion de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
}
