export default function QALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-cream-50 min-h-screen">
      {children}
    </section>
  );
} 