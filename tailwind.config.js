/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          hover: '#E65F00',
          soft: '#FFF1E7',
          50: '#FFF8F0',
          100: '#FFF1E7',
          200: '#FFD9B8',
          500: '#FF6B00',
          600: '#E65F00',
          700: '#CC5500',
        },
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#1D3557',
          50: '#F0F4F8',
          100: '#D9E4F0',
          200: '#B3C8E0',
          500: '#0B1F3A',
          600: '#091929',
          700: '#060F1A',
        },
        surface: '#FFFFFF',
        background: '#F5F7FA',
        border: '#E5E7EB',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'elevation-2': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
        'elevation-3': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)',
        'elevation-4': '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        input: '8px',
        button: '10px',
        card: '12px',
        modal: '16px',
        drawer: '16px',
        container: '20px',
      },
    },
  },
  plugins: [],
};
