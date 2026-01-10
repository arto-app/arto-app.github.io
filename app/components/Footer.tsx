export function Footer() {
  return (
    <footer class="site-footer">
      <div class="footer-container">
        <p class="footer-text">
          &copy; {new Date().getFullYear()} Arto. Built with care for Markdown
          readers.
        </p>
        <div class="footer-links">
          <a
            href="https://github.com/arto-app/Arto"
            class="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://github.com/arto-app/Arto/releases"
            class="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Releases
          </a>
          <a
            href="https://github.com/arto-app/Arto/issues"
            class="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issues
          </a>
        </div>
      </div>
    </footer>
  );
}
