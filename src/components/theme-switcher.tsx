'use client'

import * as React from 'react'
import { Palette, Check } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const themes = [
  { value: 'dark', label: '🍵 Tea Dark', description: '极光黑' },
  { value: 'light', label: '🍃 Tea Light', description: '晨露白' },
  { value: 'social', label: '📘 Social Blue', description: '商务蓝' },
  { value: 'vibrant', label: '📸 Vibrant', description: '潮流粉' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 rounded-xl text-foreground/60 transition-all duration-200 hover:bg-accent/10 hover:text-foreground"
        >
          <Palette className="h-4 w-4" />
          <span>主题切换</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {themes.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => setTheme(item.value)}
            className={cn(
              'flex items-center justify-between gap-2 cursor-pointer',
              theme === item.value && 'bg-accent text-accent-foreground'
            )}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.description}</span>
            </div>
            {theme === item.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

