import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const LauncherList = props => {
  const [launchers, setLaunchers] = useState([])

  const fetchLaunchers = async () => {
    try {
      const response = await fetch('/api/v1/launchers')
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const responseBody = await response.json()
      setLaunchers(responseBody.launchers)
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchLaunchers()
  }, [])

  const launcherList = launchers.map(launcher => {
    return(
    <Link key={launcher.id} to={`/launchers/${launcher.id}`}>
      <li>{launcher.name}</li>
    </Link>
    )
  })

  return (
    <div>
      <h1>Launchers</h1>
      <ul>{launcherList}</ul>
    </div>
  )
}

export default LauncherList
