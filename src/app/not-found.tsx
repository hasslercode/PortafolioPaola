import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="es-CO">
      <body className="mx-auto flex min-h-screen max-w-lg flex-col items-start justify-center gap-4 px-6">
        <h1 className="text-3xl font-semibold">404</h1>
        <p>Página no encontrada / Page not found.</p>
        <Link href="/es" className="underline">
          Volver al inicio / Back home
        </Link>
      </body>
    </html>
  );
}
