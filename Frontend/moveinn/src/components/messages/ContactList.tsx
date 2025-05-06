// Mantener todas las importaciones y tipos
"use client"
import Image from "next/image"
import type { Contact } from "@/components/messages/UseContact"

interface ContactsListProps {
  contacts: Contact[]
  selectedContactId: string | null
  onSelect: (contact: Contact) => void
}

export function ContactsList({ contacts, selectedContactId, onSelect }: ContactsListProps) {
  if (!contacts.length) return <div className="p-4">No tienes contactos aún.</div>

  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.map((c) => {
        const isSelected = c.otherUserId === selectedContactId
        const avatarSrc = c.otherUserAvatar?.startsWith("http") ? c.otherUserAvatar : "/avatars/default.png"

        return (
          <div
            key={c.otherUserId}
            className={`py-3 px-3 flex items-center gap-3 cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "bg-gradient-to-r from-[#5268d6]/5 to-[#5268d6]/10"
                  : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
              }`}
            onClick={() => onSelect(c)}
          >
            <div className="bg-[#b7f8c8] p-2 rounded-full flex-shrink-0">
              <Image
                src={avatarSrc || "/placeholder.svg"}
                alt={c.otherUserName}
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <div className="font-medium text-[#121e3e] truncate">{c.otherUserName}</div>
                <div className="text-xs text-[#4d5562]">
                  {new Date(c.lastMessageAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <div className="text-sm text-[#4d5562] truncate">{c.lastMessage}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
