import {atomFamily} from 'recoil';

export const objectAtomFamily = atomFamily({
  key: 'objectAtomFamily',
  default: {},
});
export const arrayAtomFamily = atomFamily({
  key: 'arrayAtomFamily',
  default: [],
});
export const booleanAtomFamily = atomFamily({
  key: 'booleanAtomFamily',
  default: false,
});
