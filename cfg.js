// Database configuration
const databasesInfo = [
  { value: 'db_profissionalt', label: 'notas autoadesivas', src: 'db/db_profissionalt.js', dataVar: 'profissional_t', requiresConversion: false },
  { value: 'db_profissionaltb', label: 'profissionaltb', src: 'db/db_profissionaltb.js', dataVar: 'profissional_tb', requiresConversion: false },
  { value: 'db_guia_de_estudos', label: 'guia_de_estudos', src: 'db/db_guia_de_estudos.js', dataVar: 'estudodatabasedcompleto', requiresConversion: true },
  { value: 'db_analisededados', label: 'analisededados ds', src: 'db/db_analisededados.js', dataVar: 'guiadeestudoanalisededados', requiresConversion: true },
  { value: 'db_vagajava', label: 'vagajava ee', src: 'db/db_vagajava.js', dataVar: 'guiadeestudosfiltradoparavagajavareestruturado', requiresConversion: true },
  { value: 'db_datateste', label: 'datateste', src: 'db/db_datateste.js', dataVar: 'datateste', requiresConversion: false }
];