export class OrganizationNotExistError extends Error {
  constructor() {
    super('Organization not exist.')
  }
}
