import { Tank } from './tank.interface';

export interface Tanks extends Array<Tank> {
    [key: number]: Tank;
}