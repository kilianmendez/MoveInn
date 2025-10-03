"use client"

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { useAuth } from '@/context/authcontext'
import { toast } from 'sonner'
import { API_BASE_SOCKET_URL } from '@/utils/endpoints/config' 
export interface IWebsocketContext {
  socket: WebSocket | null
  sendMessage: (receiverId: string, content: string) => void
  followUser: (targetUserId: string) => void
  unfollowUser: (targetUserId: string) => void
  markAsRead: (contactId: string) => void
  lastMessage: any
}

const translateMessageToEnglish = (message: string): string => {
  const lower = message.toLowerCase()

  if (lower.includes("ha dejado de seguirte")) return "Someone has unfollowed you."
  if (lower.includes("te ha empezado a seguir")) return "Someone started following you."
  if (lower.includes("te ha enviado un mensaje")) return "Someone sent you a message."
  if (lower.includes("nueva recomendación")) return "New recommendation received."
  if (lower.includes("nuevo evento")) return "New event created."
  if (lower.includes("nueva notificación")) return "You have a new notification."
  if (lower.includes("ha marcado como leído")) return "Your message was marked as read."

  return message
}


const WebsocketContext = createContext<IWebsocketContext | undefined>(undefined)

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const { token, logout } = useAuth()
  const socketRef = useRef<WebSocket | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [lastMessage, setLastMessage] = useState<any>(null)
  const [wsVersion, setWsVersion] = useState(0)

  const handleLogout = () => {
    logout()
    setWsVersion(v => v + 1)
  }

  const safeSend = (data: any) => {
    const json = JSON.stringify(data)

    if (!socketRef.current) {
      console.warn("❌ No WebSocket instance.")
      return
    }

    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(json)
    } else if (socketRef.current.readyState === WebSocket.CONNECTING) {
      console.log("⌛ WS connecting, waiting to send:", data)
      socketRef.current.addEventListener(
        "open",
        () => {
          socketRef.current?.send(json)
          console.log("📤 Sent after connect:", data)
        },
        { once: true }
      )
    } else {
      console.warn("❌ Cannot send, WS not open:", socketRef.current.readyState)
    }
  }

  useEffect(() => {
    if (!token) return

    const wsUrl = `${API_BASE_SOCKET_URL}/api/WebSocket/ws?token=${token}&v=${wsVersion}`
    console.log('[WS] Connecting to:', wsUrl)

    const ws = new WebSocket(wsUrl)
    socketRef.current = ws
    setSocket(ws)

    ws.onopen = () => console.log('🟢 [WS] connected')
    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data)
        setLastMessage(parsed)
        console.log("📩 WS received:", parsed)
    
        // Mostrar toast si es una notificación
        if (parsed.action === 'notification' && parsed.message) {
          const translated = translateMessageToEnglish(parsed.message)
          const msg = parsed.message.toLowerCase()
        
          if (msg.includes('ha dejado de seguirte')) {
            toast.error(translated, { duration: 4000 })
          } else {
            toast.success(translated, { duration: 4000 })
          }
        }
        
        
    
      } catch (e) {
        console.error("⚠ Invalid WS JSON:", e)
      }
    }
    
    ws.onerror = (err) => console.error('❌ [WS] error', err)
    ws.onclose = () => console.log('🔴 [WS] disconnected')

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        console.log('[WS] Cleaning up socket')
        socketRef.current.close(1000, 'cleanup')
      }
    }
  }, [token, wsVersion])

  useEffect(() => {
    if (!token && socketRef.current?.readyState === WebSocket.OPEN) {
      console.log('🔴 Closing WS on logout')
      socketRef.current.close(1000, 'Logout')
      setSocket(null)
    }
  }, [token])

  useEffect(() => {
    const handleUnload = () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close(1000, 'Page unload')
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  const sendMessage = (receiverId: string, content: string) => {
    safeSend({ action: 'send_message', receiverId, content })
  }

  const followUser = (targetUserId: string) => {
    safeSend({ action: 'follow', targetUserId })
  }

  const unfollowUser = (targetUserId: string) => {
    safeSend({ action: 'unfollow', targetUserId })
  }

  const markAsRead = (contactId: string) => {
    safeSend({ action: 'mark_as_read', contactId })
  }

  return (
    <WebsocketContext.Provider
      value={{ socket, sendMessage, followUser, unfollowUser, markAsRead, lastMessage }}
    >
      {children}
    </WebsocketContext.Provider>
  )
}

export const useWebsocket = () => {
  const context = useContext(WebsocketContext)
  if (!context) throw new Error('useWebsocket must be used within WebsocketProvider')
  return context
}
