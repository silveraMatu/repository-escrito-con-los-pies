import { User, userCreationAttributes } from "../models/user.model.js";
import { iUserRepository } from "../repository/user.repository.js";
import bcrypt from "bcrypt"

export class userServices{
    constructor(private userRepository: iUserRepository ){}

    async createUser(data: userCreationAttributes): Promise<User>{
        //validacion de nombre de usuario
        if(await this.userRepository.findByUsername(data.username, data.id = undefined))
            throw new Error(`El username ${data.username} ya se encuentra en uso`)

        if(await this.userRepository.findByEmail(data.email, data.id = undefined))
            throw new Error("Este email ya se encuentra en uso")

    
        data.password = await bcrypt.hash(data.password, 10)

        return await this.userRepository.create(data)
    }

    async updateUser(id:  number, data: Partial<userCreationAttributes>): Promise<number>{
        if(await this.userRepository.findByUsername(data.username!, data.id))
            throw new Error(`El username ${data.username} ya se encuentra en uso`)
        
        if(await this.userRepository.findByEmail(data.email!, data.id))
            throw new Error(`Ese email ya se encuentra en uso`)

        const affected = await this.userRepository.update(id, data)

        if(!affected) throw new Error("No se ha encontrado ese usuario")
        
        return 0
    }

    async getUserById(id: number): Promise<User | null>{
        const user = await this.userRepository.findById(id)

        if(!user) throw new Error("No se ha encontrado ese usuario")
        
        return user
    }

    async deleteUser(id: number): Promise<number>{

        const deleted = await this.userRepository.delete(id)
        if(!deleted) throw new Error("No se ha encontrado ese usuario")

        return deleted
    }
}