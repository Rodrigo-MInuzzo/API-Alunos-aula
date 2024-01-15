import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { randomUUID } from "crypto";

export class LoginController{
    public async login(req: Request, res: Response){

        try{
            //1 entrada
            const { email, senha} = req.body;
              
            if(!email){
               return res.status(400).send({
                ok: false,
                message: "Email não informado"
               })
            }

            if(!senha){
               return res.status(400).send({
                ok: false,
                message:" Senha não informada"
               })
            }

            //2 processamento

            const aluno = await repository.aluno.findFirst({
                where: {
                    email,
                    senha
                }
            })

            if(!aluno){
               return res.status(401).send({
                ok: false,
                message:" Credenciais invalidas"
               });
            }
            
            const token = randomUUID(); 

            await repository.aluno.update({
                where: {
                    id: aluno.id
                },
                data:{
                    token
                }
            });

            //3 saída 

            return res.status(200).send({
                ok: true,
                message:"Login feito com sucesso",
                data:{
                    id: aluno.id,
                    nome: aluno.nome,
                    token,
                },
            });

        } catch(error: any){
            return res.status(500).send({
                ok: false,
                message: error.toString()
           })
        }
    }
}