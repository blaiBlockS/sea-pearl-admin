interface SubtitleProps {
  value: string;
}

const Subtitle = ({ value }: SubtitleProps) => {
  return <div className="text-body3-medium text-text-primary">{value}</div>;
};

export default Subtitle;
