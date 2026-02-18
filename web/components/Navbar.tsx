'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center font-black text-2xl text-white tracking-tighter">
              COACH<span className="text-red-600">HUB</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            
            <NavLink href="/transformations">TRANSFORMATIONS</NavLink>
            <NavLink href="/about">ABOUT</NavLink>
            <NavLink href="/programs">PROGRAMS</NavLink>
            <NavLink href="/contact">CONTACT</NavLink>
            
            
            <div className="flex items-center space-x-4 ml-4">
              <Link 
                href="/login" 
                className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold tracking-wide"
              >
                LOG IN
              </Link>
              <Link 
                href="/register" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all hover:scale-105 shadow-lg shadow-red-900/20"
              >
                JOIN NOW
              </Link>
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

     {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-neutral-950 border-t border-neutral-800 overflow-hidden"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
             <div className="space-y-1">
                <MobileNavLink href="/transformations" onClick={() => setIsOpen(false)}>TRANSFORMATIONS</MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>ABOUT</MobileNavLink>
                <MobileNavLink href="/programs" onClick={() => setIsOpen(false)}>PRICING</MobileNavLink>
             </div>
             
             <div className="pt-6 mt-6 border-t border-neutral-900 flex flex-col gap-3">
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-neutral-300 hover:text-white py-3 font-semibold border border-neutral-800 rounded-lg hover:border-neutral-700 transition-all"
                >
                  LOG IN
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 shadow-lg shadow-red-900/20 tracking-wide transition-all"
                >
                  JOIN NOW
                </Link>
             </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm font-bold text-neutral-300 hover:text-red-500 transition-colors tracking-wide"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
    >
      {children}
    </Link>
  );
}
