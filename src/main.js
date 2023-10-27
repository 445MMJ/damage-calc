import { createApp } from 'vue'
import App from './App.vue'
const Ishidden = true


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

//mdi
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  //mdi
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultThemethemes: 'light',
    themes: {
      light: {
        colors: {
          fgo:'#235b94',
          text: '#000000',
          Buster: '#ff0000',
          Arts: '#0067c0',
          Quick: '#4db56a',
        },
      },
      dark: {
        colors: {
          fgo:'#235b94',
          text: '#ffffff',
          Buster: '#ff0000',
          Arts: '#0067c0',
          Quick: '#4db56a',
        },
      },
    }
  },
  options: { customProperties: true }
})

createApp(App).use(vuetify).mount('#app')