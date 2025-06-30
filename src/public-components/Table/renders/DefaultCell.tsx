interface DefaultCellProps {
  children: React.ReactNode;
}

export const DefaultCell = ({ children }: DefaultCellProps) => {
  return <div className="default-cell">{children}</div>;
};
