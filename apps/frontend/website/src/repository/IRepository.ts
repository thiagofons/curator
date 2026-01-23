export abstract class IRepository<T> {
  static async create<T>(data: T): Promise<void> {}
}
