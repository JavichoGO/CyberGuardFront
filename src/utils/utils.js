// export function months({ count }) {
//     const monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//     ];
//     return monthNames.slice(0, count);
//   }
  
//   export function numbers({ count, min = 0, max = 100 }) {
//     return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
//   }
  
//   export function transparentize(color, opacity) {
//     return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
//   }
  
//   // Example color object for transparency function
//   export const CHART_COLORS = {
//     red: { r: 255, g: 99, b: 132 },
//     blue: { r: 54, g: 162, b: 235 }
//   };

  
  export function months({ count }) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
    ];
    return monthNames.slice(0, count);
  }
  
  export function numbers({ count, min = 0, max = 100 }) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  }
  
  export function transparentize(color, opacity) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
  }
  
  export const CHART_COLORS = {
    red: { r: 255, g: 99, b: 132 },
    blue: { r: 54, g: 162, b: 235 }
  };