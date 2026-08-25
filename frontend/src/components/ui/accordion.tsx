/**
 * Componentes reutilizáveis de Accordion para o FinanceHub.
 * 
 * Fornece uma interface baseada nos componentes primativos da Radix UI,
 * permitindo criar seções expansíveis e recolhíveis de forma consistente
 * entre os diferentes componentes de aplicação.
 * 
 * Os componentes encapsulam comportamento, acessibilidade e estados de
 * abertura/fechamento fornecidos pelo Radix UI, enquanto aplicam os estilos
 * visuais definidos pelo FinanceHub.
 */

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Componente raiz responsável por agrupar e controlar os itens do Accordion.
 * 
 * É utilizado como container para `AccordionItem` e define o comportamento
 * geraldas seções expansíveis.
 */
const Accordion = AccordionPrimitive.Root;

/**
 * Item individual do Accordion.
 * 
 * Representa uma seção expansível dentro do Accordion e adiciona uma borda
 * inferior como padrão visual. Classes adicionais podem ser fornecidas
 * través da propriedade `className`.
 * 
 * @param className - Classes CSS adicionais aplicadas ao item.
 * @param props - Propriedades suportadas pelo componente de item do Radix UI.
 * @returns Item do Accordion estilizado.
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

/**
 * Trigger responsável por abrir ou fechar um item do Accordion.
 * 
 * Renderiza o conteúdo clicável da seção juntamente com um ícone de seta.
 * O ícone é rotacionado automaticamente quando o item está aberto.
 * 
 * @param className - Classes CSS adicionais aplicadas ao trigger.
 * @param children - Conteúdo exibido dentro do trigger.
 * @param props - Propriedades suportadas pelo trigger do Radix UI.
 * @returns Trigger estilizado para controlar a abertura do item.
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * Conteúdo expansível de um item do Accordion.
 * 
 * Controla a área exibida quando o item está aberto e aplica animações
 * diferentes para os estados de abertura e fechamento.
 * 
 * O conteúdo recebido é envolvido por um container interno responsável
 * pelo espaçamento vertical da seção.
 * 
 * @param className - Classes CSS adicionais aplicadas ao container interno.
 * @param children - Conteúdo exibido quando o item está aberto.
 * @param props - Propriedades suportadas pelo componente de conteúdo do Radix UI.
 * @returns Conteúdo expansível e animado do Accordion.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

/**
 * Exporta os componentes necessários para construção de Accordions.
 */
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };