 import { randomUUID} from "crypto";
import { Aluno } from "./aluno.model";

 export class Avaliacao {
    public id: string;

    constructor(
         public displina: string,
          public nota: number,
           public aluno: Aluno
        ) {
        this.id= randomUUID()
    }
 }

 const daphne = new Aluno ("Daphne", "", "", 10)

 const avaliacao= new Avaliacao("banco II", 10 , daphne)