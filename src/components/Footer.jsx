import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t py-6 text-center text-xs text-gray-500 bg-white mt-12">
      <p>CONVERGE FEST — ORGANIZED BY SOKUNTHEARY SIN</p>
      <p className="mt-1">© {new Date().getFullYear()} All Rights Reserved.</p>
    </footer>
  );
}