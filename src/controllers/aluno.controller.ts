import { Request, Response } from "express";
import repository from "../database/prisma.repository";
import { Aluno } from "../models/aluno.model";
import { erroNaoEncontrado } from "../util/response.helper";

export class AlunoController {
   // criar um novo aluno
    public async criarAluno(req: Request, res: Response){
        
        try{
             //1- entrada
        const { nome, email, senha, idade}= req.body

        if(!nome || !email || !senha){
         res.status(400).send({
             ok: false,
             message: "Os campos obrigatorios não foram informados"
         })
        };
         
 
     //2- processamento
         const aluno = new Aluno( nome , email, senha, idade )
 
         const result = await repository.aluno.create({
              data: aluno
         });
 
     //3- saída 
       return res.status(201).send({
         ok: true,
         message: "Usuario criado com sucesso",
         data: result,
       })
      
        } catch(error:any){
            return res.status(500).send({
                ok: false,
                message: error.toString()
            });

        }
       
    }
  

 // obter um aluno pelo ID
 public async obterAluno( req: Request, res: Response){
   try {
    //1- entrada
     const {id} = req.params;
     
    //2-processamento
    const aluno= await repository.aluno.findUnique({
        where: {
            id,
        },
    });

    if(!aluno){
        res.status(404).send({
            ok: false,
            message: "Aluno não encontrado"
        })
       };

    //3- saída 

    return res.status(200).send({
        ok:true,
        message:"Aluno obtido com sucesso",
        data: aluno,
    });
    
   } catch(error:any){
            return res.status(500).send({
                ok: false,
                message: error.toString()
            });

        }
   }


   //Deletar aluno
   public async deletarAluno(req:Request, res: Response){
    try {
        //1 entrada
        const {id} = req.params;
 

        //2 processamento

        const aluno = await repository.aluno.findUnique({
            where:{
                id
            }
        });

        if (!aluno) {
           return erroNaoEncontrado(res,"Aluno")
        }
         

        await repository.aluno.delete({
            where:{
                id,
            }
        });

        //3 deletar o aluno
        return res.status(200).send({
            ok:true,
            message:"Aluno deletado com sucesso"
        });

       } catch(error:any){
     return res.status(500).send({
        ok:false,
        message: error.toString()
     })

    }

   }


 
   public async atualizarAluno(req: Request, res: Response){

    try {
        //1 entrada
        const {id}= req.params;
        const{nome, idade}= req.body;

        if (!nome && !idade){
            return res.status(400).send({
                ok:false,
                message: "Informe ao menos um campo para atualizar",
            });
        }


        // 2 processamento

        const aluno = await repository.aluno.findUnique({
            where:{
                id,
            },
        });

        if (!aluno){
            return res.status(4040).send({
                ok: false,
                message:"Aluno não existe",
            });
        }


       const result = await repository.aluno.update({
            where:{
                id,
            },
            data: {
                nome,
                idade,
            },
        });

        // saida

        return res.status(200).send({
            ok:true,
            message: "Aluno atualizado com sucesso",
            data: result,
        })


    }catch (error:any){
        return res.status(500).send({
            ok: false,
            message: error.toString()
        });

    }
   }
 }


 