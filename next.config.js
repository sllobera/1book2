/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})
 

module.exports = withPWA({
    reactStrictMode: false,
    swcMinify: true,      // Enable SWC minification for improved performance
    compiler: {
      removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production,

    },
  })