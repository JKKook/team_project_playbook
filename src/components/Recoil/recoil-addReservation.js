import useGetDescription from '@/src/store/server/useGetDescription';
import { atom, selector } from 'recoil';

export const performanceListState = atom({
  key: 'performanceListState',
  default: [],
});

export const performanceState = atom({
  key: 'performanceState',
  default: '',
});
