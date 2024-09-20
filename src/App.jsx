import './App.css'
import { Icon } from '@iconify/react';
import Button from './components/Button'
import Counter from './components/Counter/Counter'

function App() {

  return (
    <>
      <div class='flex items-center justify-center mt-5 '>
        <div class="card card-side bg-base-100 shadow-xl w-96">
          <Icon icon="meteocons:pollen-flower-fill" width={100} />
          <div class="card-body items-center">
            <h2 class="card-title">Habit Tracker</h2>
          </div>
        </div>
      </div>

      <Counter />
    </>
  )
}

export default App
