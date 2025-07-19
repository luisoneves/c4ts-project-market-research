export const Sidebar = () => `
  <aside class="sidebar bg-black text-white w-1/3 p-12 flex flex-col justify-between">
    <div>
      <h1 class="mb-6 text-5xl font-bold leading-tight">Luis Otavio Neves Faustino</h1>
      <p class="mb-12 text-lg leading-relaxed text-gray-400">
        We craft digital experiences that blend thoughtful design with technical excellence.
        <span class="font-medium text-white">Focused on meaningful results</span> for ambitious brands.
      </p>
    </div>

    <div>
      <p class="mb-2 text-gray-400">Get in touch</p>
      <a href="mailto:1991lotavion@gmail.com" class="text-2xl font-medium text-white transition-colors duration-300 hover:text-gray-300">
        1991lotavion@gmail.com
      </a>

      <div class="flex mt-8 space-x-4">
        <a href="#" class="text-gray-400 transition-colors duration-300 hover:text-white">
          <i class="text-xl fab fa-instagram"></i>
        </a>
        <a href="#" class="text-gray-400 transition-colors duration-300 hover:text-white">
          <i class="text-xl fab fa-twitter"></i>
        </a>
        <a href="#" class="text-gray-400 transition-colors duration-300 hover:text-white">
          <i class="text-xl fab fa-linkedin"></i>
        </a>
        <a href="#" class="text-gray-400 transition-colors duration-300 hover:text-white">
          <i class="text-xl fab fa-github"></i>
        </a>
      </div>
    </div>
  </aside>
`;
