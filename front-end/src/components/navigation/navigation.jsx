import React, {useState} from 'react'

export const Navigation = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleIsMenuVisible = () => setIsMenuVisible(prev => !prev);

  return <nav>
    hello
    <button onClick={toggleIsMenuVisible}>open menu</button>
    {isMenuVisible && <span onClick={toggleIsMenuVisible}>LOL</span>}
  </nav>
}
