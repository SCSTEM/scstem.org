export default function FRCLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <div className="fll">{children}</div>;
}
