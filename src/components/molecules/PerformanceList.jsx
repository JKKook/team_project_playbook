import Link from 'next/link';
import Image from 'next/image';

const PerformanceList = ({ performances }) => {
  const images = performances.map((v) => v.image);

  return (
    <>
      <ul>
        {images?.map((elem, idx) => (
          <li key={idx}>
            <Link href={'/'}>
              <Image src={elem} alt={'images'} height={480} width={400} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PerformanceList;
