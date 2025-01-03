'use client'

import React, { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export function Terminal() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const router = useRouter()

  const handleCommand = (command: string) => {
    setOutput(prev => [...prev, `$ ${command}`])
    
    switch (command.toLowerCase()) {
      case 'help':
        setOutput(prev => [...prev, 'Available commands: help, clear, ls, cat <filename>'])
        break
      case 'clear':
        setOutput([])
        break
      case 'ls':
        setOutput(prev => [...prev, 'essential-linux-terminal-commands-guide.md'])
        break
      case 'cat essential-linux-terminal-commands-guide.md':
        router.push('/blog/essential-linux-terminal-commands-guide')
        break
      default:
        setOutput(prev => [...prev, `Command not found: ${command}`])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput('')
  }

  useEffect(() => {
    handleCommand('Welcome to Terminal Blog! Type "help" for available commands.')
  }, [])

  return (
    <div className="terminal-window w-full max-w-3xl">
      <div className="terminal-header">
        <div className="terminal-button terminal-button-red"></div>
        <div className="terminal-button terminal-button-yellow"></div>
        <div className="terminal-button terminal-button-green"></div>
      </div>
      <div className="terminal-content">
        <ScrollArea className="h-[300px] w-full">
          {output.map((line, index) => (
            <p key={index} className="terminal-text">{line}</p>
          ))}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <span className="terminal-text mr-2">$</span>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-black text-green-500 border-green-500 terminal-text"
          />
          <Button type="submit" variant="outline" size="icon" className="ml-2 border-green-500">
            <ArrowRight className="h-4 w-4 text-green-500" />
          </Button>
        </form>
      </div>
    </div>
  )
}

