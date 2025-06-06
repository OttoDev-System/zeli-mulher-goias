# Regras do Projeto Plataforma Digital Deputada ZELI

Sempre Fale em PT-BR

Este documento define as diretrizes gerais para o desenvolvimento do projeto Plataforma Digital Deputada ZELI, estabelecendo padrões, fluxos de trabalho e critérios de qualidade a serem seguidos por todos os contribuidores.

## 1. Padrões de Código e Arquitetura

### 1.1. Padrões de Código Limpo

- Nomes de variáveis, funções e componentes devem ser descritivos e seguir convenção camelCase (JS/TS) ou snake_case (SQL).
- Funções devem ter responsabilidade única e tamanho limitado (máx. 50 linhas recomendado).
- Comentários devem explicar "por quê", não "o quê" (o código deve ser auto-explicativo).
- Evitar código duplicado, favorecendo componentes/funções reutilizáveis.
- Manter a complexidade ciclomática baixa (máx. 10 por função).

### 1.2. Estrutura do Projeto
- Manter a separação clara entre frontend e backend.
- Organizar código por domínio/módulo conforme definido na proposta consolidada.
- Frontend: Separar componentes de UI, lógica de negócios e integração com API.
- Backend: Seguir princípios de API RESTful para endpoints Supabase.

### 1.3. Convenções Específicas
- Componentes React: Usar função e não classe, com tipagem TS explícita.
- Hooks: Nomear com prefixo "use" e documentar parâmetros/retornos.
- SQL: Evitar consultas aninhadas complexas, favorecendo views ou funções.
- Modelos IA: Documentar datasets de treinamento, parâmetros e métricas.

## 2. Organização de Ambientes

### 2.1. Ambientes Padrão
- **Desenvolvimento**: Para trabalho individual e testes locais.
- **Homologação**: Para validação de features por stakeholders.
- **Produção**: Ambiente final para usuários reais.

### 2.2. Variáveis de Ambiente
- Nunca hardcoded, sempre via `.env` (local) ou gestor de segredos (produção).
- Nomenclatura: `VITE_` (para exposição no frontend), `SUPABASE_` (para backend).
- Documentar todas as variáveis necessárias em `.env.example`.

### 2.3. Gerenciamento de Dependências
- Evitar dependências com licenças restritivas ou pouca manutenção.
- Fixar versões específicas no `package.json` para garantir reprodutibilidade.
- Auditar regularmente dependências para vulnerabilidades.

## 3. Fluxos de Trabalho e Versionamento

### 3.1. Fluxo de Git
- **Trunk-based development**:
  - Branch principal: `main` ou `development`
  - Features em branches curtas: `feature/nome-feature`
  - Hotfixes: `fix/descricao-problema`
  - PRs obrigatórios para merge em `main`

### 3.2. Commits e PRs
- Commits atômicos e com mensagens significativas seguindo convenção:
  - `feat:` para novas funcionalidades
  - `fix:` para correções
  - `docs:` para documentação
  - `refactor:` para refatorações
  - `test:` para adição/modificação de testes
- PRs devem ter descrição clara, referências a issues e screenshots quando UI

### 3.3. Versionamento Semântico
- Seguir SemVer (MAJOR.MINOR.PATCH)
- MAJOR: Mudanças incompatíveis com versões anteriores
- MINOR: Adições de funcionalidades compatíveis
- PATCH: Correções de bugs compatíveis

## 4. Critérios de Aceitação e Testes

### 4.1. Tipos de Testes Requeridos
- **Unitários**: Cobertura para lógica crítica de backend e componentes frontend.
- **Integração**: Validação da comunicação entre camadas.
- **E2E**: Simulação de jornadas completas do usuário para fluxos principais.
- **Usabilidade**: Testes com usuários reais para garantir UX.
- **Performance**: Testes de carga para APIs e páginas críticas.
- **Segurança**: Revisão de RLS e permissões no Supabase.

### 4.2. Métricas de Qualidade Alvo
- Cobertura de testes: ≥ 80% para código crítico.
- Tempo de resposta API: < 300ms para 95% das requisições.
- Performance frontend: LCP < 2.5s em páginas chave.
- Disponibilidade: ≥ 99.9% em produção.
- Taxa de erro: < 0.1% de requisições 5xx.
- Precisão modelos IA: Específica por modelo (documentada).

### 4.3. Processo de Revisão
- Code review obrigatório por pelo menos 1 revisor.
- Verificação automática de linting e testes na CI.
- Validação de funcionalidades por PO em homologação.

## 5. Protocolos de Uso de IA

### 5.1. Responsabilidade e Transparência
- Documentar explicitamente onde a IA está sendo utilizada.
- Manter humano no ciclo para decisões críticas (ex: validação final de receitas).
- Garantir explicabilidade de resultados de modelos.

### 5.2. Privacidade e Segurança
- Modelos de IA não devem armazenar dados sensíveis.
- Consentimento explícito para uso de dados em treinamento.
- Implementar técnicas de anonimização/pseudonimização.

### 5.3. Requisitos para Modelos
- Documentação sobre datasets de treinamento.
- Métricas de performance e limites conhecidos.
- Estratégia para monitoramento em produção.
- Plano para retreinamento/atualização.

### 5.4. Validação de Resultados
- Monitoramento contínuo de eficácia (drift detection).
- Mecanismos para feedback de usuários sobre resultados.
- Auditoria regular de respostas em cenários críticos.

## 6. Implementação por Fases

### 6.1. Priorização de Módulos
- A implementação segue a estrutura de fases e prioridades definida na proposta consolidada.
- Funcionalidades dentro de um módulo devem ser priorizadas com base em:
  - Valor para o usuário
  - Dependências técnicas
  - Complexidade de implementação

### 6.2. Transição Entre Fases
- A progressão entre fases requer que:
  - 100% dos módulos críticos da fase anterior estejam completos
  - Módulos de alta prioridade tenham pelo menos 90% das funcionalidades
  - Testes automatizados para funcionalidades críticas estejam implementados
  - Aprovação formal do stakeholder principal

### 6.3. Implementação Iterativa
- Cada módulo deve ser desenvolvido seguindo ciclos incrementais:
  - MVP funcional primeiro
  - Refinamento baseado em feedback
  - Expansão com features complementares
  - Otimização de performance/UX

## 7. Monitoramento e Melhoria Contínua

### 7.1. Rastreamento de Bugs e Issues
- Todas as issues devem ser documentadas no sistema de tracking
- Priorização baseada em impacto (crítico, alto, médio, baixo)
- SLA para resolução conforme prioridade

### 7.2. Coleta de Métricas
- Implementar logging abrangente para diagnóstico
- Coletar métricas de performance e uso
- Analisar padrões de uso para melhorias de UX

### 7.3. Ciclo de Feedback
- Mecanismos para coleta de feedback de usuários
- Revisões periódicas de código/arquitetura
- Retrospectivas após cada milestone importante

---

*Última atualização: 2024-05-21*
*Versão: 1.0.0* 