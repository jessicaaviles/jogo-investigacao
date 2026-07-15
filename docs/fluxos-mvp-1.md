# Fluxos — MVP Técnico 1
## Jogo de Investigação Multiplayer com IA

---

## 1. Objetivo deste documento

Este documento descreve os fluxos principais e alternativos do MVP Técnico 1.

Ele deve ser usado em conjunto com:

- `planejador.md`
- `prd-mvp-1.md`

O objetivo é dar clareza ao Antigravity sobre:

- sequência entre telas;
- ações permitidas;
- decisões do usuário;
- estados de carregamento;
- erros;
- exceções;
- transições;
- regras multiplayer;
- comportamento do Mestre IA.

---

# 2. Mapa geral de fluxos

```text
Home
├── Criar partida
│   ├── Escolher caso
│   ├── Configurar partida
│   ├── Criar sala
│   ├── Lobby
│   └── Iniciar partida
│
├── Entrar em uma sala
│   ├── Inserir código
│   ├── Abrir link
│   ├── Ler QR Code
│   ├── Informar nome
│   └── Lobby
│
├── Tutorial
│   └── Caso tutorial
│
└── Partidas recentes
    └── Retomar sala
```

Fluxo central da partida:

```text
Lobby
↓
Apresentação do caso
↓
Definição da ordem
↓
Turno do jogador
↓
Pergunta ou passar
↓
Resposta do Mestre
↓
Histórico atualizado
↓
Nova rodada ou pista
↓
Iniciar teoria
↓
Teorias individuais
↓
Revelação das teorias
↓
Votação
↓
Avaliação
↓
Continuar ou revelar
↓
Resultado
↓
Feedback
↓
Jogar outro
```

---

# 3. Fluxo 1 — Primeiro acesso

## 3.1 Objetivo

Permitir que um usuário entre no produto e compreenda rapidamente as duas ações principais:

- criar partida;
- entrar em sala.

## 3.2 Tela: Home

### Conteúdo

- nome ou marca do jogo;
- descrição curta;
- botão principal: `Criar partida`;
- botão secundário: `Entrar em uma sala`;
- acesso ao tutorial;
- partidas recentes, se existirem;
- aviso discreto de versão experimental.

### Ações

- tocar em Criar partida;
- tocar em Entrar em uma sala;
- abrir Tutorial;
- retomar partida recente.

### Estado sem histórico

```text
Nenhuma partida recente.
Crie uma investigação ou entre em uma sala.
```

### Estado com histórico

Mostrar:

- nome do caso;
- status;
- última atividade;
- botão Retomar.

### Critério de transição

- Criar partida → Fluxo 2;
- Entrar em uma sala → Fluxo 3;
- Tutorial → Fluxo 12;
- Retomar → Fluxo 11.

---

# 4. Fluxo 2 — Criar partida

## 4.1 Etapa 1: Escolher caso

### Tela

Lista de casos disponíveis.

### Card

- imagem;
- título;
- sinopse curta;
- duração;
- dificuldade;
- jogadores;
- tipo.

### Ações

- abrir detalhes;
- selecionar caso;
- voltar.

### Estado de carregamento

Skeleton dos cards.

### Estado vazio

```text
Nenhum caso está disponível no momento.
```

### Erro

```text
Não foi possível carregar os casos.
Tente novamente.
```

---

## 4.2 Etapa 2: Detalhes do caso

### Conteúdo

- imagem;
- título;
- sinopse;
- dificuldade;
- duração;
- número de jogadores;
- tipo;
- nível de tensão;
- botão `Escolher este caso`.

### Ações

- escolher caso;
- voltar.

### Critério de transição

Escolher este caso → Configurar partida.

---

## 4.3 Etapa 3: Configurar partida

### Campos

#### Ordem dos turnos

- aleatória;
- ordem de entrada;
- manual;
- nova ordem a cada rodada.

Padrão:

- aleatória fixa.

#### Tempo por turno

- sem limite;
- 30 segundos;
- 60 segundos;
- 90 segundos.

Padrão:

- sem limite.

#### Pistas

- progressivas;
- quantidade definida pelo caso.

#### Votação

- maioria simples.

### Ações

- criar sala;
- voltar.

### Validação

- caso obrigatório;
- configurações válidas;
- usuário precisa ter identidade anônima local.

### Estado de processamento

```text
Criando sala...
```

### Sucesso

- sala criada;
- usuário vira anfitrião;
- código público gerado;
- link gerado;
- QR Code gerado;
- código privado de recuperação gerado.

### Erro

```text
Não foi possível criar a sala.
Nenhuma configuração foi perdida.
```

---

## 4.4 Etapa 4: Código de recuperação

Exibir apenas ao anfitrião.

### Conteúdo

```text
Guarde este código para recuperar o controle da sala em outro dispositivo.
```

### Ações

- copiar;
- confirmar que salvou;
- continuar.

### Regra

- não mostrar para outros jogadores;
- não usar o mesmo código público;
- armazenar apenas hash no servidor.

### Transição

Continuar → Lobby.

---

# 5. Fluxo 3 — Entrar em uma sala

## 5.1 Pontos de entrada

- código;
- link;
- QR Code.

---

## 5.2 Entrada por código

### Tela

Campo para código.

### Ações

- digitar código;
- colar;
- enviar;
- voltar.

### Validação

- remover espaços;
- transformar em maiúsculas;
- impedir caracteres inválidos.

### Erros

#### Sala inexistente

```text
Esta sala não existe ou o código está incorreto.
```

#### Sala lotada

```text
Esta investigação já atingiu o limite de 6 jogadores.
```

#### Sala expirada

```text
Esta sala expirou e não pode mais ser retomada.
```

#### Sala encerrada

```text
Esta investigação já foi encerrada.
```

---

## 5.3 Entrada por link

### Comportamento

- abrir diretamente a sala;
- validar sala;
- solicitar nome;
- reconhecer identidade anônima, se já existir.

---

## 5.4 Entrada por QR Code

### Comportamento

- QR direciona para link da sala;
- fluxo segue como entrada por link.

---

## 5.5 Informar nome

### Campo

- nome ou apelido.

### Regras

- obrigatório;
- limite de caracteres;
- remover espaços extras;
- nomes repetidos recebem diferenciação visual.

Exemplo:

- Ana;
- Ana 2.

### Ações

- entrar;
- voltar.

### Estado de processamento

```text
Entrando na sala...
```

### Sucesso

→ Lobby.

---

# 6. Fluxo 4 — Lobby

## 6.1 Objetivo

Reunir os jogadores e preparar a partida.

## 6.2 Conteúdo

- título do caso;
- imagem;
- código;
- link;
- QR Code;
- lista de jogadores;
- status de conexão;
- anfitrião;
- estado pronto;
- botão iniciar.

## 6.3 Jogador comum

Pode:

- copiar link;
- mostrar QR;
- marcar-se como pronto;
- sair da sala.

Não pode:

- iniciar;
- alterar configurações;
- remover jogador.

## 6.4 Anfitrião

Pode:

- iniciar;
- alterar configurações antes do início;
- remover jogador;
- encerrar sala;
- copiar convite.

## 6.5 Estado dos jogadores

- conectado;
- desconectado;
- pronto;
- não pronto;
- anfitrião.

## 6.6 Regras para iniciar

- mínimo 2 jogadores;
- máximo 6;
- todos conectados;
- opcionalmente todos prontos;
- caso carregado.

## 6.7 Botão iniciar desabilitado

Mensagens possíveis:

```text
Aguardando pelo menos mais um jogador.
```

```text
Aguardando jogadores ficarem prontos.
```

## 6.8 Iniciar partida

### Estado

```text
Preparando o caso...
```

### Ações do sistema

- congela entrada de novos jogadores;
- define ordem;
- carrega caso;
- inicia estado READY;
- sincroniza todos.

### Erro

```text
Não foi possível iniciar a partida.
A sala continua aberta.
```

---

# 7. Fluxo 5 — Apresentação do caso

## 7.1 Tela

Exibir:

- título;
- imagem;
- situação inicial;
- fatos conhecidos;
- pergunta central;
- duração estimada;
- instrução breve.

## 7.2 Ação

- `Estou pronto`.

Cada jogador confirma individualmente.

## 7.3 Regra

- ninguém recebe a ordem antes de todos carregarem;
- anfitrião pode avançar quando todos confirmarem;
- timeout opcional para jogador inativo.

## 7.4 Transição

Todos prontos → Tela de ordem.

---

# 8. Fluxo 6 — Definição da ordem

## 8.1 Tela

Mostrar:

- ordem dos jogadores;
- destaque do primeiro;
- regra de turnos;
- opção de passar.

## 8.2 Ação

- `Começar investigação`.

Somente anfitrião.

## 8.3 Transição

→ Turno ativo.

---

# 9. Fluxo 7 — Turno principal

## 9.1 Tela base

### Cabeçalho

- título do caso;
- rodada;
- jogador da vez;
- estado da conexão;
- acesso ao menu.

### Conteúdo

- última pergunta;
- última resposta;
- histórico resumido;
- progresso abstrato;
- pistas disponíveis.

### Ações do jogador da vez

- fazer pergunta;
- passar;
- pedir pista, conforme regra;
- iniciar teoria, via proposta.

### Ações dos outros

- consultar histórico;
- sugerir pergunta fora do fluxo principal;
- pedir esclarecimento;
- contestar resposta;
- acompanhar.

---

## 9.2 Fazer pergunta

### Campo

- texto livre.

### Estados

- vazio;
- preenchido;
- enviando;
- processando;
- respondido;
- erro.

### Ação

- enviar.

### Regras

- somente jogador da vez;
- impedir vazio;
- impedir múltiplos envios;
- desabilitar enquanto processa.

### Transição

Pergunta enviada → Pipeline do Mestre.

---

## 9.3 Passar a vez

### Ação

Botão `Passar`.

### Confirmação

Não exigir modal.

### Resultado

- registrar passe;
- avançar turno;
- não penalizar;
- atualizar histórico.

---

## 9.4 Cronômetro

Se ativo:

- mostrar contagem;
- alerta em 10 segundos;
- ao zerar:
  - enviar pergunta em rascunho, se válida e confirmada;
  - ou passar automaticamente.

Padrão:

- desligado.

---

# 10. Fluxo 8 — Processamento da pergunta

## 10.1 Etapas internas

```text
Pergunta enviada
↓
Normalização
↓
Detecção de repetição
↓
Interpretação semântica
↓
Consulta aos fatos
↓
Verificação de bloqueios
↓
Detecção de gatilhos
↓
Decisão factual
↓
Redação
↓
Validação
↓
Resposta sincronizada
```

---

## 10.2 Pergunta repetida

### Antes do envio final

Mostrar:

```text
Uma pergunta parecida já foi feita.
```

Exibir:

- pergunta anterior;
- resposta anterior.

Ações:

- ver histórico;
- reformular;
- enviar mesmo assim.

### Regra

- não bloquear automaticamente;
- penalização apenas se equivalência confirmada.

---

## 10.3 Pergunta ambígua

Exemplo:

> Ele sabia disso?

Resposta do sistema:

```text
Não ficou claro quem é “ele” nem a qual fato você se refere.
```

Ações:

- reformular;
- cancelar.

### Regra

- não consumir turno;
- não penalizar;
- não registrar como pergunta válida.

---

## 10.4 Múltiplas premissas

Exemplo:

> A porta estava aberta porque foi arrombada?

Resposta:

```text
A porta estava aberta: Sim.
Foi arrombada: Não.
```

### Regra

- até 3 premissas;
- acima disso, pedir reformulação.

---

## 10.5 Conteúdo bloqueado

Resposta:

```text
Essa informação ainda não está disponível para a investigação.
```

Ou:

```text
Essa pergunta pode ser investigada por outro caminho.
```

### Regra

Conforme configuração do caso:

- bloquear;
- responder parcialmente;
- responder;
- redirecionar.

---

## 10.6 Resposta válida

### Exemplo

```text
Parcialmente. O horário é importante, mas não representa o momento exato do desaparecimento.
```

### Ações do sistema

- registrar pergunta;
- registrar resposta;
- atualizar histórico;
- verificar desbloqueio;
- recalcular progresso;
- avançar turno.

---

## 10.7 Falha na IA

### Fluxo

```text
Modelo principal falha
↓
Retry
↓
Modelo alternativo
↓
Falha
↓
Pausar partida
```

### Mensagem

```text
O Mestre está temporariamente indisponível.
A pergunta não foi contabilizada e seu turno foi preservado.
```

### Ações

- tentar novamente;
- aguardar;
- anfitrião encerrar.

---

# 11. Fluxo 9 — Histórico

## 11.1 Tela

Lista cronológica.

Cada item mostra:

- número;
- rodada;
- autor;
- pergunta;
- resposta;
- esclarecimento;
- correção;
- status;
- pista ou desbloqueio associado.

## 11.2 Filtros

- todas;
- sim;
- não;
- parcialmente;
- irrelevante;
- contestadas;
- repetidas.

## 11.3 Ações

- abrir detalhe;
- pedir esclarecimento;
- contestar;
- voltar.

---

# 12. Fluxo 10 — Esclarecimento

## 12.1 Entrada

A partir de uma resposta.

## 12.2 Regra

- um esclarecimento por pergunta;
- qualquer jogador pode solicitar;
- não consome turno.

## 12.3 Estado

```text
Solicitando esclarecimento...
```

## 12.4 Resposta

- até duas frases;
- sem novo fato bloqueado;
- anexada ao item original.

## 12.5 Erro

```text
Não foi possível esclarecer esta resposta agora.
```

---

# 13. Fluxo 11 — Contestação

## 13.1 Entrada

Botão:

`Reportar possível contradição`.

## 13.2 Modal

Pergunta:

```text
O que parece inconsistente?
```

Opções:

- contradiz resposta anterior;
- contradiz evidência;
- parece inventado;
- parece revelar demais;
- outro.

Comentário opcional.

## 13.3 Processamento

- validar contra fatos;
- registrar evento;
- corrigir, se necessário.

## 13.4 Correção

Exibir para todos:

```text
Correção da pergunta 8

Resposta anterior:
...

Resposta correta:
...

A resposta anterior foi desconsiderada e não afetará a pontuação.
```

## 13.5 Sem erro detectado

```text
A resposta foi revisada e permanece válida com base nos fatos disponíveis.
```

---

# 14. Fluxo 12 — Tutorial

## 14.1 Objetivo

Ensinar por prática.

## 14.2 Estrutura

- caso de 3 a 5 minutos;
- instruções contextuais;
- sem telas longas.

## 14.3 Passos

1. ler situação;
2. fazer uma pergunta;
3. entender resposta;
4. passar a vez;
5. consultar histórico;
6. usar pista;
7. criar teoria;
8. votar;
9. ver solução.

## 14.4 Regras

- pode ser pulado;
- pode ser repetido;
- não entra em pontuação oficial;
- marcar como concluído localmente.

---

# 15. Fluxo 13 — Pistas

## 15.1 Exibição

Mostrar:

- quantidade;
- status;
- penalidade;
- condição de desbloqueio.

## 15.2 Pista disponível

Botão:

`Usar pista`.

### Comportamento

- se livre: abrir confirmação;
- se antecipada: iniciar votação.

## 15.3 Confirmação

```text
Usar esta pista reduzirá a pontuação do grupo.
```

Ações:

- usar;
- cancelar.

## 15.4 Votação

- maioria simples;
- um voto por jogador;
- empate mantém a pista bloqueada.

## 15.5 Resultado

- pista exibida para todos;
- registrar penalidade;
- atualizar histórico;
- não consumir turno, salvo configuração futura.

---

# 16. Fluxo 14 — Propor tentativa de solução

## 16.1 Entrada

Botão:

`Tentar resolver`.

Disponível para todos.

## 16.2 Votação inicial

Pergunta:

```text
O grupo quer iniciar a tentativa de solução?
```

Opções:

- sim;
- continuar investigando.

### Regra

- maioria simples;
- em empate, continuar investigando.

## 16.3 Se aprovado

- pausar turnos;
- entrar em THEORY_DRAFT;
- abrir formulários individuais.

---

# 17. Fluxo 15 — Teoria individual

## 17.1 Tela

Campos definidos pelo caso.

Possíveis:

- o que aconteceu;
- responsável;
- como;
- onde;
- quando;
- por quê.

## 17.2 Estados

- rascunho;
- concluída;
- enviada;
- não participará.

## 17.3 Regras

- teoria privada;
- salvar automaticamente;
- não mostrar progresso textual;
- mostrar apenas status de conclusão dos jogadores;
- impedir envio se faltar campo obrigatório.

## 17.4 Ações

- enviar;
- salvar;
- não enviar teoria.

## 17.5 Encerramento da etapa

Quando:

- todos enviarem;
- todos concluírem ou recusarem;
- anfitrião encerrar após timeout.

---

# 18. Fluxo 16 — Revelação das teorias

## 18.1 Tela

Mostrar teorias simultaneamente.

Cada card:

- autor;
- resumo;
- campos;
- botão selecionar.

## 18.2 Ações

- ler;
- discutir;
- selecionar para votação.

## 18.3 Regra

- ninguém altera após revelação;
- combinação pode ficar fora da primeira implementação;
- no MVP inicial, votar em uma teoria completa.

---

# 19. Fluxo 17 — Votação da teoria

## 19.1 Tela

- teorias;
- voto atual;
- contagem, conforme regra;
- tempo opcional.

## 19.2 Regras

- um voto;
- pode alterar antes do fechamento;
- maioria simples;
- autor pode votar na própria teoria.

## 19.3 Empate

### Primeiro empate

- abrir discussão;
- nova votação.

### Segundo empate

- anfitrião desempata.

## 19.4 Resultado

Teoria vencedora → Avaliação.

---

# 20. Fluxo 18 — Avaliação da teoria

## 20.1 Estado

```text
O Mestre está avaliando a teoria do grupo...
```

## 20.2 Possíveis resultados

### Correta

```text
Caso resolvido.
```

→ Revelação.

### Parcial

```text
Vocês identificaram corretamente o responsável e a motivação.
O método ainda está incompleto.
```

→ Continuar ou segunda tentativa.

### Incorreta

```text
A teoria contradiz fatos essenciais do caso.
```

→ Continuar ou segunda tentativa.

## 20.3 Primeira tentativa

- feedback por dimensão;
- não revelar resposta;
- registrar tentativa;
- voltar à investigação.

## 20.4 Segunda tentativa

Se errada ou parcial:

- iniciar votação:
  - continuar;
  - usar pista;
  - revelar solução.

---

# 21. Fluxo 19 — Continuar após segunda tentativa

## 21.1 Opções

- continuar investigando;
- usar pista;
- tentativa extra com penalidade;
- revelar solução.

## 21.2 Regras

- maioria simples;
- empate → continuar investigando;
- tentativa extra não conta para pontuação máxima;
- revelar marca o caso como não resolvido.

---

# 22. Fluxo 20 — Revelação final

## 22.1 Tela

Estrutura:

1. frase de revelação;
2. responsável;
3. método;
4. local;
5. momento;
6. motivação;
7. linha do tempo;
8. fatos principais.

## 22.2 Estados

- resolvido;
- revelado;
- arquivado.

## 22.3 Ações

- continuar para resultado;
- abrir relatório completo, se disponível.

---

# 23. Fluxo 21 — Resultado

## 23.1 Conteúdo

- nome;
- status;
- pontuação;
- classificação;
- tempo;
- perguntas;
- repetidas;
- pistas;
- tentativas;
- título coletivo.

## 23.2 Ações

- responder feedback;
- jogar outro;
- voltar à Home;
- compartilhar card simples.

## 23.3 Card simples

- nome do caso;
- status;
- pontuação;
- título;
- duração;
- jogadores.

Sem fotos no MVP Técnico 1.

---

# 24. Fluxo 22 — Feedback

## 24.1 Quantitativo

- nota 1 a 5;
- solução justa;
- respostas erradas;
- confusão;
- jogaria outro;
- recomendação.

## 24.2 Qualitativo

- melhor momento;
- pior momento;
- parte mais difícil.

## 24.3 Regras

- aparece no final;
- pode ser pulado;
- quantitativo recomendado como obrigatório durante testes;
- texto opcional;
- dados desidentificados.

---

# 25. Fluxo 23 — Jogar outro

## 25.1 Ação

Botão principal:

`Jogar outro caso`.

## 25.2 Opções

- manter grupo;
- voltar à biblioteca;
- escolher caso;
- criar nova sala com mesmos jogadores.

## 25.3 Regra

No MVP:

- pode criar nova sala;
- reaproveitar identidade;
- não precisa preencher nome novamente.

## 25.4 Métrica

Registrar:

- clique;
- escolha;
- nova sala;
- segunda partida iniciada.

---

# 26. Fluxo 24 — Reconexão de jogador

## 26.1 Detecção

Quando conexão cai:

- marcar jogador como desconectado;
- notificar grupo;
- preservar posição.

## 26.2 Retorno no mesmo dispositivo

- reconhecer token;
- restaurar jogador;
- sincronizar estado;
- voltar à tela correta.

## 26.3 Durante turno do jogador

- pausar ou aguardar, conforme anfitrião;
- não passar automaticamente de imediato;
- período de tolerância configurável.

## 26.4 Anfitrião decide

- aguardar;
- continuar;
- remover jogador.

---

# 27. Fluxo 25 — Recuperação do anfitrião

## 27.1 Mesmo dispositivo

- recuperação automática.

## 27.2 Outro dispositivo

- inserir código privado;
- validar;
- assumir controle.

## 27.3 Falha

```text
Código de recuperação inválido.
```

## 27.4 Anfitrião não retorna

- grupo vota substituto;
- maioria simples;
- novo anfitrião recebe apenas permissões operacionais.

---

# 28. Fluxo 26 — Expiração da sala

## 28.1 Regra

- 30 dias após última atividade.

## 28.2 Antes de expirar

Opcional:

- aviso local;
- status inativa.

## 28.3 Após expiração

- entrada bloqueada;
- retomada bloqueada;
- histórico local exibe expirado;
- dados seguem política de retenção.

---

# 29. Fluxo 27 — Sair da sala

## 29.1 Jogador comum

Ações:

- sair temporariamente;
- abandonar sala.

### Sair temporariamente

- mantém vaga;
- pode retornar.

### Abandonar

- remove da sala;
- transfere conteúdo necessário ao sistema.

## 29.2 Anfitrião

Ao sair:

- transferir anfitrião;
- encerrar;
- sair temporariamente.

---

# 30. Fluxo 28 — Encerrar sala

## 30.1 Ação do anfitrião

Modal:

```text
Encerrar esta sala para todos?
```

## 30.2 Consequência

- status CANCELLED;
- jogadores removidos da partida;
- histórico preservado conforme política;
- sem pontuação.

---

# 31. Fluxo 29 — Estados offline

## 31.1 Sem internet na Home

Disponível:

- biblioteca em cache;
- partidas recentes;
- tutorial estático;
- grupos locais.

Indisponível:

- criar sala;
- entrar;
- retomar multiplayer.

## 31.2 Sem internet na partida

Mostrar:

```text
Conexão perdida.
O estado da investigação foi preservado.
```

Permitir:

- consultar conteúdo carregado.

Bloquear:

- pergunta;
- voto;
- pista;
- teoria;
- avanço.

---

# 32. Fluxo 30 — Estados críticos

## 32.1 Estado inconsistente

```text
Detectamos uma diferença no estado da partida.
Sincronizando novamente...
```

## 32.2 Falha de sincronização

- recarregar estado oficial;
- não duplicar evento;
- informar usuário.

## 32.3 Sala sem anfitrião

- iniciar fluxo de votação.

## 32.4 Caso indisponível

```text
Este caso foi temporariamente suspenso.
```

Se partida já iniciada:

- continuar com versão carregada;
- não iniciar novas salas.

---

# 33. Matriz de permissões

| Ação | Jogador da vez | Outros jogadores | Anfitrião |
|---|---:|---:|---:|
| Fazer pergunta | Sim | Não | Conforme turno |
| Passar | Sim | Não | Conforme turno |
| Consultar histórico | Sim | Sim | Sim |
| Pedir esclarecimento | Sim | Sim | Sim |
| Contestar | Sim | Sim | Sim |
| Usar pista | Propor | Votar | Propor/votar |
| Iniciar teoria | Propor | Propor | Propor |
| Criar teoria | Sim | Sim | Sim |
| Votar | Sim | Sim | Sim |
| Pausar | Não | Não | Sim |
| Remover jogador | Não | Não | Sim |
| Encerrar sala | Não | Não | Sim |
| Avançar turno em erro | Não | Não | Sim |

---

# 34. Transições principais de estado

## Sala

```text
CREATED → LOBBY
LOBBY → READY
READY → PLAYING
PLAYING → THEORY_DRAFT
THEORY_DRAFT → THEORY_VOTING
THEORY_VOTING → THEORY_EVALUATION
THEORY_EVALUATION → PLAYING
THEORY_EVALUATION → REVEAL
REVEAL → RESULT
RESULT → COMPLETED
```

## Exceções

```text
ANY_ACTIVE_STATE → PAUSED
ANY_ACTIVE_STATE → CONNECTION_ISSUE
ANY_ACTIVE_STATE → AI_UNAVAILABLE
LOBBY → CANCELLED
COMPLETED → EXPIRED
```

---

# 35. Critérios de experiência

O fluxo deve:

1. deixar claro quem joga agora;
2. nunca esconder o estado da pergunta;
3. preservar contexto;
4. evitar modais desnecessários;
5. não transformar o jogo em chat;
6. manter histórico acessível;
7. evitar que erro técnico consuma turno;
8. preservar surpresa das teorias;
9. impedir vazamento da solução;
10. oferecer caminho de recuperação em falhas.

---

# 36. Fluxos prioritários para prototipação

Prioridade 1:

1. Home;
2. Criar sala;
3. Entrar;
4. Lobby;
5. Apresentação;
6. Turno;
7. Pergunta;
8. Resposta;
9. Passar;
10. Histórico.

Prioridade 2:

11. Pista;
12. Iniciar teoria;
13. Teoria individual;
14. Votação;
15. Avaliação;
16. Revelação;
17. Resultado.

Prioridade 3:

18. Reconexão;
19. Anfitrião;
20. Contestação;
21. Erros;
22. Feedback.

---

# 37. Critérios para considerar os fluxos implementados

Cada fluxo deve possuir:

- entrada clara;
- saída clara;
- estado de carregamento;
- estado de sucesso;
- estado de erro;
- regra de permissão;
- evento analítico;
- sincronização;
- comportamento em reconexão;
- critério de aceite correspondente no PRD.

---

# 38. Próximo documento recomendado

Após este arquivo, criar:

> `modelo-de-dados.md`

Esse documento deve detalhar:

- entidades;
- tabelas;
- relacionamentos;
- enums;
- estados;
- índices;
- políticas de retenção;
- eventos;
- contratos entre frontend e backend.
