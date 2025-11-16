export const QUEUES = {
  USER: "RABBIT_MQ_USER_QUEUE",
  AUTH: "RABBIT_MQ_AUTH_QUEUE",
} as const;

export const ALL_GATEWAY_QUEUES = Object.values(QUEUES);
