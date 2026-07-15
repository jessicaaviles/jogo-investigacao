# Backlog — MVP Técnico 1
## Jogo de Investigação Multiplayer com IA

---

## 1. Objetivo

Este documento organiza o trabalho do MVP Técnico 1 em:

- épicos;
- histórias de usuário;
- critérios de aceite;
- prioridades;
- dependências;
- ordem de implementação;
- definição de pronto.

Ele deve ser usado em conjunto com:

- `planejador.md`
- `prd-mvp-1.md`
- `fluxos-mvp-1.md`
- `modelo-de-dados.md`
- `regras-mestre-ia.md`

---

# 2. Escopo do backlog

Este backlog cobre apenas:

- PWA mobile-first;
- identidade anônima;
- criação e entrada em salas;
- lobby;
- multiplayer em tempo real;
- turnos;
- perguntas por texto;
- Mestre IA;
- histórico;
- pistas;
- teorias;
- votação;
- revelação;
- pontuação;
- feedback;
- analytics;
- reconexão;
- recuperação do anfitrião.

Fora do escopo:

- casos médios;
- personagens;
- locais;
- interrogatórios;
- fotos;
- voz;
- imagens geradas;
- notas;
- conexões entre evidências;
- painel administrativo completo;
- monetização.

---

# 3. Priorização

## P0 — Obrigatório para o primeiro teste

Sem esta funcionalidade, o núcleo não pode ser testado.

## P1 — Necessário antes do teste com cinco grupos

Pode não ser necessário no primeiro protótipo técnico, mas precisa existir antes da validação.

## P2 — Melhoria relevante

Pode entrar após o núcleo funcionar.

## P3 — Futuro

Não implementar nesta fase.

---

# 4. Ordem recomendada

```text
Épico 1 — Fundação
↓
Épico 2 — Identidade e salas
↓
Épico 3 — Lobby e presença
↓
Épico 4 — Turnos
↓
Épico 5 — Caso estruturado
↓
Épico 6 — Mestre IA
↓
Épico 7 — Histórico e contestação
↓
Épico 8 — Pistas
↓
Épico 9 — Teorias e votação
↓
Épico 10 — Revelação e pontuação
↓
Épico 11 — Reconexão e anfitrião
↓
Épico 12 — Analytics e feedback
↓
Épico 13 — Testes e hardening
```

---

# 5. Épico 1 — Fundação da aplicação

## Objetivo

Criar a base técnica da PWA.

### US-001 — Estrutura inicial da PWA

**Como** usuário  
**Quero** acessar o jogo pelo navegador e instalar na tela inicial  
**Para** jogar sem depender de loja de aplicativos.

**Prioridade:** P0

### Critérios de aceite

- aplicação abre em mobile;
- layout responsivo;
- manifest configurado;
- ícones provisórios;
- instalação como PWA;
- service worker básico;
- fallback offline;
- suporte a 360 px de largura;
- build de produção funcional.

---

### US-002 — Navegação principal

**Como** usuário  
**Quero** navegar entre Home, criação e entrada em sala  
**Para** iniciar rapidamente.

**Prioridade:** P0

### Critérios de aceite

- Home;
- Criar partida;
- Entrar em sala;
- Tutorial;
- rota de sala;
- estados de carregamento;
- rota inexistente tratada.

---

### US-003 — Design tokens básicos

**Como** time de produto  
**Quero** uma base visual consistente  
**Para** evoluir a interface sem retrabalho.

**Prioridade:** P1

### Critérios de aceite

- cores;
- tipografia;
- espaçamentos;
- bordas;
- elevação;
- estados;
- componentes mínimos;
- acessibilidade de contraste.

---

# 6. Épico 2 — Identidade anônima e criação de sala

## Objetivo

Permitir jogar sem cadastro.

### US-004 — Criar identidade anônima

**Como** usuário  
**Quero** entrar sem criar conta  
**Para** reduzir o atrito inicial.

**Prioridade:** P0

### Critérios de aceite

- token anônimo criado;
- token persistido localmente;
- hash salvo no servidor;
- nome padrão opcional;
- identidade recuperada ao recarregar;
- exclusão local possível.

---

### US-005 — Criar sala

**Como** anfitrião  
**Quero** criar uma sala para um caso  
**Para** convidar outras pessoas.

**Prioridade:** P0

### Critérios de aceite

- caso selecionado;
- configurações salvas;
- sala criada;
- código público gerado;
- link gerado;
- QR Code gerado;
- anfitrião vinculado;
- código de recuperação criado;
- evento `room_created`.

---

### US-006 — Configurar partida

**Como** anfitrião  
**Quero** definir regras básicas  
**Para** adaptar a dinâmica ao grupo.

**Prioridade:** P1

### Critérios de aceite

- ordem de turnos;
- tempo por turno;
- maioria simples;
- configurações persistidas;
- defaults aplicados.

---

### US-007 — Exibir código de recuperação

**Como** anfitrião  
**Quero** um código privado  
**Para** recuperar a sala em outro dispositivo.

**Prioridade:** P1

### Critérios de aceite

- código exibido uma vez;
- opção copiar;
- não aparece para convidados;
- hash persistido;
- aviso de segurança.

---

# 7. Épico 3 — Entrada, lobby e presença

## Objetivo

Reunir de 2 a 6 jogadores.

### US-008 — Entrar por código

**Como** jogador  
**Quero** entrar usando o código  
**Para** participar da partida.

**Prioridade:** P0

### Critérios de aceite

- campo de código;
- normalização;
- erro de sala inexistente;
- erro de sala lotada;
- erro de sala expirada;
- solicitação de nome;
- entrada confirmada.

---

### US-009 — Entrar por link

**Como** jogador  
**Quero** abrir o convite  
**Para** entrar sem digitar código.

**Prioridade:** P0

### Critérios de aceite

- link abre sala;
- valida sala;
- solicita nome;
- reconhece dispositivo;
- direciona ao lobby.

---

### US-010 — Entrar por QR Code

**Como** jogador  
**Quero** escanear um QR Code  
**Para** entrar rapidamente.

**Prioridade:** P1

### Critérios de aceite

- QR direciona ao link;
- fluxo igual ao link;
- QR legível em outro dispositivo.

---

### US-011 — Visualizar lobby

**Como** participante  
**Quero** ver quem entrou  
**Para** saber quando o grupo está pronto.

**Prioridade:** P0

### Critérios de aceite

- lista em tempo real;
- anfitrião identificado;
- conexão exibida;
- pronto/não pronto;
- limite de 6;
- código acessível;
- link acessível.

---

### US-012 — Marcar-se como pronto

**Como** jogador  
**Quero** confirmar que estou pronto  
**Para** o anfitrião iniciar.

**Prioridade:** P1

### Critérios de aceite

- alternar status;
- sincronização;
- anfitrião vê estado;
- evento registrado.

---

### US-013 — Iniciar partida

**Como** anfitrião  
**Quero** iniciar quando houver jogadores suficientes  
**Para** começar o caso.

**Prioridade:** P0

### Critérios de aceite

- mínimo 2;
- caso carregado;
- ordem definida;
- entrada congelada;
- estado READY;
- todos recebem transição;
- erro não fecha sala.

---

# 8. Épico 4 — Multiplayer em tempo real

## Objetivo

Sincronizar o estado da partida.

### US-014 — Conectar ao canal da sala

**Como** jogador  
**Quero** receber mudanças em tempo real  
**Para** acompanhar a partida.

**Prioridade:** P0

### Critérios de aceite

- conexão por sala;
- autenticação;
- eventos ordenados;
- reconexão automática;
- indicador de conexão.

---

### US-015 — Event log

**Como** sistema  
**Quero** registrar eventos idempotentes  
**Para** preservar histórico e consistência.

**Prioridade:** P0

### Critérios de aceite

- `event_version`;
- `idempotency_key`;
- payload validado;
- não duplicar;
- recuperar eventos.

---

### US-016 — Sincronizar estado oficial

**Como** jogador  
**Quero** receber o estado atual  
**Para** recuperar a interface após falha.

**Prioridade:** P0

### Critérios de aceite

- endpoint de estado;
- versão;
- jogadores;
- turno;
- perguntas;
- votação;
- resposta;
- conflito tratado.

---

# 9. Épico 5 — Turnos

## Objetivo

Organizar a participação.

### US-017 — Definir ordem

**Como** anfitrião  
**Quero** que a ordem seja criada  
**Para** organizar as perguntas.

**Prioridade:** P0

### Critérios de aceite

- ordem aleatória fixa;
- outras opções preparadas;
- todos veem;
- primeiro turno definido.

---

### US-018 — Exibir jogador da vez

**Como** participante  
**Quero** saber quem joga agora  
**Para** acompanhar o ritmo.

**Prioridade:** P0

### Critérios de aceite

- destaque visual;
- rodada;
- ordem;
- estado do turno;
- sincronização.

---

### US-019 — Passar a vez

**Como** jogador da vez  
**Quero** passar  
**Para** não travar a partida.

**Prioridade:** P0

### Critérios de aceite

- sem modal;
- sem penalidade;
- evento registrado;
- turno seguinte iniciado;
- histórico atualizado.

---

### US-020 — Cronômetro opcional

**Como** anfitrião  
**Quero** limitar o turno  
**Para** acelerar partidas.

**Prioridade:** P2

### Critérios de aceite

- desligado por padrão;
- 30/60/90;
- alerta;
- passar automaticamente;
- sincronizado.

---

# 10. Épico 6 — Estrutura do caso

## Objetivo

Carregar um caso rápido fixo.

### US-021 — Modelar caso

**Como** sistema  
**Quero** carregar fatos e solução  
**Para** executar a investigação.

**Prioridade:** P0

### Critérios de aceite

- abertura;
- fatos;
- regras;
- pistas;
- solução;
- campos de teoria;
- pontuação;
- versão imutável.

---

### US-022 — Apresentar o caso

**Como** jogador  
**Quero** entender o mistério  
**Para** começar a investigar.

**Prioridade:** P0

### Critérios de aceite

- título;
- sinopse;
- pergunta central;
- fatos conhecidos;
- botão pronto;
- transição sincronizada.

---

### US-023 — Proteger solução

**Como** produto  
**Quero** impedir que a solução chegue ao frontend  
**Para** preservar o jogo.

**Prioridade:** P0

### Critérios de aceite

- solução criptografada;
- endpoints públicos não retornam;
- logs não contêm;
- apenas Mestre acessa;
- teste automatizado.

---

# 11. Épico 7 — Perguntas e Mestre IA

## Objetivo

Responder perguntas com consistência.

### US-024 — Enviar pergunta

**Como** jogador da vez  
**Quero** enviar uma pergunta  
**Para** investigar.

**Prioridade:** P0

### Critérios de aceite

- texto obrigatório;
- loading;
- idempotência;
- bloqueio de múltiplo envio;
- pergunta numerada;
- turno preservado.

---

### US-025 — Interpretar pergunta

**Como** sistema  
**Quero** transformar texto em estrutura  
**Para** consultar fatos.

**Prioridade:** P0

### Critérios de aceite

- intent;
- entidades;
- premissas;
- ambiguidade;
- duplicidade;
- confiança;
- JSON válido.

---

### US-026 — Decidir resposta factual

**Como** sistema  
**Quero** resolver a verdade por regras  
**Para** não depender da IA.

**Prioridade:** P0

### Critérios de aceite

- consulta fatos;
- classificação;
- bloqueio;
- múltiplas premissas;
- gatilhos;
- sem invenção.

---

### US-027 — Redigir resposta

**Como** jogador  
**Quero** uma resposta clara  
**Para** continuar.

**Prioridade:** P0

### Critérios de aceite

- até duas frases;
- começa pela classificação;
- respeita tom;
- não adiciona fatos;
- pt-BR.

---

### US-028 — Validar resposta

**Como** sistema  
**Quero** revisar a saída  
**Para** impedir spoilers e contradições.

**Prioridade:** P0

### Critérios de aceite

- valida fatos;
- valida tamanho;
- valida entidades;
- valida bloqueios;
- detector de spoiler;
- rejeita inválida.

---

### US-029 — Fallback determinístico

**Como** sistema  
**Quero** responder com segurança quando a IA falhar  
**Para** não interromper a partida.

**Prioridade:** P0

### Critérios de aceite

- resposta simples;
- classificação correta;
- sem fato novo;
- evento de fallback;
- turno concluído.

---

### US-030 — Tratar ambiguidade

**Como** jogador  
**Quero** saber por que minha pergunta não funciona  
**Para** reformular.

**Prioridade:** P0

### Critérios de aceite

- identifica referência vaga;
- sugere reformulação;
- não consome turno;
- não penaliza.

---

### US-031 — Tratar múltiplas premissas

**Como** jogador  
**Quero** resposta separada  
**Para** não interpretar errado.

**Prioridade:** P0

### Critérios de aceite

- até 3;
- classificação individual;
- mais de 3 pede reformulação;
- histórico preservado.

---

### US-032 — Detectar prompt injection

**Como** sistema  
**Quero** ignorar instruções maliciosas  
**Para** preservar as regras.

**Prioridade:** P0

### Critérios de aceite

- não revela prompt;
- não muda papel;
- não revela solução;
- responde com redirecionamento seguro;
- evento registrado.

---

# 12. Épico 8 — Histórico, repetição e contestação

## Objetivo

Dar transparência à investigação.

### US-033 — Histórico completo

**Como** jogador  
**Quero** revisar perguntas e respostas  
**Para** lembrar o raciocínio.

**Prioridade:** P0

### Critérios de aceite

- número;
- rodada;
- autor;
- pergunta;
- resposta;
- correção;
- filtros básicos.

---

### US-034 — Detectar repetição

**Como** jogador  
**Quero** ser avisado  
**Para** evitar perguntas duplicadas.

**Prioridade:** P1

### Critérios de aceite

- similaridade;
- pergunta anterior;
- resposta anterior;
- reformular;
- enviar mesmo assim.

---

### US-035 — Solicitar esclarecimento

**Como** jogador  
**Quero** entender uma resposta  
**Para** reduzir ambiguidade.

**Prioridade:** P1

### Critérios de aceite

- um por pergunta;
- não consome turno;
- sem fato novo;
- sincronizado.

---

### US-036 — Contestar resposta

**Como** jogador  
**Quero** reportar inconsistência  
**Para** corrigir o Mestre.

**Prioridade:** P1

### Critérios de aceite

- motivos;
- comentário;
- validação;
- correção pública;
- sem penalidade;
- analytics.

---

# 13. Épico 9 — Pistas

## Objetivo

Evitar estagnação.

### US-037 — Exibir pistas

**Como** grupo  
**Quero** saber quantas pistas existem  
**Para** decidir quando usar.

**Prioridade:** P0

### Critérios de aceite

- 3 pistas;
- status;
- ordem;
- penalidade;
- disponibilidade.

---

### US-038 — Usar pista

**Como** grupo  
**Quero** abrir uma pista  
**Para** avançar.

**Prioridade:** P0

### Critérios de aceite

- confirmação;
- penalidade;
- sincronização;
- histórico;
- não repetir;
- atualização do score.

---

### US-039 — Votar para usar pista antecipada

**Como** grupo  
**Quero** decidir coletivamente  
**Para** não penalizar sem consenso.

**Prioridade:** P1

### Critérios de aceite

- votação;
- maioria;
- empate bloqueia;
- evento registrado.

---

# 14. Épico 10 — Teorias e votação

## Objetivo

Permitir conclusão coletiva.

### US-040 — Propor solução

**Como** jogador  
**Quero** iniciar tentativa  
**Para** testar a hipótese do grupo.

**Prioridade:** P0

### Critérios de aceite

- proposta;
- votação;
- maioria;
- empate continua;
- turnos pausados.

---

### US-041 — Criar teoria individual

**Como** jogador  
**Quero** escrever minha teoria  
**Para** contribuir sem ser influenciado.

**Prioridade:** P0

### Critérios de aceite

- campos;
- privado;
- autosave;
- obrigatórios;
- status concluído.

---

### US-042 — Revelar teorias simultaneamente

**Como** grupo  
**Quero** ver todas ao mesmo tempo  
**Para** comparar justamente.

**Prioridade:** P0

### Critérios de aceite

- nenhuma vaza antes;
- autor;
- conteúdo;
- imutável após revelar.

---

### US-043 — Votar na teoria

**Como** grupo  
**Quero** escolher a resposta oficial  
**Para** enviar ao Mestre.

**Prioridade:** P0

### Critérios de aceite

- um voto;
- alterar antes de fechar;
- maioria;
- empate;
- desempate.

---

### US-044 — Avaliar teoria

**Como** grupo  
**Quero** saber se acertamos  
**Para** concluir ou continuar.

**Prioridade:** P0

### Critérios de aceite

- correto/parcial/incorreto;
- dimensão;
- sem spoiler;
- tentativa registrada;
- validação.

---

### US-045 — Segunda tentativa

**Como** grupo  
**Quero** tentar novamente  
**Para** corrigir a hipótese.

**Prioridade:** P0

### Critérios de aceite

- duas formais;
- feedback anterior;
- nova teoria;
- após segunda, votação de continuidade.

---

# 15. Épico 11 — Revelação, pontuação e resultado

## Objetivo

Encerrar de forma satisfatória.

### US-046 — Revelar solução

**Como** jogador  
**Quero** entender o que aconteceu  
**Para** ter fechamento.

**Prioridade:** P0

### Critérios de aceite

- responsável;
- método;
- motivo;
- local;
- tempo;
- linha do tempo;
- resolvido/revelado.

---

### US-047 — Calcular pontuação

**Como** grupo  
**Quero** receber uma pontuação  
**Para** avaliar o desempenho.

**Prioridade:** P1

### Critérios de aceite

- determinística;
- breakdown;
- mínimo 0;
- perguntas;
- pistas;
- tentativas;
- tempo;
- dificuldade.

---

### US-048 — Exibir resultado

**Como** grupo  
**Quero** ver o resumo  
**Para** encerrar e compartilhar.

**Prioridade:** P0

### Critérios de aceite

- status;
- score;
- tempo;
- perguntas;
- pistas;
- tentativas;
- título;
- jogar outro.

---

### US-049 — Compartilhar card simples

**Como** usuário  
**Quero** compartilhar o resultado  
**Para** divulgar a partida.

**Prioridade:** P2

### Critérios de aceite

- sem fotos;
- nome do caso;
- score;
- título;
- duração;
- status.

---

# 16. Épico 12 — Reconexão e anfitrião

## Objetivo

Preservar a sala.

### US-050 — Reconectar jogador

**Como** jogador  
**Quero** voltar à partida  
**Para** não perder progresso.

**Prioridade:** P0

### Critérios de aceite

- token reconhecido;
- posição restaurada;
- estado sincronizado;
- turno preservado.

---

### US-051 — Pausar após desconexão

**Como** anfitrião  
**Quero** decidir se aguardamos  
**Para** lidar com falhas.

**Prioridade:** P1

### Critérios de aceite

- alerta;
- pausar;
- continuar;
- remover;
- votação quando necessário.

---

### US-052 — Recuperar anfitrião

**Como** anfitrião  
**Quero** usar código privado  
**Para** recuperar controle.

**Prioridade:** P1

### Critérios de aceite

- validação;
- rate limit;
- transferência;
- código público não funciona.

---

### US-053 — Transferir anfitrião

**Como** grupo  
**Quero** escolher novo anfitrião  
**Para** continuar sem o original.

**Prioridade:** P1

### Critérios de aceite

- votação;
- maioria;
- permissões operacionais;
- sem dados privados extras.

---

# 17. Épico 13 — Analytics e feedback

## Objetivo

Medir valor e falhas.

### US-054 — Registrar eventos analíticos

**Como** time de produto  
**Quero** medir o uso  
**Para** validar hipóteses.

**Prioridade:** P1

### Critérios de aceite

- eventos principais;
- sem nome;
- sem solução;
- sem código;
- propriedades padronizadas.

---

### US-055 — Coletar feedback

**Como** jogador  
**Quero** avaliar a experiência  
**Para** ajudar a melhorar.

**Prioridade:** P1

### Critérios de aceite

- nota;
- justiça;
- erro do Mestre;
- confusão;
- jogar outro;
- NPS;
- comentários opcionais.

---

### US-056 — Medir segunda partida

**Como** time de produto  
**Quero** saber se o grupo joga novamente  
**Para** medir valor real.

**Prioridade:** P0

### Critérios de aceite

- clique;
- escolha;
- criação;
- início;
- vínculo desidentificado.

---

# 18. Épico 14 — Estados de erro

## Objetivo

Evitar perda e confusão.

### US-057 — Tratar IA indisponível

**Como** jogador  
**Quero** preservar meu turno  
**Para** não ser prejudicado.

**Prioridade:** P0

### Critérios de aceite

- retry;
- fallback model;
- pausa;
- sem penalidade;
- pergunta preservada.

---

### US-058 — Tratar conflito de estado

**Como** sistema  
**Quero** recuperar a versão oficial  
**Para** evitar divergências.

**Prioridade:** P0

### Critérios de aceite

- 409;
- buscar estado;
- reaplicar quando seguro;
- não duplicar.

---

### US-059 — Tratar sala expirada

**Como** usuário  
**Quero** entender que a sala expirou  
**Para** criar outra.

**Prioridade:** P1

### Critérios de aceite

- mensagem;
- entrada bloqueada;
- histórico local;
- ação criar nova.

---

# 19. Épico 15 — Conteúdo inicial

## Objetivo

Preparar casos para teste.

### US-060 — Criar caso tutorial

**Prioridade:** P0

### Critérios de aceite

- 3 a 5 minutos;
- ensina pergunta;
- ensina passar;
- ensina pista;
- ensina teoria;
- sem score oficial.

---

### US-061 — Criar caso fácil

**Prioridade:** P0

### Critérios de aceite

- solução clara;
- 1 a 2 fatos essenciais;
- até 10 perguntas esperadas;
- 3 pistas;
- teste automático.

---

### US-062 — Criar caso médio

**Prioridade:** P1

### Critérios de aceite

- 2 a 3 fatos essenciais;
- maior ambiguidade controlada;
- 10 a 18 perguntas esperadas.

---

### US-063 — Criar caso difícil

**Prioridade:** P1

### Critérios de aceite

- múltiplas premissas;
- 3 a 4 fatos essenciais;
- 15 a 25 perguntas esperadas.

---

### US-064 — Criar caso absurdo ou sobrenatural aparente

**Prioridade:** P1

### Critérios de aceite

- tom diferenciado;
- humor autorizado ou suspense;
- solução lógica;
- sem sobrenatural real obrigatório.

---

# 20. Épico 16 — Qualidade e testes

## Objetivo

Liberar para cinco grupos.

### US-065 — Testes unitários

**Prioridade:** P0

Cobrir:

- regras;
- pontuação;
- votos;
- turnos;
- bloqueios;
- expiração.

---

### US-066 — Testes de integração

**Prioridade:** P0

Cobrir:

- sala;
- pergunta;
- Mestre;
- resposta;
- turno;
- teoria;
- resultado.

---

### US-067 — Testes multi-dispositivo

**Prioridade:** P0

### Critérios de aceite

- 2 dispositivos;
- 3 dispositivos;
- 6 dispositivos;
- reconexão;
- latência;
- host transfer.

---

### US-068 — Testes de prompt injection

**Prioridade:** P0

### Critérios de aceite

- não revela solução;
- não revela prompt;
- não altera papel;
- não cria fatos.

---

### US-069 — Testes de consistência do caso

**Prioridade:** P0

### Critérios de aceite

- perguntas previstas;
- perguntas inesperadas;
- reformulações;
- múltiplas premissas;
- nenhum conflito crítico.

---

### US-070 — Teste com cinco grupos

**Prioridade:** P1

### Critérios de aceite

- cinco grupos;
- eventos registrados;
- feedback;
- severidade;
- decisão de avanço.

---

# 21. Dependências entre épicos

| Épico | Depende de |
|---|---|
| Fundação | Nenhum |
| Salas | Fundação |
| Lobby | Salas |
| Tempo real | Salas |
| Turnos | Tempo real |
| Caso | Fundação e banco |
| Mestre | Caso e turnos |
| Histórico | Mestre |
| Pistas | Caso e tempo real |
| Teorias | Turnos e votos |
| Revelação | Teorias e caso |
| Reconexão | Tempo real |
| Analytics | Fundação e eventos |
| Conteúdo | Modelo de caso |
| Testes | Todos os P0 |

---

# 22. Marcos

## Marco 1 — Sala funcional

Inclui:

- PWA;
- identidade;
- criar;
- entrar;
- lobby;
- 3 dispositivos.

## Marco 2 — Partida sem IA

Inclui:

- caso fixo;
- turnos;
- perguntas;
- respostas mockadas;
- histórico.

## Marco 3 — Mestre funcional

Inclui:

- interpretação;
- motor;
- redação;
- validação;
- fallback.

## Marco 4 — Partida completa

Inclui:

- pistas;
- teoria;
- voto;
- avaliação;
- revelação.

## Marco 5 — Beta fechado

Inclui:

- reconexão;
- erros;
- feedback;
- analytics;
- cinco casos.

---

# 23. Critérios de entrada para desenvolvimento

Uma história pode entrar quando:

- possui objetivo;
- critérios de aceite;
- dependências conhecidas;
- tela ou comportamento definido;
- evento identificado;
- dados necessários definidos;
- regra de permissão definida.

---

# 24. Definição de pronto

Uma história está pronta quando:

- implementada;
- revisada;
- testada;
- funciona em mobile;
- possui loading;
- possui erro;
- possui evento;
- respeita permissão;
- suporta reconexão;
- não expõe solução;
- critérios atendidos;
- documentação atualizada.

---

# 25. Backlog mínimo para primeira demo

Selecionar:

- US-001;
- US-002;
- US-004;
- US-005;
- US-008;
- US-011;
- US-013;
- US-014;
- US-017;
- US-018;
- US-019;
- US-021;
- US-022;
- US-024;
- US-033.

Objetivo:

> Criar uma sala, entrar com três jogadores, iniciar um caso fixo, alternar turnos, enviar perguntas mockadas e consultar o histórico.

---

# 26. Backlog mínimo para primeira partida real

Adicionar:

- US-025;
- US-026;
- US-027;
- US-028;
- US-029;
- US-030;
- US-031;
- US-032;
- US-037;
- US-038;
- US-040;
- US-041;
- US-042;
- US-043;
- US-044;
- US-046;
- US-048.

Objetivo:

> Concluir um caso real com o Mestre IA.

---

# 27. Backlog mínimo para beta fechado

Adicionar:

- US-034;
- US-035;
- US-036;
- US-045;
- US-047;
- US-050;
- US-052;
- US-054;
- US-055;
- US-056;
- US-057;
- US-058;
- US-060 a US-070.

---

# 28. Riscos de priorização

## Construir IA antes do multiplayer

Risco:

- validar chatbot, não jogo.

Decisão:

- sala e turnos vêm primeiro.

## Construir cinco casos antes do motor

Risco:

- retrabalho editorial.

Decisão:

- primeiro um caso técnico.

## Construir personalização cedo

Risco:

- complexidade sem validar valor.

Decisão:

- fora do MVP 1.

## Construir pontuação complexa cedo

Risco:

- esforço sem impacto no núcleo.

Decisão:

- fórmula simples inicialmente.

---

# 29. Próximo documento recomendado

Após este arquivo, criar:

> `casos-iniciais.md`

Esse documento deve conter:

- tutorial;
- caso fácil;
- caso médio;
- caso difícil;
- caso absurdo ou sobrenatural aparente;
- estrutura completa;
- fatos;
- pistas;
- regras de resposta;
- solução protegida.
