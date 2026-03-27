interface IStatProps {
  value: string;
  label: string;
}

const Stat = ({ value, label }: IStatProps) => {
  return (
    <div className="flex w-full flex-col items-center py-6 md:w-auto md:px-10">
      <span className="text-primary text-3xl font-semibold">{value}</span>
      <span className="text-dark-100">{label}</span>
    </div>
  );
};

export default Stat;
