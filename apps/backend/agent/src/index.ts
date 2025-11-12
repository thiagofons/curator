import amqp from "amqplib";
import chalk from "chalk"; // 1. Importa o CHALK
import "dotenv/config";
import OpenAi from "openai";
// Suas importações originais
import { createAssistant } from "./openai/create-assistant";
import { createRun } from "./openai/create-run";
import { createThread } from "./openai/create-thread";
import { performRun } from "./openai/perform-run";

// --- Definições de Configuração ---
const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://admin:admin@localhost:5672"; // Corrigido com o fallback
const QUEUE_NAME = "roadmap_jobs";

/**
 * Esta é a sua "lógica de negócio".
 * É o que será executado para CADA mensagem da fila.
 */
async function processJob(client: OpenAi, assistantId: string, prompt: string) {
  // O log de "Processando" foi movido para o consumer, onde temos o jobId

  // 1. A Thread é criada para este job específico
  const thread = await createThread(client, prompt);

  // 2. O Run é criado para enfileirar a mensagem na thread
  const run = await createRun(client, thread, assistantId);

  // 3. O resultado é processado (aqui é a parte demorada)
  const result = await performRun(run, client, thread);

  return result;
}

// --- Função Principal do Worker ---
async function startWorker() {
  try {
    // --- Setup Inicial (feito uma vez na inicialização) ---
    console.log(chalk.blue.bold("====================================="));
    console.log(chalk.blue.bold("  CURATOR - WORKER DE IA"));
    console.log(chalk.blue.bold("====================================="));

    // 1. Cria o cliente OpenAI (uma vez)
    const client = new OpenAi();

    // 2. Obtém/Cria o assistente (uma vez)
    console.log(chalk.cyan("Configurando assistente OpenAI..."));
    const assistant = await createAssistant(client);
    console.log(
      chalk.cyan(`Assistente pronto (ID: ${chalk.dim(assistant.id)}).`),
    );

    // --- Conexão com RabbitMQ ---
    console.log(
      chalk.cyan(`Conectando ao RabbitMQ em ${chalk.dim(RABBITMQ_URL)}...`),
    );
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // 3. Garante que a fila existe (e é 'durable')
    await channel.assertQueue(QUEUE_NAME, {
      durable: true,
    });

    // 4. Define o 'prefetch' para 1
    channel.prefetch(1);

    console.log(
      chalk.green.bold(
        `\n[*] Aguardando por jobs na fila '${chalk.yellow(QUEUE_NAME)}'.\n`,
      ),
    );

    // 5. Começa a consumir da fila
    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        if (msg === null) {
          return;
        }

        let jobData: {
          prompt: string;
          jobId: string;
        };
        let content: string;

        try {
          // --- Recebendo o Job ---
          content = msg.content.toString();
          jobData = JSON.parse(content);
          console.log(
            chalk.yellow(
              `[x] Recebido job [${chalk.magenta.bold(jobData.jobId)}]: "${
                jobData.prompt
              }"`,
            ),
          );
          console.log(chalk.cyan("   -> Processando com a OpenAI..."));

          // --- Executa a Lógica de Negócio ---
          await processJob(client, assistant.id, jobData.prompt);

          // --- Sucesso ---
          console.log(
            chalk.green.bold(
              `[v] Job [${chalk.magenta.bold(
                jobData.jobId,
              )}] concluído com sucesso.`,
            ),
          );
          // console.log("Resultado:", result);

          // AQUI: Salvar o 'result' no banco de dados.

          channel.ack(msg);
        } catch (error) {
          // --- Falha ---
          // Verifica se jobData foi populado antes de tentar acessar jobId
          const jobId = jobData ? jobData.jobId : "ID_DESCONHECIDO";
          console.error(
            chalk.red.bold(
              `[!] Falha ao processar job [${chalk.magenta.bold(jobId)}]:`,
            ),
            error,
          );

          // AQUI: Salvar o estado de 'falha' no banco.

          channel.nack(msg, false, false);
        } finally {
          // Adiciona uma linha em branco para separar os logs de jobs
          console.log("");
        }
      },
      {
        noAck: false,
      },
    );
  } catch (error) {
    // --- Falha Fatal ---
    console.error(
      chalk.red.bgWhite.bold("\n ERRO FATAL AO INICIAR O WORKER! \n"),
    );
    console.error(error);
    process.exit(1);
  }
}

// Inicia o worker
startWorker();
