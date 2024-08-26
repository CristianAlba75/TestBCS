module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.spec.ts'], // Asegúrate de que el patrón de búsqueda sea correcto
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'], // Asegúrate de que no ignores archivos de prueba
};
