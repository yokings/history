/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 背景色系 —— 浅色暖调
        'bg-deep': '#f7f2ea',
        'bg-dark': '#faf6f0',
        'bg-card': 'rgba(255, 253, 249, 0.72)',
        // 科技青/薄荷
        bronze: {
          DEFAULT: '#5b9a9d',
          light: '#7bc0c4',
          dark: '#3d7679',
        },
        // 暖金/玫瑰金
        gold: {
          DEFAULT: '#d4a063',
          light: '#f0c887',
          dark: '#a87d4a',
        },
        // 珊瑚朱砂（考点/警示）
        cinnabar: '#d4726c',
        jade: '#2a1f18',
        warmgray: '#5c4d42',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Outfit"', '"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 10s ease-in-out infinite',
        'float-mid': 'float 7s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-25px) translateX(8px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 114, 108, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 114, 108, 0.5), 0 0 50px rgba(245, 220, 212, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
