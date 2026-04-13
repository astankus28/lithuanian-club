export default function Footer() {
  return (
    <footer className="bg-forest-dark border-t border-amber-club/20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Identity */}
          <div>
            <h3 className="font-cinzel text-amber-club tracking-widest uppercase text-sm mb-3">
              Lithuanian Club of Cleveland
            </h3>
            <p className="font-fell text-parchment/60 text-sm leading-relaxed">
              Preserving heritage, building community, and celebrating Lithuanian culture in the heart of Ohio since 1912.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzelPlain text-amber-club/80 tracking-widest uppercase text-xs mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {['#dining', '#events', '#book', '#bar', '#archive', '#gallery', '#membership', '#contact'].map((href) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-fell text-parchment/50 hover:text-parchment text-sm transition-colors capitalize"
                  >
                    {href.replace('#', '').replace('-', ' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-cinzelPlain text-amber-club/80 tracking-widest uppercase text-xs mb-3">Find Us</h4>
            <div className="font-fell text-parchment/60 text-sm space-y-1">
              <p>851 Broadview Road</p>
              <p>Cleveland, Ohio 44109</p>
              <p className="mt-3">info@lithuanianclub.org</p>
              <p>(216) 555-0192</p>
            </div>
            <div className="mt-4">
              <p className="font-cinzelPlain text-xs text-amber-club/60 tracking-wider uppercase">Hours</p>
              <p className="font-fell text-parchment/60 text-sm">Tue–Sun: 5pm – 11pm</p>
              <p className="font-fell text-parchment/60 text-sm">Kitchen closes at 9:30pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-club/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-fell italic text-parchment/30 text-sm">
            © {new Date().getFullYear()} Lithuanian Club of Cleveland. All rights reserved.
          </p>
          <a
            href="/admin"
            className="font-cinzelPlain text-xs tracking-widest text-parchment/20 hover:text-parchment/50 transition-colors uppercase"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
