# Aplicativo de Marcação de Consultas Médicas - Fork para o CP01

Este é um aplicativo React Native para marcação de consultas médicas, desenvolvido como parte do curso de Desenvolvimento Mobile da FIAP.

## Funcionalidades Implementadas

- Lista de consultas agendadas
- Formulário de agendamento com seleção de data/hora
- Lista de médicos especialistas
- Persistência de dados com AsyncStorage
- Interface moderna e responsiva
- Navegação entre telas

## Tecnologias Utilizadas

- React Native
- TypeScript
- Styled Components
- React Navigation
- AsyncStorage
- React Native Elements
- DateTimePicker

## Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npx expo start
```

4. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR Code ou execute em um emulador.

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── screens/       # Telas do aplicativo
  ├── routes/        # Configuração de navegação
  ├── styles/        # Estilos e tema
  ├── types/         # Definições de tipos TypeScript
  └── services/      # Serviços e integrações
```

## Próximos Passos

- Implementar autenticação de usuário
- Adicionar notificações de lembretes
- Integrar com uma API de backend
- Melhorar a validação de formulários
- Adicionar testes automatizados

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 
