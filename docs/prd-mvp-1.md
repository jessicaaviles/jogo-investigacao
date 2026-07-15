# PRD — MVP Técnico 1
## Jogo de Investigação Multiplayer com IA

---

## 1. Identificação

**Documento:** Product Requirements Document  
**Versão:** 1.0  
**Produto:** Jogo de investigação multiplayer com IA  
**Entrega:** MVP Técnico 1  
**Plataforma:** PWA mobile-first  
**Status:** Planejamento  
**Documento-base:** `planejador.md`

---

## 2. Resumo executivo

O MVP Técnico 1 será a primeira versão funcional e testável de um jogo multiplayer de investigação para 2 a 6 pessoas.

Cada participante acessará a mesma sala pelo próprio dispositivo, participará de uma ordem de turnos, fará perguntas sobre um mistério e colaborará para construir uma teoria final.

Uma IA atuará como Mestre do Caso, respondendo perguntas exclusivamente com base em uma estrutura fixa de fatos, sem inventar informações ou alterar a solução.

A primeira entrega deve validar o núcleo da experiência:

> Criar uma sala, reunir jogadores, investigar um caso por turnos, receber respostas coerentes, usar pistas, votar em uma teoria e chegar à revelação final.

---

## 3. Problema

Jogos de dedução e investigação normalmente exigem que uma pessoa conheça previamente a solução e atue como mestre, deixando de participar da investigação.

Além disso, soluções digitais existentes frequentemente apresentam um destes problemas:

- funcionam como um chatbot sem estrutura de jogo;
- permitem que a IA invente ou contradiga fatos;
- não oferecem experiência multiplayer coordenada;
- exigem cadastro antes de jogar;
- possuem regras complexas antes do início;
- não preservam a conversa social entre os participantes.

---

## 4. Oportunidade

Criar uma experiência em que:

- todos possam investigar;
- ninguém precise conhecer a solução;
- o Mestre IA mantenha consistência;
- cada jogador participe pelo próprio celular;
- a dinâmica permaneça social;
- a partida possa começar rapidamente;
- a solução seja objetiva e dedutível.

---

## 5. Proposta de valor

> Todos investigam. A IA conhece a verdade.

---

## 6. Objetivo do MVP Técnico 1

Construir e validar o núcleo jogável do produto antes de adicionar casos médios, personagens, fotos e personalização avançada.

### Objetivos principais

1. Permitir a criação de uma sala multiplayer.
2. Permitir a entrada de 2 a 6 jogadores.
3. Sincronizar jogadores, turnos, perguntas, respostas, pistas e votos.
4. Executar um caso rápido completo.
5. Fazer o Mestre IA responder com consistência.
6. Permitir teorias individuais e votação coletiva.
7. Apresentar revelação e resultado.
8. Coletar feedback e eventos essenciais.

---

## 7. Hipóteses

### Hipótese de valor

Grupos que gostam de mistério considerarão divertido investigar um caso em conjunto com uma IA atuando como mestre.

### Hipótese de usabilidade

Jogadores conseguirão entrar, compreender os turnos e concluir a partida sem explicação externa.

### Hipótese técnica

A combinação entre interpretação por IA e regras determinísticas será suficiente para manter respostas coerentes.

### Hipótese social

O sistema de turnos organizará a investigação sem reduzir excessivamente a conversa espontânea.

---

## 8. Critérios de sucesso

O MVP será considerado validado quando:

- pelo menos 4 de 5 grupos concluírem uma partida;
- pelo menos 80% dos jogadores entenderem a mecânica sem ajuda;
- menos de 20% relatarem confusão com turnos ou votação;
- menos de 5% das respostas forem contestadas;
- nenhuma contradição alterar a solução;
- nenhuma sala perder o estado;
- nenhuma informação privada for exposta incorretamente;
- pelo menos 60% dos grupos quiserem jogar outro caso;
- pelo menos 3 de 5 grupos iniciarem ou selecionarem uma segunda partida;
- nota média mínima de 4/5;
- pelo menos 80% considerarem a solução justa ou parcialmente justa.

---

## 9. Público do MVP

### Público primário

- famílias;
- grupos de amigos;
- pessoas que gostam de jogos de mistério;
- jogadores de Black Stories, Detetive e jogos de dedução;
- jogadores casuais.

### Contextos de uso

- encontros presenciais;
- reuniões de família;
- noites de jogos;
- chamadas remotas com ferramenta externa;
- partidas curtas em grupo.

---

## 10. Escopo incluído

### Plataforma

- PWA instalável;
- web responsiva;
- mobile-first;
- acesso sem instalação;
- suporte básico a desktop.

### Multiplayer

- salas de 2 a 6 jogadores;
- anfitrião;
- entrada por link;
- entrada por QR Code;
- entrada por código;
- identidade anônima por dispositivo;
- sincronização em tempo real;
- reconexão;
- troca de anfitrião;
- estado persistido.

### Partida

- um caso rápido estruturado;
- situação inicial;
- ordem de turnos;
- passar a vez;
- pergunta por texto;
- resposta do Mestre;
- histórico compartilhado;
- pistas;
- duas tentativas formais;
- teorias individuais;
- votação;
- revelação;
- pontuação simples;
- tela de resultado;
- feedback pós-jogo.

### Mestre IA

- interpretação semântica;
- consulta a fatos estruturados;
- respostas curtas;
- múltiplas premissas;
- perguntas ambíguas;
- fatos bloqueados;
- detecção de repetição;
- correção transparente;
- avaliação da teoria;
- fallback seguro.

---

## 11. Fora do escopo

Não implementar nesta entrega:

- casos médios;
- personagens interrogáveis;
- locais investigáveis;
- documentos complexos;
- áudios;
- voz;
- mapas;
- conexões entre evidências;
- notas compartilhadas;
- fotos;
- transformação de imagem;
- personalização profunda;
- grupos salvos completos;
- painel administrativo completo;
- criação automática de casos;
- monetização;
- contas obrigatórias;
- ranking;
- salas públicas;
- matchmaking;
- chat privado;
- chamada de áudio ou vídeo;
- modo competitivo;
- culpado humano;
- campanhas;
- loja de casos.

---

## 12. Conteúdo inicial

O desenvolvimento poderá começar com um único caso técnico.

Antes do teste com usuários, incluir:

1. caso tutorial;
2. caso fácil;
3. caso médio;
4. caso difícil;
5. caso absurdo ou sobrenatural aparente.

Neste PRD, a implementação funcional pode ser validada inicialmente com um caso fixo.

---

## 13. Jornada principal

```text
Acessar PWA
↓
Criar ou entrar em uma sala
↓
Informar nome
↓
Aguardar jogadores
↓
Anfitrião inicia partida
↓
Caso é apresentado
↓
Ordem de turnos é definida
↓
Jogador faz pergunta ou passa
↓
Mestre responde
↓
Grupo investiga
↓
Pistas são usadas quando necessário
↓
Grupo inicia tentativa de solução
↓
Cada jogador cria uma teoria
↓
Teorias são reveladas
↓
Grupo vota
↓
Mestre avalia
↓
Caso resolvido ou nova tentativa
↓
Revelação final
↓
Pontuação e feedback
```

---

## 14. Arquitetura de informação do MVP

### Home

- Criar partida
- Entrar em uma sala
- Tutorial
- Partidas recentes, se existirem localmente

### Criar sala

- Escolher caso
- Definir ordem de turnos
- Definir limite de tempo
- Criar sala
- Compartilhar convite

### Entrar em sala

- Código
- Link
- QR Code
- Nome do jogador

### Lobby

- Nome do caso
- Lista de jogadores
- Estado de conexão
- Estado de pronto
- Código e link
- Iniciar partida

### Partida

- Caso
- Investigar
- Teoria

### Resultado

- Solução
- Pontuação
- Estatísticas
- Feedback
- Jogar outro

---

## 15. Requisitos funcionais

## RF-01 — Criar sala

O usuário deve conseguir criar uma sala sem cadastro.

### Critérios de aceite

- gera identificador único;
- gera código público;
- gera link;
- gera QR Code;
- define criador como anfitrião;
- salva identidade anônima no dispositivo;
- exibe código de recuperação privado;
- sala pode receber até 6 jogadores.

---

## RF-02 — Entrar na sala

O jogador deve conseguir entrar por link, QR Code ou código.

### Critérios de aceite

- solicita nome ou apelido;
- não exige conta;
- impede nomes vazios;
- trata nomes repetidos;
- mostra erro quando sala não existe;
- mostra erro quando sala expirou;
- impede entrada quando atingir 6 jogadores;
- sincroniza entrada em tempo real.

---

## RF-03 — Lobby

O lobby deve mostrar todos os participantes.

### Critérios de aceite

- lista atualizada em tempo real;
- identifica anfitrião;
- mostra conexão;
- mostra estado pronto;
- anfitrião pode iniciar;
- partida só começa com mínimo de 2 jogadores;
- convidados podem copiar link;
- QR Code permanece acessível.

---

## RF-04 — Ordem de turnos

A partida deve ter uma ordem controlada.

### Configurações

- aleatória;
- ordem de entrada;
- manual;
- nova ordem por rodada.

### Padrão

- aleatória fixa.

### Critérios de aceite

- todos veem a ordem;
- jogador atual recebe destaque;
- somente jogador da vez envia pergunta;
- jogador pode passar;
- turno avança após resposta;
- turno não avança se houver falha técnica;
- anfitrião pode avançar manualmente em erro.

---

## RF-05 — Pergunta por texto

O jogador da vez deve conseguir enviar uma pergunta.

### Critérios de aceite

- campo aceita texto;
- impede pergunta vazia;
- exibe estado de processamento;
- pergunta fica registrada;
- identifica autor;
- número da pergunta é registrado;
- pergunta é sincronizada;
- turno permanece bloqueado até a resposta.

---

## RF-06 — Resposta do Mestre

O Mestre deve responder com base no caso.

### Respostas possíveis

- Sim;
- Não;
- Parcialmente;
- Irrelevante;
- Não é possível determinar;
- Informação ainda bloqueada;
- Pergunta ambígua;
- Múltiplas premissas.

### Critérios de aceite

- resposta usa até duas frases;
- não inventa fatos;
- não altera solução;
- não usa conhecimento externo;
- personalidade não compromete clareza;
- resposta é validada antes de ser exibida;
- fallback determinístico é usado quando necessário.

---

## RF-07 — Perguntas ambíguas

O Mestre deve identificar falta de clareza.

### Critérios de aceite

- explica o problema;
- sugere reformulação;
- não envia reformulação automaticamente;
- não consome turno até a pergunta válida ser enviada, conforme regra definida;
- não gera penalidade.

---

## RF-08 — Múltiplas premissas

O Mestre deve separar partes da pergunta.

### Exemplo

Pergunta:

> A porta estava aberta porque foi arrombada?

Resposta:

- A porta estava aberta: Sim.
- Foi arrombada: Não.

### Critérios de aceite

- separa até três premissas;
- acima disso, solicita reformulação;
- cada premissa possui classificação própria;
- histórico preserva a pergunta original.

---

## RF-09 — Histórico

Todos devem acessar o histórico completo.

### Critérios de aceite

- mostra pergunta;
- mostra autor;
- mostra resposta;
- mostra rodada;
- mostra número;
- mostra correções;
- mostra evidência desbloqueada, quando aplicável;
- ordenação cronológica;
- sincronização em tempo real.

---

## RF-10 — Perguntas repetidas

O sistema deve detectar similaridade.

### Critérios de aceite

- mostra aviso;
- apresenta pergunta anterior;
- apresenta resposta anterior;
- permite reformular;
- permite enviar mesmo assim;
- penaliza somente quando repetição for confirmada;
- diferenças relevantes não são bloqueadas.

---

## RF-11 — Esclarecimento

Um jogador pode pedir esclarecimento.

### Critérios de aceite

- máximo de um esclarecimento por pergunta;
- resposta de até duas frases;
- não revela conteúdo bloqueado;
- fica vinculado à pergunta;
- sincroniza para todos.

---

## RF-12 — Contestação

O jogador pode reportar possível contradição.

### Critérios de aceite

- registra pergunta e resposta;
- compara com fatos;
- corrige publicamente quando necessário;
- não penaliza o grupo;
- atualiza histórico;
- registra evento analítico.

---

## RF-13 — Pistas

O grupo pode usar pistas progressivas.

### Estrutura inicial

- três pistas por caso;
- pista 1 disponível;
- pista 2 e 3 liberadas por progressão;
- uso antecipado pode exigir votação.

### Critérios de aceite

- mostra quantidade;
- exibe penalidade;
- registra uso;
- sincroniza;
- nunca cria pista nova;
- não altera solução;
- atualiza pontuação.

---

## RF-14 — Iniciar teoria

Qualquer jogador pode propor iniciar a solução.

### Critérios de aceite

- cria votação para iniciar;
- maioria simples;
- se aprovada, pausa turnos;
- cada jogador entra em modo de teoria;
- ninguém vê teoria alheia antes da revelação.

---

## RF-15 — Teorias individuais

Cada jogador pode preencher uma teoria.

### Campos possíveis

- o que aconteceu;
- responsável;
- como;
- onde;
- quando;
- por quê.

O caso define os campos obrigatórios.

### Critérios de aceite

- rascunho privado;
- salvar automaticamente;
- permitir desistir de enviar;
- bloquear envio vazio;
- indicar conclusão dos jogadores;
- preservar conteúdo até revelação simultânea.

---

## RF-16 — Revelar teorias

As teorias devem aparecer simultaneamente.

### Critérios de aceite

- nenhuma aparece antes do encerramento da etapa;
- todos podem ler;
- autor é identificado;
- grupo pode discutir;
- grupo pode selecionar para votação;
- combinação de teorias pode ficar para evolução, se necessário.

---

## RF-17 — Votação da teoria

O grupo deve escolher a teoria oficial.

### Critérios de aceite

- um voto por jogador;
- voto pode ser alterado antes do encerramento;
- resultado sincronizado;
- maioria simples;
- empate inicia nova rodada;
- anfitrião desempata apenas após segundo empate.

---

## RF-18 — Avaliar teoria

A teoria selecionada deve ser avaliada.

### Resultado

- correta;
- parcialmente correta;
- incorreta.

### Critérios de aceite

- avalia por dimensão;
- informa dimensões corretas e incompletas;
- não revela resposta;
- registra tentativa;
- permite segunda tentativa;
- após segunda tentativa, inicia votação sobre continuar ou revelar.

---

## RF-19 — Revelação final

O sistema deve mostrar a solução.

### Critérios de aceite

- apresenta o que aconteceu;
- responsável;
- método;
- local;
- momento, se relevante;
- motivação;
- linha do tempo;
- evidências ou fatos principais;
- deixa claro que o caso foi resolvido ou revelado.

---

## RF-20 — Pontuação

O grupo deve receber pontuação simples.

### Componentes iniciais

- dificuldade;
- perguntas acima da faixa;
- perguntas repetidas;
- pistas;
- tentativas;
- tempo;
- precisão da teoria.

### Critérios de aceite

- cálculo reproduzível;
- pontuação não negativa;
- resultado explicado;
- tempo tem peso baixo;
- perguntas dentro da faixa não penalizam.

---

## RF-21 — Resultado

Exibir:

- nome do caso;
- status;
- pontuação;
- tempo;
- perguntas;
- pistas;
- tentativas;
- título coletivo;
- botão de feedback;
- botão Jogar outro.

---

## RF-22 — Feedback

Coletar:

- nota de 1 a 5;
- solução justa;
- resposta do Mestre pareceu errada;
- houve confusão;
- jogaria outro;
- recomendaria;
- melhor momento;
- pior momento;
- parte mais difícil.

### Critérios de aceite

- feedback aparece apenas no final;
- não bloqueia retorno à Home;
- respostas quantitativas são registradas;
- comentários são opcionais;
- dados são desidentificados.

---

## RF-23 — Reconexão

Jogadores devem retornar após perda de conexão.

### Critérios de aceite

- identidade reconhecida no dispositivo;
- jogador retorna ao mesmo lugar;
- estado é recuperado;
- turno não é perdido automaticamente;
- sala informa desconexão;
- anfitrião pode pausar ou continuar.

---

## RF-24 — Recuperação do anfitrião

### Critérios de aceite

- mesmo dispositivo recupera automaticamente;
- código privado recupera em outro dispositivo;
- código público não concede controle;
- se anfitrião não retornar, grupo vota substituto;
- novo anfitrião não recebe dados privados.

---

## RF-25 — Expiração

### Regra

- sala expira 30 dias após última atividade.

### Critérios de aceite

- atividade renova período;
- sala expirada não aceita entrada;
- histórico local pode indicar expiração;
- arquivos seguem políticas próprias.

---

## 16. Requisitos não funcionais

## RNF-01 — Performance

- ações multiplayer refletidas em até 1 segundo em condições normais;
- resposta do Mestre ideal em até 5 segundos;
- mostrar feedback de carregamento;
- timeout tratado sem perda de estado.

## RNF-02 — Confiabilidade

- servidor é fonte oficial;
- eventos idempotentes;
- ações não podem ser duplicadas;
- estado deve sobreviver à atualização da página;
- falhas da IA não podem avançar o turno.

## RNF-03 — Segurança

- códigos de sala não expõem dados privados;
- código de recuperação é secreto;
- autorização validada no backend;
- conteúdo da solução não é enviado desnecessariamente ao frontend;
- logs não contêm dados sensíveis.

## RNF-04 — Privacidade

- sem conta obrigatória;
- identidade anônima;
- interações desidentificadas para métricas;
- sem fotos nesta entrega;
- exclusão de sala conforme política;
- aviso de versão experimental.

## RNF-05 — Acessibilidade

- contraste adequado;
- foco visível;
- navegação por teclado no desktop;
- labels em campos;
- não depender apenas de cor;
- textos escaláveis;
- respostas compatíveis com leitores de tela.

## RNF-06 — Responsividade

- prioridade para 360 a 430 px de largura;
- funcionamento em tablet;
- layout adaptado para desktop;
- sem necessidade de gesto complexo.

---

## 17. Modelo de estado da sala

```text
CREATED
↓
LOBBY
↓
READY
↓
PLAYING
↓
THEORY_DRAFT
↓
THEORY_VOTING
↓
THEORY_EVALUATION
↓
PLAYING | REVEAL
↓
RESULT
↓
COMPLETED
```

Estados alternativos:

- PAUSED;
- CONNECTION_ISSUE;
- AI_UNAVAILABLE;
- EXPIRED;
- CANCELLED.

---

## 18. Modelo de estado do turno

```text
WAITING
↓
ACTIVE
↓
QUESTION_DRAFT
↓
QUESTION_PROCESSING
↓
ANSWERED
↓
COMPLETED
```

Alternativas:

- PASSED;
- ERROR;
- RETRYING.

---

## 19. Modelo de dados mínimo

### AnonymousUser

- id;
- device_token;
- display_name;
- created_at;
- last_active_at.

### Room

- id;
- public_code;
- recovery_code_hash;
- host_user_id;
- case_version_id;
- status;
- settings;
- created_at;
- last_activity_at;
- expires_at.

### RoomPlayer

- id;
- room_id;
- anonymous_user_id;
- display_name;
- is_host;
- connection_status;
- ready_status;
- turn_order;
- joined_at.

### Case

- id;
- title;
- synopsis;
- difficulty;
- duration;
- type;
- status.

### CaseVersion

- id;
- case_id;
- version;
- opening;
- facts;
- hints;
- solution;
- solution_fields;
- scoring;
- master_style.

### Turn

- id;
- room_id;
- player_id;
- round_number;
- order_index;
- status;
- started_at;
- completed_at.

### Question

- id;
- room_id;
- turn_id;
- player_id;
- text;
- normalized_text;
- status;
- created_at.

### MasterAnswer

- id;
- question_id;
- classification;
- text;
- validation_status;
- corrected_answer_id;
- created_at.

### HintUsage

- id;
- room_id;
- hint_index;
- requested_by;
- vote_id;
- penalty;
- used_at.

### Theory

- id;
- room_id;
- player_id;
- answers;
- status;
- created_at.

### Vote

- id;
- room_id;
- type;
- options;
- status;
- created_at;
- closed_at.

### VoteResponse

- id;
- vote_id;
- player_id;
- option_id;
- created_at.

### TheoryEvaluation

- id;
- room_id;
- theory_id;
- attempt_number;
- result;
- dimension_results;
- feedback;
- score_delta.

### GameResult

- id;
- room_id;
- status;
- score;
- title;
- duration;
- question_count;
- repeated_question_count;
- hints_used;
- attempts;
- completed_at.

### Feedback

- id;
- room_id;
- anonymous_player_hash;
- rating;
- fair_solution;
- master_error;
- confusion;
- play_another;
- recommendation_score;
- best_moment;
- worst_moment;
- hardest_part.

---

## 20. Eventos em tempo real

- room_created;
- player_joined;
- player_left;
- player_reconnected;
- player_ready;
- game_started;
- turn_started;
- turn_passed;
- question_submitted;
- question_processing;
- master_answered;
- answer_corrected;
- clarification_requested;
- contestation_created;
- hint_vote_started;
- hint_used;
- theory_phase_started;
- theory_submitted;
- theories_revealed;
- vote_started;
- vote_cast;
- vote_closed;
- theory_evaluated;
- solution_revealed;
- score_calculated;
- feedback_submitted;
- host_disconnected;
- host_transferred;
- room_paused;
- room_resumed;
- ai_unavailable;
- room_expired.

---

## 21. Arquitetura do Mestre IA

### Etapa 1 — Interpretação

Entrada:

- pergunta;
- fatos públicos;
- fatos desbloqueados;
- histórico;
- estado do caso.

Saída estruturada:

- intenção;
- entidades;
- premissas;
- possível repetição;
- fatos consultados;
- gatilhos possíveis;
- ambiguidade.

### Etapa 2 — Motor determinístico

Decide:

- classificação;
- conteúdo permitido;
- bloqueios;
- gatilhos;
- resposta factual;
- evidência desbloqueada;
- necessidade de reformulação.

### Etapa 3 — Redação

Aplica:

- linguagem natural;
- personalidade;
- concisão;
- contexto.

### Etapa 4 — Validação

Verifica:

- fatos autorizados;
- ausência de invenção;
- ausência de spoiler;
- limite de tamanho;
- consistência com classificação.

### Fallback

Resposta determinística padronizada.

---

## 22. Regras obrigatórias do Mestre

1. Usar apenas dados do caso.
2. Nunca alterar a solução.
3. Nunca inventar fatos.
4. Nunca criar evidências.
5. Nunca usar conhecimento externo.
6. Nunca revelar conteúdo bloqueado.
7. Responder em até duas frases.
8. Separar múltiplas premissas.
9. Solicitar reformulação em ambiguidades.
10. Corrigir erros publicamente.
11. Não penalizar jogador por erro do sistema.
12. Não avançar turno quando a resposta falhar.
13. Manter histórico consistente.
14. Usar personalidade apenas como camada de linguagem.
15. Preferir clareza a dramaticidade.

---

## 23. Pontuação inicial

### Fórmula de referência

```text
Base: 5.000

+ dificuldade: até 1.500
+ precisão da teoria: até 1.000
+ eficiência geral: até 500

- perguntas excedentes: até 500
- perguntas repetidas: até 300
- pistas: até 900
- tentativas extras: até 700
- tempo excedente: até 300
```

A fórmula poderá ser simplificada na primeira implementação, desde que:

- seja determinística;
- seja explicável;
- não penalize a conversa normal;
- valorize a solução correta.

---

## 24. Analytics

### Eventos principais

- app_opened;
- create_room_started;
- room_created;
- join_room_started;
- room_joined;
- lobby_abandoned;
- game_started;
- question_sent;
- answer_received;
- answer_contested;
- hint_used;
- theory_started;
- theory_submitted;
- theory_vote_completed;
- case_solved;
- case_revealed;
- game_abandoned;
- feedback_completed;
- play_another_clicked;
- second_game_started.

### Métricas

- tempo para criar sala;
- tempo para entrar;
- abandono no lobby;
- taxa de início;
- taxa de conclusão;
- duração;
- perguntas;
- pistas;
- contestações;
- falhas da IA;
- reconexões;
- nota;
- solução justa;
- vontade de jogar outro;
- segunda partida iniciada.

---

## 25. Estados de erro

### Sala inexistente

> Esta sala não existe ou o código está incorreto.

### Sala lotada

> Esta investigação já atingiu o limite de 6 jogadores.

### Sala expirada

> Esta sala expirou e não pode mais ser retomada.

### Conexão perdida

> Sua conexão foi interrompida. O estado da partida foi preservado.

### IA indisponível

> O Mestre está temporariamente indisponível. A pergunta não foi contabilizada e a partida foi pausada.

### Falha na resposta

> Não foi possível validar esta resposta. Tentaremos novamente sem consumir seu turno.

### Anfitrião desconectado

> O anfitrião perdeu a conexão. Aguardando retorno ou votação para substituição.

### Voto não sincronizado

> Seu voto não foi confirmado. Tente novamente.

### Teoria inválida

> Preencha os campos obrigatórios antes de enviar.

---

## 26. Critérios para liberar teste com usuários

- criação e entrada em sala estáveis;
- 2 a 6 dispositivos sincronizados;
- reconexão testada;
- turnos consistentes;
- perguntas registradas;
- Mestre sem contradições conhecidas;
- pistas funcionando;
- teorias privadas;
- votação consistente;
- revelação correta;
- pontuação calculada;
- feedback registrado;
- nenhuma falha crítica aberta.

---

## 27. Plano de implementação

### Sprint 1 — Estrutura base

- PWA;
- Home;
- identidade anônima;
- banco;
- criação de sala;
- entrada;
- lobby.

### Sprint 2 — Tempo real

- conexão;
- lista de jogadores;
- presença;
- turnos;
- passar;
- reconexão;
- anfitrião.

### Sprint 3 — Caso fixo

- estrutura de caso;
- abertura;
- fatos;
- histórico;
- perguntas simuladas;
- fluxo completo sem IA real.

### Sprint 4 — Mestre IA

- interpretação;
- motor;
- redação;
- validação;
- fallback;
- repetição;
- ambiguidade.

### Sprint 5 — Encerramento

- pistas;
- teoria;
- votação;
- avaliação;
- revelação;
- pontuação.

### Sprint 6 — Testes

- analytics;
- feedback;
- erros;
- performance;
- cinco casos;
- preparação para grupos reais.

---

## 28. Definição de pronto

Uma funcionalidade está pronta quando:

- implementada;
- testada em mobile;
- sincronizada entre pelo menos 3 dispositivos;
- possui loading;
- possui erro;
- possui estado vazio, quando aplicável;
- possui critérios de aceite atendidos;
- possui evento analítico;
- não expõe solução;
- não quebra reconexão;
- está documentada.

---

## 29. Riscos

### Risco 1 — IA contraditória

Mitigação:

- motor determinístico;
- validação;
- fallback;
- contestação;
- logs.

### Risco 2 — Turnos burocráticos

Mitigação:

- passar sem penalidade;
- histórico claro;
- ações rápidas;
- testes observacionais.

### Risco 3 — Latência

Mitigação:

- feedback visual;
- timeout;
- modelo alternativo;
- respostas curtas;
- cache de perguntas equivalentes.

### Risco 4 — Solução injusta

Mitigação:

- caso estruturado;
- testes automáticos;
- testes humanos;
- solução única;
- fatos dedutíveis.

### Risco 5 — Sala instável

Mitigação:

- servidor como fonte oficial;
- eventos idempotentes;
- reconexão;
- persistência;
- testes em múltiplos dispositivos.

### Risco 6 — Experiência parecer chatbot

Mitigação:

- foco na sala;
- turnos;
- histórico;
- pistas;
- teorias;
- votação;
- identidade visual de jogo.

---

## 30. Decisões pendentes para implementação

Estas decisões podem ser resolvidas durante o detalhamento técnico:

- stack específica;
- provedor de tempo real;
- provedor de IA;
- modelo principal e fallback;
- formato final do código da sala;
- política exata de timeout;
- fórmula final de pontuação;
- quantidade de perguntas esperada por caso;
- número mínimo de jogadores prontos;
- comportamento exato após empate;
- duração do período de reconexão;
- nível de cache offline;
- método de geração do QR Code.

---

## 31. Próximos documentos

Após este PRD, criar:

1. `fluxos-mvp-1.md`
2. `modelo-de-dados.md`
3. `regras-mestre-ia.md`
4. `backlog-mvp-1.md`
5. `casos-iniciais.md`
6. `prompt-antigravity-mvp-1.md`

---

## 32. Instrução central para o Antigravity

> Não tente construir todo o produto descrito no `planejador.md`. Implemente apenas o escopo deste PRD. Priorize estabilidade da sala, coerência do Mestre, conclusão da partida e clareza da experiência. Recursos fora do escopo devem permanecer apenas como preparação arquitetural, sem interface ou implementação funcional nesta etapa.
