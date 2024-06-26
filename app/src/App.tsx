import {
  Button,
  MantineProvider,
  Text,
  TextInput
} from '@mantine/core'
import './App.css'
import { useState } from 'react'
import '@mantine/core/styles.css';

function App() {
  const [timerSet, setTimerSet] = useState(false);

  return (
    <MantineProvider>
      {
        !timerSet &&
        <div className="card">
          <TextInput label="Sleep in..."></TextInput>
          <Button
            variant="filled"
            onClick={() => setTimerSet(true)}
            style={{width: "100"}}
          ></Button>
        </div>
      }
      {
        timerSet &&
        <div className="card">
          <Text>[Time Left]</Text>
          <Button
            variant="filled"
            onClick={() => setTimerSet(false)}
            style={{width: "100"}}
          ></Button>
        </div>
      }
    </MantineProvider>
  )
}

export default App
