type EditContactFieldType = {
  label: 'Email address' | 'Name' | 'Phone number';
  placeholder?: string;
  value: string;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>, value?: string) => void;
};