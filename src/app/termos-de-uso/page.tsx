import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso | Sabenauto - Grupo Bennesby',
  description: 'Leia os termos de uso do site da Sabenauto. Informações sobre aceitação, uso do site, propriedade intelectual e limitação de responsabilidade.',
}

const sections = [
  {
    id: 'aceitacao',
    title: '1. Aceitação dos Termos',
    content: `Ao acessar e utilizar o site da Sabenauto (sabenautopecas.com.br), você concorda expressamente com os presentes Termos de Uso. Caso não concorde com qualquer disposição aqui contida, solicitamos que não utilize nosso site ou serviços.

Estes Termos constituem um contrato legal entre você ("Usuário") e a Sabenauto Comércio de Veículos Ltda ("Sabenauto"), empresa integrante do Grupo Bennesby, regularmente estabelecida no Brasil. Reservamo-nos o direito de modificar estes Termos a qualquer momento, sendo sua continuidade no uso do site após tais alterações considerada como aceitação das novas condições.`,
  },
  {
    id: 'uso-do-site',
    title: '2. Uso do Site',
    content: `O uso deste site é destinado exclusivamente para fins legais e em conformidade com estes Termos. Ao utilizar o site da Sabenauto, o Usuário se compromete a:

- Não utilizar o site para qualquer finalidade ilegal ou não autorizada;
- Não transmitir qualquer material que contenha vírus, cavalos de troia, worms ou qualquer outro código de natureza destrutiva;
- Não tentar acessar áreas restritas do site sem autorização;
- Não reproduzir, duplicar, copiar, vender ou explorar qualquer parte do site sem permissão expressa por escrito da Sabenauto;
- Fornecer informações verdadeiras, completas e atualizadas quando solicitado.

O acesso ao site pode ser encerrado a qualquer momento, sem aviso prévio, caso o Usuário viole estes Termos.`,
  },
  {
    id: 'propriedade-intelectual',
    title: '3. Propriedade Intelectual',
    content: `Todo o conteúdo disponibilizado neste site — incluindo, mas não se limitando a textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software — é de propriedade da Sabenauto ou de seus fornecedores de conteúdo e é protegido pelas leis brasileiras de propriedade intelectual.

As marcas registradas "Sabenauto", "Grupo Bennesby" e demais marcas exibidas neste site são marcas registradas de seus respectivos proprietários. Nenhuma disposição destes Termos confere ao Usuário qualquer licença ou direito de uso de qualquer marca exibida no site sem o consentimento prévio por escrito da Sabenauto.

É expressamente proibida a reprodução parcial ou total do conteúdo deste site sem autorização prévia.`,
  },
  {
    id: 'pecas-precos',
    title: '4. Preços e Disponibilidade de Peças',
    content: `As informações sobre preços, disponibilidade e características de peças e produtos exibidas neste site são meramente informativas e estão sujeitas a alteração sem aviso prévio. A Sabenauto não garante que os preços exibidos no site estejam sempre atualizados ou correspondam exatamente aos preços praticados nas lojas físicas.

A disponibilidade de peças e produtos pode variar conforme a unidade da Sabenauto. Para confirmação de disponibilidade e preço atualizado, entre em contato diretamente com a loja mais próxima.

Nos reservamos o direito de recusar ou cancelar pedidos realizados com base em informações incorretas ou desatualizadas.`,
  },
  {
    id: 'limitacao-responsabilidade',
    title: '5. Limitação de Responsabilidade',
    content: `O site da Sabenauto é disponibilizado "no estado em que se encontra" e "conforme disponibilidade". A Sabenauto não oferece garantias de qualquer natureza, expressas ou implícitas, em relação ao site ou ao seu conteúdo.

Na extensão máxima permitida pela lei aplicável, a Sabenauto não será responsável por:

- Quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes decorrentes do uso ou da impossibilidade de uso deste site;
- Interrupções ou falhas no acesso ao site;
- Erros ou imprecisões no conteúdo disponibilizado;
- Conteúdo de terceiros linkado a partir deste site.

Eventuais links para sites de terceiros são fornecidos apenas para conveniência do Usuário. A Sabenauto não se responsabiliza pelo conteúdo, políticas de privacidade ou práticas de sites de terceiros.`,
  },
  {
    id: 'privacidade',
    title: '6. Privacidade e Dados Pessoais',
    content: `O tratamento de dados pessoais dos usuários deste site é regido pela nossa Política de Privacidade, disponível em /politica-de-privacidade. Ao utilizar este site, o Usuário consente com o tratamento de seus dados conforme descrito na referida política.

A Sabenauto está comprometida com a conformidade à Lei Geral de Proteção de Dados (LGPD — Lei n. 13.709/2018) e adota medidas de segurança adequadas para proteger os dados pessoais dos usuários.`,
  },
  {
    id: 'modificacoes',
    title: '7. Modificações dos Termos',
    content: `A Sabenauto reserva-se o direito de revisar e atualizar estes Termos de Uso a qualquer momento, sem necessidade de aviso prévio. As alterações entram em vigor imediatamente após sua publicação no site.

Recomendamos que o Usuário revise periodicamente esta página para se manter informado sobre eventuais modificações. O uso continuado do site após qualquer alteração nos Termos de Uso constituirá aceitação dessas modificações.`,
  },
  {
    id: 'contato',
    title: '8. Contato',
    content: `Para esclarecimentos sobre estes Termos de Uso, entre em contato conosco através dos canais de atendimento disponibilizados em nossas páginas de lojas, acessíveis pelo menu "Nossas Lojas" ou pelo link /lojas.

Sabenauto Comércio de Veículos Ltda — Grupo Bennesby`,
  },
]

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-14 px-4" style={{ background: 'linear-gradient(135deg, #0a1f3c 0%, #007BFF 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Termos de Uso</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Termos de Uso
          </h1>
          <p className="mt-3 text-blue-100 text-sm">
            Sabenauto Comércio de Veículos Ltda — Grupo Bennesby — Última atualização: 2026
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Índice</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm font-medium hover:underline transition-colors"
                  style={{ color: '#007BFF' }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        {sections.map(section => (
          <section
            key={section.id}
            id={section.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 scroll-mt-6"
          >
            <h2 className="text-lg font-black text-gray-800 mb-4">{section.title}</h2>
            <div className="flex flex-col gap-3">
              {section.content.split('\n\n').map((para, i) => {
                if (para.trim().startsWith('-')) {
                  const items = para.split('\n').filter(l => l.trim().startsWith('-'))
                  return (
                    <ul key={i} className="flex flex-col gap-2">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#007BFF' }} />
                          {item.replace(/^-\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    {para}
                  </p>
                )
              })}
            </div>
          </section>
        ))}

        {/* Back button */}
        <div className="pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  )
}
