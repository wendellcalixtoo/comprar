# 🛒 Comprar - Lista de Compras

Bem-vindo ao **Comprar**, um aplicativo mobile para gerenciar sua lista de compras de forma simples, rápida e eficiente!  
Com ele, você pode adicionar, marcar como comprado, filtrar e remover itens da sua lista, tudo com uma interface moderna e intuitiva.

---

## ✨ Funcionalidades

- **Adicionar itens:** Digite o que precisa comprar e adicione à lista.
- **Filtrar por status:** Visualize itens pendentes ou já comprados.
- **Marcar como comprado:** Altere o status dos itens com apenas um toque.
- **Remover itens:** Exclua itens individualmente.
- **Limpar lista:** Remova todos os itens de uma vez.
- **Persistência local:** Todos os dados ficam salvos no dispositivo, mesmo fechando o app.

---

## 🖼️ Interface

- Interface amigável e responsiva.
- Ícones visuais para status dos itens (pendente/comprado).
- Feedbacks visuais e alertas para ações importantes.

---

## 🚀 Tecnologias Utilizadas

- **React Native**: Base do desenvolvimento mobile.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **AsyncStorage**: Persistência local dos dados.
- **Lucide React Native**: Ícones modernos e leves.
- **React Navigation** (caso utilize navegação entre telas).
- **Styled Components** (caso utilize para estilização).
- **ESLint & Prettier**: Padronização e qualidade do código.

---

## 📦 Estrutura de Pastas

```
src/
 ├── app/
 │    └── Home/           # Tela principal
 ├── components/          # Componentes reutilizáveis (Button, Input, Filter, StatusIcon, Item)
 ├── storage/             # Lógica de persistência dos itens
 ├── types/               # Tipos TypeScript
 └── assets/              # Imagens e ícones
```

---

## 📲 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/comprar.git
   cd comprar
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Execute o app:**
   ```bash
   npx expo start
   # ou
   yarn start
   ```

4. **Abra no seu emulador ou dispositivo físico.**

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

Feito com 💙 por Wendell Calixto