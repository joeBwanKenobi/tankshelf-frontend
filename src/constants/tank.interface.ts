// src/constants/tank.interface.ts

export interface Tank {
    id: number,
    name: string,
    waterType?: string,
    age?: number,
    image?: string,
    stream?: string | undefined,
    description?: string | null,
}