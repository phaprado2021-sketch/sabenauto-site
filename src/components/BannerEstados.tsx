import Image from 'next/image'

export default function BannerEstados({ logoUrl }: { logoUrl?: string }) {
  const logo = logoUrl || 'https://i.postimg.cc/zDPwX8H0/LOGO-DISTRIBUIDORA-1.png'

  return (
    <section
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden flex items-center justify-center"
      style={{ minHeight: '200px', background: 'linear-gradient(135deg, #0a4f8c 0%, #0056b3 50%, #007BFF 100%)' }}
    >
      <div className="relative z-10 text-center px-4">
        <Image
          src={logo}
          alt="Sabenauto Distribuidora de Peças"
          width={300}
          height={100}
          className="h-14 sm:h-18 md:h-24 w-auto object-contain mx-auto max-w-[240px] sm:max-w-xs md:max-w-sm"
          unoptimized
          priority
        />
      </div>
    </section>
  )
}
