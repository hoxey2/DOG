import style from './style/footer.module.css'

export const Footer = () => {
    return (
        <footer className={`${style.footer}`}>
            <h5 className={`${style.footer_text}`}>
                &copy;DOG
                <span>
                    <img
                    className={`${style.footer_logo}`}
                    src='assets/logo.png' alt='logo'/></span>
                 Created By React {new Date().getFullYear()}
            </h5>
        </footer>
    )
}