import { User, userCreationAttributes } from "../models/user.model.js"
import { Op } from "sequelize";

export interface iUserRepository{
    create(user: userCreationAttributes): Promise<User>;
    findByEmail(email: string, id: number | undefined): Promise<User | null >
    findByUsername(username: string, id: number | undefined): Promise<User | null >
    findById(id: number): Promise<User |  null>
    update(id: number, user: Partial<userCreationAttributes> ): Promise<number>
    delete(id: number): Promise<number>
}

export class userRepository implements iUserRepository{
    
    async create(user: userCreationAttributes): Promise<User>{
        return await User.create(user)
    }

    async findByEmail(email: string, id: number | undefined = undefined): Promise<User | null> {
        let filter = {
            email
        }

        if(id){
            let filter= {
                email, id: {[Op.ne]: id}
            }
        }

        return await User.findOne({where: filter})
    }

    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id)
    }

    async findByUsername(username: string, id: number | undefined = undefined): Promise<User | null> {

        let filter = {
            username
        }

        if(id){
            let filter= {
                username, id: {[Op.ne]: id}
            }
        }
        
        return await User.findOne({where: filter})
    }

    async update(id: number, user: Partial<userCreationAttributes>): Promise<number> {
        const [affects] = await User.update(user, {where: {id}})
        return affects
    }

    async delete(id: number): Promise<number> {
        return await User.destroy({where: {id}})
    }

}