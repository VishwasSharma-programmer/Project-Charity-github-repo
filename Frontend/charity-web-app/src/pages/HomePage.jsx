import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaWallet, FaUserCircle, FaCompass, FaPlusCircle } from "react-icons/fa";
import "./HomePage.css"; // Create this CSS file for styles

import logo from "../assets/logo.png"; // Adjust path as needed

const contentBlocks = [
  {
    emoji: "💔",
    title: "The World We Live In",
    text: `In every corner of the world, there are children who dream of school but sit under broken roofs, waiting.
    Over 260 million children have no access to education.
    1 in 10 people live without access to clean drinking water.
    Every day, thousands go to bed hungry, not from laziness, but from lack of opportunity.
    Millions suffer silently, unable to afford basic healthcare or shelter.
    Not because people don't care.
    But because the help doesn't always reach them.`,
  },
  {
    emoji: "🌱",
    title: "The Power of Giving",
    text: `Giving is more than money.
    It’s love, trust, and belief in a better tomorrow.
    When you donate — even a little — you're saying:
    "I see you. You matter. You're not alone."
    That kind of kindness?
    It creates ripples across generations.`,
  },
  {
    emoji: "🤝",
    title: "Let’s Rebuild Trust in Charity",
    text: `In a world filled with doubt, we still believe in good.
    But good needs a bridge — a way to reach where it’s needed the most.
    Charity should be:
    Transparent, not mysterious
    Simple, not complicated
    Real, not performative
    Every rupee should count.
    Every donor should know where it goes.
    Every receiver should be treated with dignity.`,
  },
  {
    emoji: "✨",
    title: "A Movement of Hope",
    text: `This isn’t just about charity.
    This is about restoring faith in humanity.
    A student completing her education because someone believed in her.
    A mother affording treatment for her child because a stranger cared.
    A village getting clean water because people came together.
    These are not just stories.
    They’re futures — waiting to be written.`,
  },
  {
    emoji: "💬",
    title: "What We Believe",
    text: `"Giving is not about how much you have,
    it’s about how deeply you care."
    You don’t need to be rich to make a difference.
    You just need to be human.`,
  },
  {
    emoji: "🌍",
    title: "The Choice is Ours",
    text: `We can scroll past, or we can stand up.
    We can stay silent, or we can speak through action.
    Because the truth is —
    we’re all connected.
    And when one life gets better, so does the world.`,
  },
  {
    emoji: "🕊️",
    title: "Be a Part of Something Bigger",
    text: `This isn’t just a platform.
    It’s a purpose.
    Join us.
    Not for rewards. Not for recognition.
    But because someone, somewhere, needs you.
    Today.`,
  },
];

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="homepage-bg">
      {/* Transparent Logo at Top */}
      <header className="homepage-header">
        <img src={logo} alt="Kindakind Logo" className="homepage-logo" />
        <nav className="homepage-nav">
          <button className="nav-btn" title="Connect Wallet">
            <FaWallet size={28} />
          </button>
          <button className="nav-btn" title="Dashboard/Profile">
            <FaUserCircle size={28} />
          </button>
          <button className="nav-btn" title="Explore Campaigns">
            <FaCompass size={28} />
          </button>
          <button className="nav-btn" title="Create Campaign">
            <FaPlusCircle size={28} />
          </button>
        </nav>
      </header>

      {/* Alternating Content Blocks */}
      <main className="homepage-main">
        {contentBlocks.map((block, idx) => (
          <section
            key={idx}
            className={`content-block ${idx % 2 === 0 ? "left" : "right"}`}
            data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div className="content-inner">
              <h2 className="block-title">
                <span className="emoji">{block.emoji}</span> {block.title}
              </h2>
              <p className="block-text">{block.text}</p>
            </div>
          </section>
        ))}
      </main>

      {/* About Us at the Bottom */}
      <footer className="homepage-footer" id="about-us" data-aos="fade-up">
        <h3>About Us</h3>
        <p>
          Kindakind is a blockchain-powered platform restoring trust in charity. We ensure every donation is transparent, every campaign is real, and every act of kindness counts. Join our movement and help build a better world, one verified cause at a time.
        </p>
      </footer>
    </div>
  );
}
