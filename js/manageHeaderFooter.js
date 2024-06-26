class customHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header id="header">
            <h1>To Do Task App</h1>
            <h4>Organize all your tasks with this easy app</h4>
                <a href="/index.html">Home</a>
                <a href="/html/statistics.html"></a>
                <a href="/html/contacts.html">Contacts</a>
                <a href="/html/about-us.html">About us</a>
        </header>
        `
    }
}

class customFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer id="footer">
            <br>
            &copy; Copyright ${new Date().getFullYear()}, To Do Tasks App
        </footer>
        `
    }
}

customElements.define('custom-header', customHeader)
customElements.define('custom-footer', customFooter)