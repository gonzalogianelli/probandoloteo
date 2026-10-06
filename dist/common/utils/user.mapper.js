export function publicUser(user) {
    return {
        id: user.id,
        roleId: user.roleId,
        role: user.role?.nombre ?? null,
        clientId: user.clientId,
        nombre: user.nombre,
        apellido: user.apellido,
        dni: user.dni,
        email: user.email,
        telefono: user.telefono,
        activo: user.activo,
    };
}
//# sourceMappingURL=user.mapper.js.map