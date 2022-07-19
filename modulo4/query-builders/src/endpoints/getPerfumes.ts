import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";

export const getPerfumes = async(req: Request, res: Response) => {
    let errorCode = 400
    try {
        const query = req.query.q
        if(query) {
            const result = await connection(TABLE_PERFUMES)
                .select()
                .where("id", "LIKE", `%${query}%`)
                .orWhere("name", "LIKE", `%${query}%`)
                .orWhere("brand", "LIKE", `%${query}%`)
               return res.status(200).send({message: "Perfume(s) encontrado com sucesso", result})
        }
         const result = await connection(TABLE_PERFUMES)
            .select()
            res.status(200).send({message: "Perfumes encontrado com sucesso!", result})
    } catch (error) {
        if (error.statusCode === 200) {
            res.status(500).end()
        } else {
            res.status(errorCode).send({ message: error.message })
        }
    }
}