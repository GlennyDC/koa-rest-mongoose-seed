interface RolePermissions {
  [key: string]: string[];
}

export const rolePermissions: RolePermissions = {
  user: [
    'read:organization',
    'create:organization',
    'edit:organization',
    'delete:organization',
  ],
  accountant: [
    'read:location',
    'create:location',
    'edit:location',
    'delete:location',
  ],
};
