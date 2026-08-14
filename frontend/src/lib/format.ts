/**
 * Funções utilitárias para formatação de dados exibidos no FinanceHub.
 * 
 * Centraliza a apresentação de preços, valores monetários compactados,
 * percentuais, números e datas, garantindo um formato consistente
 * entre os diferentes componentes da aplicação.
 */

/**
 * Formata um valor como preço, ajustando automaticamente a quantidade
 * de casas decimais de acordo com a magnitude do valor.
 * Valores menores que 1 recebem mais casas decimais para preservar
 * precisão visual, enquanto valores maiores utilizam menos casas.
 * 
 * @param value - Valor númerico a ser formatado.
 * @param currency - Moeda utilizada para determinar o símbolo exibido.
 * @returns Valor formatado com símbolo monetário.
 */

export function formatPrice(value: number, currency= "USD"): string {
    const symbol = currency === "BRL" ? "R$" : currency === "USD" ? "$" : "";
    const digits = Math.abs(value) < 1 ? 4 : Math.abs(value) < 10 ? 3 : 2;
    return (
        symbol +
        value.toLocaleString("en-US", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        })
    );
}

/**
 * Formata valores grandes utilizando unidades compactas.
 * Converte valores para representações como K (mil), M (milhão),
 * B (bilhão) e T (trilhão), facilitando a visualização de grandes
 * quantidades em cards, tabelas e indicadores do dashboard.
 * 
 * @param value - Valor número a ser formatado
 * @param prefix - Prefixo exibido antes do valor
 * @returns Valor compactado ou "-" quando o valor não está disponível.
 */
export function formatCompact(value?: number, prefix = "$"): string {
    if (value === undefined) return "-";
    const units: [number, string][] = [
        [1e12, "T"],
        [1e9, "B"],
        [1e6, "M"],
        [1e3, "K"],
    ];
    for (const [size, suffix] of units) {
        if (Math.abs(value) >= size) {
            return `${prefix}${(value / size).toFixed(2)}${suffix}`
        }
    }
    return `${prefix}${value.toFixed(2)}`;
}

/**
 * Formata uma variação percentual;
 * 
 * Adiciona automaticamente o sinal "+" para valores positivos
 * e mantém o sinal "-" para valores negativos.
 * 
 * @param value - Variação percentual.
 * @param digits - Quantidade de casas decimais.
 * @returns Percentual formatado com sinal e símbolo "%".
 */
export function formatPercent(value: number, digits = 2): string {
    return `${value > 0 ? "+" : ""}${value.toFixed(digits)}%`;
}

/**
 * Formata um número utilizando separados de milhares.
 * 
 * Não exibe casas decimais, sendo adequado para quantidade inteiras,
 * como volume de negociações, quantidade de ativos ou contagens.
 * 
 * @param value - Número a ser formatado.
 * @returns Número formatado ou "-" quando o valor não está disponível.
 */
export function formatNumber(value?: number): string {
    if (value === undefined) return "-";
    return value.toLocaleString("en-US", {maximumFractionDigits: 0 });
}

/**
 * Formata uma data ou horário recebido no formato ISO.
 * 
 * O parâmetro 'compact' permite escolher entre uma representação
 * resumida, adequada para eixos de gráficos, ou uma representação
 * mais detalhada contendo data e horário.
 * 
 * @param iso - Data no formato ISO.
 * @param compact - Define se deve utilizar o formato compacto.
 * @returns Data formatada para exibição na interface.
 */
export function formatAxisTime(iso: string, compact = false): string {
    const d = new Date(iso);
    return compact
        ? d.toLocaleDateString("en-US", { month: "short", day: "numeric"})
        : d.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
}