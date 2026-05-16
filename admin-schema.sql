-- Tabela de Configurações Gerais do Site
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Inserindo dados da Página Inicial e Contatos
INSERT INTO site_settings (key, value) VALUES
('hero_title', 'Bem Vindos à<br/><span>Feirinha da Beira Mar</span>'),
('hero_subtitle', 'Venha conhecer um pouquinho mais a gente. Navegue e se encante com belezas da nossa Feirinha.'),
('about_title', 'Um pouquinho mais sobre nós'),
('about_subtitle', 'O Polo Artesanal Feirinha Beira Mar'),
('about_text_1', 'A Feirinha da Beira Mar atrai e encanta tanto turistas quanto moradores locais retratando a cultura de um povo através de seu artesanato, de comidas típicas e do próprio modo de ser.'),
('about_text_2', 'Ela teve inicio na década de 80 e após anos de contribuição para o desenvolvimento turístico, geração de empregos e exposição da arte do povo cearense, ela foi tombada como Patrimônio Cultural do Município de Fortaleza.'),
('about_text_3', 'Em 2022 a nossa Feirinha passou por requalificação e possui hoje 712 boxes distribuídos em mais de 8 mil metros quadrados de área totalmente urbanizada e acessível.'),
('invite_title', 'Um passeio de encher os olhos'),
('invite_text', 'Vale dizer que ir à Feirinha da Beira Mar é um passeio extremamente agradável. Espero ver você passeando por aqui, a Ferinha da Beira Mar está ansiosa pela sua visita.'),
('contact_phone', '(85) 98769-8445'),
('contact_email', 'artesmoda.producoes@gmail.com'),
('contact_address', 'Avenida Beira Mar, s/n - Meireles, Fortaleza - CE. Próximo ao número 2800.'),
('contact_hours', 'Domingo à Domingo das 16h às 22h');

-- Tabela de História (Linha do Tempo)
CREATE TABLE historia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ano TEXT NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  ordem INTEGER NOT NULL
);

-- Inserindo dados da História
INSERT INTO historia (ano, titulo, descricao, ordem) VALUES
('1978', 'O Início na Calçada', 'Algumas pessoas decidiram expor seus produtos em frente ao hotel Othon Palace com o intuito de vendê-los aos turistas. Ocorreu o movimento das praças, e um tempo depois houve a transição para o calçadão.', 1),
('1988', 'A Regulamentação', 'Aprovado o decreto que regulamentava o funcionamento das feiras de artesanato, considerando que tais feiras já integravam os eventos turísticos de Fortaleza.', 2),
('1990', 'Criação da ASFABEM', 'Visando uma melhor organização, foi criada a Associação dos Feirantes de Artesanato da Beira Mar (ASFABEM) para atuar junto aos órgãos governamentais.', 3),
('1995', 'Patrimônio Cultural', 'Sancionada a lei nº 062/95 pelo Prefeito Antônio Cambraia, que a tombou como Patrimônio Cultural do Município. O chão que era de areia e brita, foi pavimentado com pedras e iluminado.', 4),
('2006', 'Reordenamento', 'A Feira passou por um novo reordenamento e layout. Feito um acordo com Prefeitura e com o Ministério Público Federal para manter os carrinhos no calçadão após o horário de comercialização.', 5),
('2012', 'Nova Estrutura', 'Passa a funcionar em sua nova estrutura após requalificação. Pela primeira vez, os comerciantes tiveram infraestrutura adequada.', 6),
('2022', 'A Requalificação', 'Em 2022 a nossa Feirinha passou por requalificação e possui hoje 712 boxes distribuídos em mais de 8 mil metros quadrados de área totalmente urbanizada e acessível.', 7);
