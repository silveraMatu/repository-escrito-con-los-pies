import { User, userCreationAttributes } from "../models/user.model.js"

interface iUserRepository{
    create(user: userCreationAttributes): Promise<User>;
    findByEmail(email: string): Promise<User | null >
    findById(id: number): Promise<User |  null>
    update(id: number, user: Partial<Omit<userCreationAttributes, "id">> ): Promise<number>
    delete(id: number): Promise<number>
}

export class userRepository implements iUserRepository{
    
    async create(user: userCreationAttributes): Promise<User>{
        return await User.create(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({where: {email: email}})
    }

    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id)
    }

    async update(id: number, user: Partial<Omit<userCreationAttributes, "id">>): Promise<number> {
        const [affects] = await User.update(user, {where: {id}})
        return affects
    }

    async delete(id: number): Promise<number> {
        return await User.destroy({where: {id}})
    }
}