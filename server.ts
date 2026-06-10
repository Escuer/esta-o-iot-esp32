import express, { type Request, type Response } from 'express';
// Importações no padrão moderno do Firebase
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const app = express();
const PORTA = 3000;

// Puxa as credenciais do arquivo
const serviceAccount = require('./firebase-key.json');

// Inicializa o SDK do Firebase
initializeApp({
  credential: cert(serviceAccount)
});

// Cria a conexão direta com o banco
const db = getFirestore();

app.use(express.json());

app.post('/api/temperatura', async (req: Request, res: Response) => {
  try {
    const { temperatura, sensor } = req.body;

    const novaLeitura = {
      temperatura: temperatura,
      sensor: sensor,
      // O Timestamp agora é chamado direto do FieldValue importado
      dataHora: FieldValue.serverTimestamp() 
    };

    await db.collection('leituras').add(novaLeitura);

    console.log(`\n[SALVO NO FIREBASE] Sensor: ${sensor} | Valor: ${temperatura}°C`);
    
    res.status(201).json({ mensagem: "Dados gravados no Firebase com sucesso!" });
  } catch (erro) {
    console.error("Erro ao salvar no banco:", erro);
    res.status(500).json({ erro: "Falha interna do servidor" });
  }
});

app.listen(PORTA, () => {
  console.log(`🚀 API escutando na porta ${PORTA}...`);
});