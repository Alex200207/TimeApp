import { Button } from "@/components/ui/button"

interface SidebarProps {
  onSelectItem: (item: string) => void
}

export function Sidebar({ onSelectItem }: SidebarProps) {
  const items = ['Dashboard', 'Analytics', 'Reports', 'Settings']

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <h2 className="text-lg font-semibold mb-4">Menu</h2>
      {items.map((item) => (
        <Button
          key={item}
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onSelectItem(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  )
}
