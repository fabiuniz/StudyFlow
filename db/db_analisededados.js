let guiadeestudoanalisededados = [
  {
    "title": "Guia de Estudos para Análise de Dados",
    "categories": [
      {
        "name": "Fundamentos de Sistemas de Dados",
        "subcategories": [
          {
            "name": "Bancos de Dados e SQL",
            "topics": [
              "Conceitos de Bancos de Dados Relacionais e NoSQL",
              "Linguagem SQL (CRUD, Joins, Funções Agregadas, Subqueries)",
              "Modelagem de Dados (Conceitual, Lógico e Físico)",
              "Otimização de Consultas SQL",
              "Data Warehousing (Conceitos Fundamentais)"
            ]
          },
          {
            "name": "Excel para Análise",
            "topics": [
              "*Funções Essenciais (PROCV, SOMASES, CONT.SES, etc.)*",
              "Tabelas Dinâmicas (Criação, Manipulação, Cálculos)",
              "Gráficos para Visualização de Dados",
              "Power Query (ETL no Excel)",
              "Análise de Cenários e Ferramentas de Simulação"
            ]
          },
          {
            "name": "APIs e Integração de Dados",
            "topics": [
              "*Conceitos de APIs (REST, SOAP)*",
              "Formato de Dados (JSON, XML)",
              "Consumo de APIs com Python (Requests)",
              "Autenticação em APIs",
              "ETL e ELT com APIs"
            ]
          }
        ]
      },
      {
        "name": "Python para Análise de Dados",
        "subcategories": [
          {
            "name": "Técnicas de Análise com Python",
            "topics": [
              "*Manipulação e Limpeza de Dados com Pandas*",
              "Análise Exploratória de Dados (EDA)",
              "Visualização de Dados com Matplotlib e Seaborn",
              "Análise de Séries Temporais (Conceitos Básicos)",
              "Web Scraping com Python (Beautiful Soup, Scrapy)"
            ]
          },
          {
            "name": "Estatística Descritiva",
            "topics": [
              "*Medidas de Tendência Central (Média, Mediana, Moda)*",
              "*Medidas de Dispersão (Desvio Padrão, Variância, Amplitude)*",
              "Distribuições de Frequência",
              "Percentis e Quartis",
              "Correlação e Covariância"
            ]
          },
          {
            "name": "Testes A/B",
            "topics": [
              "*Conceitos Fundamentais de Testes A/B*",
              "Definição de Métricas e Hipóteses",
              "Cálculo de Tamanho de Amostra",
              "Análise de Resultados de Testes A/B",
              "Armadilhas Comuns em Testes A/B"
            ]
          },
          {
            "name": "Google Sheets para Análise",
            "topics": [
              "*Funções Avançadas (QUERY, ARRAYFORMULA, etc.)*",
              "Google Apps Script para Automação",
              "Conexão com Fontes de Dados Externas",
              "Criação de Dashboards e Relatórios",
              "Colaboração e Compartilhamento"
            ]
          }
        ]
      },
      {
        "name": "Outras Ferramentas de Automação e Orquestração",
        "subcategories": [
          {
            "name": "Power Automate",
            "topics": [
              "*Criação de Fluxos de Trabalho Automatizados*",
              "Conectores e Integrações",
              "Triggers e Ações",
              "Tratamento de Erros",
              "Cenários de Uso em Análise de Dados"
            ]
          },
          {
            "name": "Rundeck e Airflow",
            "topics": [
              "*Conceitos de Orquestração de Workflow*",
              "Agendamento de Tarefas",
              "Monitoramento de Execuções",
              "Criação de Pipelines de Dados",
              "Integração com Outras Ferramentas"
            ]
          },
          {
            "name": "Google Apps Script",
            "topics": [
              "Fundamentos da Linguagem Javascript",
              "Automação de Tarefas no Google Workspace",
              "Criação de Funções Personalizadas",
              "Integração com APIs do Google",
              "Desenvolvimento de Add-ons"
            ]
          }
        ]
      },
      {
        "name": "Data Warehouse e Data Lake",
        "subcategories": [
          {
            "name": "Data Warehouse",
            "topics": [
              "*Conceitos de Fato e Dimensão*",
              "Modelagem Dimensional (Star Schema, Snowflake Schema)",
              "Processos de ETL/ELT",
              "Otimização de Consultas em Data Warehouses"
            ]
          },
          {
            "name": "Data Lake",
            "topics": [
              "*Arquitetura de Data Lake*",
              "*Ingestão e Armazenamento de Dados Brutos*",
              "*Governança de Dados em Data Lakes*",
              "*Ferramentas para Processamento em Data Lakes*"
            ]
          },
          {
            "name": "Lakehouse",
            "topics": [
              "*Conceitos e Benefícios da Arquitetura Lakehouse*",
              "*Integração de Data Lakes e Data Warehouses*",
              "*Ferramentas e Tecnologias Lakehouse*"
            ]
          },
          {
            "name": "Camadas do Data Lake",
            "topics": [
              "*Raw/Bronze Layer*",
              "*Curated/Silver Layer*",
              "*Consumption/Gold Layer*",
              "*Governança e Qualidade dos Dados por Camada*"
            ]
          }
        ]
      },
      {
        "name": "Publicação e Visualização de Dados",
        "subcategories": [
          {
            "name": "Plataformas de Publicação e Análise",
            "topics": [
              "*Snowflake (Conceitos e Uso para Análise)*",
              "*Google Cloud Platform (GCP) para Análise de Dados (BigQuery, Dataflow, Dataproc)*",
              "*Amazon AWS para Análise de Dados (Redshift, EMR, Athena)*",
              "*Power BI (Criação de Dashboards e Relatórios Interativos)*",
              "*Spark (Processamento Distribuído de Dados)*",
              "*Tableau (Criação de Visualizações e Dashboards)*",
              "*Metabase (Ferramenta de BI Open Source)*",
              "*Looker (Plataforma de BI e Análise)*"
            ]
          }
        ]
      },
      {
        "name": "Tópicos Adicionais Importantes",
        "subcategories": [
          {
            "name": "Estatística Inferencial",
            "topics": [
              "Intervalos de Confiança",
              "Testes de Hipóteses",
              "Regressão Linear (Conceitos Básicos)"
            ]
          },
          {
            "name": "Machine Learning para Análise (Básico)",
            "topics": [
              "Conceitos de Aprendizado Supervisionado e Não Supervisionado",
              "Algoritmos Básicos (Classificação, Regressão, Agrupamento)",
              "Avaliação de Modelos"
            ]
          },
          {
            "name": "Comunicação e Visualização de Dados Eficaz",
            "topics": [
              "Princípios de Design de Visualizações",
              "Storytelling com Dados",
              "Apresentação de Resultados para Diferentes Públicos"
            ]
          },
          {
            "name": "Governança e Qualidade de Dados",
            "topics": [
              "Políticas de Governança de Dados",
              "Processos de Qualidade de Dados",
              "Privacidade e Segurança de Dados (LGPD e outras regulamentações)"
            ]
          }
        ]
      }
    ]
  }
];


guiadeestudoanalisededados = [
  {
    "title": "Guia de Estudos para Análise de Dados (Citados)",
    "categories": [
      {
        "name": "Sistemas",
        "subcategories": [
          {
            "name": "Ferramentas de Dados",
            "topics": [
              "excel",
              "sql",
              "banco de dados",
              "apis"
            ]
          }
        ]
      },
      {
        "name": "Python",
        "subcategories": [
          {
            "name": "Análise com Python",
            "topics": [
              "tecnicas de analise",
              "estatistica descritiva",
              "teste a/b",
              "google sheets"
            ]
          }
        ]
      },
      {
        "name": "Outros",
        "subcategories": [
          {
            "name": "Ferramentas de Automação",
            "topics": [
              "power automate",
              "rundeck",
              "airflow",
              "google scripts"
            ]
          }
        ]
      },
      {
        "name": "Data Warehouse",
        "subcategories": [
          {
            "name": "Conceitos de DW",
            "topics": [
              "bancos de dados",
              "fato dimensão",
              "lake-house",
              "camadas de data lake"
            ]
          }
        ]
      },
      {
        "name": "Publicação",
        "subcategories": [
          {
            "name": "Plataformas de Publicação",
            "topics": [
              "snowflake",
              "google GCP",
              "amazon AWS",
              "power BI",
              "spark",
              "tableu",
              "metabase",
              "looker"
            ]
          }
        ]
      }
    ]
  }
];