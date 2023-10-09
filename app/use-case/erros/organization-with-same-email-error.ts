export class OrganizationWithSameEmailError extends Error {
  constructor() {
    super("E-mail already exits");
  }
}
