// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt"],

  // Configurações públicas (acessíveis no cliente)
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3001/api",
    },
  },

  // Auto-importação de componentes
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  // Plugins
  plugins: ["~/plugins/api.ts", "~/plugins/chart.ts"],

  // Configurações do Vite
  vite: {
    plugins: [tailwindcss()],
  },

  // Configurações do app
  app: {
    head: {
      title: "Gestão Plus - Sistema de Gestão Empresarial",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Sistema de gestão empresarial para pequenas e médias empresas",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
});
