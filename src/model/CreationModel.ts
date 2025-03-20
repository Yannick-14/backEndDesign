// src/model/CreationModel.ts
import { AppDataSource } from "../data-source";  // Assure-toi que ton AppDataSource est bien exporté
import { Creation } from "../entity/Creation";
import { ImageCreation } from "../entity/ImageCreation";

export class CreationModel {
    static async createCreationWithImages(
        titre:string,
        description: string,
        lien_inspection: string,
        files: Express.Multer.File[]
    ) {
        // Utiliser l'instance AppDataSource pour récupérer le repository
        const creationRepo = AppDataSource.getRepository(Creation);
        const imageRepo = AppDataSource.getRepository(ImageCreation);

        // Création de la nouvelle entité avec la date de publication actuelle
        const newCreation = creationRepo.create({
            titre,
            description,
            lien_inspection,
            date_publication: new Date(),
        });

        // Sauvegarde de l'entité Creation
        const savedCreation = await creationRepo.save(newCreation);
        console.log("savedCreation: "+savedCreation);
        

        // Traitement et sauvegarde des images associées
        const imageEntities = files.map((file) => {
            const image = new ImageCreation();
            image.imageUrl = file.filename;
            image.creation = savedCreation;
            return image;
        });
        console.log("imageEntities "+imageEntities);
        

        await imageRepo.save(imageEntities);

        return { creation: savedCreation, images: imageEntities };
    }
}
