export const USER = {
  // --- Comandos (Request-Response) ---
  GET_USER_BY_ID: "users.get_by_id",
  GET_ALL_USERS: "users.get_all",

  // --- Eventos (Fire-and-Forget) ---
  USER_CREATED: "users.event.created",
  USER_UPDATED: "users.event.updated",
  USER_DELETED: "users.event.deleted",
} as const;
