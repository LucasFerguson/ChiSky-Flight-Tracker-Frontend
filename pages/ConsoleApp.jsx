import React from 'react'
import { Hook, Console, Decode } from 'console-feed'

export default class ConsoleApp extends React.Component {
  state = {
    logs: []
  }

  componentDidMount() {
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [Decode(log), ...logs] }))
    })

    console.log(`Hello world!`)
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console logs={this.state.logs} variant="dark" />
      </div>
    )
  }
}
