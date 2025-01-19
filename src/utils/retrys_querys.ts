import retry from "retry";

export const retrys = async (promise: () => Promise<unknown>) => {
  return new Promise((resolve, reject) => {
    const operation = retry.operation({
      retries: 10, // Número máximo de reintentos.
      factor: 2, // Incrementa el tiempo entre reintentos exponencialmente.
      minTimeout: 1000, // Tiempo mínimo entre intentos (en ms).
      maxTimeout: 5000, // Tiempo máximo entre intentos (en ms).
      randomize: true, // Añade aleatoriedad al retraso.
    });

    operation.attempt(async () => {
      try {
        const response = await promise();

        resolve(response);
      } catch (error) {
        if (operation.retry(error as Error)) {
          return;
        }
        reject(error);
      }
    });
  });
};
