export const siteConfig = {
  tagline: 'Trabalhamos somente com produtos de alta durabilidade, resistência e tecnologia',
  slogan: 'A peça que falta para o sucesso da sua oficina!',
  horarioSemana: 'Segunda a Sexta 08:00h às 18:00h',
  horarioSabado: 'Sábados 08:00h às 12:00h',
  linkedinVagas: 'https://www.linkedin.com/company/grupo-bennesby/jobs/?viewAsMember=true',
  textoVarejo: 'No Balcão de Peças da Sabenauto, você encontra uma ampla linha de peças genuínas e multimarcas para veículos, com qualidade e confiança garantidas por mais de 50 anos de tradição no mercado automotivo.',
  textoAtacado: 'Na nossa distribuidora de peças, cada cliente é atendido de forma única e personalizada. Nossa equipe de especialistas oferece consultoria técnica completa, ajudando você a encontrar as melhores soluções com a tradição de mais de 50 anos no mercado.',
}

export type EstadoCard = {
  nome: string
  sigla: string
  foto: string
  status: 'ativa' | 'em_breve'
}

export const estadosCards: EstadoCard[] = [
  { nome: 'Acre', sigla: 'AC', foto: 'https://i.postimg.cc/m21VwDNZ/AC.png', status: 'ativa' },
  { nome: 'Amazonas', sigla: 'AM', foto: 'https://i.postimg.cc/cLQmpbbV/AM.png', status: 'ativa' },
  { nome: 'Ceará', sigla: 'CE', foto: 'https://i.postimg.cc/N0B4BxhL/CE.png', status: 'ativa' },
  { nome: 'Mato Grosso', sigla: 'MT', foto: 'https://i.postimg.cc/0QHdGRzJ/MT.png', status: 'ativa' },
  { nome: 'Rio De Janeiro', sigla: 'RJ', foto: 'https://i.postimg.cc/5yY5n7zK/RJ.png', status: 'ativa' },
  { nome: 'Rondônia', sigla: 'RO', foto: 'https://i.postimg.cc/L5ct7tB9/RO.png', status: 'ativa' },
  { nome: 'Alagoas', sigla: 'AL', foto: 'https://i.postimg.cc/XJvky7Yb/AL.png', status: 'em_breve' },
  { nome: 'Distrito Federal', sigla: 'DF', foto: 'https://i.postimg.cc/Dz6cZbF6/DF.png', status: 'ativa' },
]

export type Loja = {
  key: string
  label: string
  cidade: string
  estado: string
  slug: string
  whatsapp: string | null
  phone: string | null
  email: string | null
  endereco: string | null
  coords: { lat: number; lng: number }
}

export const lojas: Loja[] = [
  {
    key: 'Cuiabá - MT',
    label: 'Cuiabá - MT',
    cidade: 'Cuiabá',
    estado: 'MT',
    slug: 'sabenauto-cuiaba',
    whatsapp: '5565999256982',
    phone: '(65) 2128-7100',
    email: 'sabenauto.mt@bennesby.com.br',
    endereco: 'Av. Tenente Coronel Duarte, 2023 - Bairro Dom Aquino, Cuiabá - MT, CEP 78015-500',
    coords: { lat: -15.6014109, lng: -56.0978917 },
  },
  {
    key: 'Várzea Grande - MT',
    label: 'Várzea Grande - MT',
    cidade: 'Várzea Grande',
    estado: 'MT',
    slug: 'sabenauto-varzea-grande',
    whatsapp: '556520180900',
    phone: '(65) 2018-0900',
    email: null,
    endereco: 'Av. Júlio Campos, 3676 - Várzea Grande, MT',
    coords: { lat: -15.645556, lng: -56.132778 },
  },
  {
    key: 'Porto Velho - RO',
    label: 'Porto Velho - RO',
    cidade: 'Porto Velho',
    estado: 'RO',
    slug: 'sabenauto-porto-velho',
    whatsapp: '556999480343',
    phone: '(69) 3216-7139',
    email: 'alessandro.vanzini@bennesby.com.br',
    endereco: 'Av. Tiradentes, 3183 - Industrial, Porto Velho - RO, 76821-013',
    coords: { lat: -8.760778, lng: -63.900322 },
  },
  {
    key: 'Rio Branco - AC',
    label: 'Rio Branco - AC',
    cidade: 'Rio Branco',
    estado: 'AC',
    slug: 'sabenauto-rio-branco',
    whatsapp: '556899836315',
    phone: '(68) 2106-6848',
    email: null,
    endereco: 'Via Chico Mendes, 2454 - Triângulo Velho, Rio Branco - AC, 69906-214',
    coords: { lat: -9.975377, lng: -67.824897 },
  },
  {
    key: 'Fortaleza - CE',
    label: 'Fortaleza - CE',
    cidade: 'Fortaleza',
    estado: 'CE',
    slug: 'sabenauto-fortaleza',
    whatsapp: '558535130700',
    phone: '(85) 3513-0700',
    email: 'adinecilia.santos@bennesby.com.br',
    endereco: 'Av. Professor Eduardo Girão, 01301 - Bairro Fátima, Fortaleza - CE, CEP 60415-075',
    coords: { lat: -3.71722, lng: -38.54337 },
  },
  {
    key: 'Manaus - AM',
    label: 'Manaus - AM',
    cidade: 'Manaus',
    estado: 'AM',
    slug: 'sabenauto-manaus',
    whatsapp: '559221800707',
    phone: '(92) 2180-0707',
    email: null,
    endereco: 'Av. Tefé, 2626 - Raiz, Manaus - AM, 69068-000',
    coords: { lat: -3.1021, lng: -60.0239 },
  },
  {
    key: 'Brasília - DF',
    label: 'Brasília - DF',
    cidade: 'Brasília',
    estado: 'DF',
    slug: 'sabenauto-brasilia',
    whatsapp: null,
    phone: '(61) 3181-3000',
    email: null,
    endereco: null,
    coords: { lat: -15.8286, lng: -47.9269 },
  },
]

export type Peca = {
  categoria: string
  imagem: string
}

export const pecas: Peca[] = [
  { categoria: 'ALTERNADORES', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaAlternador3.jpg' },
  { categoria: 'FILTROS DE COMBUSTÍVEL', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaFiltroCombustivel3.jpg' },
  { categoria: 'ÁUDIO', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaAudio3.jpg' },
  { categoria: 'BATERIAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaBateria3.jpg' },
  { categoria: 'BOMBAS DE ÁGUA', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaBombaAgua3.jpg' },
  { categoria: 'BOMBAS DE COMBUSTÍVEL', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaBombaCombustivel3.jpg' },
  { categoria: 'BOMBAS DE DIREÇÃO', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaBombaDirecaoHidraulica3.jpg' },
  { categoria: 'BOMBAS DE ÓLEO', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaBombaOleo3.jpg' },
  { categoria: 'CABOS DE VELA', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaCabosVela3.jpg' },
  { categoria: 'CILINDROS DE FREIO', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaCilindroFreio3.jpg' },
  { categoria: 'CATALISADORES', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaConversorCatalitico3.jpg' },
  { categoria: 'CORREIAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaCorreias3.jpg' },
  { categoria: 'DISCOS DE FREIO', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaDiscoFreio3.jpg' },
  { categoria: 'EMBREAGEM', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaDiscoPlatoEmbreagem3.jpg' },
  { categoria: 'ESPELHOS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaEspelhoRetrovisor3.jpg' },
  { categoria: 'FARÓIS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaFarois%203.jpg' },
  { categoria: 'FILTROS DE AR', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaFiltroAr3.jpg' },
  { categoria: 'FILTROS DE ÓLEO', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaFiltroOleo3.jpg' },
  { categoria: 'FUSÍVEIS E RELÉS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaFusiveisReles3.jpg' },
  { categoria: 'GRADES DIANTEIRAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaGradeRadiador3.jpg' },
  { categoria: 'LÂMPADAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaLampadas3.jpg' },
  { categoria: 'LANTERNAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaLanternas3.jpg' },
  { categoria: 'LIMPADORES', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaLimpadorParabrisa3.jpg' },
  { categoria: 'LUBRIFICANTES', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaLubrificantes3.jpg' },
  { categoria: 'MOLAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaMolas3.jpg' },
  { categoria: 'MOTORES DE PARTIDA', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaMotorPartida3.jpg' },
  { categoria: 'PALHETAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaPalhetas3.jpg' },
  { categoria: 'PARABRISAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaParabrisa3.jpg' },
  { categoria: 'PARACHOQUES', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaParachoques3.jpg' },
  { categoria: 'PASTILHAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaPastilhas3.jpg' },
  { categoria: 'PNEUS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaPneus3.jpg' },
  { categoria: 'RADIADORES', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaRadiador3.jpg' },
  { categoria: 'RODAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaRodas3.jpg' },
  { categoria: 'SILENCIOSOS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaSilencioso3.jpg' },
  { categoria: 'TENSIONADORES', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaTensionadores3.jpg' },
  { categoria: 'TERMOSTATOS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaTermostato3.jpg' },
  { categoria: 'VELAS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaVelas3.jpg' },
  { categoria: 'VIDROS', imagem: 'https://ik.imagekit.io/ab3nu4cvebb/categorias/categoriaVidros3.jpg' },
]

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAeY2ic1Fcq-nENw_Si_1RyRz9ExhOWFXE'
