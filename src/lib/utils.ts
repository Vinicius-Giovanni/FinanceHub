/**
 * Utilitário para combinar classes CSS de forma segura e consistente.
 * 
 * Combina classes condicionais utilizando `clsx` e resolve conflitos
 * entre classes do Tailwind CSS utilizando `tailwind-merge`.
 * 
 * É especialmente útil para componentes que recebem classes dinâmicas,
 * permitindo adicionar, remover ou sobreescrever estilos sem gerar
 * combinações conflitantes.
 * 
 * @params inputs - Lista de classes, condições ou valores aceitos pelo `clsx`.
 * @retuns String contendo as classes CSS combinadas e os conflitos do Tailwind resolvidos.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}