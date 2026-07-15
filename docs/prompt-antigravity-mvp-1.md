# Prompt para o Antigravity — MVP Técnico 1
## Jogo de Investigação Multiplayer com IA

Você vai construir o MVP Técnico 1 de um jogo multiplayer de investigação com IA.

Leia e use estes arquivos como fonte de verdade, nesta ordem:

1. `planejador.md`
2. `prd-mvp-1.md`
3. `fluxos-mvp-1.md`
4. `modelo-de-dados.md`
5. `regras-mestre-ia.md`
6. `backlog-mvp-1.md`
7. `casos-iniciais.md`
8. `cofre-casos-iniciais.md`

O arquivo `cofre-casos-iniciais.md` contém spoilers e dados secretos. Ele deve ser tratado como conteúdo protegido do backend e nunca pode ser exposto no frontend, logs públicos, bundle da aplicação ou respostas de API não autorizadas.

---

# 1. Objetivo da implementação

Construa uma PWA mobile-first para 2 a 6 jogadores, em que:

- um anfitrião cria uma sala;
- outros jogadores entram por link, QR Code ou código;
- todos participam pelo próprio dispositivo;
- existe uma ordem de turnos;
- o jogador da vez envia uma pergunta;
- o Mestre IA responde com base apenas nos fatos estruturados do caso;
- o grupo usa pistas;
- cada jogador cria uma teoria;
- as teorias são reveladas simultaneamente;
- o grupo vota;
- o Mestre avalia a teoria;
- a solução é revelada;
- o grupo recebe um resultado e responde um feedback.

A implementação deve priorizar:

1. estabilidade da sala;
2. sincronização em tempo real;
3. preservação de estado;
4. coerência do Mestre IA;
5. proteção da solução;
6. clareza dos turnos;
7. conclusão da partida.

---

# 2. Regra principal de escopo

Não tente construir todo o produto descrito no `planejador.md`.

Implemente somente o escopo do `prd-mvp-1.md`.

Tudo que estiver fora do MVP deve permanecer:

- fora da interface;
- fora dos fluxos ativos;
- fora da lógica funcional;
- apenas preparado arquiteturalmente quando isso não gerar complexidade desnecessária.

---

# 3. Escopo obrigatório

## Plataforma

- PWA instalável;
- web responsiva;
- mobile-first;
- suporte a desktop;
- funcionamento principal online;
- cache offline apenas para conteúdo estático e histórico local básico.

## Identidade

- usuário anônimo;
- sem conta obrigatória;
- token persistente por dispositivo;
- nome por sala;
- reconexão pelo mesmo dispositivo.

## Salas

- criar sala;
- código público;
- link de convite;
- QR Code;
- código privado de recuperação;
- 2 a 6 jogadores;
- anfitrião;
- lobby;
- estado pronto;
- início sincronizado;
- expiração após 30 dias da última atividade.

## Multiplayer

- sincronização em tempo real;
- servidor como fonte oficial;
- event log;
- versionamento de estado;
- idempotência;
- reconexão;
- transferência de anfitrião.

## Turnos

- ordem aleatória fixa como padrão;
- exibição clara do jogador da vez;
- passar sem penalidade;
- perguntas apenas pelo jogador da vez;
- avanço apenas após resposta válida;
- falha técnica não consome turno.

## Caso rápido

- abertura;
- fatos estruturados;
- regras de resposta;
- pistas;
- solução;
- campos de teoria;
- pontuação;
- versão imutável.

## Mestre IA

- interpretação semântica;
- motor determinístico;
- redação natural;
- validação;
- fallback;
- tratamento de ambiguidade;
- múltiplas premissas;
- repetição;
- bloqueios;
- correção pública;
- resistência a prompt injection.

## Teorias

- teoria individual privada;
- revelação simultânea;
- votação;
- avaliação por dimensão;
- até duas tentativas formais;
- opção de continuar ou revelar.

## Encerramento

- revelação;
- status resolvido ou revelado;
- pontuação;
- resumo;
- feedback;
- jogar outro.

---

# 4. Fora do escopo

Não implemente nesta fase:

- casos médios;
- personagens interrogáveis;
- locais;
- evidências complexas;
- documentos;
- áudios;
- voz;
- fotos;
- IA de imagem;
- personalização profunda;
- notas;
- conexões entre evidências;
- chat privado;
- salas públicas;
- matchmaking;
- ranking;
- contas obrigatórias;
- monetização;
- assinatura;
- loja de casos;
- painel administrativo completo;
- criação livre de casos;
- campanhas;
- culpado controlado por jogador;
- chamada de áudio ou vídeo.

Não adicione funcionalidades extras por iniciativa própria.

---

# 5. Ordem de implementação obrigatória

## Fase 1 — Fundação

Implemente:

- estrutura da PWA;
- rotas;
- design tokens;
- componentes básicos;
- tratamento de erro;
- identidade anônima.

Entrega esperada:

- Home funcional;
- Criar partida;
- Entrar em sala;
- instalação PWA.

---

## Fase 2 — Sala e lobby

Implemente:

- criação da sala;
- código;
- link;
- QR Code;
- recuperação;
- entrada;
- nome;
- lobby;
- jogadores;
- anfitrião;
- pronto/não pronto.

Entrega esperada:

- três dispositivos entram na mesma sala;
- lista sincronizada;
- anfitrião inicia.

---

## Fase 3 — Tempo real e turnos

Implemente:

- canal da sala;
- eventos;
- estado oficial;
- ordem;
- turno;
- passar;
- reconexão básica.

Entrega esperada:

- turnos alternam corretamente entre três dispositivos;
- estado sobrevive ao refresh.

---

## Fase 4 — Caso fixo sem IA

Implemente:

- estrutura de caso;
- abertura;
- fatos;
- perguntas mockadas;
- respostas mockadas;
- histórico.

Entrega esperada:

- uma partida pode ser simulada sem IA real.

---

## Fase 5 — Mestre IA

Implemente:

- interpretação;
- motor;
- redação;
- validação;
- fallback;
- ambiguidades;
- múltiplas premissas;
- prompt injection;
- repetição.

Entrega esperada:

- perguntas reais recebem respostas consistentes.

---

## Fase 6 — Pistas e teorias

Implemente:

- pistas;
- proposta de solução;
- teorias privadas;
- revelação;
- voto;
- avaliação;
- segunda tentativa.

Entrega esperada:

- caso completo até a solução.

---

## Fase 7 — Resultado e validação

Implemente:

- revelação;
- score;
- resultado;
- feedback;
- analytics;
- jogar outro;
- estados de erro.

Entrega esperada:

- fluxo completo pronto para beta fechado.

---

# 6. Direção de experiência

A interface deve parecer:

- jogo de investigação;
- produto contemporâneo;
- arquivo de caso;
- experiência social;
- interface mobile clara.

Não deve parecer:

- chatbot genérico;
- painel administrativo;
- jogo de terror;
- interface policial caricata;
- mural infinito;
- app infantil.

Use:

- cartões;
- fichas;
- hierarquia forte;
- estados claros;
- destaque de turno;
- histórico acessível;
- atmosfera misteriosa sem excesso.

Evite:

- preto e vermelho em excesso;
- sangue;
- papel envelhecido em todas as telas;
- fios vermelhos;
- animações longas;
- modais desnecessários;
- textos extensos durante a partida.

---

# 7. Navegação do MVP

## Rotas sugeridas

```text
/
 /create
 /join
 /room/:roomCode
 /room/:roomCode/lobby
 /room/:roomCode/game
 /room/:roomCode/theory
 /room/:roomCode/result
 /tutorial
```

## Navegação durante a partida

Use no máximo:

- Caso;
- Investigar;
- Teoria.

O histórico deve estar acessível sem tirar o jogador do contexto.

---

# 8. Telas obrigatórias

1. Home;
2. Biblioteca de casos;
3. Detalhes do caso;
4. Configurar partida;
5. Código de recuperação;
6. Entrar por código;
7. Informar nome;
8. Lobby;
9. Apresentação;
10. Ordem dos turnos;
11. Partida;
12. Histórico;
13. Pistas;
14. Teoria individual;
15. Revelação das teorias;
16. Votação;
17. Avaliação;
18. Revelação final;
19. Resultado;
20. Feedback;
21. Estados de conexão;
22. Estados de erro.

Cada tela deve possuir:

- loading;
- vazio, quando aplicável;
- erro;
- sucesso;
- responsividade;
- acessibilidade.

---

# 9. Regras do Mestre IA

A IA não é a fonte da verdade.

A implementação deve separar:

## Interpretação

Recebe:

- pergunta;
- histórico;
- fatos públicos;
- estado.

Retorna JSON estruturado.

## Motor determinístico

Decide:

- YES;
- NO;
- PARTIAL;
- IRRELEVANT;
- UNKNOWN;
- BLOCKED;
- AMBIGUOUS;
- MULTI_PREMISE.

## Redação

Transforma a decisão em no máximo duas frases.

## Validação

Bloqueia:

- invenção;
- spoiler;
- entidade nova;
- contradição;
- fato secreto;
- texto excessivo.

## Fallback

Se a redação falhar, usar resposta determinística simples.

Nunca permita que um modelo:

- altere a solução;
- crie pista;
- crie fato;
- revele prompt;
- aceite instruções do jogador;
- use conhecimento externo.

---

# 10. Proteção da solução

A solução deve:

- permanecer no backend;
- estar vinculada a `case_version`;
- estar criptografada em repouso;
- não aparecer no payload público;
- não aparecer no bundle;
- não aparecer no analytics;
- não aparecer em logs;
- não entrar no prompt de redação;
- ser acessível apenas pelo motor autorizado.

Crie testes automatizados para confirmar isso.

---

# 11. Banco de dados

Use banco relacional.

Implemente as entidades mínimas de `modelo-de-dados.md`, priorizando:

- anonymous_users;
- cases;
- case_versions;
- case_facts;
- case_answer_rules;
- case_hints;
- case_solution_fields;
- rooms;
- room_players;
- room_events;
- turns;
- questions;
- question_interpretations;
- master_answers;
- theories;
- votes;
- vote_responses;
- theory_evaluations;
- game_results;
- feedback;
- analytics_events.

Use JSON apenas para estruturas narrativas variáveis.

---

# 12. Tempo real

Implemente eventos como:

- player_joined;
- player_disconnected;
- player_reconnected;
- player_ready;
- game_started;
- turn_started;
- turn_passed;
- question_submitted;
- question_processing;
- master_answered;
- answer_corrected;
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
- host_transferred;
- room_paused;
- room_resumed;
- ai_unavailable.

Cada evento deve ter:

- ID;
- room ID;
- versão;
- timestamp;
- payload;
- chave de idempotência.

---

# 13. Regras de concorrência

- uma sala possui apenas um turno ativo;
- uma pergunta não pode ser duplicada;
- um voto por jogador;
- uma teoria por tentativa;
- apenas um anfitrião;
- apenas uma versão de caso;
- fechar votação e aplicar resultado na mesma transação;
- responder e avançar turno na mesma transação;
- conflito de versão retorna 409;
- cliente deve ressincronizar.

---

# 14. Conteúdo inicial

Use:

- `casos-iniciais.md` para metadados públicos;
- `cofre-casos-iniciais.md` para dados secretos.

Implemente primeiro:

1. tutorial;
2. O Presente Desaparecido.

Somente depois de o motor funcionar, adicionar:

3. O Elevador que Não Parou;
4. A Mensagem das 23h17;
5. O Retrato que Piscou.

Cada caso precisa de:

- abertura;
- fatos;
- regras;
- pistas;
- solução;
- campos de teoria;
- perguntas esperadas;
- respostas;
- testes.

---

# 15. Analytics

Registre:

- app_opened;
- create_room_started;
- room_created;
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

Não registre:

- nome;
- código da sala;
- solução;
- token bruto;
- dados pessoais.

---

# 16. Critérios de qualidade

O produto só pode ser considerado pronto para teste quando:

- suporta 2 a 6 jogadores;
- funciona em 3 dispositivos reais;
- reconecta após refresh;
- não perde estado;
- não expõe solução;
- não duplica perguntas;
- não duplica votos;
- turnos são consistentes;
- Mestre responde apenas com fatos;
- fallback funciona;
- teorias permanecem privadas;
- votação é sincronizada;
- revelação corresponde à solução;
- score é reproduzível;
- feedback é registrado;
- nenhuma falha crítica está aberta.

---

# 17. Testes obrigatórios

## Unitários

- turnos;
- votos;
- score;
- expiração;
- bloqueios;
- estados.

## Integração

- criar sala;
- entrar;
- iniciar;
- perguntar;
- responder;
- avançar;
- usar pista;
- teoria;
- voto;
- revelação.

## Multi-dispositivo

- 2 jogadores;
- 3 jogadores;
- 6 jogadores;
- refresh;
- desconexão;
- anfitrião ausente.

## IA

- perguntas simples;
- ambíguas;
- repetidas;
- múltiplas premissas;
- irrelevantes;
- bloqueadas;
- prompt injection;
- teoria correta;
- teoria parcial;
- teoria incorreta.

---

# 18. Estados de erro obrigatórios

Implemente mensagens e recuperação para:

- sala inexistente;
- sala lotada;
- sala expirada;
- sala encerrada;
- código inválido;
- conexão perdida;
- IA indisponível;
- resposta inválida;
- conflito de estado;
- anfitrião desconectado;
- voto não confirmado;
- teoria incompleta;
- caso suspenso.

Nenhum erro técnico pode:

- consumir turno;
- perder pergunta;
- apagar teoria;
- duplicar ação;
- alterar score;
- revelar solução.

---

# 19. Segurança

Implemente:

- autenticação anônima;
- autorização por sala;
- rate limiting;
- hash de token;
- hash do código de recuperação;
- solução criptografada;
- proteção de endpoints;
- separação entre dados públicos e secretos;
- prevenção de prompt injection;
- sanitização de entrada;
- logs seguros;
- política de expiração.

---

# 20. Acessibilidade

- contraste adequado;
- foco visível;
- labels;
- leitores de tela;
- feedback não baseado apenas em cor;
- botões com área adequada;
- tipografia escalável;
- uso por teclado no desktop;
- estados anunciados.

---

# 21. Definição de pronto

Uma história só está pronta quando:

- implementada;
- testada;
- responsiva;
- acessível;
- sincronizada;
- possui loading;
- possui erro;
- possui evento analítico;
- respeita permissão;
- suporta reconexão;
- não expõe solução;
- possui critérios de aceite atendidos;
- documentação está atualizada.

---

# 22. Entrega inicial esperada

A primeira entrega deve ser uma demo funcional com:

- Home;
- criar sala;
- entrar por código;
- lobby;
- três jogadores;
- ordem;
- turno;
- pergunta mockada;
- resposta mockada;
- histórico;
- passar;
- reconexão básica.

Não conecte a IA antes de essa demo funcionar.

---

# 23. Entrega final esperada do MVP 1

Ao final, deve ser possível:

1. abrir a PWA;
2. criar uma sala;
3. convidar jogadores;
4. iniciar um caso;
5. fazer perguntas por turnos;
6. receber respostas coerentes;
7. usar pistas;
8. criar teorias;
9. votar;
10. avaliar;
11. revelar;
12. pontuar;
13. dar feedback;
14. jogar outro caso.

---

# 24. Forma de trabalho

Ao implementar:

1. siga a ordem deste documento;
2. não avance com dependências incompletas;
3. não adicione escopo;
4. registre decisões técnicas;
5. preserve compatibilidade com os documentos;
6. sinalize conflitos entre documentos;
7. use o `prd-mvp-1.md` como fonte de prioridade;
8. use `regras-mestre-ia.md` como contrato da IA;
9. use `modelo-de-dados.md` como referência estrutural;
10. use `cofre-casos-iniciais.md` apenas no backend.

---

# 25. Instrução final

Construa o produto por etapas.

Comece pela fundação, identidade, salas, lobby e turnos.

Não implemente IA, teorias, pontuação ou casos adicionais antes de o multiplayer básico estar estável.

Não tente melhorar o escopo adicionando recursos.

A prioridade é provar que o núcleo social e investigativo funciona com consistência, segurança e clareza.
