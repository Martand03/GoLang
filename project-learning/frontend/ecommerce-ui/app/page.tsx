import Link from 'next/link';

export default function Landing() {
    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">GoCommerce</h1>
            <p className="mt-2 text-gray-600">Built with Go + Next.js</p>

            <div className="mt-6 flex gap-4">
                <Link href="/login" className="bg-black text-white px-4 py-2">
                    Login
                </Link>
                <Link href="/signup" className="border px-4 py-2">
                    Signup
                </Link>
            </div>
        </main>
    );
}
