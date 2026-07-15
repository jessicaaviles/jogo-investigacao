# Planejador — Jogo de Investigação Multiplayer com IA

## 1. Visão do produto

### Conceito

Um jogo multiplayer de investigação para amigos e familiares, inspirado em jogos de dedução lateral e investigação, no qual cada participante usa o próprio celular para colaborar na solução de mistérios.

A IA atua como Mestre do Caso, conhece a verdade completa da história, responde perguntas, controla o desbloqueio de evidências, interpreta teorias e mantém a coerência narrativa.

### Proposta de valor

> Todos investigam. Ninguém precisa conhecer a solução antes da partida.

### Diferenciais

- IA como Mestre do Caso.
- Casos rápidos e casos investigativos completos.
- Multiplayer em tempo real para 2 a 6 jogadores.
- Turnos configuráveis e possibilidade de passar a vez.
- Perguntas por texto e voz.
- Evidências, personagens, locais, pistas privadas e teorias.
- Personalização com nomes, características e fotos opcionais.
- Casos originais ou adaptados ao grupo.
- Solução única, objetiva e dedutível.
- Criação cega de casos para que a administradora também possa jogar.

---

## 2. Objetivo do MVP

Validar se grupos de amigos e familiares:

1. entendem a mecânica sem explicação externa;
2. conseguem concluir uma investigação com ajuda do Mestre IA;
3. consideram a solução justa;
4. se divertem com a dinâmica multiplayer;
5. demonstram vontade real de iniciar outro caso.

A principal métrica de valor é:

> Percentual de grupos que inicia ou tenta iniciar uma segunda partida.

---

## 3. Público inicial

- Famílias.
- Grupos de amigos.
- Pessoas que gostam de jogos de mistério, dedução lateral e investigação.
- Jogadores casuais.
- Usuários que preferem experiências sociais presenciais ou remotas.

---

## 4. Plataforma

### MVP

- PWA instalável.
- Aplicação web responsiva.
- Mobile-first.
- Funciona em Android, iOS e desktop.
- Pode ser acessada por navegador sem instalação.

### Uso

- Presencial: cada participante usa o próprio celular.
- Remoto: participantes usam uma chamada externa, como WhatsApp, Meet ou Discord.
- O app não terá chamada de áudio ou vídeo interna no MVP.

---

## 5. Modos de jogo

### 5.1 Caso rápido

Duração estimada: 5 a 10 minutos.

Características:

- situação intrigante;
- perguntas livres ao Mestre;
- respostas curtas com contexto;
- até três pistas progressivas;
- poucas evidências;
- teoria final;
- solução objetiva;
- ideal para várias partidas seguidas.

### 5.2 Caso médio

Duração estimada: 15 a 30 minutos.

Características:

- perguntas ao Mestre;
- personagens;
- locais;
- documentos;
- evidências;
- áudios;
- mensagens;
- mapas;
- interrogatórios;
- mentiras estruturadas;
- contradições;
- pistas privadas;
- construção e votação de teorias;
- linha do tempo final.

### 5.3 Evolução futura

- jogador secreto;
- culpado controlado por participante;
- sabotagem;
- objetivos individuais;
- campanhas;
- casos longos;
- casos criados pela comunidade;
- ranking global;
- monetização;
- assinatura;
- pacotes de casos.

---

## 6. Categorias e taxonomia

### Tipo de mistério

- desaparecimento;
- roubo;
- fenômeno aparentemente sobrenatural;
- investigação familiar;
- psicológico;
- suspense.

### Ambientação

- contemporânea;
- ficção científica;
- fantasia.

### Tom

- misterioso;
- psicológico;
- suspense;
- engraçado;
- absurdo.

### Conteúdo

Padrão: suspense moderado.

Pode conter:

- desaparecimento;
- crime;
- morte não gráfica;
- tensão psicológica;
- sustos;
- temas sombrios.

Não deve conter no MVP:

- violência sexual;
- abuso;
- suicídio ou automutilação;
- crimes contra crianças;
- humilhação sexual;
- preconceito;
- dependência;
- doença grave;
- traição conjugal realista;
- acusações reputacionais realistas.

---

## 7. Estrutura multiplayer

### 7.1 Número de jogadores

- mínimo: 2;
- máximo: 6.

### 7.2 Criação da sala

O anfitrião:

- escolhe o caso;
- define configurações;
- cria a sala;
- recebe link, QR Code e código de acesso;
- convida os demais jogadores.

### 7.3 Entrada

Formas de entrada:

- link de convite;
- QR Code;
- código alfanumérico;
- código numérico simplificado, quando possível.

### 7.4 Identidade

- identidade anônima persistente por dispositivo;
- sem conta obrigatória;
- nome ou apelido;
- avatar, iniciais ou foto opcional;
- grupos podem ser salvos localmente e no servidor.

### 7.5 Turnos

- ordem configurável;
- padrão: ordem aleatória fixa;
- jogador pode passar a vez sem penalidade;
- cronômetro opcional;
- padrão: sem limite.

Ações do jogador da vez:

- perguntar ao Mestre;
- investigar local;
- interrogar personagem;
- propor conexão entre evidências;
- passar a vez.

Ações disponíveis para todos:

- consultar evidências;
- criar notas;
- revelar pista privada;
- sugerir pergunta;
- editar teoria em rascunho;
- solicitar esclarecimento.

Ações por votação:

- usar pista antecipadamente;
- enviar teoria;
- revelar solução;
- encerrar partida;
- continuar sem jogador desconectado.

### 7.6 Desconexão

Se um jogador desconectar:

- anfitrião escolhe pausar ou continuar;
- pistas privadas essenciais podem ser redistribuídas pelo sistema;
- estado permanece preservado.

Se o anfitrião desconectar:

- pode retornar pelo mesmo dispositivo;
- pode usar código privado de recuperação;
- se não voltar, o grupo vota em um novo anfitrião;
- o anfitrião substituto não recebe informações narrativas privadas.

---

## 8. Participação no caso

O anfitrião escolhe:

### Investigadores externos

Os jogadores investigam personagens fictícios.

### Personagens da história

Os jogadores aparecem como personagens do caso.

Quando personalizados:

- podem ser testemunhas;
- podem possuir pistas;
- podem ter memória incompleta;
- podem omitir informações fictícias;
- podem interpretar algo incorretamente;
- não são o responsável principal pelo mistério no MVP.

---

## 9. Personalização do grupo

### 9.1 Preenchimento

- o anfitrião inicia a sala;
- cada jogador completa o próprio perfil.

### 9.2 Dados possíveis

- nome ou apelido;
- relação com o anfitrião;
- até cinco características;
- preferências e restrições de papel;
- foto opcional;
- respostas a perguntas estruturadas.

### 9.3 Relação com o anfitrião

- cônjuge ou parceiro;
- familiar;
- amigo;
- colega de trabalho;
- conhecido;
- outro.

### 9.4 Características

Exemplos:

- observador;
- curioso;
- competitivo;
- desconfiado;
- impulsivo;
- cauteloso;
- engraçado;
- dramático;
- distraído;
- organizado;
- boa memória;
- raciocínio lógico;
- leitura de comportamento;
- tecnologia;
- improvisação.

### 9.5 Perguntas divertidas

Cada jogador responde algumas perguntas prontas, como:

- Quem perceberia primeiro que algo está errado?
- Quem faria a teoria mais absurda?
- Quem manteria a calma?
- Quem é mais difícil de enganar?
- Quem tentaria abrir uma porta proibida?
- Quem seria o melhor interrogador?

Essas respostas influenciam:

- distribuição de informações;
- humor;
- papéis secundários;
- títulos finais.

Não alteram a solução do caso.

### 9.6 Restrições de papel

O jogador pode bloquear:

- pessoa desaparecida;
- vítima de incidente;
- acusado injustamente;
- personagem em perigo;
- personagem assustado;
- personagem retratado em evidências;
- personagem central.

Opção:

> Participar apenas como investigador.

### 9.7 Revisão do papel

Cada jogador vê seu papel antes da partida.

- não pode editar;
- pode confirmar;
- pode informar desconforto;
- em caso de desconforto, pode ser removido da personalização e mantido como investigador.

---

## 10. Fotos e imagens geradas

### 10.1 Uso permitido

A foto pode ser usada em:

- perfil;
- ficha;
- evidências personalizadas;
- imagens transformadas por IA;
- card compartilhável.

### 10.2 Alternativas sem foto

- iniciais;
- avatar;
- personagem fictício.

### 10.3 Consentimento

O consentimento deve ser granular:

- mostrar no perfil;
- usar em ficha;
- usar em evidências;
- transformar com IA;
- usar em card compartilhável;
- salvar para partidas futuras.

### 10.4 Imagens sensíveis

Imagens que retratem o jogador como desaparecido, acusado ou em perigo:

- só podem ser geradas se o papel estiver permitido;
- exigem aprovação antes de entrar na partida.

### 10.5 Regeneração

- até três tentativas de gerar nova imagem;
- após isso, usar avatar, template sem rosto ou imagem aprovada.

### 10.6 Rejeição

Imagem rejeitada:

- deve ser removida da partida;
- não pode continuar visível;
- não pode ser compartilhada.

### 10.7 Aviso de ficção

Mostrar durante:

- personalização;
- evidências;
- imagens geradas;
- compartilhamento.

Texto-base:

> Esta história, suas acusações, acontecimentos e imagens são inteiramente fictícios e foram criados apenas para entretenimento. Eles não representam fatos reais sobre os participantes.

---

## 11. Preparação da partida

Objetivo: 2 a 3 minutos.

### Obrigatório

- nome;
- relação;
- características;
- restrições.

### Opcional

- foto;
- perguntas divertidas.

### Fluxo

1. anfitrião escolhe caso;
2. define original ou personalizado;
3. cria sala;
4. jogadores entram;
5. cada jogador preenche perfil;
6. sistema valida restrições;
7. caso é adaptado;
8. papéis são distribuídos;
9. jogadores confirmam;
10. partida começa.

---

## 12. Biblioteca e Home

### 12.1 Home

A Home deve conter:

- criar partida;
- continuar partida;
- jogar com grupo salvo;
- caso recomendado;
- escolha rápida;
- casos para o grupo;
- jogados recentemente;
- explorar biblioteca.

Ação principal:

> Criar partida.

### 12.2 Formas de escolher um caso

- biblioteca completa;
- recomendação guiada;
- caso aleatório;
- caso recente;
- caso salvo.

### 12.3 Card do caso

Exibir:

- título;
- sinopse;
- imagem;
- dificuldade;
- duração;
- quantidade ideal de jogadores;
- categorias;
- tom;
- rápido ou médio;
- personalizável;
- nível de tensão;
- porcentagem de conclusão.

No mobile, priorizar:

- imagem;
- título;
- sinopse curta;
- duração;
- dificuldade.

### 12.4 Detalhes

Exibir:

- introdução completa;
- duração;
- dificuldade;
- jogadores;
- tipo;
- tensão;
- categorias;
- recursos presentes;
- personalizável ou original;
- histórico;
- botão criar partida.

### 12.5 Imagens

- imagem fixa na biblioteca;
- imagens personalizadas após iniciar a partida.

### 12.6 Casos jogados

- selo Resolvido;
- seção Arquivo de casos;
- podem ser repetidos com novos personagens;
- repetição não conta para pontuação oficial;
- solução permanece igual.

### 12.7 Tutorial

- caso introdutório de 3 a 5 minutos;
- pode ser pulado;
- ensina durante a investigação;
- sem tutorial longo separado.

---

## 13. Tela da partida

### 13.1 Estrutura

Abas principais:

- Caso;
- Investigar;
- Evidências;
- Teoria.

### 13.2 Cabeçalho

- título;
- estado da investigação;
- rodada;
- jogador da vez;
- conexão;
- configurações.

### 13.3 Visão geral

- resumo do caso;
- descoberta recente;
- evidências importantes;
- última pergunta;
- ação do turno.

### 13.4 Navegação contextual

Durante a partida, a navegação geral do app desaparece.

---

## 14. Notas compartilhadas

Formato:

- cartões curtos;
- colaborativos;
- editáveis;
- podem ser vinculados a evidências;
- podem ser transformados em pergunta;
- podem alimentar a teoria.

Tipos:

- hipótese;
- contradição;
- pergunta pendente;
- observação;
- linha do tempo.

---

## 15. Evidências

### 15.1 Formatos

- texto;
- documentos;
- fotografias;
- imagens;
- áudios;
- mensagens;
- e-mails;
- mapas;
- plantas.

Fora do MVP:

- vídeo;
- objetos 3D;
- perícia sonora avançada;
- edição avançada de imagem.

### 15.2 Áudio

- reprodução;
- transcrição;
- acessibilidade;
- áudio original excluído após transcrição, conforme política.

### 15.3 Imagens

- zoom;
- detalhes ocultos;
- sinalização de que existe algo observável;
- descoberta por toque em área relevante;
- alternativa textual para acessibilidade.

### 15.4 Desbloqueio

Evidências podem ser liberadas por:

- quantidade de perguntas;
- pergunta semântica;
- localização;
- interrogatório;
- conexão entre evidências;
- rodada.

A IA nunca cria uma nova evidência durante a partida.

---

## 16. Conexões entre evidências

Fluxo:

1. selecionar uma evidência;
2. tocar em Conectar;
3. selecionar outra;
4. escolher relação;
5. adicionar justificativa.

Tipos:

- confirma;
- contradiz;
- antes;
- depois;
- mesma pessoa;
- mesmo local;
- causa;
- consequência;
- relação incerta.

As conexões podem:

- desbloquear contradições;
- alimentar teoria;
- influenciar pontuação;
- atualizar progresso.

---

## 17. Locais

Apenas em casos médios.

Quantidade:

- 3 a 5 locais.

Ações:

- investigar;
- descobrir elementos;
- encontrar evidências;
- desbloquear personagens;
- relacionar objetos e acontecimentos.

Um local pode conter:

- descrição inicial;
- elementos visíveis;
- descobertas condicionais;
- ações possíveis.

---

## 18. Personagens e interrogatórios

### 18.1 Quantidade

- 3 a 5 personagens por caso médio.

### 18.2 Disponibilidade

- alguns disponíveis desde o início;
- outros desbloqueados progressivamente.

### 18.3 Ficha

Inicialmente:

- nome;
- imagem;
- relação com o caso.

Depois:

- depoimentos;
- álibi;
- contradições;
- evidências relacionadas;
- fatos confirmados;
- pontos não verificados.

### 18.4 Interrogatório

- sessão consome um turno;
- até três perguntas;
- histórico persistente;
- personagem lembra o que já foi dito;
- jogador pode apresentar evidência.

### 18.5 Mentiras

Mentiras são roteirizadas.

Cada mentira define:

- afirmação falsa;
- fato verdadeiro;
- motivo;
- evidência que quebra a mentira;
- resposta com evidência parcial;
- resposta com evidência decisiva;
- informação liberada após confronto.

O personagem não pode improvisar novas mentiras.

---

## 19. Informações privadas

Alguns jogadores recebem pistas privadas.

Tipos:

- observação;
- memória;
- objeto;
- depoimento;
- interpretação.

Estados:

- privada;
- selecionada para revelar;
- revelada;
- relacionada a evidência;
- usada na teoria.

O jogador escolhe quando revelar.

Se o jogador sair:

- sistema mantém a pista;
- pode redistribuir;
- pode transformar em evidência futura.

---

## 20. Mestre IA

### 20.1 Papel

O Mestre:

- conhece a verdade;
- responde perguntas;
- preserva o mistério;
- controla desbloqueios;
- orienta sem entregar;
- avalia teorias;
- mantém coerência.

### 20.2 Respostas possíveis

Internamente:

- YES;
- NO;
- PARTIAL;
- IRRELEVANT;
- UNKNOWN;
- BLOCKED;
- AMBIGUOUS;
- MULTI_PREMISE.

Visualmente:

- Sim;
- Não;
- Parcialmente;
- Irrelevante;
- Não é possível determinar;
- Informação ainda bloqueada.

### 20.3 Tamanho

- até duas frases;
- preferir uma;
- respostas maiores apenas para reformulação, correção ou revelação.

### 20.4 Personalidade

Personalidade varia por caso:

- suspense: contido;
- psicológico: reflexivo;
- absurdo: irônico;
- fantasia: enigmático;
- ficção científica: analítico;
- familiar: acolhedor.

Estilo nunca pode alterar a verdade.

### 20.5 Humor

- apenas em casos engraçados ou absurdos;
- não pode ridicularizar jogadores;
- não pode comprometer clareza.

### 20.6 Perguntas mal formuladas

O Mestre:

- identifica ambiguidades;
- explica o problema;
- sugere reformulação;
- não altera a pergunta sem confirmação.

### 20.7 Múltiplas premissas

Exemplo:

> A porta estava aberta porque foi arrombada?

Resposta:

- porta aberta: sim;
- foi arrombada: não.

### 20.8 Orientação espontânea

Pode ocorrer quando o grupo está travado.

Orientação:

- não revela fatos novos;
- não reduz pontuação.

Pista:

- revela ou direciona;
- reduz pontuação;
- exige solicitação ou votação.

### 20.9 Estagnação

Sinais:

- perguntas irrelevantes;
- perguntas repetidas;
- muito tempo sem descoberta;
- várias rodadas sem evidência;
- pedido explícito;
- teoria distante da solução.

Níveis:

- sem intervenção;
- feedback leve;
- orientação contextual;
- oferta de ajuda.

### 20.10 Correções

Se uma resposta estiver errada:

- corrigir publicamente;
- indicar pergunta;
- mostrar resposta anterior;
- mostrar resposta correta;
- atualizar histórico;
- remover penalidade;
- registrar incidente.

Nunca corrigir silenciosamente.

### 20.11 Conteúdo bloqueado

Cada fato define política pré-desbloqueio:

- bloquear;
- responder parcialmente;
- responder normalmente;
- redirecionar para ação.

---

## 21. Arquitetura do Mestre

Pipeline:

1. normalizar pergunta;
2. interpretar intenção;
3. identificar entidades;
4. detectar premissas;
5. detectar repetição;
6. consultar fatos;
7. validar visibilidade;
8. detectar gatilhos;
9. produzir decisão factual;
10. redigir resposta;
11. validar conteúdo;
12. sincronizar.

### Camada determinística

Controla:

- fatos;
- resposta esperada;
- bloqueios;
- gatilhos;
- evidências;
- solução;
- mentiras;
- pontuação.

### Camada de IA

Controla:

- interpretação semântica;
- correspondência com fatos;
- reformulação;
- linguagem;
- personalidade;
- avaliação semântica de teorias.

### Fallback

Se a resposta redigida falhar na validação:

- usar resposta determinística simples;
- nunca usar texto inconsistente.

---

## 22. Perguntas repetidas

O sistema:

- detecta similaridade semântica;
- avisa antes do envio;
- mostra pergunta anterior;
- permite reformular;
- permite enviar mesmo assim;
- agrupa perguntas semelhantes.

Só penalizar quando:

- o sistema avisou;
- a pergunta era realmente equivalente;
- o jogador enviou mesmo assim.

---

## 23. Esclarecimento e contestação

### Esclarecimento

- um por pergunta;
- até duas frases;
- não revela fatos bloqueados.

### Contestação

- opção Reportar possível contradição;
- sistema compara com fatos;
- pode corrigir;
- registra incidente;
- não penaliza o grupo.

---

## 24. Progresso

Não mostrar porcentagem durante a partida.

Usar estados abstratos:

- Primeiros indícios;
- Algumas pistas conectadas;
- Investigação avançando;
- Uma hipótese está se formando;
- Perto da solução.

Cálculo considera:

- fatos descobertos;
- evidências;
- contradições;
- conexões;
- teoria;
- pistas.

---

## 25. Pistas

Sistema:

- pista 1 disponível;
- pista 2 após quantidade definida;
- pista 3 após nova progressão;
- grupo pode solicitar antes com penalidade;
- pistas progressivas;
- pistas nunca alteram a solução.

Liberação:

- por pedido;
- por quantidade de perguntas;
- após votação.

---

## 26. Teorias

### 26.1 Teorias individuais

Cada jogador cria uma teoria.

Fluxo:

1. iniciar solução;
2. cada jogador escreve;
3. teorias ficam ocultas;
4. teorias são reveladas;
5. grupo discute;
6. pode combinar teorias;
7. grupo vota;
8. teoria mais votada é enviada.

### 26.2 Empate

- discussão curta;
- ajuste;
- nova votação;
- se persistir, anfitrião desempata.

### 26.3 Campos

Caso rápido:

- o que aconteceu;
- responsável;
- como;
- onde;
- quando;
- por quê.

Cada caso define quais são obrigatórios.

Caso médio:

- o que aconteceu;
- responsável;
- como;
- onde;
- quando, se relevante;
- por quê;
- evidências;
- depoimentos falsos;
- sequência dos acontecimentos.

### 26.4 Evidências obrigatórias

Quantidade definida por caso.

Sugestão:

- rápido fácil: 1;
- rápido médio/difícil: 1 a 2;
- médio fácil: 2;
- médio padrão: 2 a 3;
- médio difícil: 3 a 4.

### 26.5 Avaliação

Dimensões:

- correto;
- incompleto;
- incorreto;
- não sustentado;
- irrelevante.

A IA informa quais dimensões estão corretas ou incompletas, sem revelar a solução.

### 26.6 Tentativas

- duas tentativas formais;
- após isso, grupo vota:
  - continuar;
  - usar pista;
  - tentativa extra com penalidade;
  - revelar solução.

---

## 27. Votação

Usos:

- teoria;
- pista antecipada;
- revelar solução;
- encerrar;
- continuar sem jogador;
- trocar anfitrião.

Padrão:

- maioria simples.

Empate:

- continuar investigando como padrão;
- anfitrião desempata apenas em situações operacionais.

---

## 28. Pontuação

Pontuação máxima sugerida: 10.000.

Considerar:

- dificuldade;
- perguntas;
- repetidas;
- pistas;
- tentativas;
- evidências;
- conexões;
- contradições;
- tempo.

Modelo:

- base: 5.000;
- dificuldade: até 1.500;
- evidências: até 1.000;
- conexões: até 800;
- contradições: até 700;
- precisão da teoria: até 1.000;
- perguntas excedentes: até -500;
- repetidas: até -300;
- pistas: até -900;
- tentativas extras: até -700;
- tempo excedente: até -300.

Não penalizar perguntas dentro da faixa esperada.

Tempo deve ter peso baixo.

---

## 29. Títulos

Coletivos ou individuais:

- Investigador brilhante;
- Detetive persistente;
- Mestre das contradições;
- Olhar atento;
- Teórico improvável;
- Conector de pistas;
- Sobreviveu graças às pistas;
- Equipe sincronizada.

Evitar títulos constrangedores.

Nem todos precisam receber um título exclusivo.

---

## 30. Revelação

Apresentação combinada:

- texto;
- linha do tempo;
- evidências;
- conexões;
- depoimentos;
- reconstrução visual.

Estrutura:

1. frase de revelação;
2. responsável;
3. motivação;
4. método;
5. linha do tempo;
6. evidências;
7. mentiras;
8. o que cada jogador sabia;
9. imagem final;
10. relatório completo opcional.

---

## 31. Relatório completo

Opcional.

Mostrar:

- todas as evidências;
- evidências não descobertas;
- pistas não usadas;
- personagens não interrogados;
- detalhes ocultos;
- conexões esperadas;
- mentiras;
- caminhos alternativos;
- raciocínio completo.

Abrir relatório marca o caso como conhecido.

---

## 32. Compartilhamento

### Card básico

- nome do caso;
- pontuação;
- classificação;
- tempo;
- título;
- jogadores;
- pistas;
- perguntas.

### Card personalizado

- imagem do grupo;
- nomes;
- títulos;
- identidade do caso;
- aviso de imagem fictícia.

### Privacidade

Cada pessoa autoriza:

- nome;
- foto;
- imagem transformada.

Quem não aprovar:

- é removido;
- é anonimizado;
- vira avatar.

---

## 33. Casos

### 33.1 Estrutura obrigatória

```yaml
case:
  id:
  title:
  synopsis:
  type: quick | medium
  duration:
  difficulty:
  categories:
  setting:
  tone:
  tension_level:
  content_rating:
  customizable:

opening:
  public_scenario:
  initial_question:
  initial_visual:
  known_facts:

solution:
  complete_truth:
  chronology:
  responsible_character:
  motive:
  method:
  required_solution_elements:
  contradictory_elements:

master:
  answerable_facts:
  irrelevant_topics:
  response_style:
  prohibited_revelations:

evidence:
  - id:
    title:
    type:
    content:
    visibility:
    unlock_type:
    unlock_condition:
    semantic_triggers:
    essential:

locations:
  - id:
    name:
    description:
    discoveries:
    actions:

characters:
  - id:
    name:
    public_profile:
    knowledge:
    unknown_facts:
    secrets:
    omissions:
    lies:
    personality:
    evidence_reactions:

private_information:
  - id:
    content:
    assigned_to:
    revealable:
    essential:
    fallback_rule:

hints:
  - level:
    content:
    penalty:

solution_fields:
  what_happened:
  responsible:
  method:
  location:
  time:
  motive:

scoring:
  base_score:
  difficulty_bonus:
  expected_question_range:
  hint_penalties:
  attempt_penalties:

adaptation:
  replaceable_characters:
  allowed_player_roles:
  allowed_traits:
  restricted_topics:
```

---

## 34. Criação e gestão de casos

### 34.1 Processo

- IA gera primeira versão;
- usa template estruturado;
- validação automática;
- simulação;
- teste humano;
- aprovação;
- publicação manual.

### 34.2 Painel administrativo

Funções:

- solicitar caso;
- acompanhar status;
- revisar metadados;
- validar;
- testar;
- publicar;
- suspender;
- analisar métricas;
- criar versão.

### 34.3 Revisão cega

A administradora quer jogar sem conhecer a solução.

Perfil padrão:

> Administrador sem spoilers.

Pode ver:

- título;
- sinopse;
- tom;
- duração;
- dificuldade;
- personagens;
- quantidade de evidências;
- relatórios de qualidade;
- métricas;
- alertas.

Não pode ver:

- responsável;
- método;
- motivação;
- cronologia;
- evidências essenciais;
- respostas;
- pistas;
- critérios exatos.

### 34.4 Cofre da solução

A solução fica em camada protegida.

Acesso apenas por:

- motor do jogo;
- validação;
- revisor editorial;
- acesso emergencial explícito.

Ao abrir o cofre:

- caso é marcado como conhecido para o perfil.

### 34.5 Perfis administrativos

- administrador sem spoilers;
- revisor editorial;
- analista;
- suporte;
- administrador técnico.

### 34.6 Etapas do editor

1. conceito;
2. verdade;
3. cronologia;
4. personagens;
5. locais;
6. evidências;
7. perguntas e gatilhos;
8. pistas;
9. critérios de solução;
10. pontuação;
11. personalização;
12. testes;
13. publicação.

### 34.7 Testes

Um caso só pode ser publicado após:

- validação automática;
- teste humano;
- pelo menos dois grupos;
- ausência de falha crítica;
- aprovação editorial.

### 34.8 Simulação automática

Gerar perguntas:

- relevantes;
- irrelevantes;
- ambíguas;
- repetidas;
- inesperadas;
- próximas da solução;
- com múltiplas premissas.

Validar:

- coerência;
- estabilidade;
- bloqueios;
- desbloqueios;
- ausência de invenção;
- proteção da solução.

### 34.9 Versionamento

- nunca substituir silenciosamente;
- criar nova versão;
- partidas em andamento permanecem na versão antiga;
- métricas por versão;
- versão problemática pode ser suspensa.

---

## 35. Métricas dos casos

- taxa de conclusão;
- tempo médio;
- perguntas;
- pistas;
- contestações;
- nota;
- vontade de jogar outro.

Separar:

- resolvido;
- revelado;
- abandonado;
- falha técnica.

Indicador principal:

> comportamento real de iniciar outro caso.

---

## 36. Privacidade

### 36.1 Dados sensíveis

Não usar para treinamento:

- fotos;
- imagens transformadas;
- voz;
- nomes;
- identificadores;
- dados de menores.

### 36.2 Dados anonimizados possíveis

- perguntas;
- respostas;
- contestações;
- eventos;
- métricas;
- padrões de uso.

### 36.3 Logs

Armazenar desidentificado:

- perguntas;
- respostas;
- latência;
- falhas;
- repetição;
- pistas;
- teorias;
- contestações.

### 36.4 Exclusão

Usuário pode:

- excluir foto;
- apagar dados da sessão;
- revogar compartilhamento;
- remover grupo;
- solicitar exclusão no servidor.

### 36.5 Retenção

- sala: 30 dias após última atividade;
- foto original: conforme escolha, padrão 24 horas após encerramento;
- imagem transformada: padrão 24 horas;
- áudio: excluir após transcrição;
- card: até 30 dias ou exclusão;
- logs anonimizados: até 12 meses;
- métricas agregadas: sem vínculo individual.

### 36.6 Faixa etária

Coletar faixa:

- menor de 13;
- 13 a 17;
- 18 ou mais.

Decisão atual:

- menores podem participar com autorização do anfitrião;
- o mesmo conteúdo não é adaptado por idade.

Recomendação de segurança para implementação:

- bloquear fotos de menores;
- restringir papéis sensíveis;
- bloquear casos incompatíveis;
- considerar excluir menores de 13 no MVP.

---

## 37. Arquitetura técnica

### 37.1 PWA

- responsiva;
- instalável;
- offline parcial;
- biblioteca e grupos salvos acessíveis offline.

### 37.2 Tempo real

Eventos:

- player_joined;
- player_disconnected;
- turn_started;
- turn_passed;
- question_submitted;
- master_answered;
- evidence_unlocked;
- private_clue_revealed;
- note_created;
- connection_created;
- theory_submitted;
- vote_started;
- vote_cast;
- case_completed.

O servidor é a fonte oficial do estado.

### 37.3 Expiração

Sala expira 30 dias após última atividade.

### 37.4 IA indisponível

Fluxo:

1. modelo principal;
2. retry;
3. modelo alternativo;
4. se falhar, pausar;
5. preservar estado;
6. não penalizar grupo.

### 37.5 Voz

- transcrição no dispositivo;
- fallback no servidor;
- usuário revisa;
- áudio nunca vai direto ao Mestre;
- excluir após transcrição.

### 37.6 Banco

Banco relacional.

Entidades principais:

- anonymous_users;
- saved_groups;
- group_members;
- rooms;
- room_players;
- room_events;
- turns;
- cases;
- case_versions;
- case_characters;
- case_locations;
- case_evidence;
- case_hints;
- case_facts;
- case_solution_rules;
- questions;
- master_answers;
- interrogation_sessions;
- private_information;
- shared_notes;
- evidence_connections;
- theories;
- theory_votes;
- theory_evaluations;
- media_assets;
- consents;
- privacy_requests;
- case_metrics;
- case_contestations.

### 37.7 Armazenamento

- arquivos privados;
- links temporários;
- expiração;
- verificação de permissão;
- escopo por sala e jogador.

### 37.8 Grupos sem conta

Salvar:

- no navegador;
- no servidor;
- vinculados à identidade anônima.

### 37.9 Painel administrativo

Mesma aplicação.

Rotas separadas:

- `/app`
- `/room/:id`
- `/case/:id`
- `/admin`
- `/admin/cases`
- `/admin/metrics`
- `/admin/privacy`

Permissões validadas no backend.

---

## 38. Funcionamento offline

Disponível offline:

- biblioteca carregada;
- casos públicos;
- grupos;
- preferências;
- histórico.

Indisponível offline:

- salas;
- Mestre;
- interrogatórios;
- imagem;
- votação;
- teorias multiplayer.

Mensagem:

> Conexão perdida. Sua investigação foi preservada e será sincronizada quando a conexão retornar.

---

## 39. Direção visual

Combinação:

- jogo de tabuleiro contemporâneo;
- arquivo de investigação;
- minimalismo misterioso.

Princípios:

- social;
- moderno;
- cartões;
- documentos;
- fichas;
- hierarquia clara;
- atmosfera sem terror;
- sem aparência de chatbot.

Evitar:

- sangue;
- excesso de preto e vermelho;
- fios vermelhos em excesso;
- papel envelhecido em todas as telas;
- estética policial literal;
- interface infantil;
- mural infinito no mobile.

---

## 40. Primeira versão testável

### Conteúdo

- tutorial;
- quatro casos rápidos;
- total: cinco casos.

Sugestão:

1. tutorial;
2. fácil;
3. médio;
4. difícil;
5. absurdo ou sobrenatural aparente.

### Grupos de teste

Cinco grupos:

- um teste técnico;
- dois grupos próximos;
- dois grupos convidados.

### Participantes

- família;
- amigos;
- convidados externos.

---

## 41. Feedback

Perguntas obrigatórias:

- Quanto você gostou?
- A solução pareceu justa?
- Alguma resposta pareceu errada?
- Houve momento confuso?
- Jogaria outro agora?
- Recomendaria?
- Melhor momento?
- Pior momento?
- Parte mais difícil de entender?

Coleta:

- perguntas rápidas no app;
- eventos técnicos;
- interações anonimizadas.

---

## 42. Critérios de validação

### Estabilidade

- nenhuma perda de estado;
- nenhuma exposição privada;
- ações sincronizadas;
- reconexão funcional;
- IA recuperável.

### Compreensão

- 80% entendem sem explicação;
- quatro de cinco grupos concluem;
- menos de 20% relatam confusão.

### Mestre

- menos de 5% de contestações;
- nenhuma contradição que altere solução;
- perguntas ambíguas bem tratadas;
- desbloqueios corretos.

### Valor

- 60% querem jogar outro;
- três de cinco iniciam ou escolhem outro;
- nota média mínima 4/5;
- 80% consideram solução justa ou parcialmente justa.

---

## 43. Severidade de falhas

### Críticas

- perda de estado;
- vazamento de pista;
- solução impossível;
- Mestre revela solução;
- contradições graves;
- teoria correta avaliada como errada;
- falha de reconexão destrutiva.

### Altas

- turnos incompreensíveis;
- latência excessiva;
- evidência não desbloqueia;
- voto não sincroniza;
- tutorial falha;
- abandono na preparação.

### Médias

- texto confuso;
- passos excessivos;
- dificuldade mal calibrada;
- pontuação injusta;
- card pouco atraente.

### Risco de produto

- grupo não quer jogar novamente;
- prefere mestre humano;
- turnos reduzem espontaneidade;
- revelação parece arbitrária;
- experiência parece chatbot.

---

## 44. Fases de entrega

### Fase 1 — Núcleo multiplayer

- PWA;
- identidade anônima;
- sala;
- link, QR e código;
- turnos;
- reconexão;
- anfitrião;
- um caso fixo;
- perguntas por texto.

### Fase 2 — Mestre confiável

- interpretação;
- motor determinístico;
- redação;
- validação;
- histórico;
- contestação;
- fallback.

### Fase 3 — Caso rápido completo

- pistas;
- informações privadas;
- teorias;
- votação;
- pontuação;
- resultado;
- compartilhamento.

### Fase 4 — Casos médios

- evidências;
- locais;
- personagens;
- interrogatórios;
- notas;
- conexões.

### Fase 5 — Personalização

- grupos;
- fotos;
- consentimento;
- imagens;
- voz;
- cards personalizados.

---

## 45. Fora do MVP

- áudio e vídeo internos;
- salas públicas;
- matchmaking;
- ranking global;
- campanhas longas;
- realidade aumentada;
- vídeo como evidência;
- objetos 3D;
- perícia avançada;
- culpado humano;
- sabotagem;
- chat privado;
- publicação comunitária;
- assinatura;
- pagamentos;
- loja de pacotes;
- geração completamente livre de casos sem revisão.

---

## 46. Princípios de implementação

1. A IA nunca é a única fonte de verdade.
2. Todo caso tem uma única solução objetiva.
3. A solução deve ser dedutível.
4. A IA não inventa fatos.
5. Evidências são predefinidas.
6. Mentiras são estruturadas.
7. Correções são transparentes.
8. O multiplayer não pode prejudicar a conversa.
9. O app não deve parecer um chatbot.
10. Privacidade deve ser granular.
11. Foto nunca é obrigatória.
12. A administradora pode operar sem spoilers.
13. O sistema deve preservar estado em falhas.
14. O núcleo deve ser validado antes dos casos médios.
15. Vontade de jogar outro caso é a métrica principal.

---

## 47. Prompt-base do Mestre

```text
Você atua como Mestre de um jogo de investigação.

Sua única fonte de verdade são os dados estruturados do caso fornecidos pelo sistema.

Objetivos:
- responder perguntas com precisão;
- preservar o mistério;
- ajudar o grupo sem entregar a solução;
- manter consistência;
- desbloquear apenas conteúdos previstos.

Nunca:
- invente personagens, fatos, evidências, relações, motivos ou acontecimentos;
- altere a solução;
- use conhecimento externo;
- revele conteúdo bloqueado;
- contradiga respostas sem correção explícita;
- crie pistas durante a partida.

Respostas normais:
- comece com Sim, Não, Parcialmente, Irrelevante ou Não é possível determinar;
- use até duas frases;
- separe múltiplas premissas;
- sugira reformulação quando houver ambiguidade;
- use a personalidade definida pelo caso;
- nunca permita que o estilo prejudique a clareza.

Progressão:
- consulte gatilhos antes de desbloquear;
- informe evidências desbloqueadas;
- não forneça pista formal sem solicitação ou votação;
- pode oferecer orientação leve quando houver estagnação.
```

---

## 48. Critério de conclusão do MVP

O núcleo pode ser considerado validado quando:

- tecnicamente estável;
- compreendido sem ajuda;
- Mestre confiável;
- casos considerados justos;
- grupos demonstram repetição;
- nenhuma falha crítica aberta;
- pelo menos 60% querem jogar outro;
- pelo menos três de cinco grupos iniciam ou selecionam outro caso.

---

## 49. Próximos artefatos derivados deste planejador

A partir deste arquivo, criar:

1. PRD do MVP técnico 1;
2. backlog por épicos;
3. histórias de usuário;
4. critérios de aceite;
5. arquitetura de informação;
6. fluxos principais;
7. modelo de dados;
8. contratos da IA;
9. especificação de eventos em tempo real;
10. prompt mestre para o Antigravity.
