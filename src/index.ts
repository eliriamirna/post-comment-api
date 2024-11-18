import app from "./app";

const PORTA = process.env.PORTA || 5000;

app.listen(PORTA, () => console.log(`API rodando na porta ${PORTA}`));