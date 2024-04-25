import Link from 'next/link';
import styles from '../../styles/Home.module.css';
// "header" -> {styles.header}
// it says styles is declared but never read, hover over import



export default function Header() {
  return <div className={styles.header}>
    <div className={styles.logo}>
      <img src={"http://localhost:3000/logo.webp"} alt="Logo" style={{ float: 'left', width: '70px', height: '70px', }} /> {/*Logo image */}
    </div>
    <div className={styles.headerlinks}>
      <a className="homestyle" href="/">Home</a>
      <Link href="/Query">Query</Link >
      <Link href="/Map">Map</Link >
      <Link href="/About">About</Link >
    </div>
  </div>
}



// jsx