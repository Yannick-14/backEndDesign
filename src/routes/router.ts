import { Router } from "express";
import { UserController } from "../controller/UserController";
import { createCreationWithImages } from "../controller/CreationController";
import { ListeCreationController } from "../controller/ListeCreationController";
import { AutocompletionController } from "../controller/AutocompletionController";

const router = Router();

router.get('/users', UserController.getListeUser);
router.post('/insertUser', UserController.createUser);

// Utilisation du middleware dédié pour l'upload
router.post('/creation', createCreationWithImages);
router.get("/liste", ListeCreationController.findAllCreationPaginate);

router.get("/autocompletion", AutocompletionController.getCompletionRecherche);

export default router;
