import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { ArrowUpRight, Copy, Download, Hash, Mail, MoonStar, type LucideIcon } from "lucide-react";
import { person } from "@/content/portfolio";
import { NAV_ITEMS } from "@/components/shared";
import { useTheme } from "@/theme";

type Item = { label: string; icon: LucideIcon; run: () => void; keywords?: string[] };

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { theme, toggleTheme } = useTheme();

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const sections: Item[] = [
    ...NAV_ITEMS.map((item) => ({ label: item.label, icon: Hash, run: () => go(item.id) })),
    { label: "Financial Statement Analyzer", icon: Hash, run: () => go("financial-statement-analyzer"), keywords: ["rca", "azure"] },
    { label: "Multi-Agent AI Assistant Platform", icon: Hash, run: () => go("multi-agent-assistant"), keywords: ["langgraph", "rag"] },
    { label: "Workato AI Agents", icon: Hash, run: () => go("workato-agents"), keywords: ["leadpilot", "outlook"] },
  ];

  const actions: Item[] = [
    {
      label: "Download resume",
      icon: Download,
      run: () => {
        const a = document.createElement("a");
        a.href = person.resumePdf;
        a.download = "";
        a.click();
      },
      keywords: ["cv", "pdf"],
    },
    { label: "Send email", icon: Mail, run: () => (window.location.href = `mailto:${person.email}`) },
    { label: "Copy email address", icon: Copy, run: () => void navigator.clipboard?.writeText(person.email) },
    { label: "Open LinkedIn", icon: ArrowUpRight, run: () => window.open(person.links.linkedin, "_blank", "noopener") },
    { label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme", icon: MoonStar, run: toggleTheme, keywords: ["theme", "dark", "light"] },
  ];

  const renderItems = (items: Item[]) =>
    items.map(({ label, icon: Icon, run, keywords }) => (
      <Command.Item
        key={label}
        value={label}
        keywords={keywords}
        onSelect={() => {
          onOpenChange(false);
          run();
        }}
        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-[0.98rem] data-[selected=true]:bg-tint"
      >
        <Icon aria-hidden className="size-4 text-secondary" />
        {label}
      </Command.Item>
    ));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      overlayClassName="fixed inset-0 z-50 bg-[#0E1620]/45"
      contentClassName="fixed left-1/2 top-[12vh] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-surface text-foreground shadow-[0_30px_80px_-30px_rgba(14,22,32,0.6)]"
    >
      <Dialog.Title className="sr-only">Command palette</Dialog.Title>
      <Dialog.Description className="sr-only">Jump to a section or run an action. Use arrow keys and Enter.</Dialog.Description>
      <Command.Input
        placeholder="Jump to a section or run an action"
        className="w-full border-b border-line bg-transparent px-4 py-3.5 text-base outline-none placeholder:text-secondary"
      />
      <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto p-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:text-secondary">
        <Command.Empty className="px-3 py-6 text-center text-secondary">No matches.</Command.Empty>
        <Command.Group heading="Go to">{renderItems(sections)}</Command.Group>
        <Command.Group heading="Actions">{renderItems(actions)}</Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
