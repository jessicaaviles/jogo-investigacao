export interface OutfitOption {
  label: string
  description: string
}

export const portraitOutfits: OutfitOption[] = [
  {
    label: 'Sobretudo Clássico',
    description: 'um sobretudo (trench coat) bege desgastado, com golas levantadas, cinto amarrado na cintura, uma camisa social branca por baixo com colarinho aberto, calças escuras e sapatos de couro gastos',
  },
  {
    label: 'Suéter de Lã',
    description: 'um suéter grosso de lã marrom escuro com gola redonda, uma camisa xadrez vermelha e preta aparecendo no colarinho e punhos, calça de sarja verde-oliva, botas de couro amarradas',
  },
  {
    label: 'Blazer Formal',
    description: 'um blazer azul marinho de tweed com remendos nos cotovelos, gravata fina vinho meio desfeita, camisa branca com o primeiro botão aberto, calça cinza de lã, sapatos sociais com sola gasta',
  },
  {
    label: 'Jaqueta de Couro',
    description: 'uma jaqueta de couro preta com zíper diagonal, camiseta branca simples por baixo, calça jeans escura surrada, coturno preto com cadarços grossos, visual mais pesado e investigativo',
  },
  {
    label: 'Camisa Social com Suspensórios',
    description: 'camisa social branca de mangas arregaçadas até o antebraço, suspensórios marrons listrados, calça de alfaiataria cinza escura, gravata borboleta preta desfeita pendurada no colarinho aberto, chapéu fedora ao lado',
  },
  {
    label: 'Cardigã e Gravata',
    description: 'um cardigã de tricô verde-oliva abotoado até o meio, gravata estreita dourada e vinho, camisa social azul clara por baixo, calça marrom escura de cotelê, sapatos de camurça',
  },
  {
    label: 'Jaqueta Xadrez',
    description: 'uma jaqueta de flanela xadrez verde e preta, camiseta térmica cinza clara gola redonda por baixo, calça cáqui amarrotada, botas de trabalho amarradas, visual mais informal e rústico',
  },
  {
    label: 'Sobretudo Cinza',
    description: 'um sobretudo comprido cinza-ardósia até os joelhos, lenço xadrez vermelho no pescoço, colete de lã cinza claro por baixo, calça preta de lã, sapatos sociais de couro preto, cachecol dando um ar mais aristocrático',
  },
  {
    label: 'Gabinete Investigativo',
    description: 'jaqueta cáqui de gabinete com múltiplos bolsos, colete tático discreto por baixo, camisa polo azul petróleo, calça cargo verde musgo, botas de cano curto, visual de trabalho de campo',
  },
  {
    label: 'Estilo Anos 70',
    description: 'um paletó marrom claro de corte largo, golinha da camisa amarela clara por fora, calça boca larga bege, cinto de couro trançado, sapatos de camurça marrom, bigode (se aplicável ao gênero), visual retró de investigador',
  },
]

export function selectOutfit(seed: number): OutfitOption {
  return portraitOutfits[seed % portraitOutfits.length]
}
