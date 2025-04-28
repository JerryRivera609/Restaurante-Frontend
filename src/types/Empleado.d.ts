export interface Empleado{
    id: number;
    email: string;
    contrasenia: string;
    rol: 'Cocina' | 'Bar' | 'Mozo' | 'Frios';
}