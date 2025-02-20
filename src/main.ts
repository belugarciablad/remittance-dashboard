import { mount } from 'svelte'
import './main.css'
import App from './App.svelte'

const target = document.getElementById('app')
if (!target) throw new Error('Could not find #app element')

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
