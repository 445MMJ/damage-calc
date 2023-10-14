import { createApp } from 'vue'
import App from './App.vue'
const Ishidden = true


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors.mjs';

//mdi
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
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
          primary: '#235b94',
          "primary-darken-1": '#1f5185',
          text: '#000000',
          Buster: '#ff0000',
          Arts: '#0067c0',
          Quick: '#4db56a',
        },
      },
      dark: {
        colors: {
          primary: '#235b94',
          "primary-darken-1": '#1f5185',
          text: '#ffffff',
          Buster: '#ff0000',
          Arts: '#0067c0',
          Quick: '#4db56a',
        },
      },
    }
  },
  options: { customProperties: true}
})

createApp(App).use(vuetify).mount('#app')