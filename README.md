# 🏥 Sistema de Marcação de Consultas - Clínica XPTO

Sistema web desenvolvido em **Angular 20** para marcação de consultas e exames médicos online, com diferentes perfis de utilizadores e interface responsiva.

## 🚀 Funcionalidades

### 👤 Perfis de Utilizadores

1. **Utente Anónimo**: Marcação rápida sem necessidade de registo
2. **Utente Registado**: Acesso com login, histórico de marcações e gestão de dados pessoais
3. **Administrativo**: Gestão de pedidos, agendamento e confirmações
4. **Administrador**: Gestão completa de utilizadores e credenciais

### ✨ Principais Características

- ✅ Interface responsiva e moderna
- ✅ Formulários com validação completa
- ✅ Autenticação e autorização por roles
- ✅ Sistema de marcação com carrinho de atos clínicos
- ✅ Upload de fotografias
- ✅ Histórico de marcações
- ✅ Filtros por data e profissional
- ✅ Simulação de confirmações por email

## 🛠 Tecnologias Utilizadas

- **Angular 20** - Framework principal
- **TypeScript** - Linguagem de desenvolvimento
- **JSON Server** - Simulação do backend
- **RxJS** - Programação reativa
- **Angular Router** - Navegação
- **Angular Forms** - Formulários reativos
- **CSS Grid/Flexbox** - Layout responsivo

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 9 ou superior)

## 🔧 Instalação e Execução

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd app-marcacao-xpto
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute a aplicação
```bash
# Iniciar JSON Server e Angular simultaneamente
npm run dev

# OU executar separadamente:
# Terminal 1: JSON Server
npm run json-server

# Terminal 2: Angular
npm start
```

### 4. Acesse a aplicação
- **Frontend**: http://localhost:4200
- **API (JSON Server)**: http://localhost:3000

## 🔐 Credenciais de Demonstração

### Utente
- **Email**: joao.silva@email.com
- **Senha**: 123456

### Administrativo  
- **Email**: admin@clinicaxpto.com
- **Senha**: admin123

### Administrador
- **Email**: carlos.admin@clinicaxpto.com
- **Senha**: admin123

## 📁 Estrutura do Projeto

```
src/app/
├── componentes/           # Componentes da aplicação
│   ├── cabecalho/        # Cabeçalho com navegação
│   ├── pagina-inicial/   # Página principal
│   ├── login/            # Sistema de autenticação
│   ├── marcacao-anonima/ # Marcação sem registo
│   ├── marcacao-utente/  # Marcação para utentes registados
│   ├── historico/        # Histórico de marcações
│   ├── administracao/    # Área administrativa
│   ├── gestao-utentes/   # Gestão de utilizadores
│   └── shared/           # Componentes partilhados
├── models/               # Interfaces e modelos de dados
├── enums/                # Enumerações
├── services/             # Serviços para comunicação com API
├── guards/               # Guards de autenticação e autorização
└── ...
```

## 🔄 Fluxos de Utilizador

### Utente Anónimo
1. Acede à página inicial
2. Clica em "Marcar Consulta"
3. Preenche formulário com dados pessoais
4. Seleciona atos clínicos (múltipla seleção)
5. Escolhe subsistema de saúde e preferências
6. Submete pedido (estado: PEDIDO)
7. Recebe confirmação com número do pedido

### Utente Registado
1. Faz login na aplicação
2. Visualiza histórico de marcações
3. Pode filtrar por data/profissional
4. Exporta PDF de marcações
5. Edita dados pessoais
6. Cria novas marcações

### Administrativo
1. Faz login no sistema
2. Visualiza lista de pedidos pendentes
3. Altera estados: PEDIDO → AGENDADO → REALIZADO
4. Agenda e confirma marcações
5. Simula envio de emails de confirmação
6. Consulta histórico completo

### Administrador
1. Acede área de gestão
2. Cria e edita contas de utilizadores
3. Define tipos e credenciais de acesso
4. Gere permissões do sistema

## 📊 Modelos de Dados

### Utente
```typescript
interface Utente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  morada: string;
  dataNascimento: string;
  genero: string;
  numeroUtente: string;
  fotografia: string;
  senha?: string;
  role: 'anonimo' | 'utente' | 'administrativo' | 'admin';
}
```

### Pedido
```typescript
interface Pedido {
  id: number;
  utenteId: number;
  atos: AtoClinico[];
  subsistema: SubSistemaSaude;
  profissional?: number;
  intervaloDatas: string;
  horarioPreferido: string;
  observacoes: string;
  estado: EstadoPedido;
  dataSubmissao: string;
}
```

## 🎨 Design e UX

- **Design System**: Cores consistentes com gradientes modernos
- **Responsividade**: Suporte completo para mobile, tablet e desktop
- **Accessibility**: Estrutura semântica e navegação por teclado
- **Loading States**: Indicadores visuais durante operações
- **Error Handling**: Mensagens de erro claras e acionáveis
- **Micro-interactions**: Animações suaves e feedback visual

## 🔒 Segurança

- Autenticação baseada em tokens (simulada)
- Proteção de rotas com guards
- Validação de dados no frontend
- Controle de acesso por roles
- Sanitização de inputs

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px
- **Grid System**: Layout flexível com CSS Grid e Flexbox
- **Touch Friendly**: Botões e áreas de toque adequadas

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Variáveis de Ambiente
Configurar URLs da API conforme ambiente:
- Desenvolvimento: http://localhost:3000
- Produção: URL da API real

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Próximas Funcionalidades

- [ ] Integração com calendário
- [ ] Notificações push
- [ ] Chat em tempo real
- [ ] Relatórios avançados
- [ ] Integração com sistemas de pagamento
- [ ] API de terceiros (SNS, hospitais)

## 📞 Suporte

Para questões e suporte:
- Email: suporte@clinicaxpto.com
- Telefone: +351 21 123 4567

---

**Desenvolvido com ❤️ usando Angular 20**
