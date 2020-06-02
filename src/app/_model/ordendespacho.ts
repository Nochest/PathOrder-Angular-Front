import { Canal } from './canal';

export class OrdenDespacho {

    public id: number;
    public numeroOrden: string;
    public prioridad: string;
    public origen: string;
    public cantidadBultos: Number;
    public observacion : string;
    public canal : Canal;
}
