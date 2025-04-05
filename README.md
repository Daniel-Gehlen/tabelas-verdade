# Tabuada Lógica - Memorizador de Tabelas-Verdade  

## 🔍 Visão Geral  
O **Tabuada Lógica** é uma ferramenta educacional interativa para estudo e memorização de **tabelas-verdade**, essenciais em lógica proposicional. Ele ajuda estudantes a compreender operadores como **negação (¬)**, **conjunção (∧)**, **disjunção (∨)**, **condicional (→)** e **bicondicional (↔)** por meio de visualização, prática e testes.  

## 📖 Fundamentos Lógicos  
As **tabelas-verdade** definem o resultado de operações lógicas baseadas em valores de entrada (Verdadeiro `V` ou Falso `F`). Este projeto aborda:  
- **NEGAÇÃO (¬p)**: Inverte o valor (V → F, F → V).  
- **CONJUNÇÃO (p ∧ q)**: Só é `V` se ambos forem `V`.  
- **DISJUNÇÃO (p ∨ q)**: Só é `F` se ambos forem `F`.  
- **CONDICIONAL (p → q)**: Só é `F` quando `V → F` (regra "Vera Fischer é Falsa").  
- **BICONDICIONAL (p ↔ q)**: Só é `V` se ambos valores forem iguais.  

## 💻 Tecnologias Utilizadas  
- **HTML5** → Estrutura semântica e acessível.  
- **CSS3** → Layout responsivo com **Grid** e **Flexbox**, variáveis CSS (`:root`).  
- **JavaScript (ES6)** → Lógica dinâmica, manipulação do DOM e interatividade.  

## 🛠️ Técnicas de Implementação  
1. **Renderização Dinâmica**  
   - Tabelas geradas via JS com base em estruturas de dados.  
   - Modos de visualização (completa, prática, quiz) controlados por classes (`hidden`).  

2. **Gamificação**  
   - **Modo Quiz**: Perguntas aleatórias com pontuação em tempo real.  
   - **Feedback Visual**: Cores para acertos (`#4CAF50`) e erros (`#F44336`).  

3. **Responsividade**  
   - Design adaptável (mobile/desktop) com media queries.  

## 🎯 Casos de Uso  
1. **Estudo Autodidata** → Visualizar tabelas e macetes.  
2. **Sala de Aula** → Professores podem usar para demonstrações.  
3. **Revisão Rápida** → Teste com perguntas aleatórias.  
4. **Preparação para Provas** → Praticar preenchimento de tabelas.  

## 📌 Exemplo de Uso  
```javascript
// Estrutura de dados para operadores
const logicalOperators = [
  {
    name: "Conjunção (p ∧ q)",
    symbol: "∧",
    truthTable: [
      ["p", "q", "p ∧ q"],
      ["V", "V", "V"],
      ["V", "F", "F"],
      // ...
    ],
    tip: "Só é V quando ambos são V"
  }
];
```

## 🚀 Como Executar  
1. Clone o repositório:  
   ```bash
   git clone https://github.com/seu-usuario/tabuada-logica.git
   ```  
2. Abra `index.html` no navegador.  
