import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const Page404 = () => (
  <div className="container">
    <h1>404 not found</h1>
    <Link to="/">
      <Button text="home"/>
    </Link>
  </div>
)

export default Page404
