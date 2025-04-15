// This file is a Next.js page component.
import Headerp from '@/componentes/Headerp';
import StudentMobilityCard from '@/componentes/StudentMobilityCard';
import Crearpost from '@/componentes/Crearpost';
export default function Home() {
  return (
    <div>
      <Headerp />
      <div className='Posteos'>
      <Crearpost />
      <StudentMobilityCard />
      <StudentMobilityCard />
      <StudentMobilityCard />
      </div>
    </div>
  );
}
