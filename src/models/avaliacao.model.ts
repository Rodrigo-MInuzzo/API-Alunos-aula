 import { randomUUID} from "crypto";
import { Aluno } from "./aluno.model";

 export class Avaliacao {
    public id: string;
     disciplina: any;

    constructor(
         public displina: string,
          public nota: number,
           public aluno: Aluno
        ) {
        this.id= randomUUID()
    }
 }

