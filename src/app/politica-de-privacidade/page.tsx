import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Sabenauto - Grupo Bennesby',
  description: 'Conheça a política de privacidade da Sabenauto e do Grupo Bennesby. Entenda como tratamos seus dados pessoais de acordo com a LGPD.',
}

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-14 px-4" style={{ background: 'linear-gradient(135deg, #0a1f3c 0%, #007BFF 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Política de Privacidade</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-blue-100 text-sm">
            Grupo Bennesby / Sabenauto — Última atualização: 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">

        {/* Intro */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-lg font-black text-gray-800 mb-4">Introdução</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            A Lei Geral de Proteção de Dados — LGPD (Lei n. 13.709, de 2018), dispõe sobre o tratamento de dados
            pessoais das pessoas naturais, definindo as hipóteses em que tais dados podem legitimamente ser utilizados
            por terceiros e estabelecendo mecanismos para proteger os titulares dos dados contra usos inadequados.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            A lei é aplicável ao tratamento de dados realizado por pessoas naturais ou por pessoas jurídicas de direito
            público ou privado, e tem o objetivo de proteger os direitos fundamentais de liberdade e de privacidade e o
            livre desenvolvimento da personalidade da pessoa natural.
          </p>
        </section>

        {/* Legal bases */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            Bases Legais para Tratamento de Dados (art. 7º da LGPD)
          </h2>
          <ol className="flex flex-col gap-3">
            {[
              'Mediante o fornecimento de consentimento pelo titular;',
              'Para o cumprimento de obrigação legal ou regulatória pelo controlador;',
              'Para a execução de políticas públicas, pela administração pública;',
              'Para a realização de estudos por órgão de pesquisa;',
              'Para a execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados;',
              'Para o exercício regular de direitos em processo judicial, administrativo ou arbitral;',
              'Para a proteção da vida ou da incolumidade física do titular ou de terceiros;',
              'Para a tutela da saúde, exclusivamente, em procedimento realizado por profissionais de saúde, serviços de saúde ou autoridade sanitária;',
              'Para atender aos interesses legítimos do controlador ou de terceiros, exceto no caso de prevalecerem direitos e liberdades fundamentais do titular que exijam a proteção dos dados pessoais;',
              'Para a proteção do crédito.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                  style={{ background: '#007BFF' }}
                >
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
            As bases legais para o tratamento de dados pessoais sensíveis estão previstas no art. 11º da LGPD.
          </p>
        </section>

        {/* What we use */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            Quais Dados Usamos e Por Que Utilizamos?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            A utilização das suas informações pessoais nos permite melhorar o serviço que prestamos, dar seguimento
            aos seus pedidos mais rapidamente e otimizar a nossa relação. Estas são algumas formas de como podemos
            utilizar as suas informações:
          </p>
          <ul className="flex flex-col gap-2 mb-5">
            {[
              'Assegurar que o seu concessionário entre em contato facilmente',
              'Fornecer informações que você possa ter solicitado',
              'Enviar informações relevantes sobre veículos e serviços',
              'Medir a performance dos nossos anúncios',
              'Medir a performance das nossas vendas e serviços de pós-venda',
              'Melhorar os nossos produtos e serviços',
              'Realizar relatórios de satisfação dos clientes',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#007BFF' }} />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Sujeito ao seu consentimento prévio, também podemos utilizar os seus dados pessoais para:
          </p>
          <ul className="flex flex-col gap-2">
            {[
              'Enviar anúncios personalizados sobre veículos, produtos e serviços',
              'Proporcionar experiências personalizadas',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#007BFF' }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Actors */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-lg font-black text-gray-800 mb-5">Quem São os Atores da Lei</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                num: '1',
                title: 'Controlador',
                desc: 'Empresa responsável pelas decisões sobre tratamento de Dados Pessoais, define finalidades e fornece instruções aos Operadores. Responsável por elaborar o Relatório de Impacto à Proteção de Dados Pessoais.',
              },
              {
                num: '2',
                title: 'Operador',
                desc: 'Agente que realiza o tratamento de Dados Pessoais em nome do Controlador. Pode ser responsabilizado solidariamente em caso de descumprimento da LGPD.',
              },
              {
                num: '3',
                title: 'Encarregado dos Dados (DPO)',
                desc: 'Canal de comunicação entre o Controlador, o Titular dos Dados e a ANPD. Orienta colaboradores e recebe solicitações dos titulares.',
              },
              {
                num: '4',
                title: 'Titular de Dados Pessoais',
                desc: 'Qualquer pessoa que possa ser identificada a partir dos Dados Pessoais. Pode solicitar confirmação de existência, correção e revogação do consentimento.',
              },
              {
                num: '5',
                title: 'ANPD',
                desc: 'Autoridade Nacional de Proteção de Dados. Órgão da administração pública responsável por regulamentar e fiscalizar a implementação da LGPD em todo o território nacional.',
              },
            ].map(item => (
              <div key={item.num} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: '#007BFF' }}
                  >
                    {item.num}
                  </span>
                  <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-blue-50 rounded-2xl border border-blue-100 p-8">
          <h2 className="text-lg font-black text-gray-800 mb-3">Contato</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Para dúvidas sobre esta política de privacidade, entre em contato através dos nossos canais de atendimento.
            Acesse nossa página de{' '}
            <Link href="/#onde-estamos" className="font-semibold hover:underline" style={{ color: '#007BFF' }}>
              lojas
            </Link>{' '}
            para encontrar o canal mais próximo de você.
          </p>
        </section>

        {/* Back button */}
        <div>
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
