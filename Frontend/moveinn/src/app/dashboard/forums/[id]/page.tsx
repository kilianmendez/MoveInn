'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import {
  API_ALL_FORUMS,
  API_FORUM_THREADS_BY_FORUM_ID,
  API_FORUM_MESSAGES_BY_THREAD_ID,
  API_FORUM_POST_RESPONSE_TO_THREAD,
  API_FORUM_POST_THREAD,
  API_BASE_IMAGE_URL,
} from '@/utils/endpoints/config'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MapPin, Reply as ReplyIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/authcontext'

const categoryLabels: Record<number, string> = {
  0: 'Procedures & Docs',
  1: 'University Life',
  2: 'Cultural & Social',
  3: 'Scholarships',
  4: 'Transport',
  5: 'Tourism & Nightlife',
  6: 'Events',
  7: 'Tips',
  8: 'FAQ',
  9: 'Other',
}

const forumCategoryBadgeColors: Record<number, string> = {
  0: 'bg-green-600 text-white',
  1: 'bg-blue-600 text-white',
  2: 'bg-pink-600 text-white',
  3: 'bg-yellow-600 text-white',
  4: 'bg-purple-600 text-white',
  5: 'bg-rose-600 text-white',
  6: 'bg-orange-600 text-white',
  7: 'bg-teal-600 text-white',
  8: 'bg-gray-700 text-white',
  9: 'bg-gray-500 text-white',
}

const forumCategoryGradients: Record<number, string> = {
  0: 'from-green-100 to-white',
  1: 'from-blue-100 to-white',
  2: 'from-pink-100 to-white',
  3: 'from-yellow-100 to-white',
  4: 'from-purple-100 to-white',
  5: 'from-rose-100 to-white',
  6: 'from-orange-100 to-white',
  7: 'from-teal-100 to-white',
  8: 'from-gray-200 to-white',
  9: 'from-gray-100 to-white',
}


export default function ForumDetailPage() {
  const { id } = useParams()
  const [forum, setForum] = useState<any | null>(null)
  const [threads, setThreads] = useState<any[]>([])
  const [newThread, setNewThread] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeReply, setActiveReply] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState<Record<string, string>>({})

  const { user } = useAuth()

  const fetchForum = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(API_ALL_FORUMS, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const matchedForum = response.data.find((f: any) => f.id === id)
      setForum(matchedForum || null)
    } catch (error) {
      console.error('Error fetching forums:', error)
    }
  }

  const fetchThreads = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(API_FORUM_THREADS_BY_FORUM_ID(id), {
        headers: { Authorization: `Bearer ${token}` },
      })

      const threadsWithResponses = await Promise.all(
        response.data.map(async (thread: any) => {
          try {
            const res = await axios.get(API_FORUM_MESSAGES_BY_THREAD_ID(thread.id), {
              headers: { Authorization: `Bearer ${token}` },
            })
            return {
              ...thread,
              responses: res.data || [],
            }
          } catch (error) {
            return { ...thread, responses: [] }
          }
        })
      )

      setThreads(threadsWithResponses)
      console.log("Threads: ", threadsWithResponses)
    } catch (error) {
      console.error('Error fetching threads:', error)
    }
  }

  // Crear un nuevo hilo en el foro
  const handleSubmitThread = async () => {
    if (!newThread.trim() || !forum?.id) return
    try {
      setIsSubmitting(true)
      const token = localStorage.getItem('token')
      await axios.post(
        API_FORUM_POST_THREAD,
        {
          forumId: forum.id,
          title: newThread.slice(0, 50),
          content: newThread,
          createdBy: user?.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setNewThread('')
      console.log("mensaje enviado a: ", API_FORUM_POST_THREAD)
      fetchThreads()
    } catch (error) {
      console.error('Error creating thread:', error)
      console.log("Mensaje Enviado:", {
        forumId: forum.id,
        title: newThread.slice(0, 50),
        content: newThread,
        createdBy: user?.id,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Responder a un hilo o a un mensaje
  const handleReplySubmit = async (parentId: string, threadId: string) => {
    const content = replyContent[parentId]
    if (!content?.trim()) return
  
    try {
      const token = localStorage.getItem('token')
      const userId = user?.id || localStorage.getItem('userId')
  
      const payload = {
        threadId: threadId,
        content: content,
        createdBy: userId,
        parentMessageId: parentId === threadId ? null : parentId
      }
  
      console.log("Sending reply:", payload)
  
      await axios.post(API_FORUM_POST_RESPONSE_TO_THREAD, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
  
      setReplyContent((prev) => ({ ...prev, [parentId]: '' }))
      setActiveReply(null)
      fetchThreads()
    } catch (error) {
      console.error('Error replying to thread/message:', error)
    }
  }
  
  const getThreadIdByMessageId = (messageId: string): string => {
    for (const thread of threads) {
      if (thread.responses.some((msg: any) => msg.id === messageId)) {
        return thread.id
      }
    }
    return ''
  }

  const renderReplyBox = (parentId: string) => (
    <div className="ml-8 mt-2">
      <Textarea
        value={replyContent[parentId] || ''}
        onChange={(e) =>
          setReplyContent((prev) => ({ ...prev, [parentId]: e.target.value }))
        }
        placeholder="Write a reply..."
        rows={2}
        className="text-sm text-primary-dark mb-2"
      />
      <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => {
          const threadId = getThreadIdByMessageId(parentId) || parentId
          handleReplySubmit(parentId, threadId)
        }}
      >
        Send
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="hover:bg-[#e84753] bg-red-500 text-white"
        onClick={() => {
          setActiveReply(null)
          setReplyContent((prev) => ({ ...prev, [parentId]: '' }))
        }}
      >
        Cancel
      </Button>
      </div>
    </div>
  )

  const renderNestedReplies = (responses: any[], parentId: string, depth = 1) => {
    const nested = responses.filter((r) => r.parentMessageId === parentId)
    return nested.map((msg) => (
      <div key={msg.id} className={`ml-${depth * 6} mt-2 border-l pl-4`}>
        <div className="flex items-center gap-2 mb-1">
          <Avatar className="h-6 w-6">
            <AvatarImage src={msg.creatorAvatar} />
            <AvatarFallback>{msg.creatorName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{msg.creatorName}</span>
          <span className="text-xs text-gray-400">
            {format(new Date(msg.createdAt), 'PPPp')}
          </span>
        </div>
        <p className="text-sm text-gray-700 ml-8">{msg.content}</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-blue-600 ml-8 mt-1 hover:bg-background"
          onClick={() => setActiveReply(msg.id)}
        >
          <ReplyIcon className="h-4 w-4 mr-1" />Reply
        </Button>
        {activeReply === msg.id && renderReplyBox(msg.id)}
        {renderNestedReplies(responses, msg.id, depth + 1)}
      </div>
    ))
  }

  useEffect(() => {
    if (id) {
      fetchForum()
      fetchThreads()
    }
  }, [id])

  if (!forum) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading forum details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Forum Header */}
        <div className="shadow-lg rounded-lg p-6 bg-white">
          <div className={`rounded-t-md mb-6 -mx-6 -mt-6 px-6 pt-6 pb-4 bg-gradient-to-br ${forumCategoryGradients[forum.category] || 'from-gray-100 to-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <Badge className={`text-sm px-3 py-1 rounded-full ${forumCategoryBadgeColors[forum.category] || 'bg-gray-300 text-gray-800'}`}>
                {categoryLabels[forum.category] || 'Other'}
              </Badge>
              <span className="text-sm text-gray-500">{format(new Date(forum.createdAt), 'PPP')}</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0E1E40] mb-4">{forum.title}</h1>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1 text-[#4C69DD]" />
              {forum.country}
            </div>
          </div>
          <p className="text-gray-700 whitespace-pre-line mb-6">{forum.description}</p>
          <div className="flex items-center gap-3 mt-6">
            <Avatar className="h-10 w-10 bg-primary">
              <AvatarImage src={`${API_BASE_IMAGE_URL}${forum.creatorAvatar}`} />
              <AvatarFallback>{forum.creatorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-[#0E1E40]">{forum.creatorName}</span>
          </div>
          <div className="border-t mt-9 pt-6">
            <Textarea
              value={newThread}
              onChange={(e) => setNewThread(e.target.value)}
              placeholder="Share something with the community..."
              className="mb-3 text-primary-dark"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitThread} disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Thread'}
              </Button>
            </div>
          </div>
        </div>

        {/* Threads */}
        <div className="space-y-4">
          {threads.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No threads yet.</p>
          ) : (
            threads.map((thread) => {
              const rootReplies = thread.responses.filter((r: any) => r.parentMessageId === null)
              return (
                <div key={thread.id} className="bg-white shadow-sm rounded-lg p-4 border">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={thread.creatorAvatar} />
                      <AvatarFallback>{thread.creatorName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium text-primary-dark">{thread.creatorName}</div>
                    <span className="text-xs text-gray-500 ml-auto">
                      {format(new Date(thread.createdAt), 'PPPp')}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line mb-3 px-3">{thread.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-600 ml-3 hover:bg-background"
                    onClick={() => setActiveReply(thread.id)}
                  >
                    <ReplyIcon className="h-4 w-4 mr-1" />Reply
                  </Button>
                  {activeReply === thread.id && renderReplyBox(thread.id)}

                  {rootReplies.slice(0, 5).map((msg: any) => (
                    <div key={msg.id} className="ml-6 mt-2 pl-4 border-l">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={msg.creatorAvatar} />
                          <AvatarFallback>{msg.creatorName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{msg.creatorName}</span>
                        <span className="text-xs text-gray-400">{format(new Date(msg.createdAt), 'PPPp')}</span>
                      </div>
                      <p className="text-sm text-gray-700 ml-8">{msg.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-blue-600 ml-8 mt-1 hover:bg-background"
                        onClick={() => setActiveReply(msg.id)}
                      >
                        <ReplyIcon className="h-4 w-4 mr-1" />Reply
                      </Button>
                      {activeReply === msg.id && renderReplyBox(msg.id)}
                      {renderNestedReplies(thread.responses, msg.id)}
                    </div>
                  ))}

                  {rootReplies.length > 5 && (
                    <button className="text-sm text-blue-600 hover:underline ml-6 mt-2">
                      Show more replies...
                    </button>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
