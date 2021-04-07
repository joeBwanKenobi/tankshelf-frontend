// src/constants/tank.interface.ts

export interface Tank {
    id: number;
    name: string;
    type?: string;
    age?: number; // This will be a number value from Date() object
    image?: string;
    images: any[];
    stream?: string | undefined;
    description?: string | null;
}