import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        francois: ['var(--font-francois)', 'sans-serif'],      // Headers
        inter: ['var(--font-inter)', 'sans-serif'],            // Labels, placeholders, admin
        poppins: ['var(--font-poppins)', 'sans-serif'],        // Buttons, homepage, general UI
        geist: ['var(--font-geist-sans)', 'sans-serif'],       // Optional: tech/code style
        mono: ['var(--font-geist-mono)', 'monospace'],         // Optional: for code blocks
      },
      fontSize: {
        header: '32px',       // Francois One
        label: '21px',        // Inter
        placeholder: '21px',  // Inter
        button: '20px',       // Poppins (Medium)
        nav: '20px',          // Poppins (Semibold)
        paragraph: '16px',    // Poppins (Medium)
      },
    },
  },
  plugins: [],
}

export default config
