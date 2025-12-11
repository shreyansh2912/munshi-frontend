import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                munshi: {
                    indigo: '#2C3E66',
                    teal: '#0C736B',
                    blue: '#3B82F6',
                    beige: '#E8DCC4',
                    gold: '#D7B45A',
                    white: '#F7F8FA',
                    mint: '#74D3A1',
                    text: '#1A202C',
                    subtext: '#4A5568',
                    dark: {
                        bg: '#000000',
                        card: '#09090b',
                        border: '#27272a',
                    }
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                heading: ['var(--font-sora)', 'sans-serif'],
                mono: ['var(--font-jetbrains-mono)', 'monospace'],
            },
            backgroundImage: {
                'ledger-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h40v40H0V0zm1 1h38v38H1V1z\" fill=\"%232C3E66\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
                'ledger-pattern-dark': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h40v40H0V0zm1 1h38v38H1V1z\" fill=\"%23ffffff\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'scroll-down': 'scrollDown 40s linear infinite',
                'scroll-up': 'scrollUp 40s linear infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'spin-reverse': 'spinReverse 1s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                scrollDown: {
                    '0%': { transform: 'translateY(-50%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                scrollUp: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50%)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                spinReverse: {
                    'to': { transform: 'rotate(-360deg)' }
                }
            }
        },
    },
    plugins: [],
};
export default config;
