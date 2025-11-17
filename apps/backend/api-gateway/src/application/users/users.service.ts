export class UsersService {
  constructor() {} // @Inject(SERVICES.USER) private readonly rabbitClient: ClientProxy,

  async findAll() {
    // this.rabbitClient.emit(MESSAGES.USER.GET_ALL_USERS, undefined);

    return { message: "Find all users!" };
  }
}
