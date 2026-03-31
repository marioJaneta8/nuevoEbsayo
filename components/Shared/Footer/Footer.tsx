import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-4 px-6 border-t bg-white w-full ">
      <div className="flex justify-between items-center text-sm text-slate-500">
        <p>© 2025 Your Company. All rights reserved.</p>


      <div className="flex gap-2 item-center">
        <Link href="/privacy-policy" className="text-slate-500">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-slate-500">
          Terms of Use
        </Link>
      </div>
            </div>
    </footer>
  );
}
