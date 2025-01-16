export default {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.ts'], // Archivo de configuración adicional
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Para transformar archivos TypeScript
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Ignorar estilos en pruebas
    },
  };
  