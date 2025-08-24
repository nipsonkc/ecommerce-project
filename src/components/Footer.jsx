/** Footer with four simple link columns (static). */
export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="cols">
                    <div>
                        <h4>Get to Know Us</h4>
                        <div className="grid">
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Newsletter</a>
                            <a href="#">Terms & Conditions</a>
                        </div>
                    </div>
                    <div>
                        <h4>Customer Care</h4>
                        <div className="grid">
                            <a href="#">Help Center</a>
                            <a href="#">Shipping Rates & Policies</a>
                            <a href="#">Returns & Replacements</a>
                        </div>
                    </div>
                    <div>
                        <h4>Make Money with Us</h4>
                        <div className="grid">
                            <a href="#">Sell Your Products</a>
                            <a href="#">Advertise Your Products</a>
                            <a href="#">Become an Affiliate</a>
                            <a href="#">Supply Products</a>
                        </div>
                    </div>
                    <div>
                        <h4>Contact</h4>
                        <div className="grid">
                            <a href="#">Customer Care</a>
                            <a href="#">Press</a>
                            <a href="#">Community</a>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 16 }} className="muted">Back to Top</div>
            </div>
        </footer>
    )
}
