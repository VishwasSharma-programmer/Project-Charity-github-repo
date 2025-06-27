function About() {
  return (
    <div>
      <h2>About CharityChain</h2>
      <p>CharityChain is a blockchain-powered crowdfunding platform for social causes.</p>
      <h3>FAQs</h3>
      <ul>
        <li>How does blockchain ensure transparency?</li>
        <li>How do I start a campaign?</li>
      </ul>
      <h3>Contact Us</h3>
      <form>
        <input type="text" placeholder="Your Name" required /><br />
        <input type="email" placeholder="Your Email" required /><br />
        <textarea placeholder="Message" required /><br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default About;
