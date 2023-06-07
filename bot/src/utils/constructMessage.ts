interface ConstructComponents {
  firstName: string;
  roleName?: string;
  message: string;
}

export const constructMessage = (comps: ConstructComponents) => {
  const includeRole = comps.roleName ? ` (${comps.roleName})` : "";
  return comps.firstName + includeRole + ": " + comps.message;
};
