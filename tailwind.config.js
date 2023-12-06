/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nanum Gothic', 'sans-serif'],
      },
      fontSize: {
        'large': 'large',
      },
      backgroundColor: {
        'lavender': 'lavender',
      },
      boxShadow: {
        'my_shadow': '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
      container: {
        center: true,
        padding: '7%',
      },
      borderRadius: {
        '7': '7px',
        '15': '15px',
      },
      borderColor: {
        'blue-500': '#007bff',
        'red-500': '#dc3545',
        'gray-300': '#ccc',
      },
      textColor: {
        'blue-500': '#007bff',
        'red-500': '#dc3545',
        'white': '#fff',
        'lavender': 'lavender',
        'gray-700': '#444',
        'gray-600': '#666',
      },
      padding: {
        '17': '17px',
      },
      margin: {
        '31': '31px',
        '10': '10px',
        '20': '20px',
      },
      width: {
        '100': '100%',
        '500': '500px',
      },
      height: {
        '50': '50px',
      },
      inset: {
        '10': '10px',
        '20': '20px',
      },
      zIndex: {
        'auto': 'auto',
        '10': '10',
      },
      transitionProperty: {
        'bg-color': 'background-color',
        'color': 'color',
      },
      transitionDuration: {
        '300': '0.3s',
      },
      scale: {
        '120': '1.2',
      },
      transformOrigin: {
        'center': 'center',
      },
      borderWidth: {
        '1': '1px',
      },
      listStyleType: {
        'none': 'none',
      },
      gridTemplateColumns: {
        'footer': '1fr 2fr',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active'],
      textColor: ['hover', 'active'],
      textDecoration: ['hover', 'active'],
      scale: ['hover'],
    },
  },
  plugins: [],
}