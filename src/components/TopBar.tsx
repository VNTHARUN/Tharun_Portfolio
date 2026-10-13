import { Download, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/CommandPalette";
import { Container, NAV_ITEMS } from "@/components/shared";
import { person } from "@/content/portfolio";
import { ThemeToggle } from "@/theme";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

export function TopBar() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-2 sm:gap-3">
        <a href="#top" className="mr-auto font-heading text-[1.02rem] font-semibold tracking-tight">
          <span className="lg:hidden">H. V. N. Tharun</span>
          <span className="hidden lg:inline">{person.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="rounded-md px-2.5 py-2 text-[0.98rem] text-secondary transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPaletteOpen(true)}
          aria-label="Open command palette"
          aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
          className="size-9 px-0 text-secondary sm:w-auto sm:px-3"
        >
          <Search />
          <kbd className="hidden font-mono text-xs sm:inline">{isMac ? "⌘K" : "Ctrl K"}</kbd>
        </Button>

        <ThemeToggle />

        <Button asChild size="sm" className="size-9 px-0 sm:w-auto sm:px-3">
          <a href={person.resumePdf} download aria-label="Download resume (PDF)">
            <Download />
            <span className="hidden sm:inline">Resume</span>
          </a>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="size-9 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </Container>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-line md:hidden">
          <Container>
            <ul className="py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-2 py-3 text-lg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </header>
  );
}
