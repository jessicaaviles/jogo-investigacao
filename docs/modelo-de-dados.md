# Modelo de Dados — MVP Técnico 1
## Jogo de Investigação Multiplayer com IA

---

## 1. Objetivo

Este documento define o modelo de dados mínimo do MVP Técnico 1.

Ele deve ser usado em conjunto com:

- `planejador.md`
- `prd-mvp-1.md`
- `fluxos-mvp-1.md`

O objetivo é orientar o Antigravity na criação de:

- banco relacional;
- entidades;
- relacionamentos;
- estados;
- eventos;
- índices;
- regras de integridade;
- políticas de retenção;
- contratos entre frontend, backend e serviços de IA.

---

# 2. Princípios do modelo

1. O servidor é a fonte oficial do estado da partida.
2. O modelo deve preservar histórico e auditabilidade.
3. A solução do caso não deve ser enviada ao frontend.
4. Eventos devem ser idempotentes.
5. Partidas em andamento devem permanecer vinculadas a uma versão específica do caso.
6. Dados públicos, privados e secretos devem ser separados.
7. A identidade do jogador pode ser anônima, mas persistente por dispositivo.
8. O modelo deve permitir reconexão.
9. Dados analíticos devem ser desidentificados.
10. O MVP deve usar banco relacional com JSON apenas onde houver estrutura narrativa variável.

---

# 3. Visão geral das entidades

```text
anonymous_users
├── room_players
├── saved_groups
├── feedback
└── privacy_requests

rooms
├── room_players
├── room_events
├── turns
├── questions
├── hint_usages
├── theories
├── votes
├── game_results
└── feedback

cases
└── case_versions
    ├── case_facts
    ├── case_hints
    ├── case_solution_fields
    └── case_answer_rules

questions
└── master_answers

votes
└── vote_responses

theories
└── theory_evaluations
```

---

# 4. Convenções

## 4.1 Identificadores

Usar UUID para entidades principais.

Exemplo:

```text
id UUID PRIMARY KEY
```

## 4.2 Datas

Usar timestamps UTC:

```text
created_at
updated_at
deleted_at
expires_at
```

## 4.3 Exclusão lógica

Usar `deleted_at` quando for importante preservar histórico.

## 4.4 Versionamento

Casos publicados devem usar:

```text
case_id
case_version_id
version_number
```

## 4.5 JSON

Permitido para:

- configurações;
- campos variáveis da teoria;
- regras narrativas;
- metadados;
- payload de evento;
- resultado estruturado da IA.

Evitar armazenar em JSON:

- status;
- relacionamentos;
- identificadores principais;
- campos usados frequentemente em filtros;
- métricas agregadas.

---

# 5. Entidade: anonymous_users

Representa o jogador anônimo persistente por dispositivo.

```sql
anonymous_users
- id UUID PK
- device_token_hash VARCHAR UNIQUE NOT NULL
- default_display_name VARCHAR NULL
- locale VARCHAR DEFAULT 'pt-BR'
- timezone VARCHAR NULL
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
- last_active_at TIMESTAMP NOT NULL
- deleted_at TIMESTAMP NULL
```

## Regras

- nunca salvar o token bruto;
- `device_token_hash` deve ser irreversível;
- um dispositivo pode participar de várias salas;
- o usuário pode alterar o nome em cada sala;
- exclusão deve desassociar dados pessoais sem apagar métricas agregadas.

## Índices

```text
UNIQUE(device_token_hash)
INDEX(last_active_at)
INDEX(deleted_at)
```

---

# 6. Entidade: saved_groups

Estrutura mínima para permitir reuso futuro de grupos.

No MVP Técnico 1, pode existir apenas como preparação arquitetural.

```sql
saved_groups
- id UUID PK
- owner_user_id UUID FK anonymous_users.id
- name VARCHAR NOT NULL
- member_snapshot JSONB NOT NULL
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
- deleted_at TIMESTAMP NULL
```

## Observação

Não implementar interface completa nesta fase, mas manter compatibilidade futura.

---

# 7. Entidade: cases

Representa o conceito editorial do caso.

```sql
cases
- id UUID PK
- slug VARCHAR UNIQUE NOT NULL
- title VARCHAR NOT NULL
- short_synopsis TEXT NOT NULL
- case_type case_type_enum NOT NULL
- difficulty difficulty_enum NOT NULL
- estimated_duration_minutes INTEGER NOT NULL
- min_players INTEGER NOT NULL
- max_players INTEGER NOT NULL
- tension_level INTEGER NOT NULL
- status case_status_enum NOT NULL
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
- deleted_at TIMESTAMP NULL
```

## Regras

- `min_players >= 2`;
- `max_players <= 6` no MVP;
- `tension_level` entre 1 e 5;
- apenas casos publicados aparecem na biblioteca.

## Índices

```text
UNIQUE(slug)
INDEX(status)
INDEX(case_type, difficulty)
INDEX(min_players, max_players)
```

---

# 8. Entidade: case_versions

Representa uma versão imutável do caso.

```sql
case_versions
- id UUID PK
- case_id UUID FK cases.id NOT NULL
- version_number VARCHAR NOT NULL
- opening JSONB NOT NULL
- master_style JSONB NOT NULL
- scoring_rules JSONB NOT NULL
- solution_summary_encrypted TEXT NOT NULL
- full_solution_encrypted TEXT NOT NULL
- chronology_encrypted JSONB NOT NULL
- publication_status case_version_status_enum NOT NULL
- published_at TIMESTAMP NULL
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
```

## Regras

- após publicação, a versão não deve ser alterada;
- correções devem gerar nova versão;
- partidas iniciadas continuam vinculadas à versão original;
- solução deve permanecer inacessível ao frontend;
- campos de solução devem ser criptografados em repouso.

## Índices

```text
UNIQUE(case_id, version_number)
INDEX(publication_status)
INDEX(published_at)
```

---

# 9. Entidade: case_facts

Armazena fatos estruturados usados pelo motor determinístico.

```sql
case_facts
- id UUID PK
- case_version_id UUID FK case_versions.id NOT NULL
- fact_key VARCHAR NOT NULL
- statement TEXT NOT NULL
- visibility fact_visibility_enum NOT NULL
- pre_unlock_policy pre_unlock_policy_enum NOT NULL
- unlock_conditions JSONB NULL
- allowed_response JSONB NULL
- is_solution_critical BOOLEAN DEFAULT FALSE
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
```

## Exemplos de `fact_key`

```text
door_was_locked
victim_knew_responsible
object_left_room
time_is_relevant
```

## Regras

- `fact_key` único por versão;
- o Mestre consulta apenas fatos da versão ativa da sala;
- fatos críticos devem ter cobertura por evidências ou pistas.

## Índices

```text
UNIQUE(case_version_id, fact_key)
INDEX(case_version_id, visibility)
INDEX(case_version_id, is_solution_critical)
```

---

# 10. Entidade: case_answer_rules

Mapeia perguntas previstas, sinônimos e respostas determinísticas.

```sql
case_answer_rules
- id UUID PK
- case_version_id UUID FK case_versions.id NOT NULL
- intent_key VARCHAR NOT NULL
- semantic_examples JSONB NOT NULL
- related_fact_keys JSONB NOT NULL
- default_classification master_classification_enum NOT NULL
- response_constraints JSONB NULL
- unlock_payload JSONB NULL
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
```

## Uso

A IA interpreta a pergunta e devolve um `intent_key`. O backend resolve a resposta consultando esta tabela e `case_facts`.

---

# 11. Entidade: case_hints

```sql
case_hints
- id UUID PK
- case_version_id UUID FK case_versions.id NOT NULL
- hint_index INTEGER NOT NULL
- content_encrypted TEXT NOT NULL
- unlock_rule JSONB NOT NULL
- penalty_points INTEGER NOT NULL
- is_available_from_start BOOLEAN DEFAULT FALSE
- created_at TIMESTAMP NOT NULL
```

## Regras

- máximo inicial: 3 pistas por caso;
- ordem obrigatória;
- conteúdo não deve ser enviado antes do desbloqueio;
- pista deve estar vinculada a fatos existentes.

## Índices

```text
UNIQUE(case_version_id, hint_index)
```

---

# 12. Entidade: case_solution_fields

Define quais campos serão exigidos na teoria.

```sql
case_solution_fields
- id UUID PK
- case_version_id UUID FK case_versions.id NOT NULL
- field_key solution_field_enum NOT NULL
- label VARCHAR NOT NULL
- is_required BOOLEAN NOT NULL
- evaluation_weight NUMERIC NOT NULL
- accepted_answers_encrypted JSONB NOT NULL
- contradictory_answers_encrypted JSONB NULL
- display_order INTEGER NOT NULL
```

## Campos possíveis

- what_happened;
- responsible;
- method;
- location;
- time;
- motive.

## Índices

```text
UNIQUE(case_version_id, field_key)
```

---

# 13. Entidade: rooms

Representa uma sala de jogo.

```sql
rooms
- id UUID PK
- public_code VARCHAR UNIQUE NOT NULL
- recovery_code_hash VARCHAR NOT NULL
- host_user_id UUID FK anonymous_users.id NOT NULL
- case_version_id UUID FK case_versions.id NOT NULL
- status room_status_enum NOT NULL
- settings JSONB NOT NULL
- current_round INTEGER DEFAULT 0
- current_turn_id UUID NULL
- max_players INTEGER DEFAULT 6
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
- last_activity_at TIMESTAMP NOT NULL
- expires_at TIMESTAMP NOT NULL
- completed_at TIMESTAMP NULL
- cancelled_at TIMESTAMP NULL
- deleted_at TIMESTAMP NULL
```

## Exemplo de `settings`

```json
{
  "turn_order_mode": "random_fixed",
  "turn_timer_seconds": null,
  "vote_rule": "simple_majority",
  "hint_mode": "progressive",
  "locale": "pt-BR"
}
```

## Regras

- `public_code` não pode ser sequencial;
- `recovery_code_hash` nunca é enviado após validação;
- `expires_at = last_activity_at + 30 dias`;
- sala deve permanecer vinculada a uma única versão do caso;
- estado deve ser transacionado no backend.

## Índices

```text
UNIQUE(public_code)
INDEX(status)
INDEX(host_user_id)
INDEX(case_version_id)
INDEX(expires_at)
INDEX(last_activity_at)
```

---

# 14. Entidade: room_players

Relaciona usuários e salas.

```sql
room_players
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- anonymous_user_id UUID FK anonymous_users.id NOT NULL
- display_name VARCHAR NOT NULL
- is_host BOOLEAN DEFAULT FALSE
- connection_status connection_status_enum NOT NULL
- ready_status ready_status_enum NOT NULL
- turn_order INTEGER NULL
- joined_at TIMESTAMP NOT NULL
- last_seen_at TIMESTAMP NOT NULL
- left_at TIMESTAMP NULL
- removed_at TIMESTAMP NULL
```

## Regras

- um usuário não pode entrar duas vezes na mesma sala;
- máximo de 6 jogadores ativos;
- somente um anfitrião ativo;
- `turn_order` único entre jogadores ativos;
- jogador removido não pode votar.

## Índices

```text
UNIQUE(room_id, anonymous_user_id)
UNIQUE(room_id, turn_order) WHERE removed_at IS NULL
INDEX(room_id, connection_status)
INDEX(room_id, is_host)
```

---

# 15. Entidade: room_events

Event log da sala.

```sql
room_events
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- event_type room_event_type_enum NOT NULL
- actor_player_id UUID FK room_players.id NULL
- aggregate_type VARCHAR NOT NULL
- aggregate_id UUID NULL
- event_version INTEGER NOT NULL
- idempotency_key VARCHAR UNIQUE NOT NULL
- payload JSONB NOT NULL
- created_at TIMESTAMP NOT NULL
```

## Objetivo

- auditoria;
- sincronização;
- reconexão;
- reconstrução parcial;
- analytics;
- troubleshooting.

## Regras

- todo evento mutável deve ter `idempotency_key`;
- `event_version` deve crescer por sala;
- payload não deve conter solução;
- eventos privados devem ser filtrados por permissão.

## Índices

```text
UNIQUE(idempotency_key)
UNIQUE(room_id, event_version)
INDEX(room_id, created_at)
INDEX(event_type)
```

---

# 16. Entidade: turns

```sql
turns
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- player_id UUID FK room_players.id NOT NULL
- round_number INTEGER NOT NULL
- order_index INTEGER NOT NULL
- status turn_status_enum NOT NULL
- started_at TIMESTAMP NULL
- completed_at TIMESTAMP NULL
- passed_at TIMESTAMP NULL
- error_code VARCHAR NULL
- created_at TIMESTAMP NOT NULL
```

## Regras

- apenas um turno ACTIVE por sala;
- turno não avança enquanto pergunta estiver em processamento;
- falha da IA não completa turno;
- passe não gera penalidade.

## Índices

```text
INDEX(room_id, round_number)
INDEX(room_id, status)
UNIQUE(room_id, round_number, order_index)
```

---

# 17. Entidade: questions

```sql
questions
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- turn_id UUID FK turns.id NOT NULL
- player_id UUID FK room_players.id NOT NULL
- sequence_number INTEGER NOT NULL
- original_text TEXT NOT NULL
- normalized_text TEXT NULL
- status question_status_enum NOT NULL
- similarity_group_id UUID NULL
- repeated_question_id UUID FK questions.id NULL
- submitted_at TIMESTAMP NOT NULL
- processed_at TIMESTAMP NULL
- cancelled_at TIMESTAMP NULL
```

## Regras

- `sequence_number` único por sala;
- pergunta ambígua pode ser armazenada como rejeitada;
- pergunta inválida não deve consumir turno;
- pergunta repetida pode referenciar original.

## Índices

```text
UNIQUE(room_id, sequence_number)
INDEX(room_id, status)
INDEX(turn_id)
INDEX(repeated_question_id)
```

---

# 18. Entidade: question_interpretations

Armazena a saída estruturada da IA de interpretação.

```sql
question_interpretations
- id UUID PK
- question_id UUID FK questions.id UNIQUE NOT NULL
- intent_key VARCHAR NULL
- entities JSONB NOT NULL
- premises JSONB NOT NULL
- ambiguity_reason TEXT NULL
- related_fact_keys JSONB NOT NULL
- related_answer_rule_ids JSONB NOT NULL
- possible_unlocks JSONB NULL
- confidence NUMERIC NULL
- model_name VARCHAR NOT NULL
- created_at TIMESTAMP NOT NULL
```

## Uso

Esta entidade permite auditar o raciocínio operacional sem armazenar cadeia de pensamento privada.

---

# 19. Entidade: master_answers

```sql
master_answers
- id UUID PK
- question_id UUID FK questions.id NOT NULL
- classification master_classification_enum NOT NULL
- factual_payload JSONB NOT NULL
- rendered_text TEXT NOT NULL
- validation_status answer_validation_status_enum NOT NULL
- model_name VARCHAR NULL
- fallback_used BOOLEAN DEFAULT FALSE
- is_correction BOOLEAN DEFAULT FALSE
- corrected_answer_id UUID FK master_answers.id NULL
- created_at TIMESTAMP NOT NULL
```

## Exemplo de `factual_payload`

```json
{
  "premises": [
    {
      "claim": "door_was_open",
      "classification": "YES"
    },
    {
      "claim": "door_was_forced",
      "classification": "NO"
    }
  ],
  "unlocked_hint": null
}
```

## Regras

- apenas uma resposta ativa por pergunta;
- correções referenciam resposta anterior;
- `rendered_text` deve ser validado contra `factual_payload`;
- resposta inválida não deve ser exibida.

## Índices

```text
INDEX(question_id)
INDEX(validation_status)
INDEX(corrected_answer_id)
```

---

# 20. Entidade: clarification_requests

```sql
clarification_requests
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- question_id UUID FK questions.id NOT NULL
- requested_by_player_id UUID FK room_players.id NOT NULL
- status clarification_status_enum NOT NULL
- response_text TEXT NULL
- created_at TIMESTAMP NOT NULL
- answered_at TIMESTAMP NULL
```

## Regras

- máximo de um esclarecimento ativo por pergunta;
- não consome turno;
- resposta não pode revelar fato bloqueado.

---

# 21. Entidade: contestations

```sql
contestations
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- question_id UUID FK questions.id NOT NULL
- master_answer_id UUID FK master_answers.id NOT NULL
- reported_by_player_id UUID FK room_players.id NOT NULL
- reason contestation_reason_enum NOT NULL
- comment TEXT NULL
- status contestation_status_enum NOT NULL
- resolution JSONB NULL
- created_at TIMESTAMP NOT NULL
- resolved_at TIMESTAMP NULL
```

## Motivos

- contradicts_previous_answer;
- contradicts_case_fact;
- appears_invented;
- reveals_too_much;
- unclear;
- other.

## Regras

- não penalizar jogador;
- correção deve gerar evento;
- contestação deve alimentar métricas.

---

# 22. Entidade: hint_usages

```sql
hint_usages
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- case_hint_id UUID FK case_hints.id NOT NULL
- requested_by_player_id UUID FK room_players.id NULL
- vote_id UUID NULL
- usage_order INTEGER NOT NULL
- penalty_points INTEGER NOT NULL
- used_at TIMESTAMP NOT NULL
```

## Regras

- uma pista não pode ser usada duas vezes;
- ordem deve respeitar configuração;
- penalidade deve ser registrada no momento do uso.

## Índices

```text
UNIQUE(room_id, case_hint_id)
UNIQUE(room_id, usage_order)
```

---

# 23. Entidade: theories

```sql
theories
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- player_id UUID FK room_players.id NOT NULL
- attempt_number INTEGER NOT NULL
- answers JSONB NOT NULL
- status theory_status_enum NOT NULL
- submitted_at TIMESTAMP NULL
- revealed_at TIMESTAMP NULL
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
```

## Exemplo de `answers`

```json
{
  "what_happened": "A caixa foi trocada antes da festa.",
  "responsible": "O administrador",
  "method": "Substituição por réplica",
  "location": "Escritório",
  "time": "Antes da chegada dos convidados",
  "motive": "Impedir a venda"
}
```

## Regras

- uma teoria por jogador por tentativa;
- rascunho privado;
- somente status SUBMITTED entra na revelação;
- após revelação, teoria não pode ser editada.

## Índices

```text
UNIQUE(room_id, player_id, attempt_number)
INDEX(room_id, status)
```

---

# 24. Entidade: votes

```sql
votes
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- vote_type vote_type_enum NOT NULL
- status vote_status_enum NOT NULL
- options JSONB NOT NULL
- created_by_player_id UUID FK room_players.id NULL
- opened_at TIMESTAMP NOT NULL
- closed_at TIMESTAMP NULL
- result_option_key VARCHAR NULL
- tie_count INTEGER DEFAULT 0
```

## Tipos

- start_theory;
- choose_theory;
- use_hint;
- reveal_solution;
- continue_without_player;
- transfer_host;
- continue_after_attempt.

## Regras

- apenas uma votação ativa por tipo relevante;
- maioria simples;
- empate segue regra do fluxo;
- resultado é imutável após fechamento.

---

# 25. Entidade: vote_responses

```sql
vote_responses
- id UUID PK
- vote_id UUID FK votes.id NOT NULL
- player_id UUID FK room_players.id NOT NULL
- option_key VARCHAR NOT NULL
- created_at TIMESTAMP NOT NULL
- updated_at TIMESTAMP NOT NULL
```

## Regras

- um voto por jogador;
- pode ser alterado antes do fechamento;
- jogadores removidos não contam;
- jogadores desconectados seguem regra da sala.

## Índices

```text
UNIQUE(vote_id, player_id)
INDEX(vote_id, option_key)
```

---

# 26. Entidade: theory_evaluations

```sql
theory_evaluations
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- theory_id UUID FK theories.id NOT NULL
- attempt_number INTEGER NOT NULL
- overall_result theory_result_enum NOT NULL
- dimension_results JSONB NOT NULL
- feedback_text TEXT NOT NULL
- score_delta INTEGER NOT NULL
- model_name VARCHAR NULL
- validation_status answer_validation_status_enum NOT NULL
- created_at TIMESTAMP NOT NULL
```

## Exemplo de `dimension_results`

```json
{
  "responsible": "CORRECT",
  "method": "INCOMPLETE",
  "location": "CORRECT",
  "motive": "INCORRECT"
}
```

## Regras

- avaliação deve usar apenas critérios da versão do caso;
- feedback não pode revelar solução;
- resultado correto deve ser validado antes de encerrar.

---

# 27. Entidade: game_results

```sql
game_results
- id UUID PK
- room_id UUID FK rooms.id UNIQUE NOT NULL
- completion_status completion_status_enum NOT NULL
- final_score INTEGER NOT NULL
- title VARCHAR NOT NULL
- duration_seconds INTEGER NOT NULL
- question_count INTEGER NOT NULL
- repeated_question_count INTEGER NOT NULL
- hints_used INTEGER NOT NULL
- formal_attempts INTEGER NOT NULL
- extra_attempts INTEGER NOT NULL
- contestation_count INTEGER NOT NULL
- score_breakdown JSONB NOT NULL
- completed_at TIMESTAMP NOT NULL
```

## Status

- solved;
- revealed;
- abandoned;
- technical_failure;
- cancelled.

## Regras

- score mínimo 0;
- score deve ser reproduzível;
- breakdown deve explicar cálculo.

---

# 28. Entidade: feedback

```sql
feedback
- id UUID PK
- room_id UUID FK rooms.id NOT NULL
- anonymous_player_hash VARCHAR NOT NULL
- rating INTEGER NULL
- fair_solution fair_solution_enum NULL
- master_error_count perception_count_enum NULL
- confusion_area confusion_area_enum NULL
- play_another play_another_enum NULL
- recommendation_score INTEGER NULL
- best_moment TEXT NULL
- worst_moment TEXT NULL
- hardest_part TEXT NULL
- created_at TIMESTAMP NOT NULL
```

## Regras

- não salvar nome;
- `anonymous_player_hash` deve ser específico por sala;
- texto livre pode passar por desidentificação;
- nota entre 1 e 5;
- recomendação entre 0 e 10.

## Índices

```text
INDEX(room_id)
INDEX(created_at)
```

---

# 29. Entidade: analytics_events

```sql
analytics_events
- id UUID PK
- event_name VARCHAR NOT NULL
- room_id UUID NULL
- anonymous_session_hash VARCHAR NULL
- properties JSONB NOT NULL
- created_at TIMESTAMP NOT NULL
```

## Eventos principais

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

## Regras

- não armazenar texto integral da solução;
- não armazenar nome;
- não armazenar código público;
- evitar identificadores diretos.

---

# 30. Entidade: privacy_requests

```sql
privacy_requests
- id UUID PK
- anonymous_user_id UUID FK anonymous_users.id NULL
- request_token_hash VARCHAR NOT NULL
- request_type privacy_request_type_enum NOT NULL
- status privacy_request_status_enum NOT NULL
- scope JSONB NOT NULL
- created_at TIMESTAMP NOT NULL
- completed_at TIMESTAMP NULL
```

## Tipos

- delete_local_reference;
- delete_server_data;
- revoke_consent;
- export_data.

Mesmo sem conta, esta entidade permite exclusão vinculada a token temporário.

---

# 31. Enums

## case_type_enum

```text
TUTORIAL
QUICK
MEDIUM
```

## difficulty_enum

```text
EASY
MEDIUM
HARD
EXPERT
```

## case_status_enum

```text
DRAFT
TESTING
PUBLISHED
SUSPENDED
ARCHIVED
```

## case_version_status_enum

```text
DRAFT
VALIDATING
READY_FOR_TEST
TESTING
APPROVED
PUBLISHED
SUSPENDED
ARCHIVED
```

## fact_visibility_enum

```text
PUBLIC
DISCOVERABLE
RESTRICTED
SECRET
```

## pre_unlock_policy_enum

```text
BLOCK
PARTIAL
ANSWER
REDIRECT
```

## master_classification_enum

```text
YES
NO
PARTIAL
IRRELEVANT
UNKNOWN
BLOCKED
AMBIGUOUS
MULTI_PREMISE
```

## room_status_enum

```text
CREATED
LOBBY
READY
PLAYING
THEORY_DRAFT
THEORY_VOTING
THEORY_EVALUATION
REVEAL
RESULT
COMPLETED
PAUSED
CONNECTION_ISSUE
AI_UNAVAILABLE
CANCELLED
EXPIRED
```

## connection_status_enum

```text
CONNECTED
DISCONNECTED
RECONNECTING
LEFT
REMOVED
```

## ready_status_enum

```text
NOT_READY
READY
```

## turn_status_enum

```text
WAITING
ACTIVE
QUESTION_DRAFT
QUESTION_PROCESSING
ANSWERED
COMPLETED
PASSED
ERROR
RETRYING
```

## question_status_enum

```text
DRAFT
SUBMITTED
PROCESSING
ANSWERED
AMBIGUOUS
REJECTED
FAILED
CANCELLED
```

## answer_validation_status_enum

```text
PENDING
VALID
INVALID
FALLBACK
CORRECTED
```

## clarification_status_enum

```text
REQUESTED
PROCESSING
ANSWERED
FAILED
```

## contestation_reason_enum

```text
CONTRADICTS_PREVIOUS_ANSWER
CONTRADICTS_CASE_FACT
APPEARS_INVENTED
REVEALS_TOO_MUCH
UNCLEAR
OTHER
```

## contestation_status_enum

```text
OPEN
REVIEWING
CONFIRMED_ERROR
NO_ERROR
CORRECTED
CLOSED
```

## theory_status_enum

```text
DRAFT
SUBMITTED
SKIPPED
REVEALED
SELECTED
EVALUATED
```

## theory_result_enum

```text
CORRECT
PARTIAL
INCORRECT
NOT_SUPPORTED
```

## vote_type_enum

```text
START_THEORY
CHOOSE_THEORY
USE_HINT
REVEAL_SOLUTION
CONTINUE_WITHOUT_PLAYER
TRANSFER_HOST
CONTINUE_AFTER_ATTEMPT
```

## vote_status_enum

```text
OPEN
CLOSED
CANCELLED
TIED
```

## completion_status_enum

```text
SOLVED
REVEALED
ABANDONED
TECHNICAL_FAILURE
CANCELLED
```

## fair_solution_enum

```text
YES
PARTIALLY
NO
```

## perception_count_enum

```text
NONE
ONE
MORE_THAN_ONE
```

## confusion_area_enum

```text
NONE
RULES
MASTER_RESPONSES
INTERFACE
SOLUTION
TURN_SYSTEM
VOTING
OTHER
```

## play_another_enum

```text
YES
MAYBE
NO
```

## privacy_request_type_enum

```text
DELETE
EXPORT
REVOKE
```

## privacy_request_status_enum

```text
OPEN
PROCESSING
COMPLETED
REJECTED
```

## solution_field_enum

```text
WHAT_HAPPENED
RESPONSIBLE
METHOD
LOCATION
TIME
MOTIVE
```

---

# 32. Relacionamentos principais

```text
anonymous_users 1 ─── N room_players
rooms 1 ─── N room_players
cases 1 ─── N case_versions
case_versions 1 ─── N case_facts
case_versions 1 ─── N case_hints
case_versions 1 ─── N case_answer_rules
case_versions 1 ─── N case_solution_fields
rooms N ─── 1 case_versions
rooms 1 ─── N turns
turns 1 ─── N questions
questions 1 ─── N master_answers
rooms 1 ─── N theories
rooms 1 ─── N votes
votes 1 ─── N vote_responses
theories 1 ─── N theory_evaluations
rooms 1 ─── 1 game_results
rooms 1 ─── N feedback
rooms 1 ─── N room_events
```

---

# 33. Restrições de integridade

## Sala

- apenas um anfitrião ativo;
- até 6 jogadores ativos;
- apenas um turno ativo;
- apenas uma votação ativa por finalidade;
- apenas uma versão de caso.

## Pergunta

- apenas jogador da vez pode criar;
- pergunta só é válida em sala PLAYING;
- pergunta deve pertencer ao turno ativo;
- pergunta não pode receber resposta antes da interpretação.

## Teoria

- apenas em THEORY_DRAFT;
- uma por jogador por tentativa;
- teoria revelada não pode ser editada.

## Voto

- jogador deve estar ativo;
- um voto por votação;
- voto fechado não pode mudar.

## Resultado

- apenas um por sala;
- só pode existir após REVEAL ou COMPLETED.

---

# 34. Estratégia de concorrência

## 34.1 Versionamento otimista

Adicionar `state_version` à sala ou usar `event_version`.

Toda ação mutável deve informar a versão conhecida.

Se houver conflito:

```text
409 STATE_VERSION_CONFLICT
```

O cliente deve:

1. buscar estado atual;
2. reaplicar ação quando seguro;
3. evitar duplicidade.

## 34.2 Idempotência

Ações que exigem chave:

- enviar pergunta;
- passar turno;
- votar;
- usar pista;
- enviar teoria;
- iniciar partida;
- transferir anfitrião.

## 34.3 Transações

Operações críticas devem ser atômicas:

- concluir resposta e avançar turno;
- fechar votação e selecionar resultado;
- avaliar teoria e atualizar estado;
- transferir anfitrião;
- calcular resultado.

---

# 35. Políticas de retenção

| Entidade | Retenção |
|---|---|
| anonymous_users | até exclusão ou inatividade prolongada |
| rooms | 30 dias após última atividade |
| room_events | 30 a 90 dias para suporte |
| questions | 30 dias vinculadas à sala |
| master_answers | 30 dias vinculadas à sala |
| feedback | até 12 meses desidentificado |
| analytics_events | até 12 meses |
| game_results | 30 dias no MVP sem conta |
| contestations | até 12 meses desidentificado |
| logs técnicos | prazo curto, conforme necessidade |
| solução do caso | enquanto versão existir |

## Regras

- dados expirados devem ser removidos por job;
- métricas agregadas podem permanecer;
- textos livres devem passar por desidentificação;
- solução nunca deve ser incluída em analytics.

---

# 36. Segurança

## 36.1 Solução

- criptografada em repouso;
- acessível apenas ao serviço do Mestre;
- nunca enviada integralmente ao cliente;
- nunca incluída em logs;
- nunca retornada em endpoints públicos.

## 36.2 Sala

- código público com entropia adequada;
- código de recuperação separado;
- recuperação com rate limiting;
- links temporários para qualquer arquivo futuro.

## 36.3 Autorização

Toda rota deve validar:

- identidade anônima;
- vínculo com sala;
- papel na sala;
- estado atual;
- permissão da ação.

## 36.4 Rate limiting

Aplicar em:

- criar sala;
- entrar por código;
- recuperar anfitrião;
- enviar pergunta;
- contestar;
- votar.

---

# 37. Contratos mínimos de API

## 37.1 Criar sala

```http
POST /api/rooms
```

Request:

```json
{
  "caseId": "uuid",
  "settings": {
    "turnOrderMode": "random_fixed",
    "turnTimerSeconds": null,
    "voteRule": "simple_majority"
  }
}
```

Response:

```json
{
  "roomId": "uuid",
  "publicCode": "M7K4Q2",
  "inviteUrl": "https://app/room/M7K4Q2",
  "recoveryCode": "R8X2-P9LM"
}
```

---

## 37.2 Entrar na sala

```http
POST /api/rooms/{publicCode}/join
```

Request:

```json
{
  "displayName": "Jessica",
  "deviceToken": "..."
}
```

Response:

```json
{
  "roomPlayerId": "uuid",
  "room": {},
  "sessionToken": "..."
}
```

---

## 37.3 Obter estado

```http
GET /api/rooms/{roomId}/state
```

Response:

```json
{
  "room": {},
  "players": [],
  "currentTurn": {},
  "latestEvents": [],
  "stateVersion": 42
}
```

---

## 37.4 Enviar pergunta

```http
POST /api/rooms/{roomId}/questions
```

Request:

```json
{
  "turnId": "uuid",
  "text": "A porta estava trancada?",
  "idempotencyKey": "uuid",
  "stateVersion": 42
}
```

Response:

```json
{
  "questionId": "uuid",
  "status": "PROCESSING"
}
```

---

## 37.5 Solicitar esclarecimento

```http
POST /api/questions/{questionId}/clarifications
```

---

## 37.6 Contestar resposta

```http
POST /api/master-answers/{answerId}/contestations
```

---

## 37.7 Passar turno

```http
POST /api/rooms/{roomId}/turns/{turnId}/pass
```

---

## 37.8 Usar pista

```http
POST /api/rooms/{roomId}/hints/{hintIndex}/request
```

---

## 37.9 Enviar teoria

```http
POST /api/rooms/{roomId}/theories
```

Request:

```json
{
  "attemptNumber": 1,
  "answers": {
    "what_happened": "...",
    "responsible": "...",
    "method": "...",
    "location": "...",
    "time": "...",
    "motive": "..."
  }
}
```

---

## 37.10 Votar

```http
POST /api/votes/{voteId}/responses
```

Request:

```json
{
  "optionKey": "theory_uuid"
}
```

---

# 38. Contrato do evento em tempo real

Formato:

```json
{
  "eventId": "uuid",
  "roomId": "uuid",
  "eventType": "master_answered",
  "eventVersion": 43,
  "createdAt": "2026-07-15T18:00:00Z",
  "payload": {}
}
```

## Eventos privados

Quando houver payload privado, o backend deve filtrar por jogador.

No MVP Técnico 1, quase todos os eventos são compartilhados.

---

# 39. Contrato da interpretação da IA

Input:

```json
{
  "question": "A porta estava aberta porque foi arrombada?",
  "publicFacts": [],
  "unlockedFacts": [],
  "questionHistory": []
}
```

Output:

```json
{
  "intentKey": "door_state_and_forcing",
  "entities": ["door"],
  "premises": [
    "door_was_open",
    "door_was_forced"
  ],
  "ambiguity": null,
  "possibleDuplicateQuestionId": null,
  "confidence": 0.97
}
```

---

# 40. Contrato do motor determinístico

Input:

```json
{
  "caseVersionId": "uuid",
  "intentKey": "door_state_and_forcing",
  "premises": [
    "door_was_open",
    "door_was_forced"
  ],
  "roomState": {}
}
```

Output:

```json
{
  "classification": "MULTI_PREMISE",
  "premiseAnswers": [
    {
      "factKey": "door_was_open",
      "classification": "YES"
    },
    {
      "factKey": "door_was_forced",
      "classification": "NO"
    }
  ],
  "unlockActions": [],
  "allowedContext": []
}
```

---

# 41. Contrato da redação

Input:

```json
{
  "factualDecision": {},
  "masterStyle": {
    "tone": "mysterious",
    "humorAllowed": false,
    "maxSentences": 2
  }
}
```

Output:

```json
{
  "text": "A porta estava aberta: sim. Ela não foi arrombada."
}
```

---

# 42. Validação da resposta

A resposta só pode ser exibida quando:

- classificação corresponde ao payload;
- não contém entidade nova;
- não contém solução;
- não contém fato bloqueado;
- respeita tamanho;
- respeita idioma;
- não contradiz histórico.

Se falhar:

- regenerar uma vez;
- usar fallback determinístico.

---

# 43. Jobs agendados

## Expiração de sala

Executar periodicamente:

```text
rooms.expires_at < now()
→ status = EXPIRED
→ bloquear entrada
→ agendar limpeza
```

## Limpeza

- remover sessões expiradas;
- apagar dados transitórios;
- preservar métricas agregadas;
- remover tokens inválidos.

## Agregação de métricas

- consolidar resultados;
- desidentificar;
- calcular taxas.

---

# 44. Migrações recomendadas

### Migração 1

- anonymous_users;
- cases;
- case_versions;
- rooms;
- room_players.

### Migração 2

- turns;
- questions;
- question_interpretations;
- master_answers;
- room_events.

### Migração 3

- case_facts;
- case_answer_rules;
- case_hints;
- hint_usages.

### Migração 4

- theories;
- votes;
- vote_responses;
- theory_evaluations;
- game_results.

### Migração 5

- feedback;
- analytics_events;
- contestations;
- privacy_requests.

---

# 45. Dados seed mínimos

Criar:

- 1 caso tutorial;
- 1 caso rápido técnico;
- 1 versão publicada;
- fatos;
- regras de resposta;
- 3 pistas;
- campos de solução;
- regras de pontuação.

Também criar dados de teste:

- sala com 3 jogadores;
- turno ativo;
- perguntas respondidas;
- votação aberta;
- teoria parcial;
- resultado concluído.

---

# 46. Critérios de aceite do modelo

O modelo está pronto quando:

- sala suporta 2 a 6 jogadores;
- jogador reconecta;
- apenas um turno fica ativo;
- perguntas são numeradas;
- respostas podem ser corrigidas;
- pistas não repetem;
- teorias permanecem privadas;
- votos são únicos;
- resultado é reproduzível;
- solução não chega ao frontend;
- eventos são idempotentes;
- sala expira;
- métricas são desidentificadas;
- versão do caso é preservada.

---

# 47. Próximo documento recomendado

Após este arquivo, criar:

> `regras-mestre-ia.md`

Esse documento deve detalhar:

- system prompt;
- schemas de entrada e saída;
- regras de interpretação;
- validações;
- fallback;
- avaliação da teoria;
- proteção contra invenção;
- tratamento de ambiguidades;
- casos de teste.
