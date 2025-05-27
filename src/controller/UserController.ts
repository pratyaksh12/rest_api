import { Request, Response } from "express"
import { AppDataSource } from "@/data-source"
import { User } from "@/entity/User"

export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    // get all the users as a json
    async all(request: Request, response: Response) {
        const users = await this.userRepository.find();
        return response.json(users)
    }

    async one(request: Request, response: Response) {
        const id = parseInt(request.params.id);
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.json(user);
    }

    async save(request: Request, response: Response) {
        const { firstName, lastName, email, age } = request.body;

        const user = Object.assign(new User(), {
            firstName, // similar to user.firstname = firstnae
            lastName,
            email,
            age
        });

        try {
            const savedUser = await this.userRepository.save(user);
            return response.status(201).json(savedUser);

        } catch (error) {
            return response.status(400).json({ message: "something went wrong while saving the user." });
        }
    }

    async remove(request: Request, response: Response) {
        const id = parseInt(request.params.id);
        const userToRemove = await this.userRepository.findOne({
            where: { id }
        })

        if (!userToRemove) {
            return response.status(404).json({ message: "The user yiu are trying to delete doesn't exist" });
        }

        try {
            await this.userRepository.remove(userToRemove);
        } catch (error) {
            return response.status(401).json({ message: "error deleting the user" })
        }

        return response.json({ message: "User removed successfully" })
    }

    async update(request: Request, response: Response) {
        const id = parseInt(request.params.id)
        const {firstName, lastName, email, age}: User = request.body;

        let userToUpdate = await this.userRepository.findOne({
            where: { id }
        });

        if (!userToUpdate) {
            return response.status(404).json({ messgae: 'user not found' });
        }

        userToUpdate = Object.assign(userToUpdate, {
            firstName,
            lastName,
            email,
            age,
        });

        try {
            const updatedUser = await this.userRepository.save(userToUpdate);
            return response.json(updatedUser);
        } catch (error) {
            return response.status(400).json({ message: "Erorr updating user", error })
        }
    }
}