import styles from '../styles/Home.module.css';

export default function Header() {
	return <div class={styles.header}>
  <div class={styles.logo}>
	<img src={"http://localhost:3000/logo.webp"} alt="Logo" style={{ float: 'left', width: '70px', height: '70px', }}/> {/*Logo image */}
  </div>
  <div class={styles.headerlinks}>
    <a class="homestyle" href="/">Home</a>
    <a href="MM">Query</a>
    <a href="About">About</a>
  </div>
</div>
}



// jsx