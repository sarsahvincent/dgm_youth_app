export const getUserRole = (role: string) => {
  if (role === '0') return 'ADMIN';
  else if (role === '1') return 'President';
  else if (role === '2') return 'Vice President';
  else if (role === '3') return 'Tresurer';
  else if (role === '4') return 'Executive';
  else if (role === '5') return 'Member';
  else if (role === '6') return 'Financial Secretary';
  else if (role === '7') return 'Observer';
  else return '';
};
