/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import Image from 'next/image';

const Reservation = ({ data }) => {
  console.log(data);

  const obj = {
    header: ['ID', '이미지', '공연 이름', '장소'],
  };

  return (
    <div css={[ReservationContainer]}>
      <h2 css={[Text]}>예약한 공연</h2>
      <div css={[TableContainer]}>
        <table css={[TableBox]}>
          <thead css={[TableHead]}>
            <tr>
              <th css={[TableText]}>{obj.header[0]}</th>
              <th css={[TableText]}>{obj.header[1]}</th>
              <th css={[TableText]}>{obj.header[2]}</th>
              <th css={[TableText]}>{obj.header[3]}</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td css={[TableText]}>{item.id}</td>
                    <td css={[TableText]}>
                      <Image src={item.image} alt='' width={50} height={50} />
                    </td>
                    <td css={[TableText]}>{item.name}</td>
                    <td css={[TableText]}>{item.place}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;

const TableContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  text-align: center;
  width: 100%;
  overflow-x: auto;
`;

const Text = css`
  text-align: center !important;
  font-size: 1.75rem;
  color: #8d98a0;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const TableBox = css`
  width: 80%;
  min-width: 600px;
`;

const TableHead = css`
  height: 40px;
  font-weight: 700;
  background-color: #f8f9fa;
`;

const TableHeadText = css`
  border: 1px solid #dee2e6;
  padding: 1rem;
  border-bottom-width: 3px;
`;

const TableText = css`
  border: 1px solid #dee2e6;
`;

const ReservationContainer = css`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
`;
