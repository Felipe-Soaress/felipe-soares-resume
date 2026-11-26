import type { TranslationDictionary } from './types';

export const ptBR: TranslationDictionary = {
  meta: {
    title: 'Felipe Soares · Engenheiro Frontend Sênior',
    description:
      'Felipe Soares — Engenheiro Frontend Sênior com mais de 8 anos construindo aplicações web rápidas, escaláveis e acessíveis com React, TypeScript, microfrontends e design systems.',
  },
  a11y: {
    skipToContent: 'Pular para o conteúdo principal',
    primaryNav: 'Principal',
    mobileNav: 'Navegação móvel',
    home: 'Felipe Soares, voltar ao topo',
    language: 'Idioma',
    languageNames: { 'en-US': 'English', 'pt-BR': 'Português (Brasil)' },
    switchToLight: 'Alternar para tema claro',
    switchToDark: 'Alternar para tema escuro',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    opensInNewTab: '(abre em uma nova aba)',
    resumeDownload: 'Baixar currículo em inglês (PDF)',
  },
  nav: {
    about: 'Sobre',
    projects: 'Projetos',
    experience: 'Experiência',
    skills: 'Habilidades',
    contact: 'Contato',
    letsTalk: 'Vamos conversar',
    resume: 'Currículo (EN)',
  },
  hero: {
    badge: (years) => `${years}+ Anos de Experiência`,
    titleLead: 'Engenheiro Frontend',
    titleAccent: 'Sênior',
    subtitle:
      'Construo aplicações web rápidas, escaláveis e acessíveis — de microfrontends e design systems a plataformas headless CMS e fluxos assistidos por IA.',
    ctaPrimary: 'Ver meus projetos',
  },
  about: {
    eyebrow: 'Sobre mim',
    titleLead: 'Transformando problemas complexos em',
    titleAccent: 'soluções simples.',
    paragraphs: [
      'Sou Engenheiro Frontend Sênior com mais de 8 anos de experiência construindo aplicações web com React, TypeScript e Remix. Projeto e evoluo arquiteturas de microfrontends, monorepos, design systems e plataformas headless CMS como o Sanity.',
      'Já entreguei produtos em plataformas de games, ferramentas administrativas e de moderação, sistemas de localização e fluxos assistidos por IA com MCP — trabalhando com times internacionais e multidisciplinares, do design inicial à produção.',
    ],
    pillarsLabel: 'Como eu trabalho',
    pillars: {
      performance: 'Foco em Performance',
      architecture: 'Arquitetura Escalável',
      collaboration: 'Mentalidade Colaborativa',
      'user-centric': 'Design Centrado no Usuário',
    },
  },
  projects: {
    eyebrow: 'Projetos selecionados',
    title: 'Trabalhos recentes',
    viewAll: 'Ver todos os projetos',
    comingSoon: 'Link em breve',
    techLabel: 'Tecnologias',
    items: {
      'game-ops-platform': {
        title: 'Plataforma e Ferramentas de Operações de Games',
        description:
          'Plataforma central de operações para eventos in-game, catálogos de loja e conteúdo de jogos, com autenticação compartilhada e RBAC entre times.',
        imageAlt: 'Captura de tela da plataforma de operações de games',
      },
      'analytics-moderation': {
        title: 'Suíte de Analytics e Moderação',
        description:
          'Dashboards de analytics para criadores e fluxos de moderação de vídeos com status de processamento em tempo real.',
        imageAlt: 'Captura de tela dos dashboards de analytics e moderação',
      },
      'web-game-lab': {
        title: 'Laboratório de Jogos Web',
        description: 'Protótipos jogáveis de jogos web entregues em ciclos semanais com PixiJS e fluxos assistidos por IA.',
        imageAlt: 'Captura de tela de um protótipo de jogo web em PixiJS',
      },
    },
  },
  experience: {
    eyebrow: 'Trajetória profissional',
    title: 'Experiência e Formação',
    highlight: (commits, repos) => `${commits} commits em ${repos} repositórios na Fortis Games`,
    expandAll: 'Expandir todos',
    collapseAll: 'Recolher todos',
    remote: 'Remoto',
    keyTechnologies: 'Principais tecnologias',
    roles: {
      'fortis-se2': {
        title: 'Engenheiro de Software II',
        location: 'Remoto',
        achievements: [
          'Liderei a implementação frontend do site corporativo da Fortis Games, começando por avaliações de tecnologia e provas de conceito (POCs) com Sanity e Builder.io. Atuei como único desenvolvedor frontend em aproximadamente 80% do desenvolvimento.',
          'Arquitetei o dataset e a estrutura de conteúdo no Sanity, criando componentes dinâmicos para renderizar diferentes tipos de documentos. A plataforma suportava múltiplos idiomas, conteúdo baseado em geolocalização, vagas do Greenhouse, artigos da empresa e páginas dedicadas a cada jogo.',
          'Evoluí a plataforma central de conteúdo e operações de jogos da empresa, adicionando funcionalidades para gerenciar eventos in-game, itens da loja e catálogos de conteúdo dos jogos.',
          'Estendi ferramentas de Model Context Protocol (MCP) integradas ao Claude Code, permitindo que engenheiros de QA e Producers consultassem informações de jogos por ID, conteúdo ou pacote, incluindo disponibilidade, descrições e preços de itens.',
          'Estabeleci uma plataforma de microfrontends extensível, na qual times independentes podiam integrar suas próprias aplicações aproveitando autenticação compartilhada, controle de acesso baseado em papéis (RBAC) e bibliotecas de componentes reutilizáveis publicadas como pacotes npm.',
          'Automatizei o fluxo de documentação de licenças de terceiros do jogo com uma skill customizada que processava arquivos SBOM gerados pelo Unibom, classificava dependências conforme políticas internas, sinalizava itens que exigiam revisão jurídica e preparava o conteúdo para publicação no Sanity.',
          'Participei de uma iniciativa interna de incubação de jogos, prototipando jogos web com PixiJS e fluxos de desenvolvimento assistidos por IA, entregando builds jogáveis ao fim de cada ciclo semanal.',
        ],
      },
      'fortis-se1': {
        title: 'Engenheiro de Software I',
        location: 'Remoto',
        achievements: [
          'Expandi a plataforma administrativa de suporte do Magic: Puzzle Quest com funcionalidades para agendar eventos in-game, compor mensagens para jogadores, tratar solicitações de suporte, revisar o histórico de jogadores, verificar elegibilidade de recompensas e gerenciar sinalizações relacionadas a trapaças.',
          'Entreguei o frontend web de um jogo que já tinha cliente mobile em Unity, usando arquitetura de monorepo com Remix e React. A aplicação permitia jogar e trocar dados com a versão mobile, além de páginas dedicadas a conquistas, níveis e emojis de reação desbloqueáveis que os jogadores podiam equipar nos decks.',
          'Projetei uma plataforma administrativa de moderação de vídeos enviados e denunciados por jogadores. A interface consolidava resultados de validação automatizada, status de processamento e denúncias, permitindo que moderadores revisassem comentários, aprovassem ou removessem vídeos e reexecutassem validações quando o processamento falhava.',
        ],
      },
      'oktagon-fe': {
        title: 'Desenvolvedor Front-End',
        location: 'Londrina, Paraná, Brasil',
        achievements: [
          'Aprimorei o PopBase, plataforma interativa que ajudava criadores de conteúdo a gamificar o engajamento do público, adicionando importação de vídeos por URL, recursos de edição como corte e legendas e elementos interativos exibidos durante a reprodução.',
          'Desenvolvi dashboards analíticos e visualizações de dados para criadores de conteúdo, apresentando métricas como visualizações de vídeos, interações de usuários e gastos dos jogadores.',
          'Otimizei a aplicação de suporte a jogadores do Magic: Puzzle Quest, adicionando filtros e reorganizando as informações dos jogadores para melhorar a visibilidade dos dados e simplificar os fluxos de suporte.',
          'Orquestrei os módulos frontend de uma arquitetura de microfrontends, incluindo dashboards com gráficos gerados por serviços Python e uma plataforma de localização de jogos para tradutores externos. O sistema tinha interfaces específicas por papel, validação de chaves de tradução, busca e ranqueamento por similaridade e comunicação via WebSocket.',
        ],
      },
      'yankton-fs': {
        title: 'Desenvolvedor Full-Stack',
        location: 'Cornélio Procópio, Paraná, Brasil',
        achievements: [
          'Contribuí para um sistema de controle de ponto de funcionários, incluindo cálculo de horas trabalhadas e gestão de banco de horas.',
          'Ajudei a lançar um aplicativo mobile para uma barbearia com React Native, permitindo que clientes consultassem preços de serviços e agendassem horários.',
          'Mantive e evoluí um sistema legado de gestão de Recursos Humanos em C# e SQL, usando MongoDB como banco de dados principal em outros projetos.',
        ],
      },
    },
    education: {
      heading: 'Formação',
      degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      institution: 'Universidade Tecnológica Federal do Paraná (UTFPR)',
      location: 'Cornélio Procópio, Paraná, Brasil',
      courseworkLabel: 'Principais disciplinas',
      coursework: [
        'Engenharia de Software e Metodologias de Desenvolvimento',
        'Sistemas de Gerenciamento de Banco de Dados',
        'Desenvolvimento de Aplicações Web',
        'Redes de Computadores e Arquitetura de Software',
      ],
      extensionTitle: 'Projeto de extensão — Robótica Educacional e Programação para Crianças',
      extensionPoints: [
        'Ensinei lógica de programação a crianças de escolas públicas por meio da robótica educacional LEGO.',
        'Apoiei atividades práticas com robôs LEGO para introduzir conceitos de programação e pensamento computacional.',
        'Ajudei a integrar robótica e programação a atividades que apoiavam o aprendizado das crianças em diferentes disciplinas.',
      ],
    },
  },
  skills: {
    eyebrow: 'Especialidades técnicas',
    title: 'Tecnologias e Habilidades',
    description: 'As ferramentas que uso no dia a dia, além da stack mais ampla de oito anos entregando produtos.',
    tablistLabel: 'Categorias de habilidades',
    categories: {
      core: 'Principais',
      frontend: 'Frontend e Estado',
      architecture: 'Arquitetura e CMS',
      'backend-ai': 'Backend, IA e Games',
      'testing-devops': 'Testes e DevOps',
    },
    softSkillsTitle: 'Habilidades comportamentais',
    softSkills: {
      collaboration: 'Colaboração multidisciplinar',
      international: 'Times internacionais',
      communication: 'Comunicação técnica',
      'problem-solving': 'Resolução de problemas e adaptabilidade',
      'code-reviews': 'Discussões técnicas e code reviews',
      'knowledge-sharing': 'Compartilhamento de conhecimento',
    },
  },
  contact: {
    eyebrow: 'Vamos conversar',
    title: 'Tem um projeto em mente?',
    description:
      'Estou sempre aberto a novas oportunidades, colaborações técnicas ou a uma boa conversa sobre tecnologia e games.',
    cta: 'Entrar em contato',
    copyEmail: 'Copiar endereço de e-mail',
    copied: 'Endereço de e-mail copiado.',
    copyFailed: (email) => `Não foi possível copiar automaticamente. O e-mail é ${email}.`,
    socialLabel: 'Me encontre online',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    email: 'Enviar um e-mail',
  },
  footer: {
    role: 'Engenheiro Frontend Sênior',
    tagline: ['Construir', 'Evoluir', 'Inovar'],
  },
};
