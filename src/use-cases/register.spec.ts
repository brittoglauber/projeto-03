import { beforeEach, describe, expect, it, test } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsErro } from "./erros/user-already-exists-error"

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {

    beforeEach(() => {
         usersRepository = new InMemoryUsersRepository()
         sut = new RegisterUseCase(usersRepository)
    })

    it('should hash user password upon registration', async () => {

        const { user } = await sut.handle({
            name: 'John Doe',
            email: 'johndoe3@test.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))

    })
    
    it('should hash user password upon registration', async () => {


        const { user } = await sut.handle({
            name: 'John Doe',
            email: 'johndoe3@test.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
        
    })

    it('should not be able to register with same email twice', async () => {


        const email = 'johndoe@test.com'

        await sut.handle({
            name: 'John Doe',
            email,
            password: '123456',
        })
        
        await expect(() => 
            sut.handle({
                name: 'John Doe',
                email,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsErro)
        
    })
})