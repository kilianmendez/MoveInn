// src/app/dashboard/messages/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useContacts, type Contact } from '@/components/messages/UseContact';
import { useWebsocket } from '@/context/WebSocketContext';
import { ContactsList } from '@/components/messages/ContactList';
import { ChatWindow } from '@/components/messages/ChatWindow';
import { User, Search } from 'lucide-react';

export default function MessagesPage() {
  const { contacts: initialContacts, loading: contactsLoading, error: contactsError } = useContacts();
  const { lastMessage, sendMessage } = useWebsocket();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);

  // Inicializa lista y selección
  useEffect(() => {
    setContacts(initialContacts);
    if (!selected && initialContacts.length > 0) {
      setSelected(initialContacts[0]);
    }
  }, [initialContacts, selected]);

  // Al enviar mensaje localmente, actualiza último mensaje
  const handleLocalSend = (receiverId: string, content: string) => {
    setContacts(prev =>
      prev.map(c =>
        c.otherUserId === receiverId
          ? { ...c, lastMessage: content, lastMessageAt: new Date().toISOString() }
          : c
      )
    );
    sendMessage(receiverId, content);
  };

  // Cada vez que llega un WS, actualiza listado
  useEffect(() => {
    if (!lastMessage) return;
    setContacts(prev =>
      prev.map(c => {
        if (lastMessage.action === 'new_message' && lastMessage.senderId === c.otherUserId) {
          return { ...c, lastMessage: lastMessage.content, lastMessageAt: lastMessage.sentAt };
        }
        if (lastMessage.action === 'message_status' && lastMessage.receiverId === c.otherUserId) {
          return { ...c, lastMessageAt: new Date().toISOString() };
        }
        return c;
      })
    );
  }, [lastMessage]);

  if (contactsLoading) return <div className="p-4">Cargando contactos…</div>;
  if (contactsError) return <div className="p-4">Error cargando contactos.</div>;

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* === HEADER UNIFICADO === */}
      <div className="bg-indigo-100 rounded-lg mx-4 mt-4 mb-2 flex items-center px-6 py-4">
        {/* Título a la izquierda */}
        <h1 className="text-2xl font-bold text-indigo-900">Mensajes</h1>
        {/* Espaciador central */}
        <div className="flex-1" />
        {/* Info del contacto a la derecha */}
        {selected && (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 bg-green-200 rounded-full p-2">
              <User className="h-6 w-6 text-indigo-900" />
            </div>
            <div className="text-right">
              <div className="font-semibold text-indigo-900">{selected.otherUserName}</div>
              <div className="text-sm text-gray-600">
                En Línea – Última vez visto Ahora mismo
              </div>
            </div>
          </div>
        )}
      </div>

      {/* === CONTENIDO: columnas de contactos + chat === */}
      <div className="flex-1 flex mx-4 mb-4">
        {/* Columna de contactos */}
        <div className="w-1/3 flex flex-col mr-4">
          <div className="mb-3">
            <div className="bg-green-100 flex items-center gap-2 px-4 py-2 rounded-full">
              <Search className="h-5 w-5 text-indigo-900" />
              <span className="text-indigo-900">Buscar Conversaciones...</span>
            </div>
          </div>
          <ContactsList
            contacts={contacts}
            selectedContactId={selected?.otherUserId || null}
            onSelect={c => setSelected(c)}
          />
        </div>

        {/* Columna de chat */}
        <div className="w-2/3 flex flex-col">
          <ChatWindow
            contact={selected}
            onSend={content => selected && handleLocalSend(selected.otherUserId, content)}
          />
        </div>
      </div>
    </div>
  );
}
