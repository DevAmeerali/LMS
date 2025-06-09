const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} My LMS. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "12px 0",
    backgroundColor: "#333",
    color: "#fff",
    position: "fixed",
    bottom: 0,
    width: "100%",
    margin: 0,
    // zIndex: 1000,  // ensures footer stays on top
  },
};

export default Footer;
