<<<<<<< HEAD
import express, { Request, Response } from 'express';
// Importações no formato moderno do Firebase
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// O nome do arquivo corrigido que você encontrou
const serviceAccount = require('./firebase-key.json.json'); 

// Inicializa o Firebase do jeito novo
=======
import express, { type Request, type Response } from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const app = express();
const PORTA = 3000;
const serviceAccount = require('./firebase-key.json');

>>>>>>> 2a296f12a021c924e1d18352feb49ba64ed5145d
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const app = express();
const PORT = 3000;

// ==========================================
// CONFIGURAÇÕES DE SEGURANÇA (PASSE-LIVRE / CORS NATIVO)
// ==========================================
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    next();
});

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/telemetria', async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD
    const dados = req.body;
    // Pega o horário usando o novo formato do Firebase
    dados.dataHora = FieldValue.serverTimestamp();
=======
    const { temperatura, sensor } = req.body;

    const novaLeitura = {
      temperatura: temperatura,
      sensor: sensor,
      dataHora: FieldValue.serverTimestamp() 
    };

    await db.collection('leituras').add(novaLeitura);

    console.log(`\n[SALVO NO FIREBASE] Sensor: ${sensor} | Valor: ${temperatura}°C`);
>>>>>>> 2a296f12a021c924e1d18352feb49ba64ed5145d
    
    await db.collection('telemetria').add(dados);
    res.status(201).json({ mensagem: "Dados salvos com sucesso!" });
  } catch (erro) {
    console.error("Erro ao salvar:", erro);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// ==========================================
// ROTA GET: Dashboard HTML pede a última leitura
// ==========================================
app.get('/api/telemetria/atual', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('telemetria')
                             .orderBy('dataHora', 'desc')
                             .limit(1)
                             .get();

    if (snapshot.empty) {
      res.status(404).json({ erro: "Nenhum dado encontrado no banco." });
      return;
    }

    const ultimoDado = snapshot.docs[0]?.data();
    res.status(200).json(ultimoDado);
    
  } catch (erro) {
    console.error("Erro ao buscar dados para o front-end:", erro);
    res.status(500).json({ erro: "Falha interna do servidor" });
  }
});

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`🚀 API escutando na porta ${PORT}...`);
});
=======
app.listen(PORTA, () => {
  console.log(`🚀 API escutando na porta ${PORTA}...`);
});
>>>>>>> 2a296f12a021c924e1d18352feb49ba64ed5145d
