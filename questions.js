// Banco de dados de perguntas
const questionsDB = [
    {
        id: 1,
        category: "compute",
        question: "Qual serviço AWS deve ser usado quando você deseja provisionar containers, mas quer evitar o esforço de manter atualizações, segurança e gerenciamento de servidores?",
        options: {
            a: "Elastic Beanstalk",
            b: "Amazon Elastic Container Service – Fargate launch type",
            c: "Amazon Elastic Compute Cloud",
            d: "Amazon Elastic Container Service – EC2 launch type"
        },
        correctAnswer: "b",
        explanation: "O Amazon ECS (Elastic Container Service) com Fargate é o serviço da AWS projetado especificamente para executar containers sem a necessidade de gerenciar a infraestrutura subjacente. Com o Fargate, você não precisa se preocupar com provisionamento de servidores, aplicação de patches de segurança, manutenção do sistema operacional ou configuração de clusters."
    },
    {
        id: 2,
        category: "networking",
        question: "Uma aplicação é executada em duas instâncias do Amazon EC2 atrás de um Load Balancer. As instâncias do EC2 estão em uma única zona de disponibilidade. O que um arquiteto de soluções deve fazer para tornar essa arquitetura mais altamente disponível?",
        options: {
            a: "Substituir o Network Load Balancer por um Application Load Balancer configurado com as instâncias do EC2 em um grupo do Auto Scaling.",
            b: "Configurar o Amazon Route 53 para realizar verificações de integridade nas instâncias do EC2 atrás do Network Load Balancer. Adicionar uma política de roteamento de failover.",
            c: "Colocar as instâncias do EC2 em um grupo do Auto Scaling que se estenda por várias zonas de disponibilidade. Designar o grupo do Auto Scaling como o destino do Load Balancer.",
            d: "Criar uma VPC com duas novas instâncias do EC2 na mesma zona de disponibilidade das instâncias do EC2 originais. Criar uma conexão de peering de VPC entre as duas VPCs."
        },
        correctAnswer: "c",
        explanation: "Esta é a melhor solução para aumentar a alta disponibilidade porque: 1) Distribui as instâncias em múltiplas zonas de disponibilidade (AZs) - O problema principal da arquitetura atual é que todas as instâncias estão em uma única zona de disponibilidade, criando um ponto único de falha. 2) Utiliza Auto Scaling - Isso não apenas gerencia a distribuição das instâncias entre as AZs, mas também automaticamente substitui instâncias com falha e pode escalar horizontalmente conforme a demanda. 3) Integra com o Load Balancer existente - O Load Balancer distribuirá o tráfego entre instâncias em múltiplas AZs, aumentando a disponibilidade."
    },
    {
        id: 3,
        category: "compute",
        question: "O time de DevOps de uma multi-nacional está ajudando outras equipes a padronizar o provisionamento de instancias EC2 através de AMIs. Algumas equipes estão na mesma região mas usam contas AWS diferentes, já outras estão em regiões diferentes mas usam contas AWS parentes da organização. Qual alternativa está correta em relação a AMIs?",
        options: {
            a: "É possível copiar AMIs entre regiões mas não é possível compartilha-las entre contas.",
            b: "É possível copiar AMIs entre regiões e compartilhar com outras contas AWS.",
            c: "Não é possível copiar AMIs entre regiões, nem compartilhar entre contas.",
            d: "Não é possível copiar AMIs entre regiões, é possível compartilhar entre contas AWS."
        },
        correctAnswer: "b",
        explanation: "A AWS permite tanto copiar AMIs entre regiões quanto compartilhá-las entre diferentes contas AWS, o que é ideal para o cenário descrito onde as equipes estão em diferentes regiões e contas. Detalhes importantes sobre AMIs na AWS: 1) Cópia entre regiões: Você pode copiar AMIs entre diferentes regiões AWS, facilitando a padronização de ambientes em localizações geográficas distintas. 2) Compartilhamento entre contas: Você pode compartilhar AMIs com contas AWS específicas sem precisar fazer cópias adicionais. 3) Compartilhamento dentro de uma organização AWS: Para contas dentro da mesma organização AWS, o processo de compartilhamento pode ser ainda mais simplificado."
    },
    {
        id: 4,
        category: "security",
        question: "Uma organização quer delegar acesso a um grupo de usuários do ambiente de desenvolvimento para que eles possam acessar alguns recursos no ambiente de produção que é gerenciado em outra conta AWS. Qual alternativa seria recomendada?",
        options: {
            a: "Não é possível acessar recursos em outra conta AWS.",
            b: "Criar credenciais no ambiente de produção e compartilhá-las com os usuários do ambiente de desenvolvimento.",
            c: "Criar uma nova IAM role com as permissões necessárias para acessar os recursos no ambiente de produção. Usuários podem assumir essa IAM role enquanto acessam recursos no ambiente de produção.",
            d: "IAM roles e IAM users poder ser usados em qualquer conta AWS."
        },
        correctAnswer: "c",
        explanation: "Esta é a abordagem recomendada pela AWS para acesso entre contas porque: 1) Segue o princípio de privilégio mínimo - A IAM role pode ser configurada com permissões específicas apenas para os recursos necessários no ambiente de produção. 2) Elimina a necessidade de compartilhar credenciais - Não há necessidade de criar e distribuir credenciais permanentes do ambiente de produção. 3) Facilita a auditoria - O uso de roles permite rastrear quem acessou quais recursos e quando. 4) Simplifica a gestão de acesso - As permissões podem ser ajustadas na role sem precisar atualizar múltiplos usuários."
    },
    {
        id: 5,
        category: "storage",
        question: "Um arquiteto de soluções está usando o Amazon S3 para projetar a arquitetura de armazenamento de um novo aplicativo de mídia digital. Os arquivos de mídia devem ser resilientes à perda de uma zona de disponibilidade. Alguns arquivos são acessados com frequência, enquanto outros raramente são acessados em um padrão imprevisível. O arquiteto de soluções deve minimizar os custos de armazenamento e recuperação dos arquivos de mídia. Qual opção de armazenamento atende a esses requisitos?",
        options: {
            a: "Acesso Infrequente S3 One Zone (S3 One Zone-IA).",
            b: "S3 Intelligent-Tiering.",
            c: "S3 Standard-Acesso Infrequente (S3 Standard-IA).",
            d: "Padrão S3."
        },
        correctAnswer: "b",
        explanation: "O S3 Intelligent-Tiering é a melhor opção para este cenário porque: 1) Movimentação automática entre classes de armazenamento - Move automaticamente os objetos entre duas camadas de acesso (frequente e infrequente) baseado nos padrões de uso, ideal para o caso descrito onde alguns arquivos são acessados com frequência e outros raramente, em um padrão imprevisível. 2) Resiliente à perda de uma zona de disponibilidade - Armazena dados em pelo menos três zonas de disponibilidade, garantindo a resiliência exigida. 3) Otimização de custos - Minimiza automaticamente os custos ao mover objetos para a camada de acesso infrequente quando não são acessados."
    },
    {
        id: 6,
        category: "storage",
        question: "Uma empresa precisa manter registros de dados por um período mínimo de 5 anos. Os dados raramente são acessados depois de armazenados. Eles devem estar acessíveis em até 2 horas. Qual solução atenderá a esses requisitos de maneira MAIS econômica?",
        options: {
            a: "Armazenar os dados em um bucket do Amazon S3. Usar uma política de ciclo de vida do S3 para mover os dados para o S3 Standard-Infrequent Access (S3 Standard-lA).",
            b: "Armazenar os dados em um sistema de arquivos do Amazon Elastic File System (Amazon EFS). Acessar os dados usando o AWS Direct Connect.",
            c: "Armazenar os dados em um bucket do Amazon S3. Usar uma política de ciclo de vida do S3 para mover os dados para o S3 Glacier Instant Retrieval.",
            d: "Armazenar os dados em um volume do Amazon Elastic Block Store (Amazon EBS). Criar snapshots. Armazenar os snapshots em um bucket do Amazon S3."
        },
        correctAnswer: "c",
        explanation: "Esta é a solução mais econômica que atende aos requisitos porque: 1) Tempo de recuperação adequado - O S3 Glacier Instant Retrieval oferece acesso em milissegundos, facilmente cumprindo o requisito de acesso em até 2 horas. 2) Custo otimizado para dados raramente acessados - É significativamente mais barato que as classes de armazenamento S3 Standard e S3 Standard-IA para dados que são raramente acessados. 3) Retenção de longo prazo - É projetado para armazenamento de longo prazo (como os 5 anos necessários). 4) Uso de políticas de ciclo de vida - Permite a transição automática dos dados para a classe de armazenamento mais econômica."
    },
    {
        id: 7,
        category: "storage",
        question: "O alto custo de armazenamento está levando uma empresa do varejo a deletar terabytes de dados em seus S3 buckets. Após uma análise mais aprofundada, constatou-se que os buckets não possuem 'lifecycle policies' apropriadas e os analistas não possuem muita experiência utilizando S3 lifecycle policies. Dito isso, qual classe seria a mais recomendada para o use case acima?",
        options: {
            a: "S3 Glacier.",
            b: "S3 Intelligent Tiering.",
            c: "S3 Standard IA.",
            d: "S3 standard.",
            e: "S3 One Zone IA."
        },
        correctAnswer: "b",
        explanation: "O S3 Intelligent Tiering é a classe mais recomendada para este cenário porque: 1) Automação da gestão de ciclo de vida - Como os analistas têm pouca experiência com políticas de ciclo de vida do S3, o Intelligent Tiering automatiza a movimentação dos objetos entre diferentes camadas de armazenamento com base nos padrões de acesso, sem a necessidade de configurar regras complexas. 2) Otimização de custos - Move automaticamente os dados entre camadas de acesso frequente e infrequente, e pode incluir arquivamento automático para dados que não são acessados por períodos mais longos. 3) Sem impacto na performance - Os dados permanecem imediatamente acessíveis, independentemente da camada em que estão armazenados."
    },
    {
        id: 8,
        category: "storage",
        question: "Uma empresa de TI possui aplicações baseadas em Windows em seu data center e está procurando uma solução que ofereça armazenamento compartilhado para que múltiplas aplicações possam acessar sem a necessidade de replicar os dados. A solução também deve se integrar com o Active Directory da empresa. Qual alternativa oferece a melhor solução?",
        options: {
            a: "Amazon FSx for Windows como solução de armazenamento.",
            b: "Amazon Elastic File System como armazenamento compartilhado de arquivos.",
            c: "Amazon FSx for Lustre para atingir latências de milissegundos.",
            d: "AWS File Gateway para criar uma solução hidrida."
        },
        correctAnswer: "a",
        explanation: "O Amazon FSx for Windows File Server é a melhor solução para este cenário porque: 1) Nativamente integrado com Windows - Foi projetado especificamente para aplicações baseadas em Windows, oferecendo suporte total ao protocolo SMB (Server Message Block) que é nativo do Windows. 2) Integração com Active Directory - Possui integração nativa com o Microsoft Active Directory, permitindo manter as políticas de segurança e autenticação existentes da empresa. 3) Armazenamento compartilhado - Permite que múltiplas aplicações acessem os mesmos dados simultaneamente. 4) Compatibilidade com aplicações Windows - Oferece compatibilidade total com aplicações Windows, incluindo suporte a NTFS, ACLs e outras funcionalidades específicas do Windows."
    },
    {
        id: 9,
        category: "database",
        question: "Qual das alternativas está correta em relação ao AWS RDS e suas réplicas de leitura?",
        options: {
            a: "Se o banco de dados master não está encriptado, as réplicas são encriptadas.",
            b: "Se o banco de dados master está encriptado, as réplicas também são encriptadas.",
            c: "Se o banco de dados master não está encriptado, as réplicas podem ou não estar encriptadas.",
            d: "Se o banco de dados master está encriptado, as réplicas podem estar encriptadas ou não."
        },
        correctAnswer: "b",
        explanation: "Esta é uma regra importante do AWS RDS relacionada à criptografia: 1) Consistência de criptografia - Quando uma instância principal (master) do RDS está criptografada, todas as suas réplicas de leitura devem obrigatoriamente também estar criptografadas. 2) Propagação da configuração de segurança - A AWS garante que a proteção de dados seja consistente em toda a cadeia de replicação."
    },
    {
        id: 10,
        category: "security",
        question: "Carlos está configurando uma nova instância EC2 na AWS e precisa garantir que apenas o tráfego HTTP (porta 80) e HTTPS (porta 443) sejam permitidos para a instância. Qual das seguintes alternativas descreve corretamente como ele deve configurar os Security Groups?",
        options: {
            a: "Carlos deve criar regras de allow para as portas 80 e 443 e uma regra de deny para todas as outras portas.",
            b: "Carlos deve criar regras de deny para todas as portas e uma regra de allow para as portas 80 e 443.",
            c: "Carlos deve criar regras de allow para as portas 80 e 443 e não precisa criar regras de deny para outras portas, pois os Security Groups são stateful.",
            d: "Carlos deve criar regras de allow para todas as portas e uma regra de deny para as portas 80 e 443."
        },
        correctAnswer: "c",
        explanation: "Esta é a correta porque: 1) Security Groups são stateful e baseados apenas em allow - Por padrão, todos os Security Groups da AWS negam todo o tráfego de entrada. Você precisa criar apenas regras de permissão (allow) para o tráfego que deseja permitir. 2) Não suportam regras de deny explícitas - Security Groups não permitem configurar regras de negação (deny) explícitas, diferentemente de Network ACLs. 3) Stateful - Como são stateful, o tráfego de retorno das conexões permitidas é automaticamente permitido, independentemente das regras de saída."
    },
    {
        id: 11,
        category: "networking",
        question: "Um desenvolvedor configurou tráfego inbound nas portas necessárias tanto no Security Group da instancia EC2 quanto no Network Access Control List (NACL) da subnet. O desenvolvedor, porém, ainda não consegue acessar o serviço dentro da EC2. Como possivelmente solucionar esse problema?",
        options: {
            a: "NACLs são stateful, então ao permitir tráfego inbound a conexão já é aceita. Security Groups são stateless, então é necessário que sejam criadas regras para inbound e para outbound.",
            b: "Security Groups são stateful, então ao permitir tráfego inbound a conexão já é aceita. NACLs são stateless, então é necessário que sejam criadas regras para inbound e para outbound.",
            c: "Regras associadas ao NACL jamais devem ser alteradas através da linha de comando. Ao realizar essa ação erros inesperados podem acontecer.",
            d: "A função IAM definida para o Security Group é diferente da função IAM definida para o NACL."
        },
        correctAnswer: "b",
        explanation: "Esta é a solução mais provável para o problema porque: 1) Security Groups são stateful - Quando você permite tráfego de entrada (inbound), o tráfego de resposta correspondente é automaticamente permitido, independentemente das regras de saída. 2) NACLs são stateless - Eles não mantêm o estado da conexão. Para que uma comunicação funcione corretamente, é necessário configurar explicitamente regras tanto para o tráfego de entrada quanto para o tráfego de saída."
    },
    {
        id: 12,
        category: "database",
        question: "Uma empresa de streaming de mídia está procurando migrar sua infraestrutura local para a Nuvem AWS. A equipe de engenharia está procurando por um armazenamento de dados NoSQL persistente totalmente gerenciado com cache na memória para manter a baixa latência que é crítica para cenários em tempo real, como streaming de vídeo e conteúdo interativo. A equipe espera que o número de usuários simultâneos chegue a um milhão para que o banco de dados seja capaz de escalar de forma elástica. Como arquiteto de soluções, qual dos seguintes serviços da AWS você recomendaria para este caso de uso?",
        options: {
            a: "ElastiCache",
            b: "DynamoDB",
            c: "DocumentDB",
            d: "RDS"
        },
        correctAnswer: "b",
        explanation: "O Amazon DynamoDB é a melhor opção para este cenário porque: 1) Banco de dados NoSQL totalmente gerenciado - O DynamoDB é um serviço de banco de dados NoSQL totalmente gerenciado, sem a necessidade de administrar servidores. 2) Cache na memória com DAX - O DynamoDB Accelerator (DAX) fornece capacidade de cache na memória, proporcionando tempos de resposta de microssegundos para aplicações que exigem baixa latência. 3) Escalabilidade massiva - É capaz de escalar elasticamente para lidar com milhões de usuários simultâneos, sem degradação de desempenho. 4) Performance previsível - Oferece performance consistente em qualquer escala, ideal para aplicações de streaming de mídia."
    },
    {
        id: 13,
        category: "networking",
        question: "Um e-commerce está planejando a migração de sua aplicação de duas camadas para a AWS. O time de engenharia está planejando usar o console wizard do Amazon VPC para criar toda configuração de infraestrutura, com subnets públicas e privadas. Qual das configurações abaixo não é suportada pelo Amazon VPC console wizard?",
        options: {
            a: "VPC com subnets públicas e privadas e AWS site-to-site VPN access.",
            b: "VPC com subnets públicas e privadas.",
            c: "VPC com subnet pública.",
            d: "VPC com subnet pública e AWS site-to-site VPN access."
        },
        correctAnswer: "d",
        explanation: "O console wizard da Amazon VPC oferece algumas configurações predefinidas para ajudar na criação rápida de VPCs, mas tem limitações em termos das opções disponíveis. A opção que não é suportada pelo Amazon VPC console wizard é a 'VPC com subnet pública e AWS site-to-site VPN access'. O console wizard da Amazon VPC suporta as seguintes configurações: 1) VPC com uma única subnet pública, 2) VPC com subnets públicas e privadas, 3) VPC com subnets públicas e privadas e AWS Site-to-Site VPN access, 4) VPC apenas com subnets privadas e AWS Site-to-Site VPN access."
    },
    {
        id: 14,
        category: "networking",
        question: "O time de engenharia está criando uma VPC com subnets publicas e privadas. A VPC e suas subnets usam blocos CIDR IPv4. Foi provisionado uma subnet publica e uma subnet privada em cada uma das três zonas de disponibilidade. As subnets privadas necessitam de acesso a internet para que as instancias EC2 realizem download de patches. Qual seria a melhor solução para fornecer acesso a internet das subnets privadas?",
        options: {
            a: "Crie 3 NAT Gateways, um em cada subnet pública. Crie uma tabela de rotas direcionando o tráfego não local para os NAT gateways em cada AZ.",
            b: "Crie 3 internet Gateways, um em cada subnet privada em cada AZ. Crie uma tabela de rotas direcionando tráfego não local de cada AZ para o internet gateway.",
            c: "Crie 3 NAT gateways, um em cada subnet privada. Configure o Security Group das instancias para liberar trafego HTTP na porta 80.",
            d: "Configure 3 Internet Gateways, um para cada subnet publica. Crie uma tabela de rotas direcionando o tráfego das subnets privadas para as públicas."
        },
        correctAnswer: "a",
        explanation: "Esta é a solução recomendada porque: 1) Os NAT Gateways devem ser colocados em subnets públicas (não privadas) para funcionar corretamente. 2) Ao criar um NAT Gateway em cada zona de disponibilidade (AZ), você aumenta a disponibilidade e reduz a latência entre AZs, já que o tráfego das instâncias privadas pode sair pela mesma AZ. 3) Este design garante alta disponibilidade - se uma AZ falhar, apenas as instâncias naquela AZ perderão conectividade com a internet, enquanto as outras continuarão funcionando normalmente."
    },
    {
        id: 15,
        category: "compute",
        question: "Um desenvolvedor quer hospedar um web-server na AWS. Qual serviço da AWS seria uma alternativa fácil e rápida para que o desenvolvedor efetue o deploy de seu Web-server?",
        options: {
            a: "EC2 Instances.",
            b: "AWS Elastic Beanstalk.",
            c: "AWS Cloud Formation.",
            d: "AWS Lambda."
        },
        correctAnswer: "b",
        explanation: "O AWS Elastic Beanstalk é especificamente projetado para simplificar o processo de implantação de aplicações web, incluindo web-servers. O desenvolvedor apenas precisa fazer upload do código, e o Elastic Beanstalk automaticamente gerencia: provisionamento de recursos (EC2, balanceadores de carga, etc.), configuração do ambiente, implantação da aplicação, monitoramento e escalonamento automático."
    },
    {
        id: 16,
        category: "management",
        question: "Uma organização possui uma arquitetura complexa envolvendo diversos sistemas e gostaria de ter uma solução para ter controle de qualquer alteração em cada recurso. Qual serviço AWS pode ajudar você a ter um histórico de configurações de mudanças para seus recursos?",
        options: {
            a: "AWS Service Catalog",
            b: "AWS CloudTrail",
            c: "AWS CloudFormation",
            d: "AWS Config"
        },
        correctAnswer: "d",
        explanation: "O AWS Config é o serviço projetado especificamente para monitorar e registrar as configurações dos recursos AWS ao longo do tempo. Ele oferece: inventário detalhado de recursos AWS e suas configurações, histórico contínuo de alterações de configuração, avaliação de conformidade contra regras personalizadas ou predefinidas, notificações de alterações de configuração, e capacidade de visualizar relacionamentos entre recursos."
    },
    {
        id: 17,
        category: "management",
        question: "Uma startup deseja configurar sua infraestrutura de TI na Nuvem AWS. O CTO gostaria de receber relatórios detalhados que dividem os custos da AWS da startup por hora em um bucket S3. Como Analista de soluções, qual serviço da AWS você recomendaria para este caso de uso?",
        options: {
            a: "AWS Budgets",
            b: "AWS Cost Explorer",
            c: "AWS Cost and Usage Reports.",
            d: "AWS Pricing Calculator"
        },
        correctAnswer: "c",
        explanation: "O AWS Cost and Usage Reports é a opção ideal para este cenário porque: 1) Permite gerar relatórios detalhados com granularidade de até 1 hora, 2) Pode exportar automaticamente esses relatórios para um bucket S3 especificado, 3) Fornece dados abrangentes sobre custos e uso de recursos AWS, 4) Permite divisão dos custos por diversos critérios (serviços, tags, contas, etc.), 5) Oferece o mais alto nível de detalhamento entre todas as ferramentas de relatório de custos da AWS."
    },
    {
        id: 18,
        category: "compute",
        question: "Um desenvolvedor criou uma aplicação web simples em PHP e gostaria apenas de fazer upload do código para a nuvem e não se preocupar em provisionar toda a infraestrutura necessária, porém, ainda gostaria de ter acesso a partes como SO para futuras melhorias. Como um analista de nuvem, qual serviço você recomendaria?",
        options: {
            a: "AWS Elastic Beanstalk",
            b: "AWS Cloud Formation",
            c: "Elastic Container Service",
            d: "Amazon EC2"
        },
        correctAnswer: "a",
        explanation: "O AWS Elastic Beanstalk é a melhor opção para este cenário porque: 1) Permite que o desenvolvedor simplesmente faça upload do código PHP sem se preocupar com o provisionamento da infraestrutura subjacente. 2) Gerencia automaticamente a implantação, incluindo provisionamento de capacidade, balanceamento de carga, escalonamento automático e monitoramento da saúde da aplicação. 3) Ainda permite acesso ao sistema operacional subjacente (SO) para personalizações e melhorias futuras, o que era um requisito específico do desenvolvedor."
    },
    {
        id: 19,
        category: "security",
        question: "Uma empresa possui uma aplicação web de compartilhamento de fotos distribuída em 3 países. A aplicação consome diversas Instâncias EC2 atrás de um Application Load Balancer. A empresa precisa bloquear o acesso de 2 outros países e apenas permitir acesso pelos países de origem. Qual configuração atende essa necessidade?",
        options: {
            a: "Configurar um Security Group no Application Load Balancer.",
            b: "Configurar o AWS WAF no Application Load Balancer na VPC.",
            c: "Usar o modo de Geo Restriction do CloudFront na VPC.",
            d: "Configurar o Security Group das instâncias EC2."
        },
        correctAnswer: "b",
        explanation: "O AWS WAF (Web Application Firewall) é a solução ideal para este cenário porque: 1) Permite criar regras baseadas em localização geográfica (geo-matching), 2) Pode ser integrado diretamente com o Application Load Balancer, 3) Oferece controle granular para bloquear ou permitir tráfego com base no país de origem, 4) É especificamente projetado para filtrar o tráfego web com base em diversos critérios, incluindo localização geográfica."
    },
    {
        id: 20,
        category: "management",
        question: "Qual é a principal finalidade do serviço AWS CloudTrail?",
        options: {
            a: "Autenticar e autorizar usuários na conta AWS",
            b: "Registrar e monitorar atividades de usuários na conta AWS",
            c: "Registrar e configurar incidentes dos recursos da conta AWS",
            d: "Configurar políticas de conformidade dos recursos da conta AWS",
            e: "Configurar alarmes e alertas nos recursos e componentes da conta AWS"
        },
        correctAnswer: "b",
        explanation: "O AWS CloudTrail é um serviço que tem como principal finalidade registrar e rastrear todas as atividades e chamadas de API realizadas em uma conta AWS. Ele fornece: um histórico de eventos relacionados a atividades na conta, registro de quem realizou qual ação, quando e de onde, registros de auditoria para análise de segurança, solução de problemas e conformidade, e visibilidade sobre quem fez alterações nos recursos AWS."
    },
    
    {
        id: 21,
        category: "compute",
        question: "Sua equipe está desenvolvendo uma aplicação que processa eventos em tempo real e precisa de execução de código rápida sem gerenciar servidores. Qual serviço AWS é mais adequado para este caso?",
        options: {
            a: "Amazon EC2",
            b: "AWS Lambda",
            c: "Amazon ECS",
            d: "AWS Elastic Beanstalk"
        },
        correctAnswer: "b",
        explanation: "O AWS Lambda é ideal para processamento de eventos em tempo real sem gerenciar servidores. Ele permite executar código em resposta a eventos, escalar automaticamente de algumas solicitações por dia a milhares por segundo, e pagar apenas pelo tempo de computação consumido. Lambda é a escolha ideal para aplicações orientadas a eventos, processamento em tempo real e elimina a necessidade de provisionar ou gerenciar servidores."
    },
    {
        id: 22,
        category: "storage",
        question: "Uma empresa precisa armazenar backups diários de 500GB por pelo menos 7 anos para conformidade regulatória. Os dados raramente precisarão ser acessados, mas quando necessário, um tempo de recuperação de até 48 horas é aceitável. Qual é a opção de armazenamento mais econômica na AWS para este cenário?",
        options: {
            a: "Amazon S3 Standard",
            b: "Amazon S3 Glacier",
            c: "Amazon S3 Glacier Deep Archive",
            d: "Amazon S3 One Zone-IA"
        },
        correctAnswer: "c",
        explanation: "O Amazon S3 Glacier Deep Archive é a classe de armazenamento mais econômica da AWS, projetada para retenção de dados de longo prazo e preservação digital. Com tempo de recuperação de até 48 horas, atende perfeitamente ao requisito de recuperação estabelecido. É 70% mais barato que o S3 Glacier regular e 95% mais barato que o S3 Standard, tornando-o ideal para dados que são acessados raramente, mas precisam ser mantidos por longos períodos para conformidade regulatória."
    },
    {
        id: 23,
        category: "database",
        question: "Um aplicativo web precisa armazenar sessões de usuário que possam ser acessadas com latência muito baixa por vários servidores de aplicativos. Qual serviço AWS é mais adequado para este caso?",
        options: {
            a: "Amazon RDS",
            b: "Amazon ElastiCache",
            c: "Amazon DynamoDB",
            d: "Amazon Neptune"
        },
        correctAnswer: "b",
        explanation: "O Amazon ElastiCache é ideal para armazenar sessões de usuário com latência muito baixa. Ele fornece um armazenamento de dados na memória, compatível com Redis ou Memcached, que é significativamente mais rápido que soluções baseadas em disco. ElastiCache é perfeito para cenários como gerenciamento de sessões de usuário, cache de páginas web, e armazenamento de resultados temporários que precisam ser acessados frequentemente com latência extremamente baixa por vários servidores de aplicativos."
    },
    {
        id: 24,
        category: "networking",
        question: "Uma empresa multinacional tem filiais em diferentes regiões que precisam se comunicar de forma segura com recursos da AWS. Qual serviço seria mais apropriado para criar uma conexão de rede dedicada e privada entre as filiais e a AWS?",
        options: {
            a: "AWS VPN",
            b: "AWS Direct Connect",
            c: "Internet Gateway",
            d: "AWS Transit Gateway"
        },
        correctAnswer: "b",
        explanation: "O AWS Direct Connect é o serviço mais apropriado para criar uma conexão de rede dedicada entre as instalações on-premises e a AWS. Ele estabelece uma conexão privada dedicada desde o data center ou escritório até a AWS, reduzindo custos de rede, aumentando a largura de banda, e fornecendo uma experiência de rede mais consistente comparada à conexão baseada na Internet. É ideal para transferência de grandes volumes de dados entre ambientes e para aplicações sensíveis à latência ou que exigem comunicação segura e consistente."
    },
    {
        id: 25,
        category: "security",
        question: "Sua empresa precisa implementar autenticação multifator (MFA) para usuários que acessam o AWS Management Console. Qual serviço da AWS você deve configurar?",
        options: {
            a: "AWS Directory Service",
            b: "AWS Organizations",
            c: "AWS IAM",
            d: "AWS Security Hub"
        },
        correctAnswer: "c",
        explanation: "O AWS Identity and Access Management (IAM) é o serviço usado para configurar a autenticação multifator (MFA) para usuários que acessam o AWS Management Console. O IAM permite que você gerencie usuários e seus níveis de acesso à AWS, e a MFA adiciona uma camada extra de proteção ao processo de login, exigindo que os usuários forneçam uma segunda forma de autenticação além da senha, como um código temporário de um dispositivo virtual ou físico."
    },
    {
        id: 26,
        category: "management",
        question: "Você precisa automatizar o provisionamento e gerenciamento de recursos de infraestrutura na AWS de forma consistente e repetível. Qual serviço AWS é mais adequado para este propósito?",
        options: {
            a: "AWS CloudFormation",
            b: "AWS Systems Manager",
            c: "AWS Config",
            d: "AWS OpsWorks"
        },
        correctAnswer: "a",
        explanation: "O AWS CloudFormation é ideal para automatizar o provisionamento e gerenciamento de recursos de infraestrutura de forma consistente e repetível. Ele permite que você defina toda sua infraestrutura como código, usando arquivos de template JSON ou YAML, e provisione recursos de forma automatizada e segura. CloudFormation gerencia dependências entre recursos, facilita atualizações e eliminações coordenadas, e permite replicar infraestrutura em diferentes regiões ou contas AWS."
    },
    {
        id: 27,
        category: "compute",
        question: "Uma aplicação web com tráfego variável precisa escalar automaticamente para lidar com picos de demanda. Qual combinação de serviços AWS é recomendada para implementar essa solução?",
        options: {
            a: "EC2 + CloudWatch",
            b: "EC2 + Auto Scaling Group + CloudWatch",
            c: "Lambda + API Gateway",
            d: "Elastic Beanstalk + RDS"
        },
        correctAnswer: "b",
        explanation: "A combinação de EC2 + Auto Scaling Group + CloudWatch é ideal para uma aplicação web com tráfego variável. O EC2 hospeda a aplicação, o Auto Scaling Group automaticamente ajusta o número de instâncias EC2 baseado na demanda, e o CloudWatch monitora a utilização de recursos e aciona os ajustes de escala. Esta arquitetura garante que haja capacidade suficiente durante picos de demanda e reduz custos diminuindo a capacidade quando a demanda é menor."
    },
    {
        id: 28,
        category: "database",
        question: "Qual banco de dados AWS é mais adequado para aplicações que precisam de alta performance para consultas analíticas em grandes volumes de dados?",
        options: {
            a: "Amazon RDS",
            b: "Amazon DynamoDB",
            c: "Amazon Redshift",
            d: "Amazon Neptune"
        },
        correctAnswer: "c",
        explanation: "O Amazon Redshift é o mais adequado para consultas analíticas em grandes volumes de dados. É um data warehouse totalmente gerenciado na escala de petabytes, otimizado para análises de conjuntos de dados muito grandes usando SQL padrão. Redshift usa compressão de colunas, processamento paralelo massivo (MPP) e execução de consultas compiladas para entregar performance extremamente rápida para consultas analíticas complexas em grandes conjuntos de dados."
    },
    {
        id: 29,
        category: "networking",
        question: "Para uma aplicação que precisa distribuir conteúdo globalmente com baixa latência, qual serviço AWS oferece a melhor solução?",
        options: {
            a: "Amazon Route 53",
            b: "AWS Global Accelerator",
            c: "Amazon CloudFront",
            d: "Elastic Load Balancing"
        },
        correctAnswer: "c",
        explanation: "O Amazon CloudFront é a melhor solução para distribuir conteúdo globalmente com baixa latência. É um serviço de CDN (Content Delivery Network) que entrega dados, vídeos, aplicações e APIs aos clientes com segurança e baixa latência, usando uma rede global de pontos de presença. CloudFront armazena em cache o conteúdo em locais de borda ao redor do mundo, aproximando-o dos usuários e reduzindo significativamente a latência de acesso."
    },
    {
        id: 30,
        category: "security",
        question: "Uma empresa precisa criptografar dados sensíveis na AWS e gerenciar suas próprias chaves de criptografia. Qual serviço da AWS atende melhor a essa necessidade?",
        options: {
            a: "AWS Secrets Manager",
            b: "AWS Certificate Manager",
            c: "AWS Key Management Service (KMS)",
            d: "AWS CloudHSM"
        },
        correctAnswer: "d",
        explanation: "O AWS CloudHSM é a melhor opção quando uma empresa precisa gerenciar suas próprias chaves de criptografia com controle total. Ele fornece módulos de segurança de hardware (HSMs) dedicados, compatíveis com FIPS 140-2 Nível 3, permitindo que a empresa mantenha controle exclusivo sobre suas chaves de criptografia. CloudHSM oferece mais controle que o KMS, pois nenhum administrador da AWS tem acesso às chaves, tornando-o ideal para aplicações com requisitos rigorosos de conformidade que exigem gerenciamento completo das chaves."
    },
{
    id: 31,
    category: "networking",
    question: "Um administrador de sistema precisa estabelecer uma conexão segura entre a VPC da empresa e sua rede on-premises usando uma conexão privada dedicada. Qual serviço AWS é mais adequado para este cenário?",
    options: {
        a: "AWS VPN Site-to-Site",
        b: "AWS Direct Connect",
        c: "Internet Gateway",
        d: "NAT Gateway"
    },
    correctAnswer: "b",
    explanation: "AWS Direct Connect é uma solução de conexão de rede dedicada que estabelece uma conexão privada entre sua rede on-premises e a AWS. Diferentemente da VPN, que usa a internet pública, o Direct Connect fornece uma conexão privada dedicada, oferecendo maior largura de banda, latência reduzida e uma experiência de rede mais consistente. É ideal para cargas de trabalho sensíveis à latência ou ambientes que exigem altos níveis de segurança e privacidade na conexão."
},
{
    id: 32,
    category: "compute",
    question: "Uma empresa de desenvolvimento de software precisa executar contêineres Docker em grande escala sem se preocupar com o gerenciamento da frota de instâncias EC2 subjacentes. Qual serviço AWS oferece a melhor solução para esse requisito?",
    options: {
        a: "Amazon ECR (Elastic Container Registry)",
        b: "Amazon ECS com instâncias EC2",
        c: "Amazon EKS (Elastic Kubernetes Service)",
        d: "Amazon ECS com AWS Fargate"
    },
    correctAnswer: "d",
    explanation: "Amazon ECS com AWS Fargate é a melhor solução para executar contêineres sem gerenciar a infraestrutura subjacente. O Fargate é um mecanismo de computação sem servidor para contêineres que elimina a necessidade de provisionar e gerenciar servidores. Com o Fargate, você define e paga pelos recursos por contêiner, não precisa selecionar tipos de instâncias, provisionar clusters ou otimizar o empacotamento de contêineres. Isso permite que a empresa se concentre totalmente no desenvolvimento e na implantação de aplicativos em contêineres, sem as complexidades de gerenciamento de infraestrutura."
},
{
    id: 33,
    category: "security",
    question: "Uma empresa precisa garantir que todos os dados armazenados no Amazon S3 sejam criptografados. Qual das seguintes opções é a mais eficiente para garantir que novos objetos enviados ao bucket sempre sejam criptografados?",
    options: {
        a: "Configurar a AWS Lambda para criptografar objetos após o upload",
        b: "Instruir desenvolvedores a usar o SDK da AWS para criptografar dados no lado do cliente",
        c: "Configurar a criptografia padrão do bucket S3",
        d: "Usar o AWS CloudTrail para monitorar uploads não criptografados"
    },
    correctAnswer: "c",
    explanation: "Configurar a criptografia padrão do bucket S3 é a solução mais eficiente para garantir que todos os novos objetos sejam automaticamente criptografados durante o upload. Com essa configuração, o Amazon S3 aplica criptografia no lado do servidor para todos os objetos quando são gravados no bucket, mesmo se o upload não especificar explicitamente parâmetros de criptografia. Isso fornece uma camada consistente de segurança sem depender de ações dos desenvolvedores ou processos adicionais após o upload."
},
{
    id: 34,
    category: "database",
    question: "Uma aplicação financeira precisa realizar milhares de transações por segundo, mantendo consistência ACID e baixa latência. Qual banco de dados AWS é mais adequado para este cenário?",
    options: {
        a: "Amazon DynamoDB",
        b: "Amazon Aurora",
        c: "Amazon Redshift",
        d: "Amazon Neptune"
    },
    correctAnswer: "b",
    explanation: "Amazon Aurora é o serviço de banco de dados mais adequado para aplicações financeiras que exigem transações ACID (Atomicidade, Consistência, Isolamento, Durabilidade) e alto throughput. Aurora é um banco de dados relacional compatível com MySQL e PostgreSQL, projetado para oferecer até 5 vezes o desempenho do MySQL padrão e 3 vezes o do PostgreSQL. Ele combina a confiabilidade e conformidade ACID dos bancos de dados relacionais tradicionais com a escala e disponibilidade de bancos de dados na nuvem, tornando-o ideal para aplicações financeiras que exigem transações confiáveis em grande escala."
},
{
    id: 35,
    category: "management",
    question: "Uma organização deseja garantir que todos os recursos AWS sejam etiquetados adequadamente para alocação de custos. Qual serviço AWS pode ser usado para impor políticas de etiquetagem em recursos recém-criados?",
    options: {
        a: "AWS Config",
        b: "AWS Service Catalog",
        c: "AWS Organizations com Políticas de Tag",
        d: "AWS Cost Explorer"
    },
    correctAnswer: "c",
    explanation: "AWS Organizations com Políticas de Tag permite impor regras de etiquetagem consistentes em toda a organização. Com as políticas de tag, você pode definir quais tags são obrigatórias, quais formatos são aceitáveis e quais valores são permitidos. Essas políticas podem ser aplicadas a contas específicas ou a toda a organização, garantindo que todos os recursos recém-criados sigam os padrões de etiquetagem definidos. Isso é crucial para uma alocação de custos precisa e eficaz, permitindo que a organização rastreie e atribua despesas a departamentos, projetos ou centros de custo específicos."
},
{
    id: 36,
    category: "storage",
    question: "Uma empresa de serviços de streaming precisa armazenar e distribuir vídeos para usuários globalmente. Qual combinação de serviços AWS forneceria a solução mais eficiente para esse cenário?",
    options: {
        a: "Amazon S3 com Amazon CloudFront",
        b: "Amazon EBS com EC2 Auto Scaling",
        c: "Amazon EFS com AWS Direct Connect",
        d: "Amazon S3 Glacier com API Gateway"
    },
    correctAnswer: "a",
    explanation: "A combinação de Amazon S3 com Amazon CloudFront é ideal para streaming de vídeo global. O Amazon S3 oferece armazenamento escalável, durável e econômico para os arquivos de vídeo, enquanto o CloudFront funciona como uma rede de distribuição de conteúdo (CDN) que armazena em cache o conteúdo em locais de borda em todo o mundo. Isso reduz significativamente a latência para os usuários finais, pois o conteúdo é entregue do ponto de presença mais próximo. Além disso, o CloudFront integra-se nativamente com o S3 e oferece recursos avançados como streaming adaptativo, SSL/TLS para segurança e controles detalhados de acesso."
},
{
    id: 37,
    category: "networking",
    question: "Uma empresa possui múltiplas VPCs em diferentes regiões e contas AWS. Qual solução permite que elas conectem todas essas VPCs de maneira centralizada e gerenciada?",
    options: {
        a: "VPC Peering para cada par de VPCs",
        b: "Internet Gateway em cada VPC",
        c: "AWS Transit Gateway",
        d: "AWS Direct Connect em cada região"
    },
    correctAnswer: "c",
    explanation: "AWS Transit Gateway é a solução ideal para conectar múltiplas VPCs de forma centralizada. Ele funciona como um hub que gerencia o tráfego entre VPCs, conexões VPN e Direct Connect, simplificando significativamente a arquitetura de rede. Com o Transit Gateway, você evita configurações complexas de peering ponto-a-ponto que se tornam inviáveis à medida que o número de VPCs aumenta. Ele suporta conexões entre diferentes regiões e contas AWS através do Transit Gateway peering e do compartilhamento de recursos, respectivamente. Além disso, oferece recursos avançados como tabelas de rotas, controle de largura de banda e monitoramento centralizado."
},
{
    id: 38,
    category: "security",
    question: "Um arquiteto de segurança precisa implementar uma solução para proteger dados sensíveis armazenados em bancos de dados RDS e tabelas DynamoDB. Os dados nunca devem ser expostos em texto não criptografado, e as chaves de criptografia devem ser gerenciadas seguindo as melhores práticas de segurança. Qual serviço AWS deve ser utilizado?",
    options: {
        a: "AWS Certificate Manager (ACM)",
        b: "AWS Secrets Manager",
        c: "AWS Key Management Service (KMS)",
        d: "AWS Identity and Access Management (IAM)"
    },
    correctAnswer: "c",
    explanation: "AWS Key Management Service (KMS) é o serviço ideal para proteger dados sensíveis em bancos de dados. O KMS permite criar e gerenciar chaves criptográficas e controlar seu uso em diversos serviços AWS, incluindo RDS e DynamoDB. Com o KMS, você pode implementar criptografia em repouso para seus dados, garantindo que fiquem protegidos mesmo se houver acesso não autorizado ao armazenamento subjacente. O KMS oferece recursos avançados como rotação automática de chaves, controles de acesso detalhados através de políticas, trilhas de auditoria completas com integração ao CloudTrail e conformidade com diversos padrões regulatórios como FIPS 140-2."
},
{
    id: 39,
    category: "compute",
    question: "Uma startup está desenvolvendo uma aplicação serverless que precisa processar imagens enviadas pelos usuários. O processamento envolve várias etapas, incluindo validação, redimensionamento, otimização e armazenamento. Qual serviço AWS é mais adequado para orquestrar esse fluxo de trabalho?",
    options: {
        a: "AWS Lambda com callbacks aninhados",
        b: "AWS Step Functions",
        c: "Amazon SQS com EC2 workers",
        d: "Amazon ECS Tasks"
    },
    correctAnswer: "b",
    explanation: "AWS Step Functions é a escolha ideal para orquestrar fluxos de trabalho complexos de múltiplas etapas. Ele permite que você defina e execute fluxos de trabalho (workflows) visuais que coordenam vários serviços AWS em uma sequência de etapas. Para o processamento de imagens descrito, o Step Functions pode orquestrar diferentes funções Lambda para cada etapa do processo (validação, redimensionamento, etc.), gerenciar estados e transições, lidar com erros e reinicializações, e manter o controle do progresso do fluxo de trabalho. Isso resulta em um código mais limpo e mais fácil de manter do que alternativas como callbacks aninhados ou filas de mensagens, especialmente para lógicas de negócio complexas com múltiplas etapas."
},
{
    id: 40,
    category: "management",
    question: "Uma empresa global precisa garantir que sua infraestrutura AWS esteja em conformidade com requisitos regulatórios em diferentes regiões geográficas. Qual serviço AWS ajuda a avaliar continuamente a conformidade de configurações de recursos?",
    options: {
        a: "AWS Trusted Advisor",
        b: "AWS CloudTrail",
        c: "AWS Config",
        d: "Amazon Inspector"
    },
    correctAnswer: "c",
    explanation: "AWS Config é o serviço ideal para avaliar continuamente a conformidade da infraestrutura com requisitos regulatórios. Ele fornece um inventário detalhado dos recursos AWS e registra continuamente as mudanças de configuração. Com as regras do AWS Config (tanto as predefinidas quanto as personalizadas), você pode avaliar automaticamente se suas configurações estão em conformidade com suas políticas internas e padrões regulatórios. O Config oferece painéis de conformidade, histórico detalhado de mudanças, avaliação de impacto e relatórios que ajudam a demonstrar conformidade durante auditorias. Isso é especialmente valioso para empresas globais que precisam atender a requisitos regulatórios diferentes em cada região geográfica onde operam."
},
{
    id: 41,
    category: "terraform",
    question: "Qual é o propósito principal do Terraform?",
    options: {
        a: "Gerenciamento de contêineres Docker",
        b: "Infraestrutura como Código (IaC)",
        c: "Orquestração de aplicativos",
        d: "Monitoramento de serviços em nuvem"
    },
    correctAnswer: "b",
    explanation: "O principal propósito do Terraform é fornecer uma solução de Infraestrutura como Código (IaC). O Terraform permite que você defina recursos de infraestrutura usando uma linguagem declarativa chamada HashiCorp Configuration Language (HCL) ou JSON. Com o Terraform, você descreve o estado desejado da sua infraestrutura em arquivos de configuração, e o Terraform se encarrega de provisionar e gerenciar esses recursos em diversos provedores de nuvem e serviços. Isso automatiza a criação e modificação de infraestrutura, garantindo consistência, reprodutibilidade e versionamento da infraestrutura."
},
{
    id: 42,
    category: "terraform",
    question: "Em Terraform, qual é a função do comando 'terraform plan'?",
    options: {
        a: "Aplicar as mudanças definidas nos arquivos de configuração",
        b: "Mostrar um preview das mudanças que serão aplicadas à infraestrutura",
        c: "Inicializar um novo diretório de trabalho do Terraform",
        d: "Validar a sintaxe dos arquivos de configuração do Terraform"
    },
    correctAnswer: "b",
    explanation: "O comando 'terraform plan' cria um plano de execução que mostra um preview das mudanças que o Terraform fará à infraestrutura com base nos arquivos de configuração atuais e no estado atual da infraestrutura. Ele analisa o estado atual, compara com o estado desejado definido nos arquivos de configuração, e mostra quais recursos serão criados, modificados ou destruídos. Este comando não faz nenhuma alteração real na infraestrutura, sendo uma etapa crucial para revisar as mudanças antes de aplicá-las com 'terraform apply'."
},
{
    id: 43,
    category: "terraform",
    question: "Como o Terraform gerencia o estado da infraestrutura?",
    options: {
        a: "Consultando APIs dos provedores de nuvem sempre que necessário",
        b: "Usando um banco de dados relacional para armazenar o estado",
        c: "Através de arquivos de estado (state files) que mapeiam recursos reais para a configuração",
        d: "Não gerencia estado; sempre recria toda a infraestrutura"
    },
    correctAnswer: "c",
    explanation: "O Terraform gerencia o estado da infraestrutura através de arquivos de estado (tipicamente chamados de terraform.tfstate). Estes arquivos mapeiam os recursos definidos em sua configuração para os recursos reais no ambiente do provedor, armazenando metadados como IDs de recursos. O arquivo de estado permite que o Terraform determine quais mudanças precisa aplicar em execuções futuras, calcule dependências e crie planos para alterar a infraestrutura de forma segura. O estado pode ser armazenado localmente ou remotamente (como no S3, Azure Blob Storage, Terraform Cloud, etc.) para facilitar a colaboração em equipe."
},
{
    id: 44,
    category: "terraform",
    question: "Qual é a melhor prática para armazenar o arquivo de estado do Terraform quando trabalhando em equipe?",
    options: {
        a: "Armazenar localmente e compartilhar via controle de versão (Git)",
        b: "Usar um backend remoto com suporte a lock e criptografia",
        c: "Regenerar o estado sempre que necessário usando 'terraform import'",
        d: "Manter uma cópia central em um servidor de arquivos compartilhado"
    },
    correctAnswer: "b",
    explanation: "A melhor prática para armazenar o arquivo de estado do Terraform quando trabalhando em equipe é usar um backend remoto com suporte a lock e criptografia. Isso inclui opções como S3 com DynamoDB para locking, Azure Blob Storage, Google Cloud Storage, Terraform Cloud, ou HashiCorp Consul. Um backend remoto oferece vários benefícios: previne conflitos de execução simultânea através de locking, permite colaboração segura entre membros da equipe, fornece backup e versão do estado, e aumenta a segurança através da criptografia de dados sensíveis. Armazenar o estado no controle de versão é desencorajado pois pode expor informações sensíveis e não oferece proteção contra operações concorrentes."
},
{
    id: 45,
    category: "terraform",
    question: "O que são módulos no Terraform e qual é seu propósito?",
    options: {
        a: "Contêineres para executar o código Terraform em ambientes isolados",
        b: "Extensões de terceiros que adicionam novos recursos ao Terraform",
        c: "Coleções de recursos que são usados juntos como uma unidade configurável e reutilizável",
        d: "Scripts para automatizar tarefas comuns do Terraform como apply e destroy"
    },
    correctAnswer: "c",
    explanation: "Módulos no Terraform são coleções de recursos relacionados que são gerenciados juntos como uma unidade configurável e reutilizável. Eles permitem encapsular grupos de recursos, com entradas (variáveis) e saídas definidas, facilitando o reuso de configurações em diferentes projetos ou partes de um projeto. Os módulos promovem boas práticas como abstração, encapsulamento e composição, permitindo definir padrões organizacionais, aplicar configurações consistentes e simplificar configurações complexas. Por exemplo, você pode criar um módulo para uma arquitetura de aplicação web padrão que inclua balanceador de carga, instâncias e grupos de segurança, e reutilizá-lo em vários ambientes."
},
{
    id: 46,
    category: "terraform",
    question: "Qual comando do Terraform deve ser usado para destruir toda a infraestrutura gerenciada por uma configuração específica?",
    options: {
        a: "terraform delete",
        b: "terraform remove",
        c: "terraform destroy",
        d: "terraform clean"
    },
    correctAnswer: "c",
    explanation: "O comando 'terraform destroy' é usado para destruir toda a infraestrutura gerenciada por uma configuração específica. Este comando analisa o arquivo de estado do Terraform para determinar quais recursos estão atualmente gerenciados e então destrói cada um deles na ordem correta, respeitando as dependências. Por padrão, o Terraform solicita confirmação antes de prosseguir. Este comando é especialmente útil em ambientes temporários, como ambientes de desenvolvimento ou teste, ou quando você deseja limpar todos os recursos antes de encerrar um projeto."
},
{
    id: 47,
    category: "terraform",
    question: "Como o Terraform interage com a AWS para gerenciar recursos?",
    options: {
        a: "Diretamente através da AWS CLI instalada no sistema",
        b: "Usando um agente especial instalado na conta AWS",
        c: "Via APIs AWS, utilizando credenciais fornecidas pelo usuário",
        d: "Através de scripts personalizados executados por funções Lambda"
    },
    correctAnswer: "c",
    explanation: "O Terraform interage com a AWS através das APIs oficiais da AWS, utilizando credenciais fornecidas pelo usuário. O Terraform usa o provider AWS, que é um plugin que implementa a integração com as APIs da AWS. Para autenticar, o Terraform pode usar credenciais estáticas configuradas no arquivo de configuração, variáveis de ambiente, o arquivo de credenciais AWS (~/.aws/credentials), perfis assumidos via AWS STS, ou métodos de autenticação específicos de ambientes como EC2 Instance Profiles ou ECS Task Roles. Esta abordagem baseada em API permite que o Terraform funcione sem dependências externas específicas da AWS além do próprio provider."
},
{
    id: 48,
    category: "terraform",
    question: "O que é 'drift' no contexto do Terraform e como detectá-lo?",
    options: {
        a: "Diferenças de performance entre ambientes que ocorrem ao longo do tempo",
        b: "Discrepâncias entre o estado do Terraform e a infraestrutura real",
        c: "Mudanças não intencionais em arquivos de configuração do Terraform",
        d: "Variação de custo de recursos de nuvem ao longo do tempo"
    },
    correctAnswer: "b",
    explanation: "No contexto do Terraform, 'drift' refere-se às discrepâncias entre o estado gerenciado pelo Terraform e o estado real da infraestrutura, que ocorrem quando mudanças são feitas diretamente na infraestrutura (por exemplo, via console AWS) em vez de através do Terraform. Para detectar drift, você pode usar o comando 'terraform plan', que compara o estado atual com a configuração e mostra quais recursos estão diferentes. Para uma detecção mais específica, o comando 'terraform refresh' atualiza o arquivo de estado para refletir o estado real da infraestrutura. Em ambientes empresariais, ferramentas como Terraform Cloud, AWS Config ou ferramentas de terceiros podem monitorar continuamente o drift e alertar quando ele ocorre."
},
{
    id: 49,
    category: "terraform",
    question: "O que são 'data sources' no Terraform e como eles são utilizados?",
    options: {
        a: "Bancos de dados utilizados para armazenar o estado do Terraform",
        b: "Fontes de dados que permitem importar informações externas para uso na configuração",
        c: "Ferramentas para migrar dados entre diferentes ambientes de infraestrutura",
        d: "Repositórios Git que armazenam configurações do Terraform"
    },
    correctAnswer: "b",
    explanation: "Data sources no Terraform são componentes que permitem buscar ou computar dados para uso em configurações. Eles permitem que você utilize informações de recursos existentes (que podem não ser gerenciados pelo Terraform) ou atributos dinâmicos dentro de sua configuração. Por exemplo, você pode usar um data source para buscar o ID de uma AMI específica na AWS, obter zonas de disponibilidade de uma região, consultar informações de VPCs existentes, ou ler dados de serviços externos. Os data sources são particularmente úteis para integrar recursos gerenciados pelo Terraform com infraestrutura existente ou para acessar informações que só estão disponíveis em tempo de execução."
},
{
    id: 50,
    category: "terraform",
    question: "Qual é a diferença entre 'terraform apply' e 'terraform apply -auto-approve'?",
    options: {
        a: "Não há diferença, são comandos equivalentes",
        b: "'terraform apply' executa mais rápido que 'terraform apply -auto-approve'",
        c: "'terraform apply' requer confirmação manual, enquanto '-auto-approve' executa sem pedir confirmação",
        d: "'terraform apply -auto-approve' executa apenas em ambientes de produção"
    },
    correctAnswer: "c",
    explanation: "A diferença principal é que 'terraform apply' mostra o plano de execução e requer uma confirmação manual (digitando 'yes') antes de aplicar as mudanças na infraestrutura, enquanto 'terraform apply -auto-approve' pula a etapa de confirmação e aplica as mudanças automaticamente. O uso de '-auto-approve' é comum em pipelines de CI/CD automatizados onde interação manual não é possível. No entanto, em ambientes de produção ou quando executando manualmente, é geralmente mais seguro usar 'terraform apply' sem a flag auto-approve para revisar as mudanças propostas antes de aplicá-las."
        } 
];
