-- Criação da tabela de Boxes
CREATE TABLE boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero TEXT NOT NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT,
  imagem_url TEXT,
  instagram TEXT,
  telefone TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Criação da tabela de Contatos
CREATE TABLE contatos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Inserindo alguns boxes iniciais (mock data)
INSERT INTO boxes (numero, nome, descricao, categoria, imagem_url, instagram, ativo) VALUES
('BOX 103', 'Adora Bijoux', 'As melhores bijuterias com design exclusivo.', 'Acessórios', 'https://images.unsplash.com/photo-1599643478514-4a11011d19d1?auto=format&fit=crop&q=80&w=800', '@adorabijoux', true),
('BOX 701', 'Renda Donna', 'Rendas cearenses feitas à mão com muito carinho.', 'Roupas', 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800', '@rendadonna', true),
('BOX 704', 'BS Couros', 'Arte em couro, bolsas, cintos e sandálias.', 'Couro', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800', null, true);
