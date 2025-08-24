import { Component } from "react";

export default class DevErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { hasError: false, error: null, info: null }; }
    static getDerivedStateFromError(error) { return { hasError: true, error }; }
    componentDidCatch(error, info) { this.setState({ info }); console.error("💥 Crash:", error, info); }
    render() {
        if (!this.state.hasError) return this.props.children;
        return (
            <div style={{ padding: 16, margin: 16, border: "1px solid #ff4d4f", borderRadius: 12, background: "#2a1d1d", color: "#fff" }}>
                <h3 style={{ marginTop: 0 }}>Component error</h3>
                <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>{String(this.state.error)}</pre>
                {this.state.info?.componentStack && (
                    <pre style={{ whiteSpace: "pre-wrap", opacity: .8, fontSize: 11 }}>{this.state.info.componentStack}</pre>
                )}
            </div>
        );
    }
}
