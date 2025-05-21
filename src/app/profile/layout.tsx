export default function ProfileLayout({
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