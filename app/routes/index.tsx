import type { Child } from "hono/jsx";
import { createRoute } from "honox/factory";
import { basePath } from "../lib/path";
import {
  IconBolt,
  IconBook,
  IconBrandGithub,
  IconDownload,
  IconLayoutDashboard,
  IconMoon,
  IconWifiOff,
} from "../components/Icons";
import { CodeBlock } from "../components/CodeBlock";

export default createRoute((c) => {
  return c.render(
    <>
      {/* Hero Section */}
      <section class="hero">
        <div class="hero-container">
          <img src={basePath("/images/logo.svg")} alt="Arto Logo" class="hero-logo" />
          <h1 class="hero-title">The Art of Reading Markdown</h1>
          <p class="hero-tagline">
            A beautiful, offline-first macOS app that faithfully reproduces
            GitHub-style Markdown rendering. Because reading Markdown should be
            a quiet, deliberate act of understanding.
          </p>
          <div class="cta-container">
            <a href={basePath("/install")} class="btn-primary">
              <IconDownload size={20} stroke={2} />
              Install Arto
            </a>
            <a
              href="https://github.com/arto-app/Arto"
              class="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub size={20} stroke={2} />
              View on GitHub
            </a>
          </div>
          <div class="carousel" id="hero-carousel">
            <div class="carousel-track">
              <div class="carousel-slide active">
                <img
                  src={basePath("/images/hero-light.png")}
                  alt="Arto - GitHub-style Markdown rendering"
                  class="carousel-img carousel-img-light"
                />
                <img
                  src={basePath("/images/hero-dark.png")}
                  alt="Arto - GitHub-style Markdown rendering"
                  class="carousel-img carousel-img-dark"
                />
              </div>
              <div class="carousel-slide">
                <img
                  src={basePath("/images/carousel-mermaid.gif")}
                  alt="Arto - Interactive Mermaid diagrams"
                  class="carousel-img"
                />
              </div>
              <div class="carousel-slide">
                <img
                  src={basePath("/images/carousel-sidebar.gif")}
                  alt="Arto - File explorer sidebar"
                  class="carousel-img"
                />
              </div>
              <div class="carousel-slide">
                <img
                  src={basePath("/images/carousel-toc.gif")}
                  alt="Arto - Table of contents panel"
                  class="carousel-img"
                />
              </div>
            </div>
            <div class="carousel-dots">
              <button type="button" class="carousel-dot active" data-index="0" aria-label="Slide 1" />
              <button type="button" class="carousel-dot" data-index="1" aria-label="Slide 2" />
              <button type="button" class="carousel-dot" data-index="2" aria-label="Slide 3" />
              <button type="button" class="carousel-dot" data-index="3" aria-label="Slide 4" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section class="section">
        <div class="section-container">
          <h2 class="section-title">Why Arto?</h2>
          <p class="section-subtitle">
            Most Markdown tools focus on writing. Arto focuses on reading—giving
            you a distraction-free, beautiful experience.
          </p>
          <div class="features-grid">
            <FeatureCard
              icon={<IconBook class="feature-icon" size={32} stroke={1.5} />}
              title="Reading-First Design"
              desc="Purpose-built for reading, not editing. Enjoy a calm, focused experience that lets you absorb content without distractions."
            />
            <FeatureCard
              icon={
                <IconBrandGithub class="feature-icon" size={32} stroke={1.5} />
              }
              title="GitHub-Style Rendering"
              desc="Faithful reproduction of GitHub's Markdown rendering, including extended syntax, alerts, and styling you're familiar with."
            />
            <FeatureCard
              icon={<IconBolt class="feature-icon" size={32} stroke={1.5} />}
              title="Native Performance"
              desc="Built with Rust for blazing-fast performance. Opens instantly, renders quickly, and uses minimal system resources."
            />
            <FeatureCard
              icon={<IconWifiOff class="feature-icon" size={32} stroke={1.5} />}
              title="Offline-First"
              desc="Works completely offline. Your documents stay on your machine, private and always accessible."
            />
            <FeatureCard
              icon={
                <IconLayoutDashboard
                  class="feature-icon"
                  size={32}
                  stroke={1.5}
                />
              }
              title="Mermaid Diagrams"
              desc="Interactive Mermaid diagrams with zoom, pan, and copy-as-image. Visualize your documentation beautifully."
            />
            <FeatureCard
              icon={<IconMoon class="feature-icon" size={32} stroke={1.5} />}
              title="Dark Mode"
              desc="Beautiful dark theme that syncs with your system preferences. Easy on the eyes, day or night."
            />
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section class="section">
        <div class="section-container">
          <h2 class="section-title">See Arto in Action</h2>
          <p class="section-subtitle">
            Watch how Arto transforms your Markdown reading experience.
          </p>
          <div class="video-container">
            <video
              src={basePath("/videos/demo.mp4")}
              controls
              preload="metadata"
              poster={basePath("/images/hero-light.png")}
              class="demo-video"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section class="highlight-section">
        <div class="highlight-container">
          <h2 class="highlight-title">
            "Reading Markdown is not just a utility task"
          </h2>
          <p class="highlight-text">
            It's a quiet, deliberate act of understanding and appreciation. Arto
            is built on this philosophy—providing a serene space where content
            takes center stage and the interface fades into the background.
          </p>
          <a href={basePath("/features")} class="btn-secondary">
            Explore All Features
          </a>
        </div>
      </section>

      {/* Quick Install */}
      <section class="section">
        <div class="section-container">
          <h2 class="section-title">Get Started in Seconds</h2>
          <p class="section-subtitle">
            Install Arto with Homebrew and start reading beautifully rendered
            Markdown immediately.
          </p>
          <CodeBlock
            label="Terminal"
            code={`brew install --cask arto-app/tap/arto
xattr -dr com.apple.quarantine /Applications/Arto.app`}
          />
        </div>
      </section>
    </>,
    { title: "Arto — the Art of Reading Markdown", current: "home" }
  );
});

type FeatureCardProps = {
  icon: Child;
  title: string;
  desc: string;
};

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div class="feature-card">
      {icon}
      <h3 class="feature-title">{title}</h3>
      <p class="feature-desc">{desc}</p>
    </div>
  );
}
