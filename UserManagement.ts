import z from 'zod';

export const UserManagementDataSchema = z.object({})

export type UserManagementDataSchemaType = z.infer<typeof UserManagementDataSchema>

export class UserManagement {
    static isLibrarian(userManagementData: UserManagementDataSchemaType, userId: string): boolean {
        return false;
    }

    static isVIPMember(userManagementData: UserManagementDataSchemaType, userId: string): boolean {
        return false;
    }
}