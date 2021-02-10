// src/constants/tank.interface.ts

export interface Tank {
    id: number,
    name: string,
    type?: string,
    age?: number,
    imageSrc?: string,
    streamSrc?: string | undefined,
    details?: string | null,
}