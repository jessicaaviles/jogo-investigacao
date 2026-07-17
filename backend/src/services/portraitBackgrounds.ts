export interface BackgroundOption {
  label: string
  description: string
}

export const portraitBackgrounds: BackgroundOption[] = [
  {
    label: 'Delegacia - Sala de Interrogatório',
    description: 'uma sala de interrogatório da delegacia central, paredes de tijolos aparentes com infiltrações, mesa de madeira arranhada, cadeira de metal vazia, luz fria de fluorescente piscando, um arquivo de metal enferrujado ao fundo, sombras profundas nos cantos, atmosfera de tensão silenciosa',
  },
  {
    label: 'Escritório de Investigação',
    description: 'um escritório bagunçado de detetive, mesa com papéis espalhados e uma xícara de café frio, estante cheia de pastas e livros de código penal, abajur verde de metal com luz quente, parede com recortes de jornal e fotos ligadas por barbante, janela com persianas entreabertas mostrando a noite lá fora, cadeira giratória de couro gasto',
  },
  {
    label: 'Hotel Vesper - Corredor',
    description: 'o corredor do Hotel Vesper, papel de parede floral desbotado verde escuro, carpete vinho manchado, porta de quarto entreaberta com luz amarela saindo por ela, lustre antigo no teto mal iluminado, sombras alongadas no chão, clima de abandono e segredos',
  },
  {
    label: 'Beco Noturno',
    description: 'um beco estreito de paralelepípedos molhados pela chuva fina, parede de tijolos com pichações apagadas, luz amarelada de poste criando poças de luz no chão, uma placa de metal enferrujada pendurada, fumaça discreta saindo de um bueiro, lâmpada de néon piscando "ABERTO" ao fundo',
  },
  {
    label: 'Sala de Estar Antiga',
    description: 'uma sala de estar de uma casa antiga, sofá de veludo verde escuro com almofadas amassadas, estante de madeira maciça cheia de livros empoeirados, lareira apagada com cinzas, abajur de franja dourada no canto, tapete persa desgastado, cortinas de veludo bordô semi-cerradas, retratos de família em molduras escuras na parede',
  },
  {
    label: 'Quarto de Casebre',
    description: 'um quarto simples e modesto, cama de solteiro com colcha xadrez marrom e vermelha, criado-mudo com um abajur de cúpula amarelada e um cinzeiro, parede descascada com papel florido antigo, janela de madeira com vidro embaçado, guarda-roupa de madeira entreaberto, chão de tábuas rangendo',
  },
  {
    label: 'Cozinha de Casa de Campo',
    description: 'uma cozinha rústica com armários de madeira escura e puxadores de latão, pia de ferro com utensílios pendurados, fogão à lenha, janela aberta com cortina de chita mostrando o quintal, bule esmaltado em cima da mesa de madeira, luz quente de lampião pendurado, azulejos brancos antigos com rachaduras',
  },
  {
    label: 'Quintal / Varanda',
    description: 'uma varanda coberta de madeira, cadeira de balanço vazia, grade de ferro trabalhado coberta de hera, chão de tábuas molhadas pela chuva recente, lampião aceso na parede, canto com vasos de samambaia e uma mangueira enrolada, vista para um quintal escuro com árvores ao fundo, luz fria do entardecer',
  },
  {
    label: 'Arquivo Municipal',
    description: 'o arquivo municipal, estantes metálicas altas lotadas de pastas amareladas e caixas de papelão, luz fluorescente fraca que pisca, chão de cimento com marcas de carrinho de arquivo, um ventilador de teto parado, nuvens de poeira suspensas no ar, clima de esquecimento e papel velho',
  },
  {
    label: 'Porto Industrial',
    description: 'o porto industrial abandonado, contêineres enferrujados empilhados, chão de concreto rachado com poças de água, postes de luz altos com néon branco frio, uma ponte rolante parada contra o céu noturno, cordas grossas enroladas em colunas de aço, sombras fortes e contrastadas, brisa constante carregando cheiro de maresia',
  },
]

export function selectBackground(seed: number): BackgroundOption {
  return portraitBackgrounds[seed % portraitBackgrounds.length]
}
