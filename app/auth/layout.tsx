import Image from 'next/image'

export default async function layout({ children }: { children: React.ReactNode }) {''
  return (
    <main className='min-h-screen flex relative bg-[#fafafa]'>
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/fondo-1.jpg'
          alt='Imagen Fondo'
          className='object-contain'
          fill
          priority={true}
        />
      </div>
      <div className='flex flex-col md:flex-row w-full z-10 relative'>
        <div className='backdrop-blur-md bg-white/30 w-full md:w-[50%] lg:w-[45%] xl:w-[35%] min-h-screen flex items-center'>
          <div className='w-10/12 max-w-[800px] mx-auto h-full flex flex-col'>
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}