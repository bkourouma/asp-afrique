-- Script SQL pour créer un utilisateur admin
-- Exécutez ce script dans votre base de données PostgreSQL

-- Créer le rôle ADMIN s'il n'existe pas
INSERT INTO roles (id, key, label) 
VALUES ('admin-role-id', 'ADMIN', 'Administrator')
ON CONFLICT (key) DO NOTHING;

-- Créer l'utilisateur admin
-- Le mot de passe 'admin123' est hashé avec bcrypt (salt rounds: 12)
INSERT INTO users (id, email, "passwordHash", name, "isActive", "createdAt", "updatedAt") 
VALUES (
  'admin-user-id',
  'admin@aspci.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KzKz2K', -- admin123
  'Administrator',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  "passwordHash" = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KzKz2K',
  name = 'Administrator',
  "isActive" = true,
  "updatedAt" = NOW();

-- Assigner le rôle ADMIN à l'utilisateur
INSERT INTO user_roles ("userId", "roleId")
VALUES (
  'admin-user-id',
  (SELECT id FROM roles WHERE key = 'ADMIN')
)
ON CONFLICT ("userId", "roleId") DO NOTHING;

-- Vérifier que l'utilisateur a été créé
SELECT 
  u.id,
  u.email,
  u.name,
  u."isActive",
  r.key as role_key,
  r.label as role_label
FROM users u
JOIN user_roles ur ON u.id = ur."userId"
JOIN roles r ON ur."roleId" = r.id
WHERE u.email = 'admin@aspci.com';
