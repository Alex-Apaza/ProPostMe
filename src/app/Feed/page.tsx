'use client';

import Headerp from '@/componentes/Headerp';
import Crearpost from '@/componentes/Crearpost';
import Cardpost from '@/componentes/Cardpost';

export default function Feed() {
  return (
    <div>
      <Headerp />
      <div className='Posteos px-4 mt-4 flex flex-col items-center gap-6'>
        <Crearpost />
        <Cardpost />
      </div>
    </div>
  );
}
