import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex justify-between p-5 bg-amber-50">
        <div className="flex-none">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MyApp
          </Link>
        </div>

        <div className="flex gap-5">
          <Link
            href="/login"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </header>
    </>
  );
}
