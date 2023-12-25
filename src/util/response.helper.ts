import { Response } from "express";

 export function erroServidor(res: Response, error: any){
    return res.status(500).send({
        ok: false,
        message: error.toString()
    });
 }


 export function erroNaoEncontrado(res: Response, entidade: string){
    res.status(404).send({
        ok: false,
        message: `${entidade} não existe.`
    })
 }

 export function erroCamposNaoInformados(res: Response){
    return res.status(400).send({
        ok:false,
        message:"informe todos os campos obrigatórios"
    })
 }