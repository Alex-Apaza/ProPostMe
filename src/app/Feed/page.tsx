'use client';

import Headerp from '@/componentes/Headerp';
import StudentMobilityCard from '@/componentes/StudentMobilityCard';
import Crearpost from '@/componentes/Crearpost';

export default function Feed() {
  return (
    <div>
      <Headerp />
      <div className='Posteos'>
        <Crearpost />
        <StudentMobilityCard />
        <StudentMobilityCard />
      </div>
    </div>
  );
}
