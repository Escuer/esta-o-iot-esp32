import express, { type Request, type Response } from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const app = express();
const PORTA = 3000;
const serviceAccount = require('./firebase-key.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.use(express.json());

app.post('/api/temperatura', async (req: Request, res: Response) => {
  try {
    const { temperatura, sensor } = req.body;

    const novaLeitura = {
      temperatura: temperatura,
      sensor: sensor,
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
