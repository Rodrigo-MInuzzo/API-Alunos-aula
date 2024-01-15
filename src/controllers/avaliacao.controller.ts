import { Request, Response } from "express";
import { erroCamposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { Avaliacao } from "../models/avaliacao.model";
import { adaptAlunoPrisma } from "../util/aluno.adapter";


 export class AvaliacaoController {
  
    //POST http://localhost:3335/aluno/:id/avaliacao

    public async criarAvaliacao(req: Request, res: Response){
        try {
            //entrada
           const {id} = req.params;
           const {disciplina, nota} = req.body;
           const {authorization}= req.headers;
           
            if(!disciplina || !nota){
                return erroCamposNaoInformados(res)
            }

            if(!authorization){
              return res.status(401).send({
                ok: false,
                message: "Token de autenticação não informado",
              });
            }
            //processamento
              //verificar se o aluno existe, 404 se não 

              const aluno= await repository.aluno.findUnique({
                where: {
                    id
                }
              });

              if(!aluno){
                   return erroNaoEncontrado(res, "Aluno");
              }

              //verificar se o token é valido
              if(aluno.token !== authorization){
                return res.status(401).send({
                    ok: false,
                    message: "Token de autenticação inválido",
                  });
              }
              
              const alunoBackend = adaptAlunoPrisma(aluno);

              //criar o model backend da avaliacao
              const avaliacao = new Avaliacao( disciplina, nota, alunoBackend);
             
              // salvar no BD
              const result = await repository.avaliacao.create({
                data:{
                    id: avaliacao.id,
                    disciplina: avaliacao.displina,
                    nota: avaliacao.nota,
                    idAluno: aluno.id,
                }
              });

            //saída

            return res.status(201).send({
                ok: true,
                message: "Avaliacão criada com sucesso",
                data: result,
            })
            
        } catch (error: any) {
            return erroServidor
        }
    }

    // Get http://localhost:3335/aluno/:id/avaliacao
    //para listar avalicaçoes de um aluno específico
    public async listarAvaliacoes(req: Request, res: Response){
        try {

            // - entrada
            const {id} = req.params;


            //2- processamento
            // verificar se o aluno existe , se nao 404
            const aluno = await repository.aluno.findUnique({
                where: {
                    id
                }
            });

            if(!aluno){
                return erroNaoEncontrado(res,"Aluno");
            }

            //listar as avaliacoes 
            const avaliacoes= await repository.avaliacao.findMany({
                where:{
                    idAluno: id
                }
            });

            //3- saída 

            return res.status(200).send({
                ok: true,
                message: "Avaliações com sucesso",
                data: avaliacoes,
            });
            
        } catch (error:any) {
            return erroServidor(res, error);
        }
    }


    //put http://localhost:3335/aluno:id/avaliacao/:idAvaliacao
    public async atualizarAvaliacao(req:Request, res: Response){
        try {
            // 1- entrada
            const {id, idAvaliacao}= req.params;
            const [nota]= req.body;

            if(!nota){
                return erroCamposNaoInformados(res);
            }
                
            //2- processamento
            //verificar se o aluno existe se nao 404
            const aluno= await repository.aluno.findUnique({
                where:{
                    id
                }
            })

            if(!aluno){
                 return erroNaoEncontrado(res, "Aluno")
            }


            //verificar se a avaliacao existe, se nao 404
            const avaliacao= await repository.avaliacao.findUnique({
                where: {
                    id: idAvaliacao
                }
            });
            if(!avaliacao){
                return erroNaoEncontrado(res, "Aavaliação");
            }
            // atualizar o aluno
             const result= await repository.avaliacao.update({
                where: {
                    id: idAvaliacao,
                },
                data: {
                    nota
                }
             });

            //3- saída 
            return res.status(200).send({
                ok: true,
                message: "Avaliação atualizada com sucesso",
                data: result
            })
            
        } catch (error: any) {
            return erroServidor(res, error)
        }
    }
}



